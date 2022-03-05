import React, {useEffect, useState, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Keyboard,
  Dimensions,
  SafeAreaView,
  KeyboardAvoidingView
} from 'react-native';
import {Controller, useForm} from 'react-hook-form';
const { width, height } = Dimensions.get("window");
import { CustomH, BottomButton } from '../../components/N';
import { mainTheme } from '../../theme/theme';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";


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
    //Keyboard.dismiss()
    errors.emailForm === undefined && emailValue !== undefined
      ? navigation.navigate('JoinPwd', {emailValue: emailValue}) //, keyboardOffset:keyboardOffset
      : null;
  };
  useEffect(() => {
    ref.current.focus()
  }, []);
  return (
    <KeyboardAwareScrollView contentContainerStyle={{flex:1}}>

    <View style={{flex:1,backgroundColor:mainTheme.colors.background,}}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={()=>{Keyboard.dismiss()}}
        style={{flex:1}}>
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
                style={{
                  fontSize:18,
                  fontFamily:'SB_Aggro_L',
                }}
                placeholder="입력하세요"
                onChange={e => {
                  setEmailValue(e.nativeEvent.text);
                }} //state 업데이트
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
            <Text style={styles.textStyle}>{errors.emailForm.message}</Text>
          ) : getValues('emailForm') === '' ? (
            <Text style={styles.textStyle}>비밀번호를 재설정할 때 필요해요.</Text>
          ) : (
            <Text style={styles.textStyle}>다음 단계로 이동해주세요</Text>
          )}
        </View>

        <BottomButton name={'다음단계'} press={onPressNavigation}/>
      </View>
      </TouchableOpacity>
    </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    paddingHorizontal: 20,
    paddingBottom: 20,
    justifyContent: 'space-between',
    backgroundColor: '#FDF8FF',//'#FDF8FF',//'blue'//'#FDF8FF',
  },
  textStyle:{
    fontSize:14,
    fontFamily:'SB_Aggro_M',
    marginLeft:5,
    marginTop:10
  }
});

export default JoinEmail;
