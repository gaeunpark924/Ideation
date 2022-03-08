import React, { useContext, useEffect, useLayoutEffect } from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import { mainTheme } from '../../theme/theme';
import Back from 'react-native-vector-icons/MaterialIcons';
import {UserContext} from "../../../App"
import { CustomH } from '../../components/N';
const App = ({route, navigation}) => {

  const userCnt = useContext(UserContext)

  return (
    <View style={{flex:1,backgroundColor:mainTheme.colors.background,}}>
      <CustomH name={'계정 설정'} press={()=>{navigation.navigate("StackHomeNavigator")}}></CustomH>
      <View style={styles.container}>
        <View
          style={styles.subContainer}>
          <TouchableOpacity
            activeOpacity={1}
            style={styles.touchableopacity}>
            <Text style={styles.text}>이메일</Text>
            <Text style={{fontFamily:'SB_Aggro_L',fontSize:14}}>{userCnt.email}</Text>
          </TouchableOpacity>
        </View>
        <View
          style={styles.subContainer}>
          <TouchableOpacity
            style={styles.touchableopacity}
            onPress={()=>navigation.navigate('ReLogin',{name: '계정 삭제'})}
            >
            <Text style={[styles.text,{color:'gray'}]}>계정 삭제</Text>
            <Back
              style={[styles.arrow,{color:'gray'}]}
              name='arrow-back-ios'
              color="#000"
              size={24}/>
          </TouchableOpacity>
        </View>
    </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor:mainTheme.colors.background,
    paddingHorizontal:20,
    paddingTop:5
  },
  subContainer:{
    paddingVertical:15,
    borderBottomWidth:1,
    borderBottomColor:mainTheme.colors.fontGray,
  },
  touchableopacity:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
  },
  text:{
    fontFamily:'SB_Aggro_L',
    fontSize:16,
  },
  arrow:{
    marginStart:18,
    transform:[{rotate: '180deg'}]
  }
});
export default App;