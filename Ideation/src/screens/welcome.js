import React, { useEffect } from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {userInfo} from '../User'

const welcome = ({route, navigation}) => {
  const {userUid, email, emailVerified} = route.params;

  useEffect(()=>{
    setTimeout(() => {
      //console.log('email',email, userUid)
      userInfo.email = email;
      userInfo.uid = userUid;
      userInfo.emailVerified = emailVerified;
      //console.log('email',userInfo)
      //Stack 리셋하는 부분인데 작동 안함
      // const resetAction = StackActions.reset({
      //   index: 0,
      //   actions: [NavigationActions.navigate({
      //     routeName: "StackHomeNavigator",
      //   })]
      // })
      // navigation.dispatch(resetAction)
      //navigation.navigate("idealist", {"userUid":route.params})
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