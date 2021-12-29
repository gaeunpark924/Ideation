import React from 'react';
import {StyleSheet, Text, View, TextInput, ToastAndroid} from 'react-native';
import { Button } from 'react-native-elements/dist/buttons/Button';
import {KeyboardAvoidingView} from 'react-native';
const ResetPwd = ({navigation}) => {
    return (
        <View style={styles.container}>
            <KeyboardAvoidingView behavior="padding">
              <View style={{marginTop:110}}>
                <TextInput
                  underlineColorAndroid={'black'}
                  placeholder="비밀번호 입력"
                />
              </View>
              <View style={{marginTop:50}}>
                <TextInput
                  underlineColorAndroid={'black'}
                  placeholder="비밀번호 확인"
                />
              </View>
            </KeyboardAvoidingView>
            <View style={styles.button}>
              <Button
                title="비밀번호 재설정"
                //onPress={()=>navigation.navigate()}
                />
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
});


export default ResetPwd;