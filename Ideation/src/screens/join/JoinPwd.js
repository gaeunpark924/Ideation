import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {KeyboardAvoidingView} from 'react-native';
import styles from '../../styles/style';
import {Controller, useForm} from 'react-hook-form';

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
    errors.pwdForm === undefined && pwdValue !== undefined
      ? navigation.navigate('JoinPwdChecking', {
          emailValue: emailValue,
          pwdValue: pwdValue,
        })
      : null;
  };
  console.log(watch());
  //console.log('errors',errors.pwdForm) //에러 확인
  return (
    <View style={styles.container}>
      <KeyboardAvoidingView behavior="padding">
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
            <Text>{errors.pwdForm.message}</Text>
          ) : getValues('pwdForm') === '' ? (
            <Text>든든한 보안을 위해 알파벳 + 숫자를 조합해주세요.</Text>
          ) : (
            <Text>안전한 비밀번호입니다. 다음 단계로 이동해주세요.</Text>
          )}
        </View>
      </KeyboardAvoidingView>
      <TouchableOpacity
        style={styles.bottomButton}
        onPress={onPressNavigation}
        activeOpacity={0.8}>
        <Text>다음단계</Text>
      </TouchableOpacity>
    </View>
  );
};

export default JoinPwd;
