import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Keyboard
} from 'react-native';
import {KeyboardAvoidingView} from 'react-native';
import {Controller, useForm} from 'react-hook-form';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

const JoinPwd = ({route, navigation}) => {
  const {emailValue} = route.params;
  const [pwdValue, setPwdValue] = useState('');
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
      pwdForm: '',
    },
  });
  const onPressNavigation = () => {
    Keyboard.dismiss()
    errors.pwdForm === undefined && pwdValue !== undefined && pwdValue !== ''
      ? navigation.navigate('JoinPwdChecking', {
          emailValue: emailValue,
          pwdValue: pwdValue,
        })
      : null;
  };
  return (
      
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS == "ios" ? 0 : 110}>
      <KeyboardAvoidingView behavior="padding">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{marginTop: 110}}>
          <Controller
            control={control}
            rules={{
              required: '든든한 보안을 위해 알파벳 + 숫자를 조합해주세요.',
              minLength: {
                value: 8,
                message: '8자 이상 입력해주세요.',
              },
              maxLength: {
                value: 16,
                message: '16자 이하로 입력해주세요.',
              },
              pattern: {
                value: /^(?=.*\d)(?=.*[a-zA-Z])/, //비밀번호 정규식 표현
                message: '알파벳 + 숫자를 조합해주세요.',
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
                placeholder="비밀번호를 입력해주세요."
                secureTextEntry={true}
                onChange={e => {
                  setPwdValue(e.nativeEvent.text);
                }} //state 업데이트
                onChangeText={props.field.onChange} //
                onBlur={props.field.onBlur}
                value={props.field.value}
                autoFocus={true}
                onSubmitEditing={() => onPressNavigation()}
              />
            )}
            name="pwdForm"
          />
          {errors.pwdForm ? (
            <Text style={styles.textStyle}>{errors.pwdForm.message}</Text>
          ) : getValues('pwdForm') === '' ? (
            <Text style={styles.textStyle}>든든한 보안을 위해 알파벳 + 숫자를 조합해주세요.</Text>
          ) : (
            <Text style={styles.textStyle}>안전한 비밀번호입니다. 다음 단계로 이동해주세요.</Text>
          )}
        </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
      <TouchableOpacity
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

export default JoinPwd;
