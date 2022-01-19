import React, { useEffect } from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

const welcome = ({navigation}) => {
  useEffect(()=>{
    setTimeout(() => {
      navigation.navigate("idealist")
    }, 2000)
  },[])
  return (
    <View style={styles.welcome}>
        <View>
            <Text style={styles.title}>환영합니다</Text>
        </View>
        <View>
            <Text>함께 아이디어 퍼즐을 완성해봐요!</Text>
        </View>
    </View>
  );
};
const styles = StyleSheet.create({
  welcome: {
    height:'100%',
    //backgroundColor:'#E7D9FF',
    flex: 1,
    justifyContent:'center',
    alignItems:'center'
  },
  title: {
    fontSize: 50,
    marginBottom: 30,
    color: '#E7D9ff',
    fontWeight: 'bold',
  },
});
export default welcome;