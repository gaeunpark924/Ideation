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
    navigation.add

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
        <View style={styles.container}>
            <View style={{marginTop:110}}>
              <TouchableOpacity
                style={{flexDirection: 'row',
                        alignItems: "center",
                        width: '100%',
                        minWidth : 125,          //최소 너비
                        minHeight : 56,
                        borderWidth : 2,
                        borderColor : 'black'
                      }}
                onPress={()=>console.log("페이스북으로 로그인")}
                activeOpacity={0.8}>
                <Image style={{width: 30, height: 30, margin : 10}} source={require('../../assets/facebook.png')}/>  
                <Text style={{margin : 10}}>
                  페이스북으로 로그인
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{flexDirection: 'row',
                        alignItems: "center",
                        width: '100%',
                        minWidth : 125,          //최소 너비
                        minHeight : 56,
                        marginTop : 10, 
                        borderWidth : 2,
                        borderColor : 'black'
                      }}
                onPress={()=>{
                  console.log("구글로 로그인");
                  onGoogleButtonPress();
                }}
                activeOpacity={0.8}>
                <Image style={{width: 30, height: 30, margin : 10}} source={require('../../assets/google.png')} resizeMode='cover'/>   
                <Text style={{margin : 10}}>
                  구글로 로그인
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{flexDirection: 'row',
                        alignItems: 'center',
                        width: '100%',
                        minWidth : 125,          //최소 너비
                        minHeight : 56,
                        marginTop : 10,
                        borderWidth : 2,
                        borderColor : 'black',
                      }}
                onPress={onPressEmailLogin}
                activeOpacity={0.8}>
                <Icon style={{margin : 10}} name='mail' size={25} type='ant-design' />  
                <Text style={{margin : 10}}>
                  이메일로 로그인
                </Text>
              </TouchableOpacity>
              <View style={{alignItems:'center',marginTop:60}}>
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
  },
  textUseCondition: {
    color: '#000000',
    paddingBottom: 6,
    borderBottomWidth: 2,
  },
});
export default Login;

