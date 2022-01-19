import React, { useState, useRef, useEffect } from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Animated} from 'react-native';
import auth from '@react-native-firebase/auth';
import { ToastAndroid } from 'react-native';

const Loading = ({navigation}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const onCompelete = () => {
    var unsubscribe = auth().onAuthStateChanged((user)=>{
      if(user){
          navigation.navigate("idealist")
      }else{
        navigation.navigate("Login")
      }
    })
    setTimeout(()=>{
      unsubscribe()   //구독 해지
    },3000)
  }

  const onLoad = () => {
    Animated.timing(fadeAnim,
      {toValue:1,       
        duration: 2000,  //2초 지속
        useNativeDriver: true, 
      }).start(()=>{
        onCompelete()
      })
  };

  return (
    <View style={styles.loading}>
      <Animated.Image
        source={require('../assets/facebook.png')}   //
        style={{width:300, height:300}}
        onLoad={onLoad}/>
    </View>
  );
};
const styles = StyleSheet.create({
  loading: {
    height:'100%',
    backgroundColor:'#E7D9FF',
    justifyContent:'center',
    alignItems:'center'
  },
});
export default Loading;