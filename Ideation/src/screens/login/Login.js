import React, {useCallback, useEffect} from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { StyleSheet, Text, View, TouchableOpacity, Image, BackHandler, Alert } from 'react-native';
import { Icon } from 'react-native-elements';

//google 로그인
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

const Login = ({navigation}) => {
    const onPressEmailLogin = ()=>{
      navigation.navigate("LoginEmail")
    }
    const onPressJoin = () =>{
      navigation.navigate("JoinEmail")
    }
    //navigation.add

    useEffect(() => {
      GoogleSignin.configure({
        webClientId: "877649815167-8rq5c4138llk9v3mo785qee98q9hg52i.apps.googleusercontent.com",
      });
    }, []);

    useFocusEffect(
      useCallback(()=>{
        const backHandler = BackHandler.addEventListener("hardwareBackPress",
          ()=>{
            Alert.alert("경고","앱을 종료하시겠습니까?",[{text: "아니오", onPress: ()=> null, style:"cancel"},{text:"네", onPress: ()=> {BackHandler.exitApp()}}]);
            return true;
          })
        return () => backHandler.remove();
      },[])   
    )

    async function onGoogleButtonPress() {
      const {idToken} = await GoogleSignin.signIn(); //구글 로그인하며 유저 idToken 가져옴.
      const googleCredential = auth.GoogleAuthProvider.credential(idToken); //유저 idToken 이용하여 google credential 생성
      return auth().signInWithCredential(googleCredential);                 //생성된 credential 이용해 사용자 앱으로 로그인 시킴.
    }

    return (
        <View style={styles.ncontainer}>
            <View style={{marginTop:0,width:'90%'}}>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: "center",
                  width: '100%',
                  marginTop : 10, 
                  borderWidth : 1,
                  borderColor : 'black'
                }}
                onPress={()=>{
                  onGoogleButtonPress();
                }}
                activeOpacity={0.8}>
                <Image
                  style={{
                    width: 30,
                    height: 30,
                    marginVertical: 20,
                    marginHorizontal : 20}}
                  source={require('../../assets/google_email.png')}
                  resizeMode='cover'/>   
                <Text style={{margin : 10, fontFamily:'SB_Aggro_M', fontSize:14}}>
                  구글로 로그인
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  width: '100%',
                  marginTop : 10,
                  borderWidth : 1,
                  borderColor : 'black',
                }}
                onPress={onPressEmailLogin}
                activeOpacity={0.8}>
                <Image
                  style={{
                    width:30,
                    height:22.5,
                    marginVertical: 23.75,
                    marginHorizontal:20}}
                  source={require('../../assets/email1.png')}
                  resizeMode='cover'/>  
                <Text style={{margin : 10, fontFamily:'SB_Aggro_M', fontSize:14}}>
                  이메일로 로그인
                </Text>
              </TouchableOpacity>
              <View style={{alignItems:'center',marginTop:90}}>
                <Text
                  style={styles.textUseCondition}
                  onPress={onPressJoin}>
                  {"  회원가입  "}
                </Text>
              </View>
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'column',
    padding: 20,
    justifyContent: 'space-between',
    backgroundColor: '#FDF8FF'
  },
  ncontainer:{
      height:'100%',
      backgroundColor:'#fdf8ff',
      justifyContent:'center',
      alignItems:'center'
  },
  textUseCondition: {
    color: '#000000',
    paddingBottom: 6,
    borderBottomWidth: 1,
    fontFamily:'SB_Aggro_M',
    fontSize:14
  },
});
export default Login;

