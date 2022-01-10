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
import SC from '../components/Card';
import ModalSelector from 'react-native-modal-selector';
import Save from 'react-native-vector-icons/MaterialIcons';
import Plus from 'react-native-vector-icons/AntDesign';

const IdeaMatching = () => {
  let index = 0;
  const [keyword, setKeyword] = useState([
    /*{key: index++, label: '키워드 직접입력'},*/
    {key: index++, label: '랜덤', select: true},
    {key: index++, label: '자연', select: false},
    {key: index++, label: '건축', select: false},
    {key: index++, label: '예술', select: false},
    {key: index++, label: '뷰티', select: false},
    {key: index++, label: '교육', select: false},
    {key: index++, label: '테크', select: false},
  ]);
  const {key, label, select} = keyword;
  const changeKeyword = e => {
    const {key, label, select} = e.target;
    setKeyword({
      ...keyword,
      [key]: label,
    });
  };

  var keywordlists = [];
  var i = 0;
  while (i < keyword.length) {
    if (keyword[i].select) {
      keywordlists.push(
        <Keyword
          name={keyword[i].label}
          key={keyword[i].key}
          select={keyword[i].select}
        />,
      );
    }
    i = i + 1;
  }

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
                if (!option.select) {
                  setKeyword({
                    select: 'true',
                  });
                }
              }}
              cancelText="태그 추가"
              optionStyle={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                alignContent: 'center',
                borderBottomColor: 'black',
              }}
              supportedOrientations={['landscape']}
              accessible={true}
              scrollViewAccessibilityLabel={'Scrollable options'}
              optionTextStyle={{
                justifyContent: 'center',
                color: 'black',
                alignContent: 'center',
                alignItems: 'center',
              }}>
              <Plus name="plus" size={15} style={styles.addbutton} />
            </ModalSelector>
          </View>
          {keywordlists}
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
        <View flexDirection="row">
          <Save size={25} name="save-alt" style={{marginRight: 5}} />
          <Text style={{fontSize: 20}}>카드 조합 저장</Text>
        </View>
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
