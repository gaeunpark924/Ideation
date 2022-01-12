import React from 'react';
import {StyleSheet, Text, View, TextInput} from 'react-native';
// import { Button } from 'react-native-elements/dist/buttons/Button';
// import { TouchableHighlight } from 'react-native-gesture-handler';
// import { color } from 'react-native-reanimated';
const JoinFinished = ({route, navigation}) => {
  const {emailValue, pwdValue, pwdCheckValue} = route.params;
  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <View>
          <Text style={styles.bodyText}>환영합니다</Text>
        </View>
        <View style={{marginTop: 30}}>
          <Text>함께 아이디어 퍼즐을 완성해봐요!</Text>
          <Text>Email:{emailValue}</Text>
          <Text>Password:{pwdValue}</Text>
          <Text>PasswordCheck:{pwdCheckValue}</Text>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'column',
    justifyContent: 'space-between', //space-around
  },
  subContainer: {
    justifyContent: 'center',
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'column',
    alignItems: 'center',
  },
  button: {
    width: '100%',
    backgroundColor: '#E7D9FF',
  },
  bodyText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#E7D9FF',
  },
});

export default JoinFinished;
