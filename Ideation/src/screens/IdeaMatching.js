import React, {useState, useEffect, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Button,
  ViewPagerAndroidBase,
} from 'react-native';
import Keyword from '../components/keyword';
import SC from '../components/Card';
import addKey from '../components/AddKeyword';
import Modal from 'react-native-modal';
import Save from 'react-native-vector-icons/MaterialIcons';
import Plus from 'react-native-vector-icons/AntDesign';
import TextIcon from 'react-native-vector-icons/Ionicons';
import PictureIcon from 'react-native-vector-icons/FontAwesome';
import VideoIcon from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/Octicons';
import Pinoutline from 'react-native-vector-icons/MaterialCommunityIcons';
import Pin from 'react-native-vector-icons/Entypo';
import Check from 'react-native-vector-icons/AntDesign';
import {BottomSheet} from 'react-native-elements/dist/bottomSheet/BottomSheet';
import {ListItem} from 'react-native-elements/dist/list/ListItem';
const IdeaMatching = () => {
  let index = 0;
  const [keyword, setKeyword] = useState([
    /*label : 키워드 이름 select: 선택되었는지 여부*/
    {key: index++, label: '랜덤', select: true},
    {key: index++, label: '자연', select: true},
    {key: index++, label: '건축', select: true},
    {key: index++, label: '예술', select: true},
    {key: index++, label: '뷰티', select: true},
    {key: index++, label: '교육', select: true},
    {key: index++, label: '테크', select: true},
  ]);
  /* 키워드 추가 */
  const changeKeyword = e => {
    let newKeywords = keyword.map(k => {
      if (k.key === e.key) {
        return {
          ...k,
          select: true,
        };
      } else {
        return k;
      }
    });
    setKeyword(newKeywords);
  };
  /* 키워드 삭제 */
  const remove = e => {
    console.log(e);
    let newKeywords = keyword.map(k => {
      if (k.label === e) {
        return {
          ...k,
          select: false,
        };
      } else {
        return k;
      }
    });
    setKeyword(newKeywords);
  };
  /* 키워드 표시 */
  const keywordlists = keyword.map(k =>
    k.select ? (
      <Keyword
        name={k.label}
        key={k.key}
        select={k.select}
        remove={remove}
        style={styles.keyword}
      />
    ) : null,
  );
  const modalkeywordlists = keyword.map(k => (
    <View key={k.key} style={styles.modalkeywordlistView}>
      <TouchableOpacity
        style={{width: '100%', justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{fontSize: 16}}>{k.label}</Text>
      </TouchableOpacity>
    </View>
  ));
  const [idx, setIdx] = useState(0);
  const [change, setChange] = useState(false);
  const isChange = change => {
    setChange(change);
  };
  const [temp, setTemp] = useState([false, false, false, false]);
  const [isModalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const [pinicon, setPinicon] = useState(false);
  const togglepinicon = () => {
    setPinicon(!pinicon);
  };
  const sheetRef = useRef(null);
  const bottomlist = [
    {title: '텍스트 입력하기'},
    {title: '사진 가져오기'},
    {title: '영상 가져오기'},
  ];
  const [isVisible, setIsVisible] = useState(false);
  return (
    <View style={styles.container}>
      <View style={styles.projectname}>
        <Text style={styles.projecttitle}>Puzzling</Text>
      </View>
      <View style={styles.sv}>
        <ScrollView
          horizontal={true}
          contentContainerStyle={styles.keywordscrollview}>
          <View style={styles.addkeyword}>
            <Text style={styles.addkeywordtext}>키워드 추가</Text>
            <TouchableOpacity onPress={toggleModal}>
              <Plus name="plus" size={15} style={styles.addbutton} />
            </TouchableOpacity>
            <Modal isVisible={isModalVisible}>
              <View style={styles.modalview}>
                <View
                  style={{
                    flex: 1,
                    borderColor: 'black',
                    borderBottomWidth: 0.8,
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <TouchableOpacity
                    style={{
                      width: '100%',
                      justifyContent: 'center',
                      alignItems: 'center',
                      flexDirection: 'row',
                    }}>
                    <Icon2 name="pencil" size={22} style={{marginRight: 10}} />
                    <Text style={{fontSize: 16, fontFamily: 'SB Aggro'}}>
                      키워드 직접입력
                    </Text>
                  </TouchableOpacity>
                </View>
                {modalkeywordlists}
                <View
                  style={{
                    flex: 1,
                    borderColor: 'black',
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <TouchableOpacity
                    onPress={toggleModal}
                    style={{
                      width: '100%',
                      justifyContent: 'center',
                      alignItems: 'center',
                      height: '100%',
                      backgroundColor: '#E7D9FF',
                    }}>
                    <Text style={{fontSize: 16, fontWeight: 'bold'}}>
                      키워드 추가하기
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          </View>
          {keywordlists}
        </ScrollView>
      </View>
      <View style={styles.body}>
        <View style={styles.contents_card}>
          <View style={styles.contents}>
            <SC
              style={styles.card}
              change={change}
              isChange={isChange}
              idx={1}
              setIdx={setIdx}
              temp={temp[0]}
              setTemp={setTemp}
              pinicon={pinicon}
            />
            <SC
              style={styles.card}
              change={change}
              isChange={isChange}
              idx={3}
              setIdx={setIdx}
              temp={temp[1]}
              setTemp={setTemp}
              pinicon={pinicon}
            />
          </View>
          <View style={styles.contents}>
            <SC
              style={styles.card}
              change={change}
              isChange={isChange}
              idx={4}
              setIdx={setIdx}
              temp={temp[2]}
              setTemp={setTemp}
              pinicon={pinicon}
            />
            <SC
              style={styles.card}
              change={change}
              isChange={isChange}
              idx={5}
              setIdx={setIdx}
              temp={temp[3]}
              setTemp={setTemp}
              pinicon={pinicon}
            />
          </View>
        </View>
      </View>
      <View style={styles.bottomBar}>
        <View style={{flex: 1, flexDirection: 'row'}}>
          {pinicon ? (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                borderColor: 'black',
                borderWidth: 0.8,
                margin: 5,
                backgroundColor: 'gray',
              }}>
              <TouchableOpacity onPress={togglepinicon}>
                <Check name="check" size={24} borderColor="black" />
              </TouchableOpacity>
            </View>
          ) : (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                borderColor: 'black',
                borderWidth: 0.8,
                margin: 5,
              }}>
              <TouchableOpacity onPress={togglepinicon}>
                <Pinoutline name="pin-outline" size={24} borderColor="black" />
              </TouchableOpacity>
            </View>
          )}
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              borderColor: 'black',
              borderWidth: 0.8,
              margin: 5,
            }}>
            <TouchableOpacity onPress={() => setIsVisible(true)}>
              <Icon2 name="pencil" size={22} />
            </TouchableOpacity>
            {/* <BottomSheet
              isVisible={isVisible}
              containerStyle={{backgroundColor: 'rgba(0.5, 0.25, 0, 0.2)'}}>
              {bottomlist.map((l, i) => (
                <ListItem
                  key={i}
                  containerStyle={l.containerStyle}
                  onPress={l.onPress}>
                  <ListItem.Content>
                    <ListItem.Title style={l.titleStyle}>
                      {l.title}
                    </ListItem.Title>
                  </ListItem.Content>
                </ListItem>
              ))}
            </BottomSheet> */}
          </View>
          <View
            style={{
              flex: 5,
              justifyContent: 'center',
              alignItems: 'center',
              borderColor: 'black',
              borderWidth: 0.8,
              margin: 5,
              width: '100%',
            }}>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Save size={25} name="save-alt" style={{paddingRight: 10}} />
              <Text style={{fontSize: 16}}>퍼즐 조합 저장</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            backgroundColor: '#DABDFF',
            justifyContent: 'center',
            borderColor: 'black',
            borderWidth: 1,
            margin: 5,
          }}>
          <TouchableOpacity
            style={{
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{fontSize: 24}}>전체 퍼즐 랜덤 매칭</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#FDF8FF'},
  projectname: {
    flex: 1,
  },
  projecttitle: {
    fontWeight: 'bold',
    fontStyle: 'normal',
    fontFamily: 'SB Aggro',
    fontSize: 24,
    marginLeft: 16,
  },
  keywordscrollview: {
    alignContent: 'center',
    alignItems: 'center',
  },
  modalkeywordlistView: {
    borderBottomWidth: 0.8,
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sv: {flex: 1, marginLeft: 16},
  topsidebar: {flex: 1},
  addkeyword: {
    flexDirection: 'row',
    width: 120,
    textAlign: 'center',
    justifyContent: 'center',
    backgroundColor: '#E7D9FF',
    height: '100%',
    alignItems: 'center',
    borderColor: 'black',
    borderWidth: 1,
    marginRight: 8,
  },
  addkeywordtext: {fontSize: 16, marginRight: 7},
  keyword: {
    marginRight: 8,
  },
  modalview: {
    flex: 0.8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
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
  bottomBar: {
    flex: 3,
    margin: 8,
  },
  bottomBarWrite: {
    flexDirection: 'row',
    flex: 3,
    backgroundColor: 'pink',
  },
  writeButton: {
    flex: 1,
    backgroundColor: '#E7D9FF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.7,
    borderTopWidth: 1,
    borderColor: 'black',
  },
  writeButton2: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default IdeaMatching;
