import React, { useState, useRef, useEffect } from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Animated} from 'react-native';
import auth from '@react-native-firebase/auth';
import { ToastAndroid } from 'react-native';
import { useScrollToTop } from '@react-navigation/native';
import { userInfo } from '../User';

const Loading = ({navigation}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current; 
  //new Animated.Value 초기값을 0으로 준다
  const [initializing, setInitializing] = useState(false);
  const [userUid, setUserUid] = useState();
  const [countIdea, setCountIdea] = useState(0);
  
  function onAuthStateChanged(user){
    if(user){
      // setInitializing(true)
      // setUserUid(user.uid)

      setTimeout(()=>{
        userInfo.email = user.email
        userInfo.uid = user.uid
        userInfo.emailVerified = user.emailVerified //사용하진 않는데 그냥 넣어둠
        navigation.navigate("StackHomeNavigator")//,{"userUid":user.uid})
      },2000)
    }else{
      setTimeout(()=>{
        userInfo.email = ''
        userInfo.uid = ''
        userInfo.emailVerified = false
        navigation.navigate("StackAuthNavigator")
      },2000)
    }
    // Animated.timing(fadeAnim,
    //   {toValue:1,       
    //     duration: 2000,  //2초 지속
    //     useNativeDriver: true, 
    //   }).start(()=>{
    //     console.log("initializing",initializing)
    //     initializing ? navigation.navigate("idealist",{"userUid":userUid}) : navigation.navigate("Login")
    //   })
  }
  
  useEffect(()=>{
    const unSubScriber = auth().onAuthStateChanged(onAuthStateChanged);
    return unSubScriber;
  },[])
  // useEffect(()=>{
  //   onLoad()
  // },[])
  // const onLoad = () => {
  //   //console.log("onLoad")
  //   Animated.timing(fadeAnim,
  //     {toValue:1,       
  //       duration: 2000,  //2초 지속
  //       useNativeDriver: true, 
  //     }).start(()=>{
  //       initializing ? navigation.navigate("idealist",{"userUid":userUid}) : navigation.navigate("Login")
  //     })
  // };
  const getStyle = () =>{
    return{

    }
  }
  return (
    // <View style={styles.loading}>
      <Animated.View style={styles.loading}>
          <Text style={{
            fontFamily:'SB_Aggro_B',
            fontSize:40,
            color:'#1D1D1D',
            textAlign: 'center',
            backgroundColor:'#fdf8ff',
            marginVertical:30}}>PZLING IDEA</Text>
          <Text style={{
            fontFamily:'SB_Aggro_L',
            fontSize:16,
            color:'#595959',
            textAlign: 'center',
            backgroundColor:'#fdf8ff',
            marginVertical:5}}>퍼즐링 아이디어에서</Text>
          <Text style={{
            fontFamily:'SB_Aggro_M',
            fontSize:32,
            color:'#7023D2',
            textAlign: 'center',
            backgroundColor:'#fdf8ff',
            marginVertical:5}}>{countIdea}</Text>
          <Text style={{
            fontFamily:'SB_Aggro_L',
            fontSize:16,
            color:'#595959',
            textAlign: 'center',
            backgroundColor:'#fdf8ff',
            marginVertical:5}}>개의 아이디어가 탄생하고 있어요!</Text>
          {/* {Animated.timing(fadeAnim,
              {toValue:1,       
              duration: 2000,  //2초 지속
              useNativeDriver: true, 
              }).start(()=>{
                initializing ? navigation.navigate("idealist",{"userUid":userUid}) : navigation.navigate("Login")
          })} */}
      </Animated.View>
    // </View>
  );
};
{/* <Animated.Image
        source={require('../assets/facebook.png')}   //
        style={{width:300, height:300}}
        onLoad={onLoad}/> */}
const styles = StyleSheet.create({
  loading: {
    height:'100%',
    backgroundColor:'#fdf8ff',
    justifyContent:'center',
    alignItems:'center'
  },
});
export default Loading;