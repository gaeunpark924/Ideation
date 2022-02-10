import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import DrawerNavigator from './src/route';
// import { Icon } from 'react-native-elements';

const App = () => {
  console.log("App.js")
  return (
    <NavigationContainer>
      {/* <Route/> */}
      <DrawerNavigator/>
    </NavigationContainer>
  );
};

export default App;