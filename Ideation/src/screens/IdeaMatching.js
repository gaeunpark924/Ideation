import React, {useState, useEffect} from 'react';
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
import ModalSelector from 'react-native-modal-selector';
import Save from 'react-native-vector-icons/MaterialIcons';
import Plus from 'react-native-vector-icons/AntDesign';
import TextIcon from 'react-native-vector-icons/Ionicons';
import PictureIcon from 'react-native-vector-icons/FontAwesome';
import VideoIcon from 'react-native-vector-icons/AntDesign';
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
      <Keyword name={k.label} key={k.key} select={k.select} remove={remove} />
    ) : null,
  );
  const [idx, setIdx] = useState(0);
  const [change, setChange] = useState(false);
  const isChange = change => {
    setChange(change);
  };
  const [temp, setTemp] = useState([false, false, false, false]);
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
              onChange={changeKeyword}
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
            <SC
              style={styles.card}
              change={change}
              isChange={isChange}
              idx={1}
              setIdx={setIdx}
              temp={temp[0]}
            />
            <SC
              style={styles.card}
              change={change}
              isChange={isChange}
              idx={3}
              setIdx={setIdx}
              temp={temp[1]}
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
            />
            <SC
              style={styles.card}
              change={change}
              isChange={isChange}
              idx={5}
              setIdx={setIdx}
              temp={temp[3]}
            />
          </View>
        </View>
      </View>
      {change === false ? (
        <View style={styles.bottomBar}>
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
      ) : (
        <View style={styles.bottomBarWrite}>
          <View style={styles.writeButton}>
            <TouchableOpacity
              onPress={() => {
                {
                  idx === 1
                    ? setTemp([true, false, false, false])
                    : idx === 3
                    ? setTemp([false, true, false, false])
                    : idx === 4
                    ? setTemp([false, false, true, false])
                    : idx === 5
                    ? setTemp([false, false, false, true])
                    : setTemp([false, false, false, false]);
                }
                console.log(temp);
              }}
              style={styles.writeButton2}>
              <TextIcon
                size={25}
                name="text"
                style={{
                  marginBottom: 2,
                }}
              />
              <Text style={{fontSize: 18}}>텍스트 입력하기</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.writeButton}>
            <TouchableOpacity
              onPress={() => alert('사진 가져오기')}
              style={styles.writeButton2}>
              <PictureIcon
                size={25}
                name="picture-o"
                style={{
                  marginBottom: 2,
                }}
              />
              <Text style={{fontSize: 18}}>사진 가져오기</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.writeButton}>
            <TouchableOpacity
              onPress={() => alert('영상 가져오기')}
              style={styles.writeButton2}>
              <VideoIcon
                size={25}
                name="videocamera"
                style={{
                  marginBottom: 2,
                }}
              />
              <Text style={{fontSize: 18}}>영상 가져오기</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
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
  bottomBar: {
    flex: 3,
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
