import React from 'react';
import {Text, View, Button} from 'react-native';
import Voice from 'react-native-voice';
const Record = () => {
  return (
    <View>
      <Text>아이디에이션 서비스 now</Text>
      <Text>아이디어 - 제목</Text>
      <Text>당신의 아이디어 씨앗에게 양분을 줄 시간이에요!</Text>
      <Button title="텍스트 기록" />
      <Button title="음성 메모" />
    </View>
  );
};

export default Record;
