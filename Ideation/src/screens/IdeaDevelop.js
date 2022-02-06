import React, {useState}from 'react';
import {StyleSheet, Text, View, TextInput, Switch, TouchableOpacity,Image, Animated} from 'react-native';
import ModalSelector from 'react-native-modal-selector';
//import { WebView } from 'react-native-webview';

var WEB_URL = "https://condescending-haibt-ae4398.netlify.app/";

export default function IdeaDevelop() {
  const [buttonClicked, setButtonClicked] = useState(false)
  const onPressFloat = ()=>{
    console.log("press")
    return(
    <TouchableOpacity
      style={styles.touchableOpacity}
      onPress={onPressFloat}>
      <Image
        style={styles.floatingButton}
        source={require('../assets/develop2.png')}
        resizeMode='cover'/>
    </TouchableOpacity>
    )
  }
  return (
    <View style={{flex:1,backgroundColor: '#fdf8ff'}}>
      {/* <WebView
          source={{uri:WEB_URL}}/> */}
       {!buttonClicked ?   
        <TouchableOpacity
          style={styles.buttonRight}
          onPress={()=>{setButtonClicked(true)}}
          activeOpacity={1}>
          {/* <Image
            style={styles.floatingButton}
            source={require('../assets/develop1.png')}
            resizeMode='cover'/> */}
          <Animated.Image
            source={require('../assets/develop1.png')}  
            resizeMode='cover'/>
        </TouchableOpacity> : (
        <View>
        <TouchableOpacity
          style={styles.buttonRight}
          activeOpacity={1}>
          <Animated.Image
            source={require('../assets/develop3.png')} 
            resizeMode='cover'/>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.buttonLeft]}
          onPress={()=>{setButtonClicked(false)}}
          activeOpacity={0.8}>
          <Animated.Image
            source={require('../assets/develop2.png')}   //
            //style={styles.floatingButton}
            resizeMode='cover'/>
        </TouchableOpacity>
        </View>
        )
      }
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonRight: {
    position:'absolute',
    width:50,
    height:50,
    alignItems:'center',
    justifyContent: 'center',
    right: 30,
    bottom: 30
  },
  buttonLeft: {
    position:'absolute',
    width:50,
    height:50,
    alignItems:'center',
    justifyContent: 'center',
    left: 30,
    bottom: 30
  }
  // floatingButton:{
  //   width: 60,
  //   height: 60
  // },
  
});