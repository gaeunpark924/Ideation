import React, {useRef} from 'react';
import {
  Text,
  View,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';

import styles from '../../styles/style';
const showToast = () => {
  ToastAndroid.show('로그인', ToastAndroid.SHORT);
};
const LoginEmail = ({navigation}) => {
  const passwordInput = useRef();
  const onPressSearchPwd = () => {
    navigation.navigate('SearchPwd');
  };
  return (
    <View style={styles.container}>
      <KeyboardAvoidingView behavior="padding">
        <View style={{marginTop: 110}}>
          <TextInput
            underlineColorAndroid={'black'}
            placeholder="이메일 입력"
            autoFocus={true}
            returnKeyType="next"
            onSubmitEditing={() => {
              passwordInput.current.focus();
            }} //키보드에서 다음 누르면 비밀번호 확인으로 자동으로 넘어감
          />
        </View>
        <View style={{marginTop: 50}}>
          <TextInput
            underlineColorAndroid={'black'}
            placeholder="비밀번호 입력"
            secureTextEntry={true}
            onSubmitEditing={() => showToast()} //
            ref={passwordInput}
          />
        </View>
      </KeyboardAvoidingView>
      <View>
        <View style={{alignItems: 'center', marginBottom: 20}}>
          <Text style={styles.textUseCondition} onPress={onPressSearchPwd}>
            {'  비밀번호 찾기  '}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.bottomButton}
          onPress={() => showToast()}
          activeOpacity={0.8}>
          <Text>로그인</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginEmail;
