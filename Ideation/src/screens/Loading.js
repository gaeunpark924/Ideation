import React, { useState, useRef, useEffect, useContext } from 'react';
import {StyleSheet, Text, Animated} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { userInfo } from '../User';
import {UserContext} from "../../App"
import {Guide, Num} from "../components/N"
  
const Loading = ({navigation}) => {
  // const {emailCnt, emailCntHandler, uidCnt, uidCntHandler} = useContext(UserContext)
  const userCnt = useContext(UserContext)
  const [countIdea, setCountIdea] = useState(0);
  const [initializing, setInitializing] = useState(false)
  const numOfIdea = useRef()
  function onAuthStateChanged(user){
    if(user){
        setTimeout(()=>{
          userCnt.email = user.email
          userCnt.uid = user.uid
          // console.log("onAuthStateChanged",user)
          navigation.navigate("StackHomeNavigator")
        },2000)
    }else{
      setTimeout(()=>{
        userCnt.email = ''
        userCnt.uid = ''
        navigation.navigate("StackAuthNavigator")
      },2000)
    }
  }
  const getNumOfIdea = async () => {
    await firestore()
        .collection('ideaCount')
        .doc('numOfIdea')
        .get()
        .then(querySnapshot => {
          numOfIdea.current = querySnapshot.data().numOfIdea
          setInitializing(true)
        })
        .catch((error)=>{
          numOfIdea.current = '166,483'
          setInitializing(true)
        })
  }      
  useEffect(()=>{
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    getNumOfIdea()
    return subscriber;
  },[])
  if(!initializing){
    return(
      <Animated.View style={styles.loading}>
      </Animated.View>
    )
  }
  return (
      <Animated.View style={styles.loading}>
          <Text style={{
            fontFamily:'SB_Aggro_B',
            fontSize:40,
            color:'#1D1D1D',
            textAlign: 'center',
            backgroundColor:'#fdf8ff',
            marginVertical:30}}>PZLING IDEA</Text>
          <Guide name={'퍼즐링 아이디어에서'}></Guide>
          <Num name={numOfIdea.current}></Num>
          <Guide name={'개의 아이디어가 탄생하고 있어요!'}></Guide>
      </Animated.View>
  );
};
const styles = StyleSheet.create({
  loading: {
    height:'100%',
    backgroundColor:'#fdf8ff',
    justifyContent:'center',
    alignItems:'center'
  },
  textStyle1:{
    fontFamily:'SB_Aggro_L',
    fontSize:16,
    color:'#595959',
    textAlign: 'center',
    backgroundColor:'#fdf8ff',
    marginVertical:5
  }
});
export default Loading;