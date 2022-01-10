import React from 'react';
import {View, Text, StyleSheet, DrawerButton} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import welcome from './src/screens/welcome';
import ideamatching from './src/screens/IdeaMatching';
import idealist from './src/screens/IdeaList';
import ideadevelop from './src/screens/IdeaDevelop';

import Login from './src/screens/login/Login';
import LoginEmail from './src/screens/login/LoginEmail';
import JoinEmail from './src/screens/join/JoinEmail';
import JoinPwd from './src/screens/join/JoinPwd';
import JoinPwdChecking from './src/screens/join/JoinPwdChecking';
import JoinFinished from './src/screens/JoinFinished';
import SearchPwd from './src/screens/pwd/SearchPwd';
import ResetPwd from './src/screens/pwd/ResetPwd';
// import { Icon } from 'react-native-elements';
// import Tab from './src/navigation/Tab';
// import Main from './src/components/Main';

// 앱이 각 화면이 전환될 수 있는 기본 틀을 제공한다.
const Stack = createStackNavigator();

const App = () => {
  return (
    //네비게이션의 트리를 관리해주는 컴포넌트
    <NavigationContainer>
      {/* 네비게이션 기본틀의 스택을 생성 */}
      <Stack.Navigator
        screenOptions={{
          headerShown: true,
          headerBackTitleVisible: false,
          headerStyle: {backgroundColor: '#E7D9FF'},
        }}>
        {/* 회원가입 페이지 
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            title: '로그인',
            headerBackTitleStyle: true,
          }}
        />
        <Stack.Screen
          name="LoginEmail"
          component={LoginEmail}
          options={{title: '이메일로 로그인'}}
        />
        <Stack.Screen
          name="JoinEmail"
          component={JoinEmail}
          options={{title: '회원가입 1단계'}}
        />
        <Stack.Screen
          name="JoinPwd"
          component={JoinPwd}
          options={{title: '회원가입 2단계'}}
        />
        <Stack.Screen
          name="JoinPwdChecking"
          component={JoinPwdChecking}
          options={{title: '회원가입까지 다 왔어요!'}}
        />
        <Stack.Screen
          name="JoinFinished"
          component={JoinFinished}
          options={{
            headerShown: false,
            gestureEnabled: true,
            gestureDirection: 'horizontal',
          }}
        />
        <Stack.Screen
          name="SearchPwd"
          component={SearchPwd}
          options={{title: '비밀번호 찾기'}}
        />
        <Stack.Screen
          name="ResetPwd"
          component={ResetPwd}
          options={{title: '비밀번호 재설정'}}
        />
*/}
        {/* 메인 페이지들 */}
        <Stack.Screen name="welcome" component={welcome} />
        <Stack.Screen name="idealist" component={idealist} />
        <Stack.Screen name="ideadevelop" component={ideadevelop} />
        <Stack.Screen name="ideamatching" component={ideamatching} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({});
export default App;
