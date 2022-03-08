import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TextInput, ToastAndroid, TouchableOpacity,Alert,Keyboard, SafeAreaView } from 'react-native';
import {KeyboardAvoidingView} from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import auth from '@react-native-firebase/auth';
import { CustomH, BottomButton, TxtInMessage } from '../../components/N';
import { mainTheme } from '../../theme/theme';
import AndroidKeyboardAdjust from 'react-native-android-keyboard-adjust';

const JoinPwdChecking = ({route, navigation}) => {
    const { emailValue, pwdValue} = route.params;
    const [ pwdCheckingValue, setPwdCheckingValue] = useState('');
    const [ policy, setPolicy] = useState(false)
    const ref = useRef()
    AndroidKeyboardAdjust.setAdjustResize();
    const { control, watch, formState: { errors }, getValues} = useForm({
      mode : 'onChange', reValidateMode: 'onChange', criteriaMode: "firstError",  //mode : 'onChange' 값이 변할때마다 유효성 확인
      defaultValues:{
        pwdCheckingForm : '',
      },
    });
    const onPressNavigation = () =>{
      (policy && errors.pwdCheckingForm === undefined && pwdCheckingValue !== undefined)
      ? createUser()
      : null
    }
    const onPressPolicy = () => {
      setPolicy(true)
      navigation.navigate("PersonalPolicy")
    }
    async function createUser() {
      console.log(emailValue, pwdValue);
      await auth().createUserWithEmailAndPassword(emailValue,pwdValue)
        .then((user) => {
          navigation.navigate("welcome",{"userUid":user.user.uid,"email":user.user.email,"emailVerified":user.user.emailVerified})
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
    useEffect(() => {
      ref.current.focus()
    }, []);
    return (
      <View style={{flex:1,backgroundColor:mainTheme.colors.background,}}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={()=>{Keyboard.dismiss()}}
        style={{flex:1}}>
      <CustomH name={'회원가입까지 다 왔어요!'} press={()=>{navigation.goBack()}}/>
        <View style={styles.container}>
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
                  ref={ref}
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
                  onSubmitEditing={onPressNavigation}
                />
              }
              name="pwdCheckingForm" 
            />
            {errors.pwdCheckingForm
            ? pwdCheckingValue===''
              ? <TxtInMessage name='실수는 누구나 하니까요!'></TxtInMessage>
              : <TxtInMessage name={errors.pwdCheckingForm.message} style={{color:mainTheme.colors.warning}}></TxtInMessage>
            : (getValues('pwdCheckingForm') === '' || pwdCheckingValue ===''
              ? <TxtInMessage name='실수는 누구나 하니까요!'></TxtInMessage>
              : <TxtInMessage name='이용 약관에 동의해주세요.'></TxtInMessage>)
            }  
          </View>
          <View>
            <View style={{alignItems:'center',marginBottom:20}}>
              <Text
                style={styles.textUseCondition}
                onPress={onPressPolicy}>
                  {"  이용악관 보기  "}
              </Text>
            </View>
            <BottomButton name={'이용약관에 동의하고 가입완료하기'} press={onPressNavigation}/>
          </View>
        </View>
        </TouchableOpacity>
        </View>  
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'column',
    paddingBottom: 20,
    paddingHorizontal:20,
    justifyContent: 'space-between',
    backgroundColor: '#FDF8FF'
  },
  textUseCondition: {
    color: '#000',
    paddingBottom: 6,
    borderBottomWidth: 1,
    fontFamily: mainTheme.font.L,
    fontSize:14
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