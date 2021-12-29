import React, { useState } from 'react';
import {StyleSheet, Text, View, TextInput, ToastAndroid} from 'react-native';
import { Button } from 'react-native-elements/dist/buttons/Button';
import {KeyboardAvoidingView} from 'react-native';
const showToast = () =>{
  ToastAndroid.show("이용약관 클릭", ToastAndroid.SHORT);
};
const JoinPwdChecking = ({route, navigation}) => {
  const { emailValue, pwdValue } = route.params;
  const [ pwdCheckValue, setPwdCheckValue] = useState('');
    return (
        <View style={styles.container}>
          <KeyboardAvoidingView behavior="padding"> 
            <View style={{marginTop:110}}>
              <TextInput
                underlineColorAndroid={'black'}
                placeholder="비밀번호를 한번 더 확인해주세요."
                onChangeText={text=>setPwdCheckValue(text)}
                secureTextEntry={true}  //비밀번호 * 처리
              />
              <Text>실수는 누구나 하니까요!</Text>
                {/* <Text>Email:{emailValue}</Text>
                <Text>Password:{pwdValue}</Text>
                <Text>PasswordCheck:{pwdCheckValue}</Text> */}
            </View>
          </KeyboardAvoidingView>
        <View>
        <View style={{alignItems:'center',marginBottom:20}}>
          <Text style={styles.textUseCondition} onPress={() => showToast()}> {"이용악관 보기"} </Text>
        </View>
        <View style={styles.button}>
          <Button
            title="이용약관에 동의하고 가입완료하기"
            color="#f194ff"
            //navigation.reset({routes:[{name:"JoinFinished"}]})
            //onPress={()=>navigation.navigate("JoinFinished",{ emailValue : emailValue, pwdValue : pwdValue, pwdCheckValue : pwdCheckValue})}
            onPress={()=>navigation.popToTop()}
          /> 
        </View>
        </View>
      </View>
    );
};
const styles = StyleSheet.create({
    container: {
      flex : 1,
      backgroundColor: 'white',
      flexDirection: 'column',
      padding : 20,
      justifyContent: 'space-between' //space-around
    },
    button:{
        width: '100%',
        minWidth : 125,
        minHeight : 56,
        justifyContent: 'center',
        backgroundColor : '#E7D9FF',
    },
    textUseCondition:{
        color:"#000000",
        textDecorationLine:'underline',
    },
});

export default JoinPwdChecking;