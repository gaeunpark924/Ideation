import React, { useState, useRef } from 'react';
import {StyleSheet, Text, View, TextInput, ToastAndroid, TouchableOpacity } from 'react-native';
import {KeyboardAvoidingView} from 'react-native';

const ResetPwd = ({navigation}) => {
    const [ pwdValue, setPwdValue] = useState();
    const [ pwdCheckValue, setPwdCheckValue] = useState();
    const passwordInput = useRef();
    const showToast = () =>{
      ToastAndroid.show("비밀번호가 일치하지 않습니다", ToastAndroid.SHORT);
    };
    const onPressNavigation = ()=>{
      console.log('출력')
      pwdValue === pwdCheckValue
      ? navigation.navigate("LoginEmail")
      : showToast()
    }
    return (
        <View style={styles.container}>
            <KeyboardAvoidingView behavior="padding">
              <View style={{marginTop:110}}>
                <TextInput
                  underlineColorAndroid={'black'}
                  placeholder="비밀번호 입력"
                  secureTextEntry={true}
                  onChangeText={text=>setPwdValue(text)}
                  autoFocus={true}
                  returnKeyType="next"
                  onSubmitEditing={() => {passwordInput.current.focus()}}    //키보드에서 다음 누르면 비밀번호 확인으로 자동으로 넘어감
                />
              </View>
              <View style={{marginTop:50}}>
                <TextInput
                  underlineColorAndroid={'black'}
                  placeholder="비밀번호 확인"
                  secureTextEntry={true}
                  onChangeText={text=>setPwdCheckValue(text)}
                  onSubmitEditing={() =>onPressNavigation()}    //키보드에서 완료 누르면 다음 페이지로 넘어감
                  ref={passwordInput}
                />
              </View>
            </KeyboardAvoidingView>
            <TouchableOpacity
              style={styles.bottomButton}
              onPress={onPressNavigation}
              activeOpacity={0.8}>
              <Text>
                비밀번호 재설정
              </Text>
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
    backgroundColor :'#FDF8FF'
  },
  bottomButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    minWidth: 125, //최소 너비
    minHeight: 56, //최소 높이
    borderWidth: 2, //테두리 굵기
    borderColor: 'black', //테두리
    backgroundColor: '#E7D9FF', //배경
  },
  textUseCondition: {
    //이용약관보기
    color: '#000000',
    paddingBottom: 6,
    borderBottomWidth: 2,
    //textDecorationLine:'underline',
  },
});

export default ResetPwd;