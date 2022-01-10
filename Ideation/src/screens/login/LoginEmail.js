import React, { useRef, useState, useEffect} from 'react';
import { Text, View, TextInput, ToastAndroid, TouchableOpacity, KeyboardAvoidingView } from 'react-native';

import auth from '@react-native-firebase/auth';

import styles from '../../styles/style'
const showToast = () =>{
  ToastAndroid.show("로그인", ToastAndroid.SHORT);
};
const LoginEmail = ({navigation}) => {
    const passwordInput = useRef();
    const onPressSearchPwd = ()=>{
      navigation.navigate("SearchPwd")
    }

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function onPressLogin() {
      console.log(email, password);
      auth().signInWithEmailAndPassword(email, password)
        .then((user) => {
          console.log(user, '로그인 성공');
          // auth().onAuthStateChanged((user) => {   //firebase에서 제공하는 유저 접속 유무 알려주는 함수
          //     if(user){
          //       console.log('a')
          //     }
          //   });
          navigation.navigate("welcome")
        })
        .catch((err) => console.log(err))
    }

    return (
        <View style={styles.container}>
            <KeyboardAvoidingView behavior="padding">
                <View style={{marginTop:110}}>
                  <TextInput
                    underlineColorAndroid={'black'}
                    placeholder="이메일 입력"
                    autoFocus={true}
                    returnKeyType="next"
                    onSubmitEditing={() => {passwordInput.current.focus()}}    //키보드에서 다음 누르면 비밀번호 확인으로 자동으로 넘어감
                    onChangeText={(e) => setEmail(e)}
                />
              </View>
              <View style={{marginTop:50}}>
                <TextInput
                  underlineColorAndroid={'black'}
                  placeholder="비밀번호 입력"
                  secureTextEntry={true}
                  onSubmitEditing={() =>showToast()}    //
                  ref={passwordInput}
                  onChangeText={(e) => setPassword(e)}
                />
              </View>
            </KeyboardAvoidingView>
            <View>
                <View style={{alignItems:'center',marginBottom:20}}>
                    <Text
                      style={styles.textUseCondition}
                      onPress={onPressSearchPwd}
                      >
                        {"  비밀번호 찾기  "}
                    </Text>
                </View>
                <TouchableOpacity
                    style={styles.bottomButton}
                    onPress={()=>{
                      showToast();
                      onPressLogin();
                    }}
                    activeOpacity={0.8}>
                <Text>
                    로그인
                </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default LoginEmail;