import React, { useEffect, useState, useCallback, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  Image,
  KeyboardAvoidingView
} from 'react-native';
import {Card} from 'react-native-elements';
import Dot from 'react-native-vector-icons/Entypo';
import Pin from 'react-native-vector-icons/MaterialCommunityIcons';
import {Menu, MenuItem, MenuDivider } from 'react-native-material-menu';
import { TextInput } from 'react-native-gesture-handler';

const Box = ({uri,text,position})=>{
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
          console.log('fromBoxContent',fromBoxContent)
          console.log('toBoxContent',toBoxContent)
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
                borderWidth: 1,
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
                borderRadius: 40,
                borderWidth: 1,
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

const styles = StyleSheet.create({
    ideaComponent:{
      borderWidth: 1,
      borderStyle:'solid',
      marginBottom: 15,
      flexDirection: 'row',
      justifyContent: 'center'
    },
    title:{
      fontSize: 20,
      marginBottom: 7,
      fontFamily:'SB_Aggro_M'
    },
    update:{
      fontSize: 18,
      color: '#AEAEAE',
      fontFamily:'SB_Aggro_M'
    },
    menu:{
      padding:0,
      margin:0,
      elevation:0,
      borderWidth:1,
      borderStyle:'solid',
      //height:96,
      backgroundColor:'#fdf8ff'
    }
});

export default Box;