import React, { useState, useEffect, useRef, useCallback, useLayoutEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  StatusBar,
  TouchableOpacity,
  TextInput,
  Image,
  SafeAreaView,
} from "react-native";
import { PanGestureHandler, Swipeable, LongPressGestureHandler, TabGestureHandler, State } from "react-native-gesture-handler";
import { launchImageLibrary } from "react-native-image-picker";
import BottomSheet from 'reanimated-bottom-sheet';
import Modal from 'react-native-modal';
//import BottomSheet from 'react-native-bottomsheet-reanimated';

//import BottomSheetNew from 'react-native-bottomsheet-reanimated';
import Feather from "react-native-vector-icons/Feather";
import { Col, Row, Grid } from "react-native-easy-grid";
import {KeyboardAvoidingView} from 'react-native';
import exampleImage1 from '../assets/rectangle1.png'
import exampleImage2 from '../assets/rectangle2.png'
import exampleImage3 from '../assets/unsplash1.png'
import exampleImage4 from '../assets/unsplash2.png'
import exampleImage5 from '../assets/unsplash3.png'
import exampleImageFrame from '../assets/frame.png'
import TextIcon from 'react-native-vector-icons/Ionicons';
import PictureIcon from 'react-native-vector-icons/FontAwesome';
import VideoIcon from 'react-native-vector-icons/AntDesign';
import exampleImageFrame1 from '../assets/frame1.png'
import BottomSheetPhoto from 'react-native-gesture-bottom-sheet';
import PuzzleModal from "../components/PuzzleModal";
import ImageModal from "../components/ImageModal";
import { mainTheme } from "../theme/theme";
import firestore from '@react-native-firebase/firestore';
import ViewShot from "react-native-view-shot";
//import {getHeaderHeight, getHeaderSafeAreaHeight,getOrientation} from '../HeaderSize'; 동작 안함
import Animated, { 
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  runOnJS,
  withTiming,
  Value
} from "react-native-reanimated";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import { __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED } from "react/cjs/react.production.min";

const { width, height } = Dimensions.get("window"); //안드로이드는 상태바를 포함하지 않고 영역 추출함
const screenHeight = Dimensions.get("screen").height;
//const noHeaderbarHeight = screenHeight - height;
const COL = 4;
const ROW = 6;
const circleSize = width - 36;
//const itemSize = width / 4; //네모칸의 가로 세로 크기
const radius = circleSize / 2 - (width / 4) / 2;
const center = radius;
//const pad = 6;
//const itemSizeC = width/COL; //박스 크기
const bottomHeight = screenHeight-itemSizeC*6
const pad = (width - (COL*(width/COL - 8)))/2;
const itemSizeC = width/COL - 8; //박스 크기
// let fall = new Animated.Value(1);

const PuzzleTitle = ({title, getTitle}) =>{
  const [puzzleTitle, setPuzzleTitle] = useState(title)
  const changeText = (e) => {
    setPuzzleTitle(e)
    getTitle(e)
  }
  return (
    <View style={{flexDirection:'row',alignItems:'center'}}>
      <TextInput
       style={{
         fontFamily: 'SB_Aggro_B',
         fontSize: 20,
         width: 20*10,
        }}
       //placeholder='Puzzle Name'
       placeholderTextColor={mainTheme.colors.black}
       value={puzzleTitle}
       onChangeText={(e) => {changeText(e)}}
       />
      <Image
          style={{height:17, width:18}}
          source={require('../assets/pencil.png')}/>
    </View>
  );
}
const initPositionFirst = (puzzle) => {
  switch(puzzle.carddata.length) {
    case 1:
      return ([[0, 0, 0, 0],[0, 0, 0, 0],[0, puzzle.carddata[0], 0, 0],[0, 0, 0, 0],[0, 0, 0, 0],[0, 0, 0, 0]])
    case 2:
      return ([[0, 0, 0, 0],[0, 0, 0, 0],[0, puzzle.carddata[0], 0, 0],[0, 0, puzzle.carddata[1], 0],[0, 0, 0, 0],[0, 0, 0, 0]]);
    case 3:
      return ([[0, 0, 0, 0],[0, 0, 0, 0],[0, puzzle.carddata[0], puzzle.carddata[1], 0],[0, puzzle.carddata[2], 0, 0],[0, 0, 0, 0],[0, 0, 0, 0]]);;
    case 4:
      return ([[0, 0, 0, 0],[0, 0, 0, 0],[0, puzzle.carddata[0], puzzle.carddata[1], 0],[0, puzzle.carddata[2], puzzle.carddata[3], 0],[0, 0, 0, 0],[0, 0, 0, 0]]);;;
    default:
      return null;
  }
}
const initPosition = (puzzle) => {
  blankMatrix= [[0, 0, 0, 0],[0, 0, 0, 0],[0, 0, 0, 0],[0, 0, 0, 0],[0, 0, 0, 0],[0, 0, 0, 0]]
  
  puzzle.carddata.map((item,idx)=>{
    blankMatrix[item.row][item.column] = item.data
  })
  console.log('x',blankMatrix)
  return blankMatrix
}

const App = ({ navigation, route }) => {
  const [movingDraggable, setMovingDraggable] = useState(null);
  const [releaseDraggable, setReleaseDraggable] = useState(null);
  const { puzzle, userUid } = route.params;
  const [init, setInit] = useState(false);
  //const [onOff, setOnOff] = useState(false)
  
  const [items, setItems] = useState([]);
  const uri1 = Image.resolveAssetSource(exampleImage1).uri;
  const uri2 = Image.resolveAssetSource(exampleImage2).uri;
  const uri3 = Image.resolveAssetSource(exampleImage3).uri;
  const uri4 = Image.resolveAssetSource(exampleImage4).uri;
  const uri5 = Image.resolveAssetSource(exampleImage5).uri;
  const [openModalText, setOpenModalText] = useState(false)
  const [openModalImage, setOpenModalImage] = useState(false)
  const [openPuzzleModal, setOpenPuzzleModal] = useState(false) //퍼즐 클릭 유무
  const recorder = useRef()
  const puzzleType = useRef() //퍼즐 타입
  const thumbnailImage = useRef()
  //이미지나 텍스트 모두 포함
  const clickedInfo = useRef({
    'row': -1,
    'column': -1,
    'text': '', //uri 나 Text가 들어감
    'image': '',
  })
  const MaxRows = 6;
  const MaxColumns = 4;
  //const blankMatrix = useRef([]);
  //const memoBottom = useRef('');  //아래에 입력하는 메모
  const memoBottomTextInput = useRef();
  //const titleTop = useRef('Puzzle name');
  const textModalRef = useRef();   //////////////////////텍스트모달 ref
  const bottomSheet = useRef();
  const sheetRef = useRef();
  const bottomSheetPhoto = useRef();
  const [bottomSheetMemoOpen, setBottomSheetMemoOpen] = useState(false);
  const clickedEmptyIndex = useRef([])
  //console.log('렌더링.onoff:')
  const [boxMatrix,setBoxMatrix] = useState([])
  const [title, setTitle] = useState(puzzle.title)   //제목 
  const [memoPuzzle, setMemoPuzzle] = useState() //메모
  const [testUri, setTestUri] = useState()
  const forSaveData = useRef({
    'title':puzzle.title,
    'memo':'',
    'boxMatix': []
  })
  //const hasUnsavedChanges = Boolean(memoPuzzle);
  let tmpMatrix = [];
  useEffect(()=>{
    puzzle.puzzleMemo === undefined
    ? setMemoPuzzle('')
    : setMemoPuzzle(puzzle.puzzleMemo)
    puzzle.offset === true 
    ? setBoxMatrix(initPositionFirst(puzzle))
    : setBoxMatrix(initPosition(puzzle))
    // console.log("출력", height, width)
    // console.log("",Dimensions.get("screen").height-itemSizeC*6)
    // console.log("",Dimensions.get("window").height-itemSizeC*6)
    // console.log("스크린",Dimensions.get("screen").height - Dimensions.get("window").height)
    setInit(true)
  },[])
  const getTitle = (text) => {
    //console.log('getTitle',text)
    text === '' || text === undefined
    ? forSaveData.current.title = 'Puzzle Name'
    : forSaveData.current.title = text
  }
  //헤더
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <PuzzleTitle title={puzzle.title} getTitle={getTitle}></PuzzleTitle>
      ),
      
    });
  }, [navigation]);
  const createDate = () => {
    var date = new Date();
    var year = date.getFullYear();
    var month = ('0' + (1 + date.getMonth())).slice(-2);
    var day = ('0' + date.getDate()).slice(-2);
    return year + '-' + month + '-' + day;
  };
  const updatePost = async (updateData) => {
    await firestore()
        .collection('userIdeaData')
        .doc(userUid)
        .collection('item')
        .doc(updateData.postId)
        .update(updateData)
        .then(()=>{
          console.log('User updated!');
        })
        .catch((error)=>{
          console.log('error',error)
        })
  }
  const closeIdeaDevelop = () => {
      //console.log('업데이트',puzzle)
      //업데이트 전 데이터 처리
      const updateData = {...puzzle}
      
      updateData.updateTime = firestore.FieldValue.serverTimestamp()
      updateData.updateDate = createDate()
      const tmplist = []
      const tmpBoxMatrix = forSaveData.current.boxMatix
      tmpBoxMatrix.map((row,i)=>{
        row.map((column,j)=>{
          column !== 0
          ? tmplist.push({'data':column,'row':i,'column':j})
          : null
        })
      })
      //tmplist.push({'data':thumbnailImage,'row':0,'column':0})
      updateData.carddata = tmplist
      updateData.offset = false
      
      //퍼즐 타이틀
      forSaveData.current.title !== undefined && forSaveData.current.title != ''
      ? updateData.title = forSaveData.current.title //타이틀
      : updateData.title = ''//'Puzzle Name'
      //console.log('xxxx',memoPuzzle)
      //퍼즐 메모
      forSaveData.current.memo !== undefined && forSaveData.current.memo !== ''
      ? updateData.puzzleMemo = forSaveData.current.memo
      : null
      //썸네일
      updateData.thumbnail = thumbnailImage.current
      updatePost(updateData)
  }
  useEffect(()=>{
    //console.log(boxMatrix)
    forSaveData.current.boxMatix = boxMatrix
    recorder.current
      .capture()
      .then(uri=>{
        console.log('do something with', uri)
        thumbnailImage.current = uri
      })
      .catch((error)=>{
        console.log(error)
      })
    
  },[boxMatrix])
  useEffect(()=>{
    forSaveData.current.memo = memoPuzzle
  },[memoPuzzle])
  //상단 백버튼 누르면 자동 저장되게
  useEffect(() => {
    navigation.addListener('beforeRemove', e => {
      // if (!hasUnsavedChanges) {
      //   // If we don't have unsaved changes, then we don't need to do anything
      //   return;
      // }
      //console.log("출력")
      closeIdeaDevelop()
      //e.preventDefault(); // Prevent default action
      // Unsubscribe the event on first call to prevent infinite loop
      //navigation.navigate('Home') // Navigate to your desired screen
      //navigation.navigate.goBack()
      // navigation.navigate.goBack()
      //업데이트 전 데이터 처리
    });
 }, [navigation])
  // const animatedShadowOpacity = Animated.interpolate(fall,{
  //   inputRange:[0,1],
  //   outputRange:[0.5, 0],
  // });

  const takeImagefromphone = () => {
    const options = {
      title: "Select Avatar",
      storageOptions: {
        skipBackup: true,
        path: "images",
      },
      // includeBase64: true,
      // maxHeight: itemSizeC,
      // maxWidth: itemSizeC
    };
    launchImageLibrary(options, (response) => {
      // console.log('Response = ', response);
      if (response.didCancel) {
        // setProcessing(false)
        console.log("User cancelled image picker");
      } else if (response.error) {
        // setProcessing(false)
        console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        // setProcessing(false)
        console.log("User tapped custom button: ", response.customButton);
      // } else if (response.fileSize > 5242880) {
      //   Alert.alert(
      //       "Nilamhut Say\'s",
      //       "Oops! the photos are too big. Max photo size is 4MB per photo. Please reduce the resolution or file size and retry",
      //       [
      //           { text: "OK", onPress: () => console.log('ok Pressed') }
      //       ],
      //       { cancelable: false }
      //   )
      // }
      } 
      // else {
      //   const tmp = response.assets[0];
      //   setBoxMatrix(boxMatrix.map((row, i)=>
      //       row.map((column, j)=>
      //         i === clickedEmptyIndex.current[0] && j === clickedEmptyIndex.current[1]
      //         ? tmp.base64
      //         : column
      //       )
      //   ))
      //   //console.log('base64',response.assets[0])
      //   //this.setState({tradeLicenseImageData: response.base64}) //access like this
      // }
        else {
        //console.log('Response = ', response.data);
        const tmp = response.assets[0];
        const source = {
          uri:
            Platform.OS === "android"
              ? tmp.uri
              : tmp.uri.replace("file://", ""),
          fileName: response.fileName,
        };
        setBoxMatrix(boxMatrix.map((row, i)=>
            row.map((column, j)=>
              i === clickedEmptyIndex.current[0] && j === clickedEmptyIndex.current[1]
              ? source.uri
              : column
            )
        ))
      }
    });
  };
  const takeVideofromphone = () =>
    launchImageLibrary(optionsVideo, response => {
      // console.log('Response = ', response);
      if (response.didCancel) {
        // setProcessing(false)
        console.log('User cancelled video picker');
      } else if (response.error) {
        // setProcessing(false)
        console.log('VideoPicker Error: ', response.error);
      } else if (response.customButton) {
        // setProcessing(false)
        console.log('User tapped custom button: ', response.customButton);
      } else {
        console.log('Response = ', response.assets[0].uri);
        const tmp = response.assets[0];
        // const source = {
        //   uri:
        //     Platform.OS === 'android' ? tmp.uri : tmp.uri.replace('file://', ''),
        //   fileName: response.fileName,
        // };
        // var arr = [...items];
        // console.log('source.uri', source.uri);
        // arr.push(source.uri);
        // setItems(arr); ////xxxxx
      }
    });
  const pressEmpty = (row, col) => {
    clickedEmptyIndex.current = [row,col]
    bottomSheetPhoto.current.show()
  }
  //#FFF4D9 노란색 #E7D9FF 보라색 매인컬러 #D9E3FF 파란색 #FFD9D9 분홍색
  const Square = ({row, col}) => {
    const backgroundColor = '#fdf8ff';
    return (
      <TouchableOpacity
        style={{
          flex: 1,
          backgroundColor,//padding: 4,
          //backgroundColor: 'blue',
          justifyContent: "space-between",
          borderColor : "#D8D8D8", //색깔 확인
          borderWidth : 0.5,
          height: itemSizeC,
          width: itemSizeC,
        }}
        //activeOpacity={0.8}
        // onPress={()=>{bottomSheetPhoto.current.show()}}
        onPress={()=>{pressEmpty(row, col)}}
        >
       <Image source={{uri:Image.resolveAssetSource(exampleImageFrame).uri}} style={styles.img}></Image>
      </TouchableOpacity>
    );
  };
  
  const Row = ({ white, row }) => {
    const offset = white ? 0 : 1;
    return (
      <View style={{
        flex: 1,
        flexDirection: "row",
        }}>
        {new Array(4).fill(0).map((_, i) => (
          <Square row={row} col={i} key={i} white={(i + offset) % 2 === 1}/>
        ))}
      </View>
    );
  };
  const Background = () => {
    return (
      <View style={{ flex:1}}>
        {new Array(6).fill(0).map((_, i) => (
          <Row key={i} white={i % 2 === 0} row={i}/>
        ))}
      </View>
    );
  };
  const bottomSheetMemoOpenRef = useRef(null)
  const Photo = ({uri,text,position,row,column})=>{
    const isGestureActive = useSharedValue(false);
    const offsetX = useSharedValue(0);
    const offsetY = useSharedValue(0);
    const translateX = useSharedValue(position.x);
    const translateY = useSharedValue(position.y);
    const movePiece = useCallback(
      (to,from) => {
        if (to.x >= 0 && to.x < 4 && to.y >= 0 && to.y < 6){
          //withTiming 부드럽게 움직이게함
          translateX.value = withTiming( 
            to.x*itemSizeC, {}, () => (offsetX.value = translateX.value)
          );
          translateY.value = withTiming(
            to.y*itemSizeC,{},
              () => {
            offsetY.value = translateY.value;
            isGestureActive.value = false; //zIndex 조절
          });
          // var temp = blankMatrix.current[from.y][from.x]
          // blankMatrix.current[from.y][from.x] = blankMatrix.current[to.y][to.x]
          // blankMatrix.current[to.y][to.x] = temp
          // var temp = blankMatrix.current[from.y][from.x]
          // blankMatrix.current[from.y][from.x] = blankMatrix.current[to.y][to.x]
          // blankMatrix.current[to.y][to.x] = temp
          var fromBoxContent = boxMatrix[from.y][from.x]
          var toBoxContent = boxMatrix[to.y][to.x]
          //console.log('fromBoxContent',fromBoxContent)
          //console.log('toBoxContent',toBoxContent)
          setBoxMatrix(boxMatrix.map((row, i)=>
            row.map((column, j)=>
              i === from.y && j === from.x
              ? toBoxContent
              : i === to.y && j === to.x
                ? fromBoxContent
                : column
            )
          ))
          //console.log("boxMatrix",boxMatrix)
        } else{
          translateX.value = withTiming(
            offsetX.value,{},()=>(offsetX.value = offsetX.value)
          )
          translateY.value = withTiming(
            offsetY.value,{},()=>(offsetY.value = offsetY.value)
          )
        }
      },
      [isGestureActive, offsetX, offsetY, translateX, translateY]
    );
    const onGestureEvent = useAnimatedGestureHandler({
      onStart: () => {
        isGestureActive.value = true
        offsetX.value = translateX.value;
        offsetY.value = translateY.value;
      },
      onActive: ({translationX, translationY}) =>{
        translateX.value = translationX + offsetX.value;
        translateY.value = translationY + offsetY.value;
      },
      onEnd: () => {
        //translateX = 박스의 열
        //translateY = 박스의 행
        runOnJS(movePiece)(
         {x:Math.round(translateX.value/itemSizeC),y:Math.round(translateY.value/itemSizeC)},
         {x:Math.round(offsetX.value/itemSizeC),y:Math.round(offsetY.value/itemSizeC)}
        );
      },
    });
    const imageStyle = useAnimatedStyle(()=>({
      position : "absolute",
      zIndex: isGestureActive.value ? 100 : 0,
      width: itemSizeC,
      height: itemSizeC,
      transform:[
        {translateX: translateX.value},
        {translateY: translateY.value}
      ]
    }))
    const textStyle = useAnimatedStyle(()=>({
      position : "absolute",
      justifyContents: 'center',
      alignContent : 'center',
      alignItems: 'center',
      backgroundColor : '#D9E3FF',
      zIndex: isGestureActive.value ? 100 : 0,
      width: itemSizeC,
      height: itemSizeC,
      borderRadius : 40,
      transform:[
        {translateX: translateX.value},
        {translateY: translateY.value}
      ]
    }))
    // const pressPhoto = (uri,row,column) => {
    //   //
    //   clickedInfo.current.source = uri
    //   clickedInfo.current.row = row
    //   clickedInfo.current.column = column
    //   setOpenModalImage(true)
    //   console.log('PressPhoto')
    // };
    // const pressText = (text,row,column) => {
    //   clickedInfo.current.source = text
    //   clickedInfo.current.row = row
    //   clickedInfo.current.column = column
    //   setOpenModalText(true)
    //   //console.log('PressText',itemSizeC/24,Math.round(itemSizeC/24))
    // }
    //퍼즐 클릭
    const pressPuzzle = (source, row, column, type) => {
      type === 'text'
      ? clickedInfo.current.text = source
      : clickedInfo.current.image = source
      clickedInfo.current.row = row
      clickedInfo.current.column = column
      puzzleType.current = type
      //console.log(clickedInfo.current)
      setOpenPuzzleModal(true)
    }
    return(
      <>
      <PanGestureHandler onGestureEvent={onGestureEvent}>
        {uri.match(/.(jpeg|jpg|gif|png)/)
        ? (<Animated.View style={imageStyle}>
           <TouchableOpacity activeOpacity={0.8} onPress={()=>{pressPuzzle(uri,row,column,'image')}}>
             {/* {console.log("xxxxxxxxxxxxxxxxxxx",uri)} */}
            <Image
              source={{uri:uri}}
              style={{
                width: itemSizeC,  
                height: itemSizeC,
                borderWidth: 1,
                //resizeMode: 'contain'
              }}
              />
            </TouchableOpacity>  
            </Animated.View>)
        : (<Animated.View style={textStyle}>
          <TouchableOpacity onPress={()=>{pressPuzzle(text,row,column,'text')}}>
            <Text
              //numberOfLines={Math.round(itemSizeC/24)}
              numberOfLines={Math.round(itemSizeC/24)-2}
              ellipsizeMode="tail"
              style={{
                width: itemSizeC,  
                height: itemSizeC,
                textAlign:'center',
                textAlignVertical:'center',
                fontSize:24,
                borderRadius: 40,
                borderWidth: 1,
                alignContent : 'center',
                //height:itemSizeC,
                backgroundColor:'#D9E3FF'
                //fontFamily:'SB_Aggro_L',
              }}>
              {text.split(' ')[0]}
            </Text>
            </TouchableOpacity> 
          </Animated.View>)}
      </PanGestureHandler>
      </>
    )
  }
  const renderContent = () => (
    <View style={[styles.bottomSheetStyle,styles.shadow]}> 
      <KeyboardAvoidingView behavior="padding">
        <View style={{alignItems:'center'}}>
          <ScrollView style={styles.grabber}/>
        </View>
        <TextInput
          placeholder="퍼즐에 대한 설명을 적어보세요."
          multiline={true}
          maxLength={150}
          ref={memoBottomTextInput}
          returnKeyType='done'
          style={{
            fontSize:18,
            fontFamily:'SB_Aggro_L',
            height: 18*10,    //TextInput 높이
            textAlignVertical: 'top',
            backgroundColor:'#FDF8FF',
          }}
          editable = {bottomSheetMemoOpen ? true : false}
          //disableFullscreenUI = {true}
          //editable={bottomSheetMemoOpen ? true : false}
          value={memoPuzzle}
          onChangeText={(e) => {setMemoPuzzle(e)}} //메모 상태 업뎃 //placeholder와 연동
          >
        </TextInput>
      </KeyboardAvoidingView>
    </View>
  );
  const pressBottomImage = () => {
    bottomSheetPhoto.current.close()
    takeImagefromphone()
  }
  const [clicktextModal, isClickTextModal] = useState(false);
  //바텀 시트에서 텍스트 선택
  const textModal = () => {
    isClickTextModal(!clicktextModal);
    clickedInfo.current.row = clickedEmptyIndex.current[0]
    clickedInfo.current.column = clickedEmptyIndex.current[1]
    clickedInfo.current.text = ''
    clickedInfo.current.image = ''

    bottomSheetPhoto.current.close();
    puzzleType.current = 'text'  //type 변경
    setOpenPuzzleModal(true) //모달 열기
  };
  // const updateBox= (row,column,source) => {
  //   setBoxMatrix(
  //     boxMatrix.map((rowT, i)=>
  //       i === row
  //       ? rowT.map((columnT, j)=>
  //           j === column
  //           ? source
  //           : columnT
  //         )
  //       : rowT
  //       )
  //   )
  //   //ref 초기화
  //   clickedInfo.current.source = ''
  //   clickedInfo.current.row = -1
  //   clickedInfo.current.column = -1
  // }
  // const deleteBox = (row,column) => {
  //   setBoxMatrix(
  //     boxMatrix.map((rowT, i)=>
  //       i === row
  //       ? rowT.map((columnT, j)=>
  //           j === column
  //           ? 0
  //           : columnT
  //         )
  //       : rowT
  //       )
  //   )
  //   //ref 초기화
  //   clickedInfo.current.source = ''
  //   clickedInfo.current.row = -1
  //   clickedInfo.current.column = -1
  // }
  // const closeTextModal = (row,column,updateText)=>{
  //   //console.log('updateText',updateText)
  //   updateText === ''
  //   ? deleteBox(row,column)
  //   : updateBox(row,column,updateText)
  //   setOpenModalText(false)
  //   //console.log('closeTextModal',updateText)
  // }
  //퍼즐 모달 닫기(완료)
  const closePuzzleModal = (row, column, source, type) => {
    console.log(source)
    //수정된 값 저장
    type === 'text'
    ? source === ''
      ? deletePuzzle(row, column)
      : updatePuzzle(row, column, source)
    : type === 'image'
      ? updatePuzzle(row, column, source)
      : null
    //모달 닫기
    setOpenPuzzleModal(false)
    //ref 초기화
    clickedInfo.current.text = ''
    clickedInfo.current.image = ''
    clickedInfo.current.row = -1
    clickedInfo.current.column = -1
  }
  //퍼즐 삭제
  const deletePuzzle = (row,column) => {
    //1. 메인이 되는 배열 값 수정
    setBoxMatrix(
      boxMatrix.map((rowT, i)=>
        i === row
        ? rowT.map((columnT, j)=>
            j === column
            ? 0
            : columnT
          )
        : rowT
        )
    )
    //화면에 띄운 모달 닫기
    setOpenPuzzleModal(false)
    //ref 초기화
    clickedInfo.current.text = ''
    clickedInfo.current.image = ''
    clickedInfo.current.row = -1
    clickedInfo.current.column = -1
  }
  //퍼즐 업데이트
  const updatePuzzle= (row,column,source) => {
    setBoxMatrix(
      boxMatrix.map((rowT, i)=>
        i === row
        ? rowT.map((columnT, j)=>
            j === column
            ? source
            : columnT
          )
        : rowT
        )
    )
    //ref 초기화
    clickedInfo.current.text = ''
    clickedInfo.current.image = ''
    clickedInfo.current.row = -1
    clickedInfo.current.column = -1
  }
  // const deleteTextModal = (row,column) =>{
  //   deleteBox(row,column)
  //   setOpenModalText(false)
  // }
  // const closeImageModal = ()=>{
  //   //ref 초기화
  //   clickedInfo.current.source = ''
  //   clickedInfo.current.row = -1
  //   clickedInfo.current.column = -1
  //   setOpenModalImage(false)
  // }
  // const deleteImageModal = (row,column) =>{
  //   console.log('deleteImageModal')
  //   deleteBox(row,column)
  //   setOpenModalImage(false)
  // }
  let fall = new Animated.Value(1)
  const animatedShadowOpacity = Animated.interpolateNode(fall, {
    inputRange: [0,1],
    outputRange: [0.5, 0]
    //#fdf8ff
  })
  return (
      <SafeAreaView style={styles.safeAreaView}>
        <View style={{margin:pad}}>
          <ViewShot ref={recorder} options={{format: 'jpg', quality:0.9}}>    
          <View style={{backgroundColor:'#fdf8ff',width:width-pad*2, height:itemSizeC*6}}>
            <Background/>
          {init
           ? (boxMatrix.map((row, i)=>
            row.map((square, j)=>{
              //console.log(square.value)
              if(square === 0){
                return null;
              }else {
                return(
                  // console.log('여기여기',square)  
                  <Photo
                    key={`${j}-${i}`}
                    row={i}
                    column={j}
                    position={{x:j*itemSizeC, y: i*itemSizeC}}
                    uri={square}
                    text={square}
                  />
                )
              }
            })))
            : null
          }
          </View>
        </ViewShot>  
      </View>
      
      {/* <View style={{flexDirection:'row'}}>
      <TouchableOpacity
        onPress={()=>{
          recorder.current.capture().then(uri=>{
              console.log('do something with', uri)
              setTestUri(uri)
            }).catch((error)=>{console.log(error)})}}>
            <Text>캡처</Text>
          </TouchableOpacity>
      <Image
        style={{
          width:200,
          height:200,
        }}
        source={{uri:testUri}}>
      </Image>
      </View> */}
      <View
        style={{
          backgroundColor:'#fdf8ff',//'#fdf8ff',
          height:itemSizeC*3//itemSizeC*8//itemSizeC*3
        }}/>  
      <BottomSheet
        ref={sheetRef}
        callbackNode={fall}
        snapPoints={[itemSizeC*9+pad*2, itemSizeC*3]} //메모 바텀 시트 snap Point
        initialSnap={1}
        borderRadius={40}
        renderHeader={renderContent}
        enabledBottomClamp={true} //아래로 spring 안되도록
        onOpenEnd={()=>{setBottomSheetMemoOpen(true)}}
        //onOpenEnd={memoBottomTextInput.current.style.backgroundColor('green')}
        //memoBottomTextInput
        //onCloseStart={()=>{setBottomSheetMemoOpen(false)}}
        onCloseEnd={()=>{setBottomSheetMemoOpen(false)}}  //OpenEnd + close start 는 한번 열었다가 닫히면 다시 TextInputEdit이 가능해짐..
        //onCloseEnd={memoBottomTextInput.current.editable=false} 
        //callbackNode={(tmp)=>{tmp===0 ? setBottomSheetMemoOpen(true) : setBottomSheetMemoOpen(false)}}
        //enabledInnerScrolling={true}
      />
      {/* <Animated.View
        //메모 바텀 시트 배경 흐리게
        pointerEvents="none"
        style={[
          { ...StyleSheet.absoluteFillObject,
            backgroundColor:'#000',
            opacity:animatedShadowOpacity,}
        ]}
      /> */}
      {/* <BottomSheet
        initialPosition={height-itemSizeC*6}
        snapPoints={[height-itemSizeC/2, height-itemSizeC*6]}
        bottomSheerColor="blue"
        isBackDrop={true}
        isBackDropDismissByPress={true}
        //isBackDropDismissByPress={false}
        backDropColor="#fdf8ff" //"green"
        tipHeaderRadius={10}
        borderRadius={10}
        bounce={1}
        //overDrag={false}
        //isModal={true}
        isRoundBorderWithTipHeader={true}
        body={renderContent()}/> */}
      <BottomSheetPhoto radius={1} ref={bottomSheetPhoto} height={200}>
              <TouchableOpacity onPress={textModal} style={styles.bottomModal}>
                <TextIcon name="text" size={24} style={{marginRight: 7}} />
                <Text style={{fontFamily: 'SB_Aggro_L'}}>텍스트 입력하기</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={pressBottomImage}
                style={styles.bottomModal}>
                <PictureIcon
                  name="picture-o"
                  size={24}
                  style={{marginRight: 7}}
                />
                <Text style={{fontFamily: 'SB_Aggro_L'}}>사진 가져오기</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={()=>{takeVideofromphone}}
                style={styles.bottomModal}>
                <VideoIcon
                  name="videocamera"
                  size={24}
                  style={{marginRight: 7}}
                />
                <Text style={{fontFamily: 'SB_Aggro_L'}}>영상 가져오기</Text>
              </TouchableOpacity>
      </BottomSheetPhoto>
      {openPuzzleModal
      ? <PuzzleModal
          closePuzzleModal={closePuzzleModal}
          deletePuzzle={deletePuzzle}
          textSource={clickedInfo.current.text}
          imageSource={clickedInfo.current.image}
          row={clickedInfo.current.row}
          column={clickedInfo.current.column}
          puzzleType={puzzleType.current}/>
      : null}
      {/* {openModalText
      ? <TextModal
          closeTextModal={closeTextModal}
          deleteTextModal={deleteTextModal}
          transformTextModal={transformTextModal}
          source={clickedInfo.current.source}
          row={clickedInfo.current.row}
          column={clickedInfo.current.column}
          type={true}/>
      : null }
      {openModalImage
      ? <ImageModal
          closeImageModal={closeImageModal}
          deleteImageModal={deleteImageModal}
          transformImageModal={transformImageModal}
          source={clickedInfo.current.source}
          row={clickedInfo.current.row}
          column={clickedInfo.current.column}
          type={false}/>
      : null } */}
      
        {
          //height:itemSizeC,//bottomHeight, //screenHeight,//-itemSizeC*6,
        }
    </SafeAreaView>
  );

};

export default App;

const styles = StyleSheet.create({
  bottomSheetStyle:{
    backgroundColor: '#FDF8FF',
    padding: 10,
    height: height, //itemSizeC*8+itemSizeC/2-itemSizeC*3+150,  //바텀 시트 내용물 높이
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    elevation: 100,
  },
  grabber:{
    width:70,
    borderTopWidth: 2,
    borderTopColor:"#aaa",
    margin: 5,
  },
  containerX: {
    flex: 1,
    flexDirection: "row",
    //height: 20
    //height: itemSizeC,
    backgroundColor : "#fdf8ff"
  },
  imgX: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: "cover",
  },
  bottomModal: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
  // shadow: {
  //   shadowColor: "#000",
  //   shadowOffset: {
  //     width: 0,
  //     height: 6,
  //   },
  //   shadowOpacity: 0.1,
  //   shadowRadius: 10,
  //   elevation: 30,
  // },
  shadow: {
    backgroundColor: '#FDF8FF',
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: {
          width: 10,
          height: 10,
        },
        shadowOpacity: 0.5,
        shadowRadius: 10,
      },
      android: {
        elevation: 100,
      },
    }),
  },
  safeAreaView: {
    // flex: 1,
    backgroundColor: '#fdf8ff'//'#fdf8ff'//"#20232A",
  },
  viewContainer: {
    flex: 1,
    width,
    backgroundColor: "#fdf8ff"//"#20232A",
  },
  bottom:{
    width: "100%",
    height: "10%",   //하단 공간
    alignItems: "center",
    backgroundColor: "green"
  },
  addBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#ff4c6f",
    alignItems: "center",
    justifyContent: "center",
  },
  img: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: "cover",
  },
});
