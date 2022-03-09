import React, {useEffect, createContext, useState}  from 'react';
import {NavigationContainer} from '@react-navigation/native';
import DrawerNavigator from './src/route';
import CodePush from 'react-native-code-push';

export const UserContext = createContext();

const App = () => {
  console.log("App.js")
  const userCnt = {
    email:'abc@gmail.com',
    uid:'',
  }
  useEffect(() => {
    CodePush.sync(
      {
        installMode: CodePush.InstallMode.IMMEDIATE,
        mandatoryInstallMode: CodePush.InstallMode.IMMEDIATE,
        updateDialog: {
          title: '업데이트 안내',
          optionalUpdateMessage: '새로운 업데이트가 있습니다. 지금 하시겠습니까?',
          optionalIgnoreButtonLabel: '나중에',
          optionalInstallButtonLabel: '업데이트',
          mandatoryUpdateMessage: '더 나은 기능 제공을 위해 앱이 업데이트 됩니다.',
          mandatoryContinueButtonLabel: '업데이트 후 재시작',
        },
      },
    ).then(status => {
      console.log('CodePush', status);
    });
  }, []);
  return (
    <UserContext.Provider value={userCnt}>
      <NavigationContainer>
        <DrawerNavigator/>
      </NavigationContainer>
    </UserContext.Provider>
  );
};

const codePushOptions = {
  checkFrequency: CodePush.CheckFrequency.ON_APP_START, //언제 업데이트를 체크하고 반영할지 결정. 앱이 실행되는(켜지는) 순간을 의미
  installMode: CodePush.InstallMode.IMMEDIATE, //업데이트를 어떻게 설치할 것인지(IMMEDIATE는 강제 설치)  
}

export default CodePush(codePushOptions)(App);