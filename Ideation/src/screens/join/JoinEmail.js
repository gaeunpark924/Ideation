import React, {useEffect, useState, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import {Controller, useForm} from 'react-hook-form';
import { CustomH, BottomButton, BackGroundContainer, TxtInMessage } from '../../components/N';
import { mainTheme } from '../../theme/theme';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AndroidKeyboardAdjust from 'react-native-android-keyboard-adjust';

AndroidKeyboardAdjust.setAdjustResize();

const JoinEmail = ({route, navigation}) => {
  const [emailValue, setEmailValue] = useState();
  const ref = useRef()
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
  useEffect(() => {
    ref.current.focus()
  }, []);
  return (
    <View style={{flex:1,backgroundColor:mainTheme.colors.background,}}>
      <TouchableOpacity activeOpacity={1} onPress={()=>{Keyboard.dismiss()}} style={{flex:1}}>
        <CustomH name={'회원가입 1/3단계'} press={()=>{navigation.goBack()}}></CustomH>
        <View style={styles.container}>
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
                  ref={ref}
                  underlineColorAndroid={'black'}
                  style={{fontSize:18,fontFamily:mainTheme.font.L,}}
                  placeholder="입력하세요"
                  onChange={e => {setEmailValue(e.nativeEvent.text);}} //state 업데이트
                  onChangeText={props.field.onChange}
                  onBlur={props.field.onBlur}
                  value={props.field.value}
                  keyboardType="email-address"
                  onSubmitEditing={() => onPressNavigation()}
                  autoCapitalize='none'
                />
              )}
              name="emailForm"
            />
            {errors.emailForm ? (
              <TxtInMessage name={errors.emailForm.message}></TxtInMessage>
            ) : getValues('emailForm') === '' ? (
              <TxtInMessage name='비밀번호를 재설정할 때 필요해요.'></TxtInMessage>
            ) : (
              <TxtInMessage name='다음 단계로 이동해주세요'></TxtInMessage>
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
    paddingBottom: 20,
    justifyContent: 'space-between',
  },
});

export default JoinEmail;
