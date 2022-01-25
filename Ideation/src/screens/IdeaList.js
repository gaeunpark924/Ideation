import React, {useState, useCallback, useEffect} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import axios from 'axios';
import Youtube from './youtubeApi';
const Idealist = () => {
  return (
    <View>
      <Youtube />
    </View>
  );
};

export default Idealist;
