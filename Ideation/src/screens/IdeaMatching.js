import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Button,
} from 'react-native';
import Keyword from '../components/keyword';
import Icon from 'react-native-vector-icons/FontAwesome';
import SC from '../components/Card';
import ModalSelector from 'react-native-modal-selector';
const IdeaMatching = () => {
  let index = 0;
  const keyword = [
    {key: index++, label: 'be'},
    {key: index++, label: '릴보이'},
    {key: index++, label: '솤오돔오'},
    {
      key: index++,
      label: '랜덤',
      accessibilityLabel: 'Tap here for cranberries',
    },
    {key: index++, label: 'just a lil more', customKey: 'Not a fruit'},
  ];
  return (
    <View style={styles.container}>
      <View style={styles.sv}>
        <ScrollView
          style={styles.keyword}
          horizontal={true}
          contentContainerStyle={{
            alignContent: 'center',
            alignItems: 'center',
          }}>
          <View style={styles.addkeyword}>
            <Text style={{fontSize: 16, marginRight: 7}}>키워드 추가</Text>
            <ModalSelector
              data={keyword}
              onChange={option => {
                alert(`${option.label} `);
              }}>
              <Text style={styles.addbutton}>+</Text>
            </ModalSelector>
          </View>
          <Keyword name="랜덤" />
          <Keyword name="자연" />
          <Keyword name="건축" />
          <Keyword name="예술" />
          <Keyword name="뷰티" />
          <Keyword name="디자인" />
          <Keyword name="교육" />
          <Keyword name="테크" />
          <Keyword name="유튜브" />
          <Keyword name="파카" />
          <Keyword name="정성하" />
        </ScrollView>
      </View>
      <View style={styles.body}>
        <View style={styles.contents_card}>
          <View style={styles.contents}>
            <SC style={styles.card} />
            <SC style={styles.card} />
          </View>
          <View style={styles.contents}>
            <SC style={styles.card} />
            <SC style={styles.card} />
          </View>
        </View>
      </View>
      <TouchableOpacity
        style={styles.cardsave}
        onPress={() => alert('카드 조합을 저장합니다.')}>
        <Text style={{fontSize: 20}}>카드 조합 저장</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.randommatching}
        onPress={() => alert('카드를 랜덤매칭합니다.')}>
        <Text style={{fontSize: 25}}>전체 카드 랜덤 매칭</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {flex: 1},
  sv: {flex: 1},
  topsidebar: {flex: 1, backgroundColor: 'blue'},
  addkeyword: {
    flexDirection: 'row',
    width: 120,
    textAlign: 'center',
    justifyContent: 'center',
    backgroundColor: '#E7D9FF',
    height: '100%',
    alignItems: 'center',
    borderColor: 'black',
    borderWidth: 0.9,
  },
  addbutton: {},
  body: {flex: 10, marginBottom: 50},
  contents_card: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contents: {
    flex: 1,
    margin: 10,
    flexDirection: 'row',
  },
  card: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 300,
    height: 300,
  },
  cardsave: {
    flex: 1,
    borderColor: 'black',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  randommatching: {
    flex: 2,
    backgroundColor: '#E7D9FF',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 3,
    borderColor: 'black',
  },
});
export default IdeaMatching;
