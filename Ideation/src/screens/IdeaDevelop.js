import React, {useRef, useState, useEffect} from 'react';
import {StyleSheet, Text, View, TextInput, Switch, Button} from 'react-native';
import ModalSelector from 'react-native-modal-selector';
function IdeaCommunity() {
  const [count, setCount] = useState(0);
  const intervalId = useRef(null);

  const startCounter = () => {
    intervalId.current = setInterval(() => setCount(count => count + 1), 1000);
  };
  const stopCounter = () => {
    clearInterval(intervalId.current);
  };
  return (
    <View>
      <Text>{count}번 클릭했습니다.</Text>
      <Button onPress={startCounter} title="시작"></Button>
      <Button onPress={stopCounter} title="정지"></Button>
    </View>
  );
}

export default IdeaCommunity;
