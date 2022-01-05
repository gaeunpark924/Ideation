import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import styles from '../../styles/style';
import { Icon } from 'react-native-elements';

const Login = ({navigation}) => {
    const onPressEmailLogin = ()=>{
      navigation.navigate("LoginEmail")
    }
    const onPressJoin = () =>{
      navigation.navigate("JoinEmail")
    }
    return (
        <View style={styles.container}>
            <View style={{marginTop:110}}>
              <TouchableOpacity
                style={{flexDirection: 'row',
                        alignItems: "center",
                        width: '100%',
                        minWidth : 125,          //최소 너비
                        minHeight : 56,
                        borderWidth : 2,
                        borderColor : 'black'
                      }}
                onPress={()=>console.log("페이스북으로 로그인")}
                activeOpacity={0.8}>
                <Image style={{width: 30, height: 30, margin : 10}} source={require('../../assets/facebook.png')}/>  
                <Text style={{margin : 10}}>
                  페이스북으로 로그인
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{flexDirection: 'row',
                        alignItems: "center",
                        width: '100%',
                        minWidth : 125,          //최소 너비
                        minHeight : 56,
                        marginTop : 10, 
                        borderWidth : 2,
                        borderColor : 'black'
                      }}
                onPress={()=>console.log("구글로 로그인")}
                activeOpacity={0.8}>
                <Image style={{width: 30, height: 30, margin : 10}} source={require('../../assets/google.png')} resizeMode='cover'/>   
                <Text style={{margin : 10}}>
                  구글로 로그인
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{flexDirection: 'row',
                        alignItems: 'center',
                        width: '100%',
                        minWidth : 125,          //최소 너비
                        minHeight : 56,
                        marginTop : 10,
                        borderWidth : 2,
                        borderColor : 'black',
                      }}
                onPress={onPressEmailLogin}
                activeOpacity={0.8}>
                <Icon style={{margin : 10}} name='mail' size={25} type='ant-design' />  
                <Text style={{margin : 10}}>
                  이메일로 로그인
                </Text>
              </TouchableOpacity>
              <View style={{alignItems:'center',marginTop:60}}>
                <Text
                  style={styles.textUseCondition}
                  onPress={onPressJoin}>
                  {"  회원가입  "}
                </Text>
              </View>
            </View>
        </View>
    );
};
// const styles = StyleSheet.create({
//   justifyContent : 'center',
//         alignItems: "center",
//         width: '100%',
//         minWidth : 125,          //최소 너비
//         minHeight : 56,          //최소 높이
//         borderWidth : 2,         //테두리 굵기
//         borderColor : 'black',   //테두리
//         backgroundColor : '#E7D9FF',   //배경
// });
export default Login;

