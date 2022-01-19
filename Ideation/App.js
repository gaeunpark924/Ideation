import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Route from './src/route';
// import { Icon } from 'react-native-elements';

const App = () => {
  console.log("App.js")
  return (
    <NavigationContainer>
      <Route/>
    </NavigationContainer>
  );
};

export default App;