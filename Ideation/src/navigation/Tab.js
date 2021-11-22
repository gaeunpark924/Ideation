import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import IdeaCommunity from '../screens/IdeaCommunity';
import MyIdea from '../screens/MyIdea';
import IdeaMatching from '../screens/IdeaMatching';
import {Icon} from 'react-native-elements';
const BTab = createBottomTabNavigator();

const TabNavigation = () => {
  return (
    <BTab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="랜덤 아이디어 매칭">
      <BTab.Screen name="아이디어 발전 커뮤니티" component={IdeaCommunity} />
      <BTab.Screen name="랜덤 아이디어 매칭" component={MyIdea} />
      <BTab.Screen name="나의 아이디어" component={IdeaMatching} />
    </BTab.Navigator>
  );
};

export default TabNavigation;
