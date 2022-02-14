import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, ToastAndroid, TouchableOpacity,Alert,Keyboard } from 'react-native';
import {KeyboardAvoidingView} from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import auth from '@react-native-firebase/auth';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

const showClauseToast = () =>{
  ToastAndroid.show("이용약관 클릭", ToastAndroid.SHORT);
};
const showEmailAlreadyToast = () =>{
  ToastAndroid.show("사용 중인 이메일 입니다", ToastAndroid.SHORT);
}
const showEmailInvalidToast = () => {
  ToastAndroid.show("이메일 형식이 아닙니다")
}

const JoinPwdChecking = ({route, navigation}) => {
    const { emailValue, pwdValue } = route.params;
    const [ pwdCheckingValue, setPwdCheckingValue] = useState('');
    const [ isLogged ,setIsLogged ] = useState(false);
    
    const { control, watch, formState: { errors }, getValues} = useForm({
      mode : 'onChange', reValidateMode: 'onChange', criteriaMode: "firstError",  //mode : 'onChange' 값이 변할때마다 유효성 확인
      defaultValues:{
        pwdCheckingForm : '',
      },
    });
    const onPressNavigation = () =>{
      Keyboard.dismiss()
      (errors.pwdCheckingForm === undefined && pwdCheckingValue !== undefined)
      ? createUser()//navigation.popToTop() //navigation.navigate("ideadevelop") // idea develop으로 변경
      : null
    }
    async function createUser() {
      console.log(emailValue, pwdValue);
      await auth().createUserWithEmailAndPassword(emailValue,pwdValue)
        .then((user) => {
          //console.log(user.user)
          navigation.navigate("welcome",{"userUid":user.user.uid,"email":user.user.email,"emailVerified":user.user.emailVerified})
          //checkEmailVerification()       
        })
        .catch((error) => {
          if (error.code === 'auth/email-already-in-use'){
            Alert.alert("경고","사용 중인 이메일 입니다.",[{text:"확인"}]);
          } else if (error.code == 'auth/invalid-email'){
            Alert.alert("경고","이메일 형식이 아닙니다.",[{text:"확인"}]);
          }
        })
    }
    async function checkEmailVerification(){
      if (auth().currentUser.emailVerified){
        navigation.navigate("welcome")
      } else {
        await auth().currentUser.sendEmailVerification()
          .then(()=>{
            navigation.popToTop() //스택의 첫 화면으로 이동
          })
          .catch((error) => {
            console.log('error',error)
          })
      } 
    }
    return (
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS == "ios" ? 0 : 110}>
          <KeyboardAvoidingView behavior="padding">
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={{marginTop:110}}>
              <Controller
                control={control}
                rules={{
                  required : true,    //폼 제출을 위해 반드시 필요한 항목일 때
                  validate: value => value === pwdValue || '이전 비밀번호와 일치하지 않습니다.'
                }}
                render={(props) => 
                  <TextInput           //대문자로 시작하는건 React 컴포넌트//소문자는 html 컴포넌트
                    {...props}
                    underlineColorAndroid={'black'}
                    style={{
                      fontSize:18,
                      fontFamily:'SB_Aggro_L',
                    }}
                    placeholder="비밀번호를 한번 더 확인해주세요."
                    secureTextEntry={true}
                    onChange={(e)=>{setPwdCheckingValue(e.nativeEvent.text)}}  //state 업데이트
                    onChangeText={props.field.onChange}                                 
                    onBlur={props.field.onBlur}
                    value={props.field.value}
                    autoFocus={true}
                    onSubmitEditing={() =>onPressNavigation()}
                  />
                }
                name="pwdCheckingForm" 
              />
              {errors.pwdCheckingForm
              ? pwdCheckingValue===''
                ? <Text style={styles.textStyle}>실수는 누구나 하니까요!</Text>
                : <Text style={styles.textStyle2}>{errors.pwdCheckingForm.message}</Text>
              : (getValues('pwdCheckingForm') === '' || pwdCheckingValue ===''
                ? <Text style={styles.textStyle}>실수는 누구나 하니까요!</Text>
                : <Text style={styles.textStyle}>이용 약관에 동의해주세요.</Text>
                )
              }  
            </View>
            </TouchableWithoutFeedback> 
          </KeyboardAvoidingView>
          <View>
            <View style={{alignItems:'center',marginBottom:20}}>
              <Text
                style={styles.textUseCondition}
                onPress={() => showClauseToast()}>
                  {"  이용악관 보기  "}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.bottomButton}
              onPress={onPressNavigation}
              activeOpacity={0.8}>
              <Text style={{fontSize:16, fontFamily:'SB_Aggro_M'}}>
                이용약관에 동의하고 가입완료하기
              </Text>
            </TouchableOpacity>
            {/* { isLogged ? navigation.navigate("welcome"): <Text>초기화 중 입니다.</Text>} */}
          </View>
          </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'column',
    padding: 20,
    justifyContent: 'space-between',
    backgroundColor: '#FDF8FF'
  },
  bottomButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    minWidth: 125, //최소 너비
    minHeight: 56, //최소 높이
    borderWidth: 1, //테두리 굵기
    borderColor: 'black', //테두리
    backgroundColor: '#E7D9FF', //배경
  },
  textUseCondition: {
    color: '#000000',
    paddingBottom: 6,
    borderBottomWidth: 2,
    fontFamily:'SB_Aggro_M',
    fontSize:14
    //textDecorationLine:'underline',
  },
  textStyle:{
    fontSize:14,
    fontFamily:'SB_Aggro_M',
    marginLeft:5,
    marginTop:10
  },
  textStyle2:{
    fontSize:14,
    fontFamily:'SB_Aggro_M',
    marginLeft:5,
    marginTop:10,
    color:'#FF3F25'
  }
});


export default JoinPwdChecking;