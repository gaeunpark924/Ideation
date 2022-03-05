import React, { useRef, useState, useEffect, useContext} from 'react';
import { Text, View, TextInput, ToastAndroid, TouchableOpacity,
  KeyboardAvoidingView, StyleSheet, Alert, Keyboard,
  StackActions, NavigationActions  } from 'react-native';
import auth from '@react-native-firebase/auth';
import { color } from 'react-native-reanimated';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import {userInfo} from '../../User'
import {UserContext} from "../../../App"
import { mainTheme } from "../../theme/theme";
import { CustomH,BottomButton } from '../../components/N';


const LoginEmail = ({navigation}) => {
  const userCnt = useContext(UserContext)
  const passwordInput = useRef();
  const emailInput = useRef()
  const [ keyboardOffset, setKeyboardOffset] = useState()
  const onPressSearchPwd = ()=>{
    navigation.navigate("SearchPwd")
  }
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  function onPressLogin() {
    console.log(email, password);
    if (email && password) {  //email, pass null, 공백 처리
      auth().signInWithEmailAndPassword(email, password)
        .then((user) => {
          userCnt.email = user.user.email
          userCnt.uid = user.user.uid
          //Stack 리셋하는 부분인데 작동 안함
          // const resetAction = StackActions.reset({
          //   index: 0,
          //   actions: [NavigationActions.navigate({
          //     routeName: "StackHomeNavigator",
          //   })]
          // })
          // navigation.dispatch(resetAction)
          navigation.navigate("StackHomeNavigator")
        })
        .catch((error) => {
          switch(error.code){
            case 'auth/wrong-password':
              Alert.alert("경고",'비밀번호가 틀렸습니다',[{text:"확인"}]);
              setPassword('')
              break;
            case 'auth/user-not-found':
              Alert.alert("경고",'등록되지 않은 사용자입니다.',[{text:"확인"}]);
              setEmail('')
              setPassword('')
              break;
            case 'auth/invalid-email':
              Alert.alert("경고",'이메일 형식이 아닙니다.',[{text:"확인"}]);
              setEmail('')
              setPassword('')
              break;
            default:
              Alert.alert("error",error.code,[{text:"확인"}]);
              setEmail('')
              setPassword('')
              break;
          }
        })
      }else if(!email){
        Alert.alert("경고",'이메일을 입력해주세요.',[{text:"확인",onPress: ()=> {emailInput.current.focus()}}]);
      }else if(!password){
        Alert.alert("경고",'비밀번호를 입력해주세요.',[{text:"확인",onPress: ()=> {passwordInput.current.focus()}}]);
      }
    }
    useEffect(()=>{
      emailInput.current.focus()
    },[])
    return (
      <View style={{flex:1,backgroundColor : mainTheme.colors.background,flexDirection:'column'}}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={()=>{Keyboard.dismiss()}}
          style={{flex:1}}>
          <CustomH name={'이메일로 로그인'} press={()=>{navigation.goBack()}}/>
            {/* <TouchableWithoutFeedback onPress={Keyboard.dismiss}> */}
            <View style={styles.container}>
            <View>
              <View style={{marginTop:110}}>
                <TextInput
                  ref={emailInput}
                  underlineColorAndroid={'black'}
                  style={{
                    fontSize:18,
                    fontFamily:'SB_Aggro_L'
                  }}
                  placeholder="이메일 입력"
                  returnKeyType="next"
                  onChangeText={(e) => setEmail(e)}
                  defaultValue={email}/>
              </View>
              <View style={{marginTop:40}}>
                <TextInput
                  ref={passwordInput}
                  underlineColorAndroid={'black'}
                  style={{
                    fontSize:18,
                    fontFamily:'SB_Aggro_L'
                  }}
                  placeholder="비밀번호 입력"
                  secureTextEntry={true}
                  onChangeText={(e) => setPassword(e)}
                  defaultValue={password}
                />
              </View>
              </View>
            <View>
            <View style={{alignItems:'center',marginBottom:20}}>
              <Text
                style={styles.textUseCondition}
                onPress={onPressSearchPwd}>
                {"  비밀번호 찾기  "}
              </Text>
            </View>
            <BottomButton name={'로그인'} press={onPressLogin}/>
          </View>
        </View>
        </TouchableOpacity>
      </View>
    );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    paddingHorizontal: 20,
    paddingBottom: 20,
    justifyContent: 'space-between',
    backgroundColor : mainTheme.colors.background
  },
  textUseCondition: {
    color: mainTheme.colors.black, 
    paddingBottom: 6,
    borderBottomWidth: 1,
    fontSize:14,
    fontFamily: mainTheme.font.L//'SB_Aggro_M'
  },
});

export default LoginEmail;