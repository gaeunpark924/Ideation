import React from 'react';
import {StyleSheet, Text, View, TextInput, ToastAndroid} from 'react-native';
import { Button } from 'react-native-elements/dist/buttons/Button';
import {KeyboardAvoidingView} from 'react-native';
const SearchPwd = ({navigation}) => {
    return (
        <View style={styles.container}>
            <KeyboardAvoidingView behavior="padding">
              <View style={{marginTop:110}}> 
                <TextInput
                  underlineColorAndroid={'black'}
                  placeholder="이메일 주소를 알려주세요."
                // onChangeText={(input)=>{this.setState({
                //     email:input
                // })}}
                />
                <Text>비밀번호 재설정 링크를 보내드립니다.</Text>
              </View>
            </KeyboardAvoidingView>
            <View style={styles.button}>
                <Button
                    title="재설정 링크 전송"
                    onPress={()=>navigation.navigate("ResetPwd")}/>
            </View>    
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
      flex : 1,                  //크기를 비율로. weight와 같음
      backgroundColor: 'white',  
      flexDirection: 'column',   //방향
      padding: 20,               //내부 구성요소
      justifyContent: 'space-between' //space-around 양쪽 정렬 space-around 공백이 있는 양쪽 정렬
    },
    button:{
        width: '100%',
        minWidth : 125,
        minHeight : 56,
        justifyContent: 'center',
        backgroundColor : '#E7D9FF',
    },
});


export default SearchPwd;