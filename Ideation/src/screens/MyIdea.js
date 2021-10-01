import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import Card from '../components/Card';
export default function MyIdea() {
  return (
    <View style={styles.container}>
      <View>
        <Button title="카테고리 설정" />
        <Button title="카드 조합 저장" />
      </View>
      <View>
        <Card />
        <Card />
        <Card />
        <Card />
      </View>
      <View>
        <Button title="전체 카드 랜덤 매칭" />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
