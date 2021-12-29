import React, { useState } from 'react';
import {StyleSheet, Text, View, TextInput} from 'react-native';
import { Button } from 'react-native-elements/dist/buttons/Button';
import {KeyboardAvoidingView} from 'react-native';
const JoinPwd = ({route,navigation}) => {
    const { emailValue } = route.params;
    const [pwdValue, setPwdValue] = useState('');
    return (
        <View style={styles.container}>
            <KeyboardAvoidingView behavior="padding">
              <View style={{marginTop:110}}>
                <TextInput
                  underlineColorAndroid={'black'}
                  placeholder="비밀번호를 입력해주세요."
                  onChangeText={text=>setPwdValue(text)}
                  secureTextEntry={true}
                />
                <Text>든든한 보안을 위해 알파벳 + 숫자를 조합해주세요.</Text>
                {/* <Text>Email:{emailValue}</Text>
                <Text>Password:{pwdValue}</Text> */}
              </View>
            </KeyboardAvoidingView>
            <View style={styles.button}>
              <Button
                title="다음단계"
                onPress={()=>navigation.navigate("JoinPwdChecking",{ emailValue : emailValue, pwdValue : pwdValue})}/>
            </View>    
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
      flex : 1,
      backgroundColor: 'white',
      flexDirection: 'column',
      padding: 20,
      justifyContent: 'space-between' //space-around
    },
    button:{
        width: '100%',
        minWidth : 125,
        minHeight : 56,
        justifyContent: 'center',
        backgroundColor : '#E7D9FF',
    },
    box1: {
      width: 200,
      height : 200,
      backgroundColor: 'powderblue',
    },
    box2: {
      width: 200,
      height: 200,
      backgroundColor: 'skyblue',
    },
    box3: {
      width: 200,
      height: 200,
      backgroundColor: 'steelblue',
    },
});


export default JoinPwd;