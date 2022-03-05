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
import axios from 'axios';
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
    {key: index++, label: '자연', select: true},
    {key: index++, label: '건축', select: true},
    {key: index++, label: '예술', select: true},
    {key: index++, label: '뷰티', select: true},
    {key: index++, label: '디자인', select: false},
    {key: index++, label: '교육', select: false},
    {key: index++, label: '테크', select: false},
    {key: index++, label: '음악', select: false},
    {key: index++, label: '금융', select: false},
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
  // 키워드 별로 데이터를 firestore에 저장해둠
  // const getYoutubeApi = () => {
  //   keyword.map(k => Addkeyword.Addkeyword(k.label));
  // };
  const setparams = keyword => {
    let params = {
      key: 'AIzaSyDPF1fcVa8EAn0jyvcydfOIffcN2gn_Qzg',
      part: 'snippet',
      q: keyword,
      maxResults: 6,
      type: 'video',
      order: 'viewCount',
    };
    return params;
  };

  // Youtube API를 이용해서 imagelist를 반환한다.
  const Addkeyword = keyword => {
    let params = setparams(keyword);
    const imagelist = [];
    axios.defaults.baseURL = 'https://www.googleapis.com/youtube/v3';
    return axios
      .get('./search', {params})
      .then(response => {
        if (!response) {
          console.log('response 실패');
          return;
        } else {
          let i = 0;
          for (i = 0; i < params.maxResults; i++) {
            let image = response.data.items[i].snippet.thumbnails.high.url;
            imagelist.push(image);
            // console.log('image : ' + image);
          }
          console.log('이미지 url들 ' + imagelist);
          return imagelist;
        }
      })
      .catch(error => {
        console.log('에러');
        console.log(error);
      });
  };
  // 가지고 있는 키워드 개수만큼 Addkeyword 호출, firebase에 저장
  const putfirebase = async () => {
    const keywordlist = keyword.map(k => k.label);
    let imagelist = [];
    for (let i = 0; i < keywordlist.length; i++) {
      try {
        imagelist = await Addkeyword(keywordlist[i]);
      } catch (error) {
        console.log('첫번째' + error);
      }
      try {
        console.log('dd' + imagelist);
        if (imagelist.length != 0) {
          firestore()
            .collection('categoryData')
            .doc('item')
            .update({
              [keywordlist[i]]: {image: imagelist},
            });
        }
      } catch (error) {
        console.log('두번째 오류' + error);
      }
    }
  };
  // useEffect(() => {
  //   putfirebase();
  // }, []);

  // 키워드 추가 모달창
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
          <Text style={{fontSize: 16, fontFamily: 'SB_Aggro_L'}}>
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
          <Text style={{fontSize: 16, fontFamily: 'SB_Aggro_L'}}>
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

  // 고정 아이콘 toggleicon
  const [pinicon, setPinicon] = useState(false);
  const togglepinicon = () => {
    setPinicon(!pinicon);
  };

  // penicon 누르고 나서 어떤 card 선택되었는지
  const [whichcard, setWhichCard] = useState([false, false, false, false]);

  /* 모달창 toggleButton */
  const [isModalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  // 체크된 카드의 내용 저장
  const temp = useRef([{}, {}, {}, {}]);
  const getData = (idx, cd) => {
    if (confirmCheckState.current[idx]) {
      temp.current[idx] = cd;
    } else if (!confirmCheckState.current[index]) {
      temp.current[idx] = {};
    }
  };

  // firestore에 체크된 카드 내용 저장하기 위해 등록 날짜 불러오기
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
  const next = useRef(false);
  const addPosts = () => {
    let Carddata = [];
    for (let i = 0; i < 4; i++) {
      if (confirmCheckState.current[i]) {
        if (temp.current[i].image === undefined) {
          Carddata.push(temp.current[i].text);
        } else {
          Carddata.push(temp.current[i].image);
        }
      } else if (confirmCheckState.current[i]) {
        continue;
      }
    }
    let selectedkeyword = keyword.filter(k => k.select == true);
    console.log(Carddata);
    if (Carddata.length === 0) {
      next.current = false;
      alert('저장할 카드를 체크해주세요!');
      console.log('저장할 카드를 체크해주세요!');
    } else {
      next.current = true;
      try {
        firestore()
          .collection('userIdeaData')
          .doc(uid)
          .collection('item')
          .add({
            keyword: selectedkeyword,
            carddata: Carddata,
            title: 'Puzzle Name',
            createTime: firestore.FieldValue.serverTimestamp(),
            updateTime: firestore.FieldValue.serverTimestamp(),
            createDate: createDate(),
            updateDate: createDate(),
            offset: true
          })
          .then(() => {
            console.log('User added!');
          });
      } catch (error) {
        console.log('error' + error);
      }
    }
  };
  const increaseIdea = async () => {
    await firestore()
        .collection('ideaCount')
        .doc('numOfIdea')
        .update({numOfIdea:firestore.FieldValue.increment(1)})
        .then(() => {
        })
        .catch((error)=>{
          console.log('error',error)
        })
  }
  // save toggleButton
  const [saveicon, setSaveicon] = useState(false);

  const confirmCheckState = useRef([false, false, false, false]);
  const togglesaveiconFalse = () => {
    setSaveicon(!saveicon);
    // alert('저장할 카드를 눌러주세요');
  };

  // saveIcon에서 check된 상태에서 누를때 -> 배열로 받아온 부분 firestore에 저장
  const togglesaveiconTrue = () => {
    setSaveicon(!saveicon);
    console.log(temp.current);
    addPosts();
    increaseIdea();
    temp.current = [{}, {}, {}, {}];
    confirmCheckState.current = [false, false, false, false];
    // console.log(next);
    // if (next.current) {
    //   navigation.navigate('ideadevelop', {uid: uid});
    // }
  };
  // 체크 여부 판단  //여기가 먼저
  const confirmCheck = index => {
    if (confirmCheckState.current[index]) {
      //체크된 상태면
      confirmCheckState.current[index] = false;
    } else {
      //체크가 안된 상태면
      confirmCheckState.current[index] = true;
    }
  };

  // pen toggleButton
  const [pen, setPen] = useState(false);
  const togglepen = () => {
    setPen(!pen);
  };
  // 1,2,3,4 각각을 선택했을때 나타나는 bottomModal
  const bottomModalShow1 = () => {
    bottomSheet.current.show();
    setWhichCard([true, false, false, false]);
  };
  const bottomModalShow2 = () => {
    bottomSheet.current.show();
    setWhichCard([false, true, false, false]);
  };
  const bottomModalShow3 = () => {
    bottomSheet.current.show();
    setWhichCard([false, false, true, false]);
  };
  const bottomModalShow4 = () => {
    bottomSheet.current.show();
    setWhichCard([false, false, false, true]);
  };
  const bottomSheet = useRef(); // bottomModal 변수

  // 이미지 저장을 위함
  const optionsImage = {
    mediaType: 'photo',
    maxWidth: 180,
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };
  // 이미지를 갤러리에서 들고옴 -> 수정 필요..!
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

  // 기록할때 textmodal 누른지 여부
  const [clicktextModal, isClickTextModal] = useState(false);
  const textModal = () => {
    isClickTextModal(!clicktextModal);
    bottomSheet.current.close();
  };

  // 고정 여부
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

  // 현재 선택된 키워드
  const selectedkeyword = () => {
    let kl = [];
    for (let i = 0; i < keyword.length; i++) {
      if (keyword[i].select === true) {
        kl.push(keyword[i].label);
      }
    }
    return kl;
  };
  useEffect(() => {
    console.log('현재 키워드' + selectedkeyword());
    selectedkeyword;
  }, [keyword]);
  return (
    <View style={styles.container}>
      {saveicon ? null : (
        <View style={styles.projectname}>
          <Text style={styles.projecttitle}>Puzzling</Text>
        </View>
      )}
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
                    <Text style={{fontSize: 16, fontFamily: 'SB_Aggro_L'}}>
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
                        fontFamily: 'SB_Aggro_M',
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
                <Text style={{fontFamily: 'SB_Aggro_L'}}>텍스트 입력하기</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={takeImagefromphone}
                style={styles.bottomModal}>
                <PictureIcon
                  name="picture-o"
                  size={24}
                  style={{marginRight: 7}}
                />
                <Text style={{fontFamily: 'SB_Aggro_L'}}>사진 가져오기</Text>
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
                  keywordlist={selectedkeyword()}
                  isfix={isfix}
                  ischeck={ischeck}
                  penicon={pen}
                  setIsfix={isfix1}
                  clicktextModal={clicktextModal}
                  confirmCheckState={confirmCheckState}
                  confirmCheck={confirmCheck}
                  getData={getData}
                  allrandom={allrandom}
                  confirmCheck={confirmCheck}
                />
              </TouchableOpacity>
            ) : (
              <SC
                style={styles.card}
                pinicon={pinicon}
                saveicon={saveicon}
                whichcard={whichcard}
                idx={0}
                keywordlist={selectedkeyword()}
                isfix={isfix}
                ischeck={ischeck}
                penicon={pen}
                setIsfix={isfix1}
                clicktextModal={clicktextModal}
                confirmCheckState={confirmCheckState}
                confirmCheck={confirmCheck}
                getData={getData}
                allrandom={allrandom}
                confirmCheck={confirmCheck}
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
                  keywordlist={selectedkeyword()}
                  isfix={isfix}
                  ischeck={ischeck}
                  penicon={pen}
                  setIsfix={isfix2}
                  clicktextModal={clicktextModal}
                  confirmCheckState={confirmCheckState}
                  confirmCheck={confirmCheck}
                  getData={getData}
                  allrandom={allrandom}
                  confirmCheck={confirmCheck}
                />
              </TouchableOpacity>
            ) : (
              <SC
                style={styles.card}
                pinicon={pinicon}
                saveicon={saveicon}
                whichcard={whichcard}
                idx={1}
                keywordlist={selectedkeyword()}
                isfix={isfix}
                ischeck={ischeck}
                penicon={pen}
                setIsfix={isfix2}
                clicktextModal={clicktextModal}
                confirmCheckState={confirmCheckState}
                confirmCheck={confirmCheck}
                getData={getData}
                allrandom={allrandom}
                confirmCheck={confirmCheck}
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
                  keywordlist={selectedkeyword()}
                  isfix={isfix}
                  ischeck={ischeck}
                  setIsfix={isfix3}
                  clicktextModal={clicktextModal}
                  confirmCheckState={confirmCheckState}
                  confirmCheck={confirmCheck}
                  getData={getData}
                  allrandom={allrandom}
                  confirmCheck={confirmCheck}
                />
              </TouchableOpacity>
            ) : (
              <SC
                style={styles.card}
                pinicon={pinicon}
                saveicon={saveicon}
                whichcard={whichcard}
                idx={2}
                keywordlist={selectedkeyword()}
                isfix={isfix}
                ischeck={ischeck}
                penicon={pen}
                setIsfix={isfix3}
                clicktextModal={clicktextModal}
                confirmCheckState={confirmCheckState}
                confirmCheck={confirmCheck}
                getData={getData}
                allrandom={allrandom}
                confirmCheck={confirmCheck}
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
                  keywordlist={selectedkeyword()}
                  isfix={isfix}
                  ischeck={ischeck}
                  penicon={pen}
                  setIsfix={isfix4}
                  clicktextModal={clicktextModal}
                  confirmCheckState={confirmCheckState}
                  confirmCheck={confirmCheck}
                  getData={getData}
                  allrandom={allrandom}
                  confirmCheck={confirmCheck}
                />
              </TouchableOpacity>
            ) : (
              <SC
                style={styles.card}
                pinicon={pinicon}
                saveicon={saveicon}
                whichcard={whichcard}
                idx={3}
                keywordlist={selectedkeyword()}
                isfix={isfix}
                ischeck={ischeck}
                penicon={pen}
                setIsfix={isfix4}
                clicktextModal={clicktextModal}
                confirmCheckState={confirmCheckState}
                confirmCheck={confirmCheck}
                getData={getData}
                allrandom={allrandom}
                confirmCheck={confirmCheck}
              />
            )}
          </View>
        </View>
      </View>
      {saveicon ? (
        <View style={styles.saveinfo}>
          <Text style={styles.saveinfotext}>저장할 퍼즐을 선택해주세요.</Text>
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
                borderWidth: 0.7,
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
                borderWidth: 0.7,
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
                borderWidth: 0.7,
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
                borderWidth: 0.7,
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
                borderWidth: 0.7,
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
                <Text style={{fontSize: 16, fontFamily: 'SB_Aggro_L'}}>
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
                borderWidth: 0.7,
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
                <Text style={{fontSize: 16, fontFamily: 'SB_Aggro_L'}}>
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
            backgroundColor: '#CCA5FF',
            justifyContent: 'center',
            borderColor: 'black',
            borderWidth: 0.7,
            margin: 5,
          }}>
          <TouchableOpacity
            onPress={allrandommatching}
            style={{
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{fontSize: 24, fontFamily: 'SB_Aggro_M'}}>
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
    fontFamily: 'SB_Aggro_B',
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
  addkeywordtext: {fontSize: 16, marginRight: 7, fontFamily: 'SB_Aggro_M'},
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
  saveinfotext: {opacity: 0.33, fontFamily: 'SB_Aggro_L'},
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
