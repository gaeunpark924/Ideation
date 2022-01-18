import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import auth from '@react-native-firebase/auth';

const welcome = ({navigation}) => {
  return (
    <View style={styles.welcome}>
      <TouchableOpacity>
        <View style={styles.body}>
          <View>
            <TouchableOpacity onPress={() => navigation.navigate('idealist')}>
              <Text style={styles.title}>환영합니다</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('ideamatching')}>
              <Text style={styles.title}>환영합니다</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('ideadevelop')}>
              <Text style={styles.title}>환영합니다</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                auth().signOut();
                navigation.navigate('Login');
                }}>
              <Text style={styles.title}>로그아웃</Text>
            </TouchableOpacity>
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
  },
  title: {
    fontSize: 50,
    marginBottom: 30,
    color: '#E7D9ff',
    fontWeight: 'bold',
  },
});
export default welcome;
