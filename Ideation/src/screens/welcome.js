import React, { useEffect, useContext } from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {userInfo} from '../User'
import {UserContext} from "../../App"

const welcome = ({route, navigation}) => {
  const {userUid, email} = route.params;
  const userCnt = useContext(UserContext)

  useEffect(()=>{
    setTimeout(() => {
      userCnt.email = email
      userCnt.uid = userUid
      navigation.navigate("StackHomeNavigator")
    }, 2000)
  },[])
  return (
    <View style={styles.welcome}>
        <View>
            <Text style={styles.title}>Let's Puzzling!</Text>
        </View>
        <View style={{alignItems:'center'}}>
            <Text style={styles.sub}>퍼즐링 아이디어와 함께</Text>
            <Text style={styles.sub}>아이디어 퍼즐을 완성해봐요!</Text>
        </View>
    </View>
  );
};
const styles = StyleSheet.create({
  welcome: {
    height:'100%',
    backgroundColor:'#FDF8FF',
    flex: 1,
    justifyContent:'center',
    alignItems:'center'
  },
  title: {
    marginBottom: 30,
    color: '#CCA5FF',
    fontFamily: 'SB_Aggro_M',
    fontSize:32
  },
  sub: {
    fontFamily: 'SB_Aggro_M',
    paddingVertical: 5,
    fontSize:14
  }
});
export default welcome;