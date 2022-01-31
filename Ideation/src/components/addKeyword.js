import React, {useState, useCallback, useEffect} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import axios from 'axios';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

const titleList = [];
const YoutubeApi = searchItem => {
  /* 유튜브 api 받아오기 */
  const [params, setParams] = useState({
    key: 'AIzaSyBuG4NGZUXTEkePD63t9uoqprOU_LSKs30',
    part: 'snippet',
    q: searchItem,
    maxResults: 5,
    type: 'video',
  });
  useEffect(() => {
    axios.defaults.baseURL = 'https://www.googleapis.com/youtube/v3';
    axios
      .get('./search', {params})
      .then(response => {
        if (!response) {
          return;
        } else {
          let i = 0;
          for (i = 0; i < params.maxResults; i++) {
            // console.log(response.data.items[i].snippet.title);
            titleList[i] = response.data.items[i].snippet;
          }
        }
        console.log(titleList);
      })
      .catch(error => {
        console.log(error);
      });
  }, [params]);
  const changeKeyword = keyword => {
    setParams({...params, q: `${keyword}`});
  };
};

const Addkeyword = tempkey => {
  /* firebase userIdeaData 읽어오기 */
  // useEffect(() => {
  //   const db = firestore()
  //     .collection('userIdeaData')
  //     .doc('2A1NC1xuvKTSZ66p9UZp15qnGLL2')
  //     .collection('item')
  //     .doc('GPXJimnjKB4iTihal1LW')
  //     .onSnapshot(documentSnapshot => {
  //       console.log(documentSnapshot.data().keyword[0]);
  //     });
  // }, []);

  // firestore에 키워드 추가하기
  let idx = 0;
  console.log(tempkey);
  YoutubeApi(tempkey.tempkey);
  // console.log(titleList[0]);
  const [keyworddata, setKeyworddata] = useState({
    key: 0,
    label: '',
    selected: false,
  });
  const change = () => {
    setKeyworddata(
      {key: idx++, label: titleList[idx], selected: false},
      {key: idx++, label: titleList[idx], selected: false},
      {key: idx++, label: titleList[idx], selected: false},
      {key: idx++, label: titleList[idx], selected: false},
    );
  };
  //categoryData -> doc(keyword) -> keyworddata
  useEffect(() => {
    setTimeout(() => {
      const res = firestore()
        .collection('categoryData')
        .doc(tempkey.tempkey)
        .set(keyworddata);
    }, 1000);
  });
  return (
    <View>
      <TouchableOpacity onPress={change}>
        <Text>키워드 추가</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Addkeyword;
