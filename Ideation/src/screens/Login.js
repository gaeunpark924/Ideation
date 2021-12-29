import { NavigationContainer } from '@react-navigation/native';
import React, { Component, useState } from 'react';
import {StyleSheet, Text, View, TextInput, ToastAndroid} from 'react-native';
import { colors } from 'react-native-elements';
import { Button } from 'react-native-elements/dist/buttons/Button';
import { color } from 'react-native-reanimated';
//import { createStackNavigator } from '@react-navigation/stack';
//const Stack = createStackNavigator();

const Login = ({navigation}) => {
    return (
        <View style={styles.container}>
            <Text>회 원 가 입</Text>
            <View style={styles.button}>
              <Button
                title="회원가입"
                onPress={()=>navigation.navigate("JoinEmail")}
              />
            </View>
            <View style={styles.button}>
              <Button
                title="비밀번호 찾기"
                onPress={()=>navigation.navigate("SearchPwd")}
              />
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  subcontainer: {
    flex : 1,
    backgroundColor: 'white',
    flexDirection: 'column',
    padding : 20,
    justifyContent: 'space-between' //space-around
  },
  button:{
    width: '100%',
    backgroundColor : '#E7D9FF',
  },
});
export default Login;

