import React from 'react';
import Main from './src/components/Main';
import {NavigationContainer} from '@react-navigation/native';
import Tab from './src/navigation/Tab';

export default function App() {
  return (
    <NavigationContainer>
      <Tab />
    </NavigationContainer>
  );
}
