import React, { useState, useEffect, useRef, useCallback, useLayoutEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TextInput,
  Image,
} from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";
import { launchImageLibrary } from "react-native-image-picker";
import BottomSheet, {BottomSheetBackdrop} from '@gorhom/bottom-sheet';
import exampleImageFrame from '../assets/frame.png'
import TextIcon from 'react-native-vector-icons/Ionicons';
import PictureIcon from 'react-native-vector-icons/FontAwesome';
import BottomSheetPhoto from 'react-native-gesture-bottom-sheet';
import PuzzleModal from "../components/PuzzleModal";
import { mainTheme } from "../theme/theme";
import firestore from '@react-native-firebase/firestore';
import Back from 'react-native-vector-icons/MaterialIcons';
import ViewShot from "react-native-view-shot";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AndroidKeyboardAdjust from 'react-native-android-keyboard-adjust';  //adjustResize, adjustPan 조절하는거
import { BottomSheetShadow } from "../components/N";
import Animated, { 
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  runOnJS,
  withTiming,
} from "react-native-reanimated";

//import { __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED } from "react/cjs/react.production.min";

const { width, height } = Dimensions.get("window"); //상태바 포함하지 않음
const COL = 4;
const ROW = 6;
const itemSizeC = width/COL - 8; //퍼즐 크기
const pad = (width - (COL*(width/COL - 8)))/2; //배경 격자 padding
const snapPoints = [height-60-(itemSizeC*6+pad*2),height-60-itemSizeC-pad] //바텀 시트 snapPoints

const PuzzleTitle = ({title, getTitle}) =>{

  const [puzzleTitle, setPuzzleTitle] = useState(title)
  const changeText = (e) => {
    setPuzzleTitle(e)
    getTitle(e)
  }
  
  return (
    <View style={{flexDirection:'row',alignItems:'center'}}>
      {/* <Text
        style={{
         fontFamily: 'SB_Aggro_M',
         fontSize: 20,
         width: 20*10,
        }}>{puzzleTitle}</Text> */}
      <TextInput
       style={{
         fontFamily: 'SB_Aggro_B',
         fontSize: 20,
         width: 20*10,
        }}
       placeholderTextColor={mainTheme.colors.gray}
       defaultValue={puzzleTitle}
       onChangeText={(e) => {changeText(e)}}
       //placeholder='이름을 입력해주세요'
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
  blankMatrix = new Array(6)
  for (let i = 0; i < 6; i++){
    blankMatrix[i] = new Array(4).fill(0)
  }
  puzzle.carddata.map((item,idx)=>{
    blankMatrix[item.row][item.column] = item.data
  })
  return blankMatrix
}
const App = ({ navigation, route }) => {
  const { puzzle, userUid } = route.params;
  const [init, setInit] = useState(false);
  const [bottomSheetMemoOpen, setBottomSheetMemoOpen] = useState(false);  
  const [openPuzzleModal, setOpenPuzzleModal] = useState(false) //퍼즐 클릭 유무
  const [boxMatrix,setBoxMatrix] = useState([])
  // const [title, setTitle] = useState(puzzle.title)   //제목 
  const [memoPuzzle, setMemoPuzzle] = useState() //메모
  const recorder = useRef()
  const puzzleType = useRef() //퍼즐 타입
  const thumbnailImage = useRef()
  const bottomSheetRef = useRef()
  //이미지나 텍스트 모두 포함
  const clickedInfo = useRef({
    'row': -1,
    'column': -1,
    'text': '', //uri 나 Text가 들어감
    'image': '',
  })
  //const memoBottomTextInput = useRef();
  const sheetRef = useRef();
  const bottomSheetPhoto = useRef();
  const clickedEmptyIndex = useRef([])
  const forSaveData = useRef({
    'title':puzzle.title,
    'memo':'',
    'boxMatix': []
  })
  AndroidKeyboardAdjust.setAdjustPan();
  const MaxRows = 6;
  const MaxColumns = 4;
  useEffect(()=>{
    puzzle.puzzleMemo === undefined
    ? setMemoPuzzle('')
    : setMemoPuzzle(puzzle.puzzleMemo)
    puzzle.offset === true 
    ? setBoxMatrix(initPositionFirst(puzzle))
    : setBoxMatrix(initPosition(puzzle))
    setInit(true)
  },[])
  const getTitle = (text) => {
    text === '' || text === undefined
    ? forSaveData.current.title = 'Puzzle Name'
    : forSaveData.current.title = text
  }
  //헤더
  // useLayoutEffect(() => {
  //   navigation.setOptions({
  //     headerTitle: () => (
  //       <PuzzleTitle title={puzzle.title} getTitle={getTitle}></PuzzleTitle>
  //     ),
  //   });
  // }, [navigation]);
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
      //업데이트 전 데이터 처리
      const updateData = {...puzzle}
      //업데이트 시간, 날짜
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
      updateData.carddata = tmplist
      updateData.offset = false
      //퍼즐 타이틀
      forSaveData.current.title !== undefined && forSaveData.current.title != ''
      ? updateData.title = forSaveData.current.title //타이틀
      : updateData.title = ''//'Puzzle Name'
      //퍼즐 메모
      forSaveData.current.memo !== undefined && forSaveData.current.memo !== ''
      ? updateData.puzzleMemo = forSaveData.current.memo
      : null
      //썸네일
      updateData.thumbnail = thumbnailImage.current
      const tmp = updateData.createDate.split('.')
      //생성 날짜 xx.xx.xx -> xxxx-xx-xx으로 수정
      updateData.createDate = "20"+tmp[0]+"-"+tmp[1]+"-"+tmp[2]
      updatePost(updateData)
  }
  useEffect(()=>{
    forSaveData.current.boxMatix = boxMatrix
    recorder.current
      .capture()
      .then(uri=>{
        //console.log('do something with', uri)
        thumbnailImage.current = uri
      })
      .catch((error)=>{
        console.log(error)
      })
  },[boxMatrix])
  useEffect(()=>{
    forSaveData.current.memo = memoPuzzle
  },[memoPuzzle])
  //상단 뒤로가기 누르면 자동 저장되게
  useEffect(() => {
    navigation.addListener('beforeRemove', e => {
      closeIdeaDevelop()
      //navigation.navigate.goBack()
      //업데이트 전 데이터 처리
    });
 }, [navigation])
  const takeImagefromphone = () => {
    const options = {
      title: "Select Avatar",
      storageOptions: {
        skipBackup: true,
        path: "images",
      },
      // includeBase64: true, maxHeight: itemSizeC, maxWidth: itemSizeC
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
          justifyContent: "space-between",
          borderColor : "#D8D8D8", //색깔 확인
          borderWidth : 0.5,
          height: itemSizeC,
          width: itemSizeC,
        }}
        // onPress={()=>{bottomSheetPhoto.current.show()}}
        onPress={()=>{pressEmpty(row, col)}}>
       <Image source={{uri:Image.resolveAssetSource(exampleImageFrame).uri}} style={styles.img}></Image>
      </TouchableOpacity>
    );
  };
  const Row = ({ white, row }) => {
    const offset = white ? 0 : 1;
    return (
      <View style={{flex: 1,flexDirection: "row",}}>
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
          var fromBoxContent = boxMatrix[from.y][from.x]
          var toBoxContent = boxMatrix[to.y][to.x]
          setBoxMatrix(boxMatrix.map((row, i)=>
            row.map((column, j)=>
              i === from.y && j === from.x
              ? toBoxContent
              : i === to.y && j === to.x
                ? fromBoxContent
                : column
            )
          ))
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
      backgroundColor : mainTheme.puzzleColors.yellow, 
      zIndex: isGestureActive.value ? 100 : 0,
      width: itemSizeC,
      height: itemSizeC,
      borderRadius : 40,
      transform:[
        {translateX: translateX.value},
        {translateY: translateY.value}
      ]
    }))
    //퍼즐 클릭
    const pressPuzzle = (source, row, column, type) => {
      type === 'text'
      ? clickedInfo.current.text = source
      : clickedInfo.current.image = source
      clickedInfo.current.row = row
      clickedInfo.current.column = column
      puzzleType.current = type
      setOpenPuzzleModal(true)
    }
    return(
      <>
      <PanGestureHandler onGestureEvent={onGestureEvent}>
        {uri.match(/.(jpeg|jpg|gif|png)/)
        ? (<Animated.View style={imageStyle}>
           <TouchableOpacity activeOpacity={0.8} onPress={()=>{pressPuzzle(uri,row,column,'image')}}>
            <Image
              source={{uri:uri}}
              style={{
                width: itemSizeC,  
                height: itemSizeC,
                borderWidth: 1,
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
                backgroundColor: mainTheme.puzzleColors.yellow
              }}>
              {text.split(' ')[0]}
            </Text>
            </TouchableOpacity> 
          </Animated.View>)}
      </PanGestureHandler>
      </>
    )
  }
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
  //퍼즐 모달 닫기(완료)
  const closePuzzleModal = (row, column, source, type) => {
    //console.log(source)
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
  //바텀시트 editable 조절
  const onChangeBottom = (index) => {
    index == 0 ? setBottomSheetMemoOpen(false) : setBottomSheetMemoOpen(true)
  }
  const renderBackdrop = useCallback(
    props => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={0}
        appearsOnIndex={1}
        pressBehavior={0}/>
    ),
    []
  );
  return (
    <KeyboardAwareScrollView contentContainerStyle={{flex:1,margin:0,padding:0}}>
      <View style={styles.safeAreaView}>
        <View style={{marginTop:0,height:60,flexDirection:'row',alignItems:'center',borderBottomWidth:2,borderBottomColor:'black'}}>
          <TouchableOpacity style={{marginStart:20,marginEnd:5}} activeOpacity={0.5} onPress={()=>{navigation.goBack()}}>
            <Back name="arrow-back-ios" color="#000" size={24}/>
          </TouchableOpacity>
          <PuzzleTitle title={puzzle.title} getTitle={getTitle}></PuzzleTitle>
        </View>
        <View style={{margin:pad}}>
          <ViewShot ref={recorder} options={{format: 'jpg', quality:0.9}}>    
            <View style={{backgroundColor:'#fdf8ff',width:width-pad*2, height:itemSizeC*6}}>
              <Background/>
              {init
              && (boxMatrix.map((row, i)=>
                row.map((square, j)=>{
                  if(square === 0){
                    return null;
                  }else {
                    return(
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
                })))}
            </View>
          </ViewShot>  
        </View>
        <BottomSheet
          ref={bottomSheetRef}
          index={0}
          snapPoints={snapPoints}
          onChange={onChangeBottom}
          backdropComponent={renderBackdrop}
          handleComponent={BottomSheetShadow}
          backgroundStyle={{backgroundColor:mainTheme.colors.background}}>
          <TextInput
            placeholder="퍼즐에 대한 설명을 적어보세요."
            multiline={true}
            maxLength={150}
            //ref={memoBottomTextInput}
            returnKeyType='done'
            style={{
              fontSize:18,
              fontFamily:'SB_Aggro_L',
              height: 18*10,    //TextInput 높이
              textAlignVertical: 'top',
              marginHorizontal:7
            }}
            editable = {bottomSheetMemoOpen ? true : false}
            onChangeText={(e) => {setMemoPuzzle(e)}} //메모 상태 업뎃 //placeholder와 연동
            value={memoPuzzle}/>
        </BottomSheet> 
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
              style={{marginRight: 7}}/>
            <Text style={{fontFamily: 'SB_Aggro_L'}}>사진 가져오기</Text>
          </TouchableOpacity>
        </BottomSheetPhoto>
        {openPuzzleModal &&
        // <KeyboardAvoidingView
        //   behavior={Platform.OS === "ios" ? "padding" : "height"}
        //   style={{flex:1}}>
          <PuzzleModal
            closePuzzleModal={closePuzzleModal}
            deletePuzzle={deletePuzzle}
            textSource={clickedInfo.current.text}
            imageSource={clickedInfo.current.image}
            row={clickedInfo.current.row}
            column={clickedInfo.current.column}
            puzzleType={puzzleType.current}/>
        }
        
    </View>
  </KeyboardAwareScrollView>
  );
};

export default App;

const styles = StyleSheet.create({
  bottomModal: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
  safeAreaView: {
    flex: 1,
    // position:'absolute', height:height, width,
    backgroundColor: '#fdf8ff'
  },
  img: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: "cover",
  },
});

