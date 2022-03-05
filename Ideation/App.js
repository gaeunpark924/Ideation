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
  const [emailCnt, setEmailCnt] = useState('abc@gmail.com')
  const [uidCnt, setUidCnt] = useState()
  const emailCntHandler = (email) => setEmailCnt(email)
  const uidCntHandler = (email) => setUidCnt(email)
  //const [uidCnt, setUidCnt] = useState()
  return (
    // <UserContext.Provider value={{emailCnt, uidCnt, emailCntHandler, uidCntHandler}}>
    <UserContext.Provider value={userCnt}>
      <NavigationContainer>
        {/* <Route/> */}
        <DrawerNavigator/>
      </NavigationContainer>
    </UserContext.Provider>
  );
};

export default App;