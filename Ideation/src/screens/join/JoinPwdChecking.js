import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
} from 'react-native';
import {KeyboardAvoidingView} from 'react-native';
import styles from '../../styles/style';
import {Controller, useForm} from 'react-hook-form';

const showToast = () => {
  ToastAndroid.show('이용약관 클릭', ToastAndroid.SHORT);
};
const JoinPwdChecking = ({route, navigation}) => {
  const {emailValue, pwdValue} = route.params;
  const [pwdCheckingValue, setPwdCheckingValue] = useState('');
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
      pwdCheckingForm: '',
    },
  });
  const onPressNavigation = () => {
    errors.pwdCheckingForm === undefined && pwdCheckingValue !== undefined
      ? navigation.popToTop()
      : null;
  };
  console.log(watch());
  //console.log('errors',errors.pwdCheckingForm) //에러 확인
  return (
    <View style={styles.container}>
      <KeyboardAvoidingView behavior="padding">
        <View style={{marginTop: 110}}>
          <Controller
            control={control}
            rules={{
              required: true, //폼 제출을 위해 반드시 필요한 항목일 때
              validate: value =>
                value === pwdValue || '이전 비밀번호와 일치하지 않습니다.',
            }}
            render={props => (
              <TextInput
                {...props}
                underlineColorAndroid={'black'}
                placeholder="비밀번호를 한번 더 확인해주세요."
                secureTextEntry={true}
                onChange={e => {
                  setPwdCheckingValue(e.nativeEvent.text);
                }} //state 업데이트
                onChangeText={props.field.onChange}
                onBlur={props.field.onBlur}
                value={props.field.value}
                autoFocus={true}
                onSubmitEditing={() => onPressNavigation()}
              />
            )}
            name="pwdCheckingForm"
          />
          {errors.pwdCheckingForm ? (
            <Text>{errors.pwdCheckingForm.message}</Text>
          ) : getValues('pwdCheckingForm') === '' ? (
            <Text>실수는 누구나 하니까요!</Text>
          ) : (
            <Text>이용 약관에 동의해주세요.</Text>
          )}
        </View>
      </KeyboardAvoidingView>
      <View>
        <View style={{alignItems: 'center', marginBottom: 20}}>
          <Text style={styles.textUseCondition} onPress={() => showToast()}>
            {'  이용악관 보기  '}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.bottomButton}
          onPress={onPressNavigation}
          activeOpacity={0.8}>
          <Text>이용약관에 동의하고 가입완료하기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default JoinPwdChecking;
