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
import firestore from '@react-native-firebase/firestore';
const IdeaMatching = ({route, navigation}) => {
  const {uid} = route.params;
  useEffect(() => {
    console.log('사용자id', uid);
  }, [uid]);
  let index = 0;
  const [keyword, setKeyword] = useState([
    /*label : 키워드 이름 select: 선택되었는지 여부*/
    {key: index++, label: '랜덤', select: false},
    {key: index++, label: '노래', select: true},
    {key: index++, label: '유튜브', select: true},
    {key: index++, label: '영화', select: true},
    {key: index++, label: '드라마', select: true},
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
  const temp = useRef([{}, {}, {}, {}]);
  const getData = (idx, cd) => {
    // console.log('getData 실행');
    // console.log(cd);
    // console.log(confirmCheckState.current[idx]);
    if (confirmCheckState.current[idx]) {
      temp.current[idx] = cd;
    } else if (!confirmCheckState.current[index]) {
      temp.current[idx] = {};
    }
  };

  // 현재 선택된 키워드
  const selectedkeyword = keyword.filter(k => k.select == true);
  // console.log(selectedkeyword);
  // firestore에 추가하는 함수
  const appnumber = useRef(1);

  // useEffect(() => {
  //   addPosts();
  // }, []);

  // 등록 날짜 불러오기
  const createDate = () => {
    var date = new Date();
    var year = date.getFullYear();
    var month = ('0' + (1 + date.getMonth())).slice(-2);
    var day = ('0' + date.getDate()).slice(-2);
    return year + '-' + month + '-' + day;
  };
  const createTime = () => {
    var date = new Date();
    var year = date.getFullYear();
    var month = ('0' + (1 + date.getMonth())).slice(-2);
    var day = ('0' + date.getDate()).slice(-2);
    var time = date.toLocaleTimeString();
    return year + '년 ' + month + '월 ' + day + '일 ' + time;
  };
  const [pinicon, setPinicon] = useState(false);
  const togglepinicon = () => {
    setPinicon(!pinicon);
  };
  // useEffect(()=>{
  //   async userUid()=>{
  //     await firestore()
  //     .collection('userIdeaData')
  //     .doc(userUid)
  //     .collection('item')
  //     .add({
  //       title: '앱아이디어',
  //       data: temp.current,
  //       keyword: selectedkeyword,
  //       createDate: createDate(),
  //       updateDate: createDate(),
  //       createTime: createTime(),
  //       updateTime: createTime(),
  //     });
  // },[togglesaveiconFalse]);
  const addPosts = () => {
    let Carddata = [];
    for (let i = 0; i < 4; i++) {
      if (confirmCheckState.current[i]) {
        if (temp.current[i].image === undefined) {
          Carddata.push(temp.current[i].text);
        } else {
          Carddata.push(temp.current[i].image);
        }
      }
    }
    let selectedkeyword = keyword.filter(k => k.select == true);
    console.log(Carddata);
    firestore()
      .collection('userIdeaData')
      .doc(uid)
      .collection('item')
      .add({
        keyword: selectedkeyword,
        carddata: Carddata,
        title: '앱 아이디어',
        createTime: firestore.FieldValue.serverTimestamp(),
        updateTime: firestore.FieldValue.serverTimestamp(),
        createDate: createDate(),
        updateDate: createDate(),
      })
      .then(() => {
        console.log('User added!');
      });
  };
  // save toggleButton
  const [saveicon, setSaveicon] = useState(false);
  const confirmCheckState = useRef([false, false, false, false]);
  const togglesaveiconFalse = () => {
    setSaveicon(!saveicon);
    // alert('저장할 카드를 눌러주세요');
  };
  // const fs = useRef(false);
  // console.log(fs.current);

  // saveIcon에서 check된 상태에서 누를때 -> 배열로 받아온 부분 firestore에 저장
  const togglesaveiconTrue = () => {
    // console.log(temp);
    // console.log(confirmCheckState);
    // 여기에 firebase에 넣는 함수 들어가면 됨.
    setSaveicon(!saveicon);
    console.log(temp.current);
    addPosts();
    // fs.current = true;
    // addPosts(userUid);
    temp.current = [{}, {}, {}, {}];
    confirmCheckState.current = [false, false, false, false];
    // console.log(temp);
    // console.log(confirmCheckState);
  };
  // useEffect(async (userUid) => {
  //   const data = await fetchUser(userId);
  //   setUser(data);
  //   }, [userId]);
  // useEffect(() => {
  //   addPosts(userUid);
  // }, [userUid]);
  // useEffect(() => {
  //   addPosts('userUid', userUid);
  // }, [togglesaveiconTrue]);
  // 체크 여부 판단
  const confirmCheck = index => {
    if (confirmCheckState.current[index]) {
      //체크된 상태면
      confirmCheckState.current[index] = false;
    } else {
      //체크가 안된 상태면
      confirmCheckState.current[index] = true;
      //console.log('출력');
    }
  };
  const [cardData, setCarddata] = useState();

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
  const [clicktextModal, isClickTextModal] = useState(false);
  const textModal = () => {
    isClickTextModal(!clicktextModal);
    bottomSheet.current.close();
    //console.log(eachCard);
  };
  //console.log(isfix);
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
  const isfix1 = idx => {
    let newfix = [!isfix[0], isfix[1], isfix[2], isfix[3]];
    setIsfix(newfix);
  };
  const isfix2 = idx => {
    let newfix = [isfix[0], !isfix[1], isfix[2], isfix[3]];
    setIsfix(newfix);
  };
  const isfix3 = idx => {
    let newfix = [isfix[0], isfix[1], !isfix[2], isfix[3]];
    setIsfix(newfix);
  };
  const isfix4 = idx => {
    let newfix = [isfix[0], isfix[1], isfix[2], !isfix[3]];
    setIsfix(newfix);
  };
  const [ischeck, setIscheck] = useState();
  const [allrandom, setAllRandom] = useState(false);
  const allrandommatching = () => {
    alert('전체카드 랜덤 매칭합니다!');
    setAllRandom(!allrandom);
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
            {pen && !isfix[0] ? (
              <TouchableOpacity
                onPress={bottomModalShow1}
                style={{marginHorizontal: 5}}>
                <SC
                  style={styles.card}
                  pinicon={pinicon}
                  saveicon={saveicon}
                  whichcard={whichcard}
                  idx={0}
                  keyword={keyword[1].label}
                  isfix={isfix}
                  ischeck={ischeck}
                  penicon={pen}
                  setIsfix={isfix1}
                  clicktextModal={clicktextModal}
                  confirmCheckState={confirmCheckState}
                  confirmCheck={confirmCheck}
                  getData={getData}
                  allrandom={allrandom}
                />
              </TouchableOpacity>
            ) : (
              <SC
                style={styles.card}
                pinicon={pinicon}
                saveicon={saveicon}
                whichcard={whichcard}
                idx={0}
                keyword={keyword[1].label}
                isfix={isfix}
                ischeck={ischeck}
                penicon={pen}
                setIsfix={isfix1}
                clicktextModal={clicktextModal}
                confirmCheckState={confirmCheckState}
                confirmCheck={confirmCheck}
                getData={getData}
                allrandom={allrandom}
              />
            )}

            {pen && !isfix[1] ? (
              <TouchableOpacity
                onPress={bottomModalShow2}
                style={{marginHorizontal: 5}}>
                <SC
                  style={styles.card}
                  pinicon={pinicon}
                  saveicon={saveicon}
                  whichcard={whichcard}
                  idx={1}
                  keyword={keyword[2].label}
                  isfix={isfix}
                  ischeck={ischeck}
                  penicon={pen}
                  setIsfix={isfix2}
                  clicktextModal={clicktextModal}
                  confirmCheckState={confirmCheckState}
                  confirmCheck={confirmCheck}
                  getData={getData}
                  allrandom={allrandom}
                />
              </TouchableOpacity>
            ) : (
              <SC
                style={styles.card}
                pinicon={pinicon}
                saveicon={saveicon}
                whichcard={whichcard}
                idx={1}
                keyword={keyword[2].label}
                isfix={isfix}
                ischeck={ischeck}
                penicon={pen}
                setIsfix={isfix2}
                clicktextModal={clicktextModal}
                confirmCheckState={confirmCheckState}
                confirmCheck={confirmCheck}
                getData={getData}
                allrandom={allrandom}
              />
            )}
          </View>
          <View style={styles.contents}>
            {pen && !isfix[2] ? (
              <TouchableOpacity
                onPress={bottomModalShow3}
                style={{marginHorizontal: 5}}>
                <SC
                  style={styles.card}
                  pinicon={pinicon}
                  penicon={pen}
                  saveicon={saveicon}
                  whichcard={whichcard}
                  idx={2}
                  keyword={keyword[3].label}
                  isfix={isfix}
                  ischeck={ischeck}
                  setIsfix={isfix3}
                  clicktextModal={clicktextModal}
                  confirmCheckState={confirmCheckState}
                  confirmCheck={confirmCheck}
                  getData={getData}
                  allrandom={allrandom}
                />
              </TouchableOpacity>
            ) : (
              <SC
                style={styles.card}
                pinicon={pinicon}
                saveicon={saveicon}
                whichcard={whichcard}
                idx={2}
                keyword={keyword[3].label}
                isfix={isfix}
                ischeck={ischeck}
                penicon={pen}
                setIsfix={isfix3}
                clicktextModal={clicktextModal}
                confirmCheckState={confirmCheckState}
                confirmCheck={confirmCheck}
                getData={getData}
                allrandom={allrandom}
              />
            )}
            {pen && !isfix[3] ? (
              <TouchableOpacity
                onPress={bottomModalShow4}
                style={{marginHorizontal: 5}}>
                <SC
                  style={styles.card}
                  pinicon={pinicon}
                  saveicon={saveicon}
                  whichcard={whichcard}
                  idx={3}
                  keyword={keyword[4].label}
                  isfix={isfix}
                  ischeck={ischeck}
                  penicon={pen}
                  setIsfix={isfix4}
                  clicktextModal={clicktextModal}
                  confirmCheckState={confirmCheckState}
                  confirmCheck={confirmCheck}
                  getData={getData}
                  allrandom={allrandom}
                />
              </TouchableOpacity>
            ) : (
              <SC
                style={styles.card}
                pinicon={pinicon}
                saveicon={saveicon}
                whichcard={whichcard}
                idx={3}
                keyword={keyword[4].label}
                isfix={isfix}
                ischeck={ischeck}
                penicon={pen}
                setIsfix={isfix4}
                clicktextModal={clicktextModal}
                confirmCheckState={confirmCheckState}
                confirmCheck={confirmCheck}
                getData={getData}
                allrandom={allrandom}
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
                onPress={togglesaveiconTrue}
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
                onPress={togglesaveiconFalse}
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
