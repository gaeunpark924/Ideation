import React, { useState, useEffect, useRef, useCallback } from "react";
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
import { PanGestureHandler, Swipeable } from "react-native-gesture-handler";
import { launchImageLibrary } from "react-native-image-picker";
import BottomSheet from 'reanimated-bottom-sheet';
import ActionBottomSheet from "../components/ActionBottomSheet";
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
//import {getHeaderHeight, getHeaderSafeAreaHeight,getOrientation} from '../HeaderSize'; 동작 안함
import Animated, { 
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  runOnJS,
  withTiming,
  Value
} from "react-native-reanimated";

const { width, height } = Dimensions.get("window"); //안드로이드는 상태바를 포함하지 않고 영역 추출함
const screenHeight = Dimensions.get("screen").height;
//const noHeaderbarHeight = screenHeight - height;
const COL = 4;
const ROW = 6;
const circleSize = width - 36;
//const itemSize = width / 4; //네모칸의 가로 세로 크기
const radius = circleSize / 2 - (width / 4) / 2;
const center = radius;
const pad = 0;
const itemSizeC = width/COL; //박스 크기
const bottomHeight = screenHeight-itemSizeC*6
// const pad = (width - (COL*(width/COL - 6)))/2;
// const itemSizeC = width/COL - 6; //박스 크기

const App = ({ navigation, route }) => {
  const [movingDraggable, setMovingDraggable] = useState(null);
  const [releaseDraggable, setReleaseDraggable] = useState(null);
  const [init, setInit] = useState(false);
  //const [onOff, setOnOff] = useState(false)
  
  const [items, setItems] = useState([]);
  const uri1 = Image.resolveAssetSource(exampleImage1).uri;
  const uri2 = Image.resolveAssetSource(exampleImage2).uri;
  const uri3 = Image.resolveAssetSource(exampleImage3).uri;
  const uri4 = Image.resolveAssetSource(exampleImage4).uri;
  const uri5 = Image.resolveAssetSource(exampleImage5).uri;
  const MaxRows = 6;
  const MaxColumns = 4;

  const blankMatrix = useRef([]);
  const [memo,setMemo] = useState('');
  const bottomSheet = useRef();
  const sheetRef = useRef();
  const bottomSheetPhoto = useRef();
  //console.log('렌더링.onoff:',onOff, blankMatrix.current)
  useEffect(()=>{
    blankMatrix.current = [
      [uri1, 0, uri2, 0],
      [0, uri3, "뷰티", 0],
      ["건축", 0, uri4, 0],
      [0, uri1, 0, 0],
      [0, uri2, 0, 0],
      [0, 0, 0, uri5]
    ]
    console.log('idea test')
    console.log("출력", height, width)
    console.log("",Dimensions.get("screen").height-itemSizeC*6)
    console.log("",Dimensions.get("window").height-itemSizeC*6)
    console.log("스크린",Dimensions.get("screen").height - Dimensions.get("window").height)
    setInit(true)
    //sheetRef.current.snapTo(2)
    //bottomSheet.current.toPosition = height/2//0//screenHeight-(itemSizeC*6)//height/2;
    //bottomSheet.current.snapTo(0)
    //bottomSheet.current.translateY = bottomHeight
    //console.log("마운트")
  },[])
  const takeImagefromphone = () => {
    const options = {
      title: "Select Avatar",
      storageOptions: {
        skipBackup: true,
        path: "images",
      },
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
      } else {
        console.log('Response = ', response.assets[0].uri);
        const tmp = response.assets[0];
        const source = {
          uri:
            Platform.OS === "android"
              ? tmp.uri
              : tmp.uri.replace("file://", ""),
          fileName: response.fileName,
        };
        var arr = [...items];
        console.log("source.uri",source.uri)
        arr.push(source.uri);
        setItems(arr);  ////xxxxx
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
        activeOpacity={0.8}
        onPress={()=>{bottomSheetPhoto.current.show()}}>
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
  const Photo = ({uri,text,position})=>{
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
          var temp = blankMatrix.current[from.y][from.x]
          blankMatrix.current[from.y][from.x] = blankMatrix.current[to.y][to.x]
          blankMatrix.current[to.y][to.x] = temp
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
      borderRadius : 30,
      transform:[
        {translateX: translateX.value},
        {translateY: translateY.value}
      ]
    }))
    return(
      <>
      <PanGestureHandler onGestureEvent={onGestureEvent}>
        {uri.match(/.(jpeg|jpg|gif|png)/)
        ? (<Animated.View style={imageStyle}>
            <Image
              source={{uri:uri}}
              style={{
                width: itemSizeC,  
                height: itemSizeC,
              }}/>
            </Animated.View>)
        : (<Animated.View style={textStyle}>
            <Text
              style={{
                width: itemSizeC,  
                height: itemSizeC,
                textAlign:'center',
                textAlignVertical:'center',
                fontSize:24,
                borderRadius: 30,
                alignContent : 'center',
                fontFamily:'SB_Aggro_L',
              }}>
              {text.split(' ')[0]}
            </Text>
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
          placeholder="퍼즐에 대한 설명을 적어보세요.(30자)"
          multiline={true}
          maxLength={30}
          returnKeyType='done'
          style={{
            fontSize:18,
            fontFamily:'SB_Aggro_L',
            height: 18*10,    //TextInput 높이
            textAlignVertical: 'top'
          }}
          onChangeText={(e) => setMemo(e)} //메모 상태 업뎃
          // onChange={e => {
          //   setMemo(e.nativeEvent.text);
          // }}
          >
        </TextInput>
      </KeyboardAvoidingView>
    </View>
  );
  const [clicktextModal, isClickTextModal] = useState(false);
  const textModal = () => {
    isClickTextModal(!clicktextModal);
    bottomSheetPhoto.current.close();
    console.log('닫힘');
  };
  return (
      <SafeAreaView style={styles.safeAreaView}>
        <View style={{margin:pad, width:width-pad*2, height:itemSizeC*6}}>
          <Background/>
          {init
           ? (blankMatrix.current.map((row, i)=>
            row.map((square, j)=>{
              //console.log(square.value)
              if(square === 0){
                return null;
              }else {
                return(  
                  <Photo
                    key={`${j}-${i}`}
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
      <View
        style={{
          backgroundColor:'#fdf8ff',
          height:itemSizeC*3//itemSizeC*8//itemSizeC*3
        }}/>
      <BottomSheet
        ref={sheetRef}
        //snapPoints={[350+itemSizeC*3, itemSizeC*3]}
        snapPoints={[itemSizeC*8, itemSizeC*3]}
        initialSnap={1}
        borderRadius={40}
        renderHeader={renderContent}
        //enabledInnerScrolling={true}
      />
      <BottomSheetPhoto radius={1} ref={bottomSheetPhoto} height={200}>
              <TouchableOpacity onPress={textModal} style={styles.bottomModal}>
                <TextIcon name="text" size={24} style={{marginRight: 7}} />
                <Text style={{fontFamily: 'SB_Aggro_L'}}>텍스트 입력하기</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={takeImagefromphone}
                style={styles.bottomModal}>
                <PictureIcon
                  name="picture-o"
                  size={24}
                  style={{marginRight: 7}}
                />
                <Text style={{fontFamily: 'SB_Aggro_L'}}>사진 가져오기</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={takeVideofromphone}
                style={styles.bottomModal}>
                <VideoIcon
                  name="videocamera"
                  size={24}
                  style={{marginRight: 7}}
                />
                <Text style={{fontFamily: 'SB_Aggro_L'}}>영상 가져오기</Text>
              </TouchableOpacity>
      </BottomSheetPhoto>
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
    padding: 16,
    height: itemSizeC*8-itemSizeC*3+150,
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
  randommatching: {
    flex: 2,
    backgroundColor: '#E7D9FF',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 3,
    borderColor: 'black',
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
    backgroundColor: "#fff",
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
        elevation: 50,
      },
    }),
  },
  safeAreaView: {
    // flex: 1,
    backgroundColor: 'blue'//'#fdf8ff'//"#20232A",
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
  randommatching: {
    flex: 1,
    backgroundColor: '#E7D9FF',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 3,
    borderColor: 'black',
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
