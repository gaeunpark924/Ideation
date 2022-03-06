import React, {useState,useRef,useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import {Controller, useForm} from 'react-hook-form';
import { CustomH,BottomButton,TxtInMessage } from '../../components/N';
import { mainTheme } from '../../theme/theme';
import AndroidKeyboardAdjust from 'react-native-android-keyboard-adjust';

const JoinPwd = ({route, navigation}) => {
  const {emailValue} = route.params;
  const [pwdValue, setPwdValue] = useState('');
  const ref = useRef()
  AndroidKeyboardAdjust.setAdjustResize();
  const { control, watch, formState: {errors}, getValues} = useForm({
    mode: 'onChange', reValidateMode: 'onChange', criteriaMode: 'firstError',
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
  useEffect(() => {
    ref.current.focus()
  }, []);
  return (
    <View style={{flex:1,backgroundColor:mainTheme.colors.background,}}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={()=>{Keyboard.dismiss()}}
        style={{flex:1}}>
        <CustomH name={'회원가입 2/3단계'} press={()=>{navigation.goBack()}}></CustomH>
        <View style={styles.container}>
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
                  ref={ref}
                  underlineColorAndroid={'black'}
                  style={{
                    fontSize:18,
                    fontFamily:mainTheme.font.L,
                  }}
                  placeholder="비밀번호를 입력해주세요."
                  secureTextEntry={true}
                  onChange={e => {
                    setPwdValue(e.nativeEvent.text);
                  }} //state 업데이트
                  onChangeText={props.field.onChange} //
                  onBlur={props.field.onBlur}
                  value={props.field.value}
                  onSubmitEditing={onPressNavigation}
                  autoCapitalize='none'
                />  
              )}
              name="pwdForm"
            />
            {errors.pwdForm ? (
              <TxtInMessage name={errors.pwdForm.message}></TxtInMessage>
            ) : getValues('pwdForm') === '' ? (
              <TxtInMessage name='든든한 보안을 위해 알파벳 + 숫자를 조합해주세요.'></TxtInMessage>
            ) : (
              <TxtInMessage name='안전한 비밀번호입니다. 다음 단계로 이동해주세요.'></TxtInMessage>
            )}
          </View>
          <BottomButton name={'다음단계'} press={onPressNavigation}/>
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
    paddingBottom:20,
    justifyContent: 'space-between',
    backgroundColor: mainTheme.colors.background
  },
  textStyle:{
    fontSize:14,
    fontFamily: mainTheme.font.M, 
    marginLeft:5,
    marginTop:10
  }
});

export default JoinPwd;
