import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
const welcome = ({navigation}) => {
  function _onPressButton() {
    alert('You tapped the button!');
  }
  return (
    <View style={styles.welcome}>
      <TouchableOpacity>
        <View style={styles.body}>
          <View>
            <Text style={styles.title}>환영합니다</Text>
          </View>
          <View>
            <Text>함께 아이디어 퍼즐을 완성해봐요!</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  welcome: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red',
  },
  title: {
    fontSize: 50,
    marginBottom: 30,
    color: '#E7D9ff',
    fontWeight: 'bold',
  },
});
export default welcome;
