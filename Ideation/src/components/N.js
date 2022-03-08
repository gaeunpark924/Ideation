import React, { useEffect, useState, useCallback, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  Image,
  Alert,
  Dimensions,
  Keyboard
} from 'react-native';
import Back from 'react-native-vector-icons/MaterialIcons';
import { mainTheme } from '../theme/theme';
import { Shadow } from 'react-native-shadow-2';

//로딩화면, 아이디어 리스트 화면에서 쓰임
//퍼즐링 아이디어에서 166,488 개의 아이디어가 탄생하고 있어요
export const Guide = (props) => {
  return(
    <Text {...props} style={styles.textStyle1}>{props.name}</Text>
  )
}
export const Num = (props) => {
  return(
    <Text {...props} style={styles.textStyle2}> {props.name}</Text>
  )
}
//헤더
export const CustomH = (props) => {
  return(
    <View style={[{marginTop:10,height:60,flexDirection:'row',alignItems:'center'},props.style]}>
      <TouchableOpacity style={{marginStart:20,marginEnd:5}} onPress={props.press} activeOpacity={0.5} >
        <Back name="arrow-back-ios" color="#000" size={24}/>
      </TouchableOpacity>
      <Text style={{fontFamily:mainTheme.font.M,fontSize:24}}>{props.name}</Text>
    </View>
  )
}
//인증 페이지 하단 버튼
export const BottomButton = (props) => {
  return(
    <TouchableOpacity style={styles.bottomButton} onPress={props.press} activeOpacity={0.8}>
      <Text style={{fontSize:16, fontFamily:mainTheme.font.M}}>{props.name}</Text>
    </TouchableOpacity>
  )
}
//아이디어 발전 바텀 시트 그림자
export const BottomSheetShadow = ( ) => {
  return(
    <Shadow
      sides={['top']}
      corners={['topLeft','topRight']}
      radius={24}
      viewStyle={{width:'100%'}}>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          paddingVertical: 12,
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
        }}>
        <View
          style={{
            width: 30,
            height: 4,
            backgroundColor:'gray',//'',
            borderRadius:4,
          }}/>
      </View>  
    </Shadow>
  )
}
//TextInput 메시지
export const TxtInMessage = (props) => {
  return(
    <Text {...props} style={[styles.TxtInMessage,props.style]}>{props.name}</Text>
  )
}

const styles = StyleSheet.create({
    textStyle1:{
      fontFamily:'SB_Aggro_L',
      fontSize:16,
      color:'#595959',
      textAlign: 'center',
      backgroundColor:'#fdf8ff',
      marginVertical:5
    },
    textStyle2:{
      fontFamily:'SB_Aggro_M',
      fontSize:32,
      color:'#7023D2',
      textAlign: 'center',
      backgroundColor:'#fdf8ff',
      marginVertical:5
    },
    bottomButton: {
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: 56,
      borderWidth: 1, //테두리 굵기
      borderColor: 'black', //테두리
      backgroundColor: mainTheme.colors.main1//#E7D9FF', //배경
    },
    TxtInMessage:{
      fontSize:14,
      fontFamily:mainTheme.font.M,
      marginLeft:5,
      marginTop:10
    },
});