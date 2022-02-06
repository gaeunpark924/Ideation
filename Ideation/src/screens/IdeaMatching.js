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
import AddKey from '../components/AddKeyword';
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
import BottomSheet from 'react-native-gesture-bottom-sheet';
import {ListItem} from 'react-native-elements/dist/list/ListItem';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

const IdeaMatching = () => {
  let index = 0;
  const [keyword, setKeyword] = useState([
    /*label : 키워드 이름 select: 선택되었는지 여부*/
    {key: index++, label: '랜덤', select: true},
    {key: index++, label: '자연', select: false},
    {key: index++, label: '건축', select: false},
    {key: index++, label: '예술', select: false},
    {key: index++, label: '뷰티', select: false},
    {key: index++, label: '교육', select: false},
    {key: index++, label: '테크', select: false},
  ]);

  /* 선택된 키워드 상단바에 표시 */
  const showselectedkeywords = keyword.map(k =>
    k.select ? (
      <Keyword
        name={k.label}
        key={k.key}
        select={k.select}
        style={styles.keyword}
      />
    ) : null,
  );

  const modalkeywordtoggle = e => {
    let newKeywords = keyword.map(k => {
      if (k.label === e.label) {
        return {
          ...k,
          select: !k.select,
        };
      } else {
        return k;
      }
    });
    setKeyword(newKeywords);
  };
  const remove = e => {
    let newKeywords = keyword.map(k => {
      if (k === e) {
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
  /* 모달창에 있는 키워드 */
  const modalkeywordlists = keyword.map(k =>
    k.select ? (
      <View key={k.key} style={styles.modalkeywordlistViewSelected}>
        <TouchableOpacity
          onPress={() => remove(k)}
          style={{
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 16, fontFamily: 'SB 어그로 L'}}>
            {k.label}
          </Text>
        </TouchableOpacity>
      </View>
    ) : (
      <View key={k.key} style={styles.modalkeywordlistView}>
        <TouchableOpacity
          onPress={() => changeKeyword(k)}
          style={{
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 16, fontFamily: 'SB 어그로 L'}}>
            {k.label}
          </Text>
        </TouchableOpacity>
      </View>
    ),
  );
  // textInput에 사용하기 위함
  const [change, setChange] = useState(false);
  const isChange = change => {
    setChange(change);
  };
  // 어떤 card 선택되었는지
  const [whichcard, setWhichCard] = useState([false, false, false, false]);
  /* 모달창 toggleButton */
  const [isModalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  // pinicon toggleButton
  const [pinicon, setPinicon] = useState(false);
  const togglepinicon = () => {
    setPinicon(!pinicon);
  };
  // save toggleButton
  const [saveicon, setSaveicon] = useState(false);
  const togglesaveiocn = () => {
    setSaveicon(!saveicon);
  };
  const [isVisible, setIsVisible] = useState(false);
  // pen toggleButton
  const [pen, setPen] = useState(false);
  const togglepen = () => {
    setPen(!pen);
  };
  const bottomModalShow1 = () => {
    bottomSheet.current.show();
    setWhichCard([true, false, false, false]);
    //setIdx(1);
  };
  const bottomModalShow2 = () => {
    bottomSheet.current.show();
    setWhichCard([false, true, false, false]);
    //setIdx(2);
  };
  const bottomModalShow3 = () => {
    bottomSheet.current.show();
    setWhichCard([false, false, true, false]);
    //setIdx(3);
  };
  const bottomModalShow4 = () => {
    bottomSheet.current.show();
    setWhichCard([false, false, false, true]);
    //setIdx(4);
  };
  const bottomSheet = useRef();
  const eachCard = useRef();
  const optionsImage = {
    mediaType: 'photo',
    maxWidth: 180,
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };
  const optionsVideo = {
    mediaType: 'video',
    maxWidth: 180,
    storageOptions: {
      skipBackup: true,
      path: 'video',
    },
  };
  const [clicktextModal,isClickTextModal] = useState(false);
  const textModal = () => {
    isClickTextModal(!clicktextModal);
    bottomSheet.current.close();
    console.log(eachCard);
  };
  const takeImagefromphone = () =>
    launchImageLibrary(optionsImage, response => {
      // console.log('Response = ', response);
      if (response.didCancel) {
        // setProcessing(false)
        console.log('User cancelled image picker');
      } else if (response.error) {
        // setProcessing(false)
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        // setProcessing(false)
        console.log('User tapped custom button: ', response.customButton);
      } else {
        console.log('Response = ', response.assets[0].uri);
        const tmp = response.assets[0];
        // const source = {
        //   uri:
        //     Platform.OS === 'android' ? tmp.uri : tmp.uri.replace('file://', ''),
        //   fileName: response.fileName,
        // };
        // var arr = [...items];
        // console.log('source.uri', source.uri);
        // arr.push(source.uri);
        // setItems(arr); ////xxxxx
      }
    });
  const takeVideofromphone = () =>
    launchImageLibrary(optionsVideo, response => {
      // console.log('Response = ', response);
      if (response.didCancel) {
        // setProcessing(false)
        console.log('User cancelled video picker');
      } else if (response.error) {
        // setProcessing(false)
        console.log('VideoPicker Error: ', response.error);
      } else if (response.customButton) {
        // setProcessing(false)
        console.log('User tapped custom button: ', response.customButton);
      } else {
        console.log('Response = ', response.assets[0].uri);
        const tmp = response.assets[0];
        // const source = {
        //   uri:
        //     Platform.OS === 'android' ? tmp.uri : tmp.uri.replace('file://', ''),
        //   fileName: response.fileName,
        // };
        // var arr = [...items];
        // console.log('source.uri', source.uri);
        // arr.push(source.uri);
        // setItems(arr); ////xxxxx
      }
    });
  const [isfix, setIsfix] = useState([false, false, false, false]);
  const isfix1 = (idx) => {
    let newfix = [!isfix[0],isfix[1],isfix[2],isfix[3]];
    setIsfix(newfix);
  };
  const isfix2 = (idx) => {
    let newfix = [isfix[0],!isfix[1],isfix[2],isfix[3]];
    setIsfix(newfix);
  };
  const isfix3 = (idx) => {
    let newfix = [isfix[0],isfix[1],!isfix[2],isfix[3]];
    setIsfix(newfix);
  };
  const isfix4 = (idx) => {
    let newfix = [isfix[0],isfix[1],isfix[2],!isfix[3]];
    setIsfix(newfix);
  };
  const [ischeck, setIscheck] = useState();
  const allrandommatching = () => {
    alert('전체카드 랜덤 매칭');
  };
  return (
    <View style={styles.container}>
      <View style={styles.projectname}>
        <Text style={styles.projecttitle}>Let's Puzzling</Text>
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
                    }}
                    onPress={() => alert('키워드 입력하기...!')}>
                    <Icon2 name="pencil" size={22} style={{marginRight: 10}} />
                    <Text style={{fontSize: 16, fontFamily: 'SB 어그로 L'}}>
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
                    <Text
                      style={{
                        fontSize: 16,
                        fontFamily: 'SB 어그로 M',
                      }}>
                      키워드 추가하기
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          </View>
          {showselectedkeywords}
        </ScrollView>
      </View>
      <View style={styles.body}>
        <View style={styles.contents_card}>
          <View style={styles.contents}>
            <BottomSheet radius={1} ref={bottomSheet} height={200}>
              <TouchableOpacity onPress={textModal} style={styles.bottomModal}>
                <TextIcon name="text" size={24} style={{marginRight: 7}} />
                <Text style={{fontFamily: 'SB 어그로 L'}}>텍스트 입력하기</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={takeImagefromphone}
                style={styles.bottomModal}>
                <PictureIcon
                  name="picture-o"
                  size={24}
                  style={{marginRight: 7}}
                />
                <Text style={{fontFamily: 'SB 어그로 L'}}>사진 가져오기</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={takeVideofromphone}
                style={styles.bottomModal}>
                <VideoIcon
                  name="videocamera"
                  size={24}
                  style={{marginRight: 7}}
                />
                <Text style={{fontFamily: 'SB 어그로 L'}}>영상 가져오기</Text>
              </TouchableOpacity>
            </BottomSheet>
            {pen ? (
              <TouchableOpacity onPress={bottomModalShow1}>
                <SC
                  style={styles.card}
                  pinicon={pinicon}
                  saveicon={saveicon}
                  whichcard={whichcard}
                  idx={0}
                  keyword="노래"
                  isfix={isfix}
                  ischeck={ischeck}
                  penicon={pen}
                  setIsfix={isfix1}
                  clicktextModal={clicktextModal}
                />
              </TouchableOpacity>
            ) : (
              <SC
                style={styles.card}
                pinicon={pinicon}
                saveicon={saveicon}
                whichcard={whichcard}
                idx={0}
                keyword="노래"
                isfix={isfix}
                ischeck={ischeck}
                penicon={pen}
                setIsfix={isfix1}
                clicktextModal={clicktextModal}
              />
            )}

            {pen ? (
              <TouchableOpacity onPress={bottomModalShow2}>
                <SC
                  style={styles.card}
                  pinicon={pinicon}
                  saveicon={saveicon}
                  whichcard={whichcard}
                  idx={1}
                  keyword="노래"
                  isfix={isfix}
                  ischeck={ischeck}
                  penicon={pen}
                  setIsfix={isfix2}
                  clicktextModal={clicktextModal}
                />
              </TouchableOpacity>
            ) : (
              <SC
                style={styles.card}
                pinicon={pinicon}
                saveicon={saveicon}
                whichcard={whichcard}
                idx={1}
                keyword="노래"
                isfix={isfix}
                ischeck={ischeck}
                penicon={pen}
                setIsfix={isfix2}
                clicktextModal={clicktextModal}
              />
            )}
          </View>
          <View style={styles.contents}>
            {pen ? (
              <TouchableOpacity onPress={bottomModalShow3}>
                <SC
                  style={styles.card}
                  pinicon={pinicon}
                  penicon={pen}
                  saveicon={saveicon}
                  whichcard={whichcard}
                  idx={2}
                  keyword="노래"
                  isfix={isfix}
                  ischeck={ischeck}
                  setIsfix={isfix3}
                  clicktextModal={clicktextModal}
                />
              </TouchableOpacity>
            ) : (
              <SC
                style={styles.card}
                pinicon={pinicon}
                saveicon={saveicon}
                whichcard={whichcard}
                idx={2}
                keyword="노래"
                isfix={isfix}
                ischeck={ischeck}
                penicon={pen}
                setIsfix={isfix3}
                clicktextModal={clicktextModal}
              />
            )}
            {pen ? (
              <TouchableOpacity onPress={bottomModalShow4}>
                <SC
                  style={styles.card}
                  pinicon={pinicon}
                  saveicon={saveicon}
                  whichcard={whichcard}
                  idx={3}
                  keyword="노래"
                  isfix={isfix}
                  ischeck={ischeck}
                  penicon={pen}
                  setIsfix={isfix4}
                  clicktextModal={clicktextModal}
                />
              </TouchableOpacity>
            ) : (
              <SC
                style={styles.card}
                pinicon={pinicon}
                saveicon={saveicon}
                whichcard={whichcard}
                idx={3}
                keyword="노래"
                isfix={isfix}
                ischeck={ischeck}
                penicon={pen}
                setIsfix={isfix4}
                clicktextModal={clicktextModal}
              />
            )}
          </View>
        </View>
      </View>
      {saveicon ? (
        <View style={styles.saveinfo}>
          <Text style={styles.saveinfotext}>저장할 퍼즐을 선택해주세요</Text>
        </View>
      ) : null}
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
          {pen ? (
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
              <TouchableOpacity onPress={togglepen}>
                <Icon2 name="pencil" size={22} />
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
              <TouchableOpacity onPress={togglepen}>
                <Icon2 name="pencil" size={22} />
              </TouchableOpacity>
            </View>
          )}
          {saveicon ? (
            <View
              style={{
                flex: 5,
                justifyContent: 'center',
                alignItems: 'center',
                borderColor: 'black',
                borderWidth: 0.8,
                margin: 5,
                width: '100%',
                backgroundColor: 'grey',
              }}>
              <TouchableOpacity
                onPress={togglesaveiocn}
                style={{
                  flexDirection: 'row',
                  width: '100%',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Save size={25} name="save-alt" style={{paddingRight: 10}} />
                <Text style={{fontSize: 16, fontFamily: 'SB 어그로 L'}}>
                  퍼즐 조합 저장
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
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
                onPress={togglesaveiocn}
                style={{
                  flexDirection: 'row',
                  width: '100%',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Save size={25} name="save-alt" style={{paddingRight: 10}} />
                <Text style={{fontSize: 16, fontFamily: 'SB 어그로 L'}}>
                  퍼즐 조합 저장
                </Text>
              </TouchableOpacity>
            </View>
          )}
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
            onPress={allrandommatching}
            style={{
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{fontSize: 24, fontFamily: 'SB 어그로 M'}}>
              전체 퍼즐 랜덤 매칭
            </Text>
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
    fontStyle: 'normal',
    fontFamily: 'SB 어그로 B',
    fontSize: 24,
    marginLeft: 16,
  },
  keywordscrollview: {
    alignContent: 'center',
    alignItems: 'center',
  },
  modalkeywordlistViewSelected: {
    backgroundColor: '#D8D8D8',
    borderBottomWidth: 0.8,
    flex: 1,
    width: '100%',
    justifyContent: 'center',
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
  addkeywordtext: {fontSize: 16, marginRight: 7, fontFamily: 'SB 어그로 M'},
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
  },
  bottomModal: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
  saveinfo: {justifyContent: 'center', alignItems: 'center', paddingBottom: 10},
  saveinfotext: {opacity: 0.33},
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
