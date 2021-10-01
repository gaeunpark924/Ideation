import React from 'react';
import Main from './src/components/Main';
import {NavigationContainer} from '@react-navigation/native';
import {Text, View} from 'react-native';
// import StatusBar from './src/components/StatusBar';
import Tab from './src/navigation/Tab';

export default function App() {
  return (
    <NavigationContainer>
      <Tab />
    </NavigationContainer>
  );
}
