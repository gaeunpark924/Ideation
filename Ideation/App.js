import React, {useContext, createContext, useState}  from 'react';
import {NavigationContainer} from '@react-navigation/native';
import DrawerNavigator from './src/route';
// import { Icon } from 'react-native-elements';

export const UserContext = createContext();

const App = () => {
  console.log("App.js")
  const userCnt = {
    email:'abc@gmail.com',
    uid:'',
  }
  return (
    <UserContext.Provider value={userCnt}>
      <NavigationContainer>
        <DrawerNavigator/>
      </NavigationContainer>
    </UserContext.Provider>
  );
};

export default App;