import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  StatusBar,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";
import { launchImageLibrary } from "react-native-image-picker";
import Feather from "react-native-vector-icons/Feather";
import { Col, Row, Grid } from "react-native-easy-grid";
import exampleImage1 from '../assets/rectangle1.png'
import exampleImage2 from '../assets/rectangle2.png'
import exampleImage3 from '../assets/unsplash1.png'
import exampleImage4 from '../assets/unsplash2.png'
import exampleImage5 from '../assets/unsplash3.png'
import exampleImageFrame from '../assets/frame.png'
import exampleImageFrame1 from '../assets/frame1.png'
import Animated, { 
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

const { width, height } = Dimensions.get("window"); //안드로이드는 상태바를 포함하지 않고 영역 추출함
const COL = 4;
const ROW = 6;
const circleSize = width - 36;
const itemSize = width / 4; //네모칸의 가로 세로 크기
const radius = circleSize / 2 - itemSize / 2;
const center = radius;
const pad = (width - (COL*(width/COL - 6)))/2;
const itemSizeC = width/COL - 6; 

const App = ({ navigation, route }) => {
  const [movingDraggable, setMovingDraggable] = useState(null);
  const [releaseDraggable, setReleaseDraggable] = useState(null);
  const [items, setItems] = useState([]);
  const uri1 = Image.resolveAssetSource(exampleImage1).uri;
  const uri2 = Image.resolveAssetSource(exampleImage2).uri;
  const uri3 = Image.resolveAssetSource(exampleImage3).uri;
  const uri4 = Image.resolveAssetSource(exampleImage4).uri;
  const uri5 = Image.resolveAssetSource(exampleImage5).uri;

  useEffect(()=>{
    // setItems([Image.resolveAssetSource(exampleImageFrame).uri,
    //   Image.resolveAssetSource(exampleImage1).uri])
    console.log("마운트")
  },[])
  // useEffect(() => {
  //   setMovingDraggable(null);
  //   setReleaseDraggable(null);
  //   return () => {};
  // }, [items]);
  const testdata = [
    {"row":1,
     "column":1,
     "uri":Image.resolveAssetSource(exampleImage1).uri,
     "text":""},
     {"row":1,
     "column":2,
     "uri":Image.resolveAssetSource(exampleImage2).uri,
     "text":""},
     {"row":1,
     "column":3,
     "uri":Image.resolveAssetSource(exampleImage3).uri,
     "text":""},
     {"row":3,
     "column":3,
     "uri":Image.resolveAssetSource(exampleImage4).uri,
     "text":""},
  ]
  const MaxRows = 6;
  const MaxColumns = 4;
  const pickImageFromPhone = () => {
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
  
  const degToRad = (deg) => {
    return (deg * Math.PI) / 180;
  };

  const setup = (index) => {
    const dividedAngle = 360 / items.length;
    const angleRad = degToRad(270 + index * dividedAngle);
    const x = radius * Math.cos(angleRad) + center;
    const y = radius * Math.sin(angleRad) + center;
    return { x, y };
  };

  const onMovingDraggable = (movingDraggable) => {
    setMovingDraggable(movingDraggable);
  };

  const onReleaseDraggable = (releaseDraggable) => {
    setMovingDraggable(null);
    setReleaseDraggable(releaseDraggable);
  };

  const swap = (index1, index2) => {
    var arr = [...items];
    var temp = arr[index1];
    arr[index1] = arr[index2];
    arr[index2] = temp;
    console.log("swap 전",arr)
    setItems(arr);
    console.log("swap 후",items)
  };

  const deleteItem = (index) => {
    var arr = [...items];
    arr.splice(index, 1);
    setItems(arr);
  };

  useEffect(()=>{
    console.log('idea test')
  },[])

  const renderHeader = () => {
    return (
      <View style={{width:'100%', backgroundColor:'#E7D9FF', alignItems:'center', justifyContent:'center'}}>
        <TouchableOpacity
          style={styles.addBtn}
          onPress={() => {
            pickImageFromPhone();
          }}>
          <Feather name="plus" color={"#20232A"} size={24} />
        </TouchableOpacity>
        <TouchableOpacity
          // style={styles.randommatching}
          style={{alignItems:'center',justifyContent:'center',backgroundColor:'#E7D9FF'}}
          onPress={() => alert('카드를 수정합니다')}>
          <Text style={{fontSize: 25}}>수정하기</Text>
        </TouchableOpacity>
      </View>
    );
  };
  const renderPhoto = (item) =>{
    navigation.navigate('showImage',{itemValue: item});
  }
  // <Draggable
  //               key={4}
  //               index={4}
  //               movingDraggable={movingDraggable}  //state 드래그하는 요소 정보를 담는 듯
  //               onMovingDraggable={onMovingDraggable} //함수 
  //               releaseDraggable={releaseDraggable}  //드롭되는 요소 정보를 담는 듯
  //               onReleaseDraggable={onReleaseDraggable}
  //               swap={swap}  //스와이프
  //               onPress={renderPhoto}
  //               item={Image.resolveAssetSource(exampleImage3).uri}
  //               // position={{
  //               //    position: 'absolute',
  //               //    left: x,
  //               //    top: y,
  //               // }}
  //               renderChild={(isMovedOver) => { 
  //                 return (
  //                   <View
  //                     style={[
  //                       isMovedOver && styles.moreThan10ItemMovedOver, //isMovedOver가 true이면 테두리 노란색됨
  //                       styles.moreThan10Item, //isMovedOver가 true가 아니어도 실행됨 기본임
  //                     ]}>
  //                     {/* {console.log(isMovedOver,"출력",index)} */}
  //                     <Image source={{ uri: Image.resolveAssetSource(exampleImage3).uri }} style={styles.img} />
                      
  //                   </View>
  //                 );
  //               }}
  //             />
  //#FFF4D9 노란색 #E7D9FF 보라색 매인컬러 #D9E3FF 파란색 #FFD9D9 분홍색
  const Square = ({ onoff, row, col }) => {
    const backgroundColor = '#fdf8ff';
    return (
      <View
        style={{
          flex: 1,
          backgroundColor,
          //padding: 4,
          justifyContent: "space-between",
          borderColor : "#000",
          borderWidth : 0.5,
          height: itemSizeC,
          width: itemSizeC,
        }}> 
       {/* <Text>puzzle</Text> */}
       {onoff === true
        ? <Image source={{uri:Image.resolveAssetSource(exampleImageFrame).uri}} style={styles.img}></Image>
        : <Image source={{uri:Image.resolveAssetSource(exampleImageFrame1).uri}} style={styles.img}></Image>
       }
        {/* <Text style={[textStyle, { opacity: col === 0 ? 1 : 0 }]}>
          {"" + (6 - row)}
        </Text>
        {row === 5 && (
          <Text style={[textStyle, { alignSelf: "flex-end" }]}>
            {String.fromCharCode(97 + col)}
          </Text>
        )} */}
      </View>
    );
  };
  
  const Row = ({ onoff, white, row }) => {
    const offset = white ? 0 : 1;
    return (
      <View style={{
        flex: 1,
        flexDirection: "row",
        //backgroundColor : "#fdf8ff"
        }}>
        {new Array(4).fill(0).map((_, i) => (
          <Square row={row} col={i} key={i} white={(i + offset) % 2 === 1} onoff={onoff}/>
        ))}
      </View>
    );
  };
  const [onOff, setOnOff] = useState(false)
  const Background = () => {
    return (
      <View style={{ flex:1}}>
        {new Array(6).fill(0).map((_, i) => (
          <Row key={i} white={i % 2 === 0} row={i} onoff={onOff}/>
        ))}
      </View>
    );
  };
  // const onGestureHandler = Animated.event([
  //   {nativeEvent: {
  //     translateX:position.x,
  //     translateY:position.y,
  //   }}
  // ],{useNativeDriver:true})

  const Photo = ({uri,position})=>{
    // const pan = useRef(new Animated.ValueXY());
    // const [translateX, setTranslateX] = useState()
    // const [translateY, setTranslateY] = useState()
    // useEffect(()=>{
    //   setTranslateX(new Animated.Value(position.x))
    //   setTranslateY(new Animated.Value(position.y))
    // },[])
    
    return(
      // <PanGestureHandler
        // onGestureEvent={
        //   Animated.event([
        //     {nativeEvent: { translateX: pan.current.x._value, translateY:pan.current.y._value,}}
        //   ],{useNativeDriver:true})
        // }
        // >
      <Animated.View
        // style={piece}
        style={{
          position: "absolute",
            height: itemSizeC,
            width: itemSizeC,
                    //flex :1,
            transform: [{ translateX: position.x }, { translateY: position.y }]
        }}
        >
        <Image
          source={{uri:uri}}
          style={{
            width: itemSizeC,  //체스말 크기
            height: itemSizeC,
          }}
          // style={{
          //   position: "absolute",
          //   height: itemSizeC,
          //   width: itemSizeC,
          //           //flex :1,
          //   transform: [{ translateX: position.x }, { translateY: position.y }]
          // }}
          />
      </Animated.View>
      // </PanGestureHandler>
    )

  }
  const blankMatrix = [
    [uri1, 0, uri2, 0],
    [0, uri3, 0, 0],
    [0, 0, uri4, 0],
    [0, uri1, 0, 0],
    [0, uri2, 0, 0],
    [0, 0, 0, uri5]
  ];

  return (
    <SafeAreaView style={styles.safeAreaView}>
       {/* backgroundColor:'#fdf8ff' */}
      <View style={{margin:pad, width:width-pad*2, height:itemSizeC*6, backgroundColor:'blue'}}>
        <Background/>
          {blankMatrix.map((row, i)=>
            row.map((square, j)=>{
              if(square === 0){
                return null;
                  // <Text>0</Text>
              }
              console.log(square)
              return(
                // <Text style={{transform:  [{ translateX: j*itemSizeC }, { translateY: i*itemSizeC }]}}>
                //   출력
                // </Text>
                // // <View>
                // <Image
                //   source={{uri:square}}
                //   style={{
                //     position: "absolute",
                //     height: itemSizeC,
                //     width: itemSizeC,
                //     //flex :1,
                //     transform: [{ translateX: j*itemSizeC }, { translateY: i*itemSizeC }]
                //   }}
                //       />
                // </View>
                <Photo
                  position={{x:j*itemSizeC, y: i*itemSizeC}}
                  uri={square}
                />
              )
            }))}
      </View>
      <TouchableOpacity
        style={{backgroundColor:'yellow'}}
        onPress={()=>{
          setOnOff(onOff ? false : true)
        }}>
        <Text
          style={{justifyContent:'center',alignContent:'center'}}>
          수정
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
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
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
  },
  safeAreaView: {
    // flex: 1,
    backgroundColor: '#fdf8ff'//"#20232A",
  },
  viewContainer: {
    flex: 1,
    width,
    backgroundColor: "#fdf8ff"//"#fdf8ff"//"#20232A",
  },
  // scrollView: {
  //   flexGrow: 1,
  //   alignItems: "center",
  //   paddingTop: 18,
  // },
  // header: {
  //   width,
  //   height: 50,
  //   alignItems: "center",
  //   flexDirection: "row",
  //   justifyContent: "flex-end",
  //   paddingHorizontal: 18,
  //   paddingTop: 15,
  // },
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
  moreThan10Container: {
    flex: 1,
    width: "100%",
    //height: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingBottom: 0,//height * 0.2, //
    backgroundColor:'#fdf8ff'
  },
  squaresViewContainer: {
    //flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height:itemSize*6,
    // position: "absolute",
    // top: 0,
    // left: 0,
    marginHorizontal: 0, //width: "95%",
    marginVertical: 0,
    //height: "90%", ///xxxx
    flexWrap: "wrap",
    //marginVertical : 10,
    // paddingVertical: 20,
    // paddingHorizontal: 20,
    borderColor:'#000',
    //borderWidth:1,
    //padding: 3,//16
    backgroundColor: '#fdf8ff',//'blue',//'#fdf8ff'//'blue'
    borderColor: 'black'
  },
  moreThan10Item: {
    width: itemSize,   //
    height: itemSize,  //
    borderRadius: 0, //8
    margin: 0, //박스들 사이 간격
    overflow: "hidden",
  },
  moreThan10ItemMovedOver: {
    borderWidth: 6,
    borderColor: "#FEDC33",
  },
});
