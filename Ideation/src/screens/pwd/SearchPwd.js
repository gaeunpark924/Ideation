import React, { useEffect, useState } from 'react';
import {StyleSheet, Text, View, TextInput, TouchableOpacity,Alert,Keyboard } from 'react-native';
import {KeyboardAvoidingView} from 'react-native';
import auth from '@react-native-firebase/auth';
//import DropDownPicker from 'react-native-dropdown-picker';
import Email from 'react-native-vector-icons/MaterialIcons';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { color } from 'react-native-reanimated';

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
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
      {label: 'gmail.com', value: 'gmail'},
      {label: 'naver.com', value: 'naver'}
    ]);
    return (
      <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS == "ios" ? 0 : 110}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <KeyboardAvoidingView behavior="padding">
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
                  onChangeText={(text)=>setEmail(text)}  
                />
                { (errorCode==='')
                ? <Text
                    style={styles.textStyle}>이메일로 비밀번호 재설정 링크를 보내드려요.</Text>
                : (errorCode ==='auth/user-not-found')
                ? <Text
                    style={styles.textStyle2}>가입되지 않은 이메일이에요.{'\n'}다른 이메일 주소를 알려주세요!</Text>
                : (errorCode === 'auth/invalid-email')
                ? <Text
                    style={styles.textStyle}>이메일 형식이 아닙니다.</Text>
                : null      
                }
              </View>
            </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
            <TouchableOpacity
              style={styles.bottomButton}
              onPress={onPressNavigation}
              activeOpacity={0.8}>
              <Text
                style={{fontSize:16, fontFamily:'SB_Aggro_M'}}>
                재설정 링크 전송
              </Text>
            </TouchableOpacity>
        </KeyboardAvoidingView>
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
    backgroundColor: '#E7D9FF', //배경
  },
  textStyle:{
    fontSize:14,
    fontFamily:'SB_Aggro_M',
    marginLeft:5,
    marginTop:10
  },
  textStyle2:{
    fontSize:14,
    fontFamily:'SB_Aggro_M',
    marginLeft:5,
    marginTop:10,
    color:'#FF3F25'
  },
});



export default SearchPwd;