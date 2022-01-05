import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, } from 'react-native';
import styles from '../../styles/style';
import { Controller, useForm } from 'react-hook-form';

import { KeyboardAvoidingView } from 'react-native';
const JoinEmail = ({navigation}) => {
    const [ emailValue, setEmailValue] = useState();
    const { control, watch, formState: { errors }, getValues} = useForm({
      mode : 'onChange', reValidateMode: 'onChange', criteriaMode: "firstError",  //mode : 'onChange' 값이 변할때마다 유효성 확인
      defaultValues:{
        emailForm : '',
      },
    });
    const onPressNavigation = ()=>{
      (errors.emailForm === undefined && emailValue !== undefined)
      ? navigation.navigate("JoinPwd",{emailValue : emailValue})
      : null
    }
    console.log(watch())   //입력한 값을 실시간으로 확인
    //console.log('errors',errors.emailForm) //에러 확인
    return (
        <View style={styles.container}>
          <KeyboardAvoidingView behavior="padding">
            <View style={{marginTop:110}}>
              <Controller
                control={control}
                rules={{
                  required : '비밀번호를 재설정할 때 필요해요.',    
                  pattern: {  
                    value : /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i, //이메일 정규식
                    message : "이메일 형식으로 입력해주세요."
                  }
                }}
                render={(props) => 
                  <TextInput
                    {...props}
                    underlineColorAndroid={'black'}
                    placeholder="이메일 주소를 알려주세요."
                    onChange={(e)=>{setEmailValue(e.nativeEvent.text)}}  //state 업데이트
                    onChangeText={props.field.onChange}                              
                    onBlur={props.field.onBlur}
                    value={props.field.value}
                    autoFocus={true}
                    onSubmitEditing={() =>onPressNavigation()} 
                  />
                }
                name="emailForm" 
              />
              {errors.emailForm
              ? <Text>{errors.emailForm.message}</Text>
              : ( getValues('emailForm') === ''
                ? <Text>비밀번호를 재설정할 때 필요해요.</Text>
                : <Text>다음 단계로 이동해주세요</Text>
                )
              }  
            </View>
          </KeyboardAvoidingView>
            <TouchableOpacity
              title='Submit'
              style={styles.bottomButton}
              onPress={onPressNavigation}
              activeOpacity={0.8}>
              <Text>
                다음단계
              </Text>
            </TouchableOpacity>
        </View>
    );
};

export default JoinEmail;