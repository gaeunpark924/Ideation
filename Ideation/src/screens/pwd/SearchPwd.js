import React, { useState } from 'react';
import {StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import {KeyboardAvoidingView} from 'react-native';
import styles from '../../styles/style';
import auth from '@react-native-firebase/auth';

const SearchPwd = ({navigation}) => {
    const [email,setEmail] = useState('')
    const onPressNavigation = () => {
      if (email !== ''){
        sendUserEmail()
      }
    }
    async function sendUserEmail() {
      await auth().sendPasswordResetEmail(email)
        .then((user) => {
          navigation.goBack()       
        })
        .catch((error) => {
          console.log(error)
          if (error.code === 'auth/user-not-found'){
            console.log('등록된 이메일이 아닙니다')
          } else if (error.code === 'auth/invalid-email'){
            console.log('이메일 형식이 아닙니다')
          }
        })
    }
    return (
        <View style={styles.container}>
            <KeyboardAvoidingView behavior="padding">
              <View style={{marginTop:110}}> 
                <TextInput
                  underlineColorAndroid={'black'}
                  placeholder="이메일 주소를 알려주세요."
                  autoFocus={true}
                  onSubmitEditing={() =>onPressNavigation()}
                  onChangeText={(text)=>setEmail(text)}  
                />
                <Text>비밀번호 재설정 링크를 보내드립니다.</Text>
              </View>
            </KeyboardAvoidingView>
            <TouchableOpacity
              style={styles.bottomButton}
              onPress={onPressNavigation}
              activeOpacity={0.8}>
              <Text>
                재설정 링크 전송
              </Text>
            </TouchableOpacity>    
        </View>
    );
};

export default SearchPwd;