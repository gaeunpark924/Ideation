import React, { useEffect, useState } from 'react';
import {StyleSheet, Text, View, TextInput, TouchableOpacity,Alert,Keyboard } from 'react-native';
import {KeyboardAvoidingView} from 'react-native';
import auth from '@react-native-firebase/auth';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { mainTheme } from "../../theme/theme";
import { CustomH,BottomButton } from '../../components/N';

const SearchPwd = ({navigation}) => {
    const [email,setEmail] = useState('')
    const [errorCode, setErrorCode] = useState('');
    useEffect(()=>{
      if(email===''){
        setErrorCode('')
      }
    },[email])
    const onPressNavigation = () => {
      if (email !== ''){
        sendUserEmail()
      }
    }
    async function sendUserEmail() {
      await auth().sendPasswordResetEmail(email)
        .then((user) => {
          Alert.alert("알림","링크가 전송되었습니다.",[{text:"확인",onPress: ()=> {navigation.goBack() }}]);
        })
        .catch((error) => {
          console.log(error)
          setErrorCode(error.code)
          // if (error.code === 'auth/user-not-found'){
          //   Alert.alert("경고","등록된 이메일이 아닙니다.",[{text:"확인"}]);
          //   setErrorCode(error.code)
          // } else if (error.code === 'auth/invalid-email'){
          //   Alert.alert("경고","이메일 형식이 아닙니다.",[{text:"확인"}]);
          // }
        })
    }
    return (
      <View style={{flex:1,backgroundColor:mainTheme.colors.background,}}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={()=>{Keyboard.dismiss()}}
        style={{flex:1}}>
      <CustomH name={'비밀번호 찾기'} press={()=>{navigation.goBack()}}></CustomH>
        <View style={styles.container}>
          <View style={{marginTop:110}}> 
            <TextInput
              underlineColorAndroid={'black'}
              style={{
                fontSize:18,
                fontFamily:'SB_Aggro_L',
              }}
              placeholder="이메일주소를 알려주세요."
              autoFocus={true}
              onSubmitEditing={() =>onPressNavigation()}
              onChangeText={(text)=>setEmail(text)}/>
            {(errorCode==='')
            ? <Text style={styles.textStyle}>이메일로 비밀번호 재설정 링크를 보내드려요.</Text>
            : (errorCode ==='auth/user-not-found')
              ? <Text style={styles.textStyle2}>가입되지 않은 이메일이에요.{'\n'}다른 이메일 주소를 알려주세요!</Text>
              : (errorCode === 'auth/invalid-email') && <Text style={styles.textStyle2}>이메일 형식이 아닙니다.</Text>
            }
          </View>
          <BottomButton name={'재설정 링크 전송'} press={onPressNavigation}/>
        </View>
        </TouchableOpacity>
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
  bottomButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    minWidth: 125, //최소 너비
    minHeight: 56, //최소 높이
    borderWidth: 1, //테두리 굵기
    borderColor: 'black', //테두리
    backgroundColor: mainTheme.colors.main1//'#E7D9FF', //배경
  },
  textStyle:{
    fontSize:14,
    fontFamily: mainTheme.font.M,
    marginLeft:5,
    marginTop:10
  },
  textStyle2:{
    fontSize:14,
    fontFamily: mainTheme.font.M,
    marginLeft:5,
    marginTop:10,
    color:mainTheme.colors.warning
  },
});



export default SearchPwd;