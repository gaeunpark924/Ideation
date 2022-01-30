import React, {useState, useCallback, useEffect} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import axios from 'axios';
import Addkeyword from '../components/AddKeyword';
const Idealist = () => {
  const [tempkey, setTempkey] = useState('노래');
  return (
    <View>
      <Addkeyword tempkey={tempkey} />
    </View>
  );
};

export default Idealist;
