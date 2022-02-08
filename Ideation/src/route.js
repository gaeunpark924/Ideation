import React from 'react';
import {View, Text, DrawerButton, AsyncStorage} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import Loading from './screens/Loading';
import Login from './screens/login/Login';
import LoginEmail from './screens/login/LoginEmail';
import JoinEmail from './screens/join/JoinEmail';
import JoinPwd from './screens/join/JoinPwd';
import JoinPwdChecking from './screens/join/JoinPwdChecking';
import SearchPwd from './screens/pwd/SearchPwd';
import welcome from './screens/welcome';
import ideamatching from './screens/IdeaMatching';
import idealist from './screens/IdeaList';
import ideadevelop from './screens/IdeaDevelop';
import ideadeveloptest from './screens/IdeaDevelopTest';

// 앱이 각 화면이 전환될 수 있는 기본 틀을 제공한다.
const Stack = createStackNavigator();

const App = () => {
  console.log('route');
  return (
    <Stack.Navigator
      initialRouteName="Loading"
      options={{headerStyle: {backgroundColor: '#fdf8ff'}}}>
      {/* // screenOptions={{headerShown:false,headerBackTitleVisible: true, headerStyle: {backgroundColor: '#E7D9FF'},}}> */}
      <Stack.Screen
        name="Loading"
        component={Loading}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          title: '로그인',
          headerStyle: {backgroundColor: '#fdf8ff'},
          headerLeft: null,
          headerTitleStyle: {
            fontFamily: 'SB_Aggro_M',
            fontSize: 28,
          },
        }}
      />
      <Stack.Screen
        name="LoginEmail"
        component={LoginEmail}
        options={{
          title: '이메일로 로그인',
          headerStyle: {backgroundColor: '#fdf8ff'},
          headerTitleStyle: {
            fontFamily: 'SB_Aggro_M',
            fontSize: 28,
          },
        }}
      />
      <Stack.Screen
        name="JoinEmail"
        component={JoinEmail}
        options={{
          title: '회원가입 1/3단계',
          headerStyle: {backgroundColor: '#fdf8ff'},
          headerTitleStyle: {
            fontFamily: 'SB_Aggro_M',
            fontSize: 28,
          },
        }}
      />
      <Stack.Screen
        name="JoinPwd"
        component={JoinPwd}
        options={{
          title: '회원가입 2/3단계',
          headerStyle: {backgroundColor: '#fdf8ff'},
          headerTitleStyle: {
            fontFamily: 'SB_Aggro_M',
            fontSize: 28,
          },
        }}
      />
      <Stack.Screen
        name="JoinPwdChecking"
        component={JoinPwdChecking}
        options={{
          title: '회원가입까지 다 왔어요!',
          headerStyle: {backgroundColor: '#fdf8ff'},
          headerTitleStyle: {
            fontFamily: 'SB_Aggro_M',
            fontSize: 28,
          },
        }}
      />
      <Stack.Screen
        name="SearchPwd"
        component={SearchPwd}
        options={{
          title: '비밀번호 찾기',
          headerStyle: {backgroundColor: '#fdf8ff'},
          headerTitleStyle: {
            fontFamily: 'SB_Aggro_M',
            fontSize: 28,
          },
        }}
      />
      <Stack.Screen
        name="welcome"
        component={welcome}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="idealist"
        component={idealist}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ideadevelop"
        component={ideadevelop}
        options={{
          headerStyle: {
            backgroundColor: '#fdf8ff',
            borderBottomWidth: 2,
            borderBottomColor: '#1D1D1D',
          },
          headerTitle: 'Puzzle name',
          headerTitleStyle: {
            fontFamily: 'SB_Aggro_B',
            fontSize: 20,
          },
        }}
      />
      <Stack.Screen
        name="ideadeveloptest"
        component={ideadeveloptest}
        options={{
          headerStyle: {
            backgroundColor: '#fdf8ff',
            borderBottomWidth: 2,
            borderBottomColor: '#1D1D1D',
          },
          headerTitle: 'Puzzle name',
          headerTitleStyle: {
            fontFamily: 'SB_Aggro_B',
            fontSize: 20,
          },
        }}
      />
      <Stack.Screen
        name="ideamatching"
        component={ideamatching}
        options={{
          headerShown: true,
          headerBackTitleVisible: false,
          title: '',
          headerStyle: {backgroundColor: '#fdf8ff'},
        }}
      />
    </Stack.Navigator>
  );
};

export default App;
