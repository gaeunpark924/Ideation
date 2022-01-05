import React from 'react';
import {StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import {KeyboardAvoidingView} from 'react-native';
import styles from '../../styles/style';

const SearchPwd = ({navigation}) => {
    const onPressNavigation = () => {
      navigation.navigate("ResetPwd")
    }
    return (
        <View style={styles.container}>
            <KeyboardAvoidingView behavior="padding">
              <View style={{marginTop:110}}> 
                <TextInput
                  underlineColorAndroid={'black'}
                  placeholder="이메일 주소를 알려주세요."
                  autoFocus={true}
                  onSubmitEditing={() =>onPressNavigation()} 
                />
                <Text>비밀번호 재설정 링크를 보내드립니다.</Text>
              </View>
            </KeyboardAvoidingView>
            <TouchableOpacity
              style={styles.bottomButton}
              onPress={onPressNavigation}
              activeOpacity={0.8}>
              <Text>
                재설정 링크 전송
              </Text>
            </TouchableOpacity>    
        </View>
    );
};

export default SearchPwd;