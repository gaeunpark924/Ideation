import React from 'react';
import {View, Text, StyleSheet, DrawerButton} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import welcome from './src/screens/welcome';
import ideamatching from './src/screens/MyIdea';
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
        }}>
        {/* 해당스택에 들어갈 화면 요소를 넣어준다. */}
        <Stack.Screen name="ideamatching" component={ideamatching} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({});
export default App;
