import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput} from 'react-native';

import { Button } from 'react-native-elements/dist/buttons/Button';
import { KeyboardAvoidingView } from 'react-native';
const JoinEmail = ({navigation}) => {

    const [emailValue, setEmailValue] = useState('');

    return (
        <View style={styles.container}>
          <KeyboardAvoidingView behavior="padding">
            <View style={{marginTop:110}}>
              <TextInput
                underlineColorAndroid={'black'}
                placeholder="이메일 주소를 알려주세요."
                onChangeText={text=>setEmailValue(text)}
              />
            <Text>비밀번호를 재설정할 때 필요해요.</Text>
            {/* <Text>Email:{emailValue}</Text> */}
            </View>
          </KeyboardAvoidingView> 
            <View style={styles.button}>
              <Button
                title="다음단계"
                onPress={()=>navigation.navigate("JoinPwd",{emailValue : emailValue})}
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
      padding : 20,
      justifyContent: 'space-between'
    },
    button:{
        width: '100%',
        minWidth : 125,
        minHeight : 56,
        justifyContent: 'center',
        backgroundColor : '#E7D9FF',
    },
});

export default JoinEmail;