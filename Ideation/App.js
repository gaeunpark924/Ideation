import React from 'react';
import Main from './src/components/Main';
import {NavigationContainer} from '@react-navigation/native';
import {Text, View} from 'react-native';
import Tab from './src/navigation/Tab';
import { createStackNavigator } from '@react-navigation/stack';

import Login from './src/screens/Login';
import JoinEmail from './src/screens/JoinEmail';
import JoinPwd from './src/screens/JoinPwd';
import JoinPwdChecking from './src/screens/JoinPwdChecking';
import JoinFinished from './src/screens/JoinFinished';
import SearchPwd from './src/screens/SearchPwd';
import ResetPwd from './src/screens/ResetPwd';
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login}/>
        <Stack.Screen name="JoinEmail" component={JoinEmail} options={{title:"회원가입 1단계"}}/>
        <Stack.Screen name="JoinPwd" component={JoinPwd} options={{title:"회원가입 2단계"}}/>
        <Stack.Screen name="JoinPwdChecking" component={JoinPwdChecking} options={{title:"회원가입까지 다 왔어요!"}}/>
        <Stack.Screen name="JoinFinished" component={JoinFinished} options={{headerShown:false, gestureEnabled:true, gestureDirection:"horizontal"}}/>
        <Stack.Screen name="SearchPwd" component={SearchPwd} options={{title:"비밀번호 찾기"}}/>
        <Stack.Screen name="ResetPwd" component={ResetPwd} options={{title:"비밀번호 재설정"}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

