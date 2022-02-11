import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Keyboard,
  Dimensions
} from 'react-native';
import {Controller, useForm} from 'react-hook-form';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

import {KeyboardAvoidingView} from 'react-native';
const { width, height } = Dimensions.get("window");

const JoinEmail = ({navigation}) => {
  const [emailValue, setEmailValue] = useState();
  
  const [ keyboardOffset, setKeyboardOffset] = useState()
  const {
    control,
    watch,
    formState: {errors},
    getValues,
  } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    criteriaMode: 'firstError', //mode : 'onChange' 값이 변할때마다 유효성 확인
    defaultValues: {
      emailForm: '',
    },
  });
  const onPressNavigation = () => {
    errors.emailForm === undefined && emailValue !== undefined
      ? navigation.navigate('JoinPwd', {emailValue: emailValue})
      : null;
  };
  const keyboardDidShow = (e) => {
    //setKeyboardOffset(height - e.endCoordinates.height)
    setKeyboardOffset(e.endCoordinates.height)
    //console.log('height', height, e.endCoordinates.height, height - e.endCoordinates.height)
  }
  useEffect(()=>{
    Keyboard.addListener('keyboardDidShow',keyboardDidShow)
  })
  // const keyboardEventListener = () => {
  //   Keyboard.addListener('keyboardDidShow',keyboardDidShow)
  // }
  //console.log(watch());
  //console.log('errors',errors.emailForm) //에러 확인
  return (
    // <KeyboardAvoidingView
    //   keyboardVerticalOffset={-500}
    //   behavior={Platform.OS === "ios" ? "padding" : "height"}
    //   style={styles.container}
    // >
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS == "ios" ? 0 : 110}
      // enabled={Platform.OS === "ios" ? true : false}
      >
      <KeyboardAvoidingView behavior="padding">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{marginTop: 110}}>
          <Controller
            control={control}
            rules={{
              required: '비밀번호를 재설정할 때 필요해요.',
              pattern: {
                value:
                  /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i, //이메일 정규식
                message: '이메일 형식으로 입력해주세요.',
              },
            }}
            render={props => (
              <TextInput
                {...props}
                underlineColorAndroid={'black'}
                style={{
                  fontSize:18,
                  fontFamily:'SB_Aggro_L',
                }}
                placeholder="이메일 주소를 알려주세요."
                onChange={e => {
                  setEmailValue(e.nativeEvent.text);
                }} //state 업데이트
                onChangeText={props.field.onChange}
                onBlur={props.field.onBlur}
                value={props.field.value}
                autoFocus={true}
                onSubmitEditing={() => onPressNavigation()}
              />
            )}
            name="emailForm"
          />
          {errors.emailForm ? (
            <Text style={styles.textStyle}>{errors.emailForm.message}</Text>
          ) : getValues('emailForm') === '' ? (
            <Text style={styles.textStyle}>비밀번호를 재설정할 때 필요해요.</Text>
          ) : (
            <Text style={styles.textStyle}>다음 단계로 이동해주세요</Text>
          )}
        </View>
        </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      <TouchableOpacity
        title="Submit"
        style={styles.bottomButton}
        onPress={onPressNavigation}
        activeOpacity={0.8}>
        <Text style={{fontSize:16, fontFamily:'SB_Aggro_M'}}>
          다음단계
        </Text>
      </TouchableOpacity>
      
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
  textStyle:{
    fontSize:14,
    fontFamily:'SB_Aggro_M',
    marginLeft:5,
    marginTop:10
  }
});

export default JoinEmail;
