import React, {useState, useCallback, useEffect} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import axios from 'axios';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import googletrends from 'google-trends-api';
const YoutubeApi = () => {
  // axios.defaults.baseURL = 'https://www.googleapis.com/youtube/v3';
  // const [params, setParams] = useState({
  //   key: 'AIzaSyBuG4NGZUXTEkePD63t9uoqprOU_LSKs30',
  //   part: 'snippet',
  //   q: {keyword},
  //   maxResults: 5,
  //   type: 'video',
  // });
  // const titleList = [];
  // axios
  //   .get('./search', {params})
  //   .then(response => {
  //     if (!response) {
  //       return;
  //     } else {
  //       let i = 0;
  //       for (i = 0; i < params.maxResults; i++) {
  //         // const itemRandom = Math.floor(Math.random() * 20);
  //         console.log(params.q);
  //         console.log(response.data.items[i].snippet.title);
  //       }
  //     }
  //     // console.log(titleList);
  //   })
  //   .catch(error => {
  //     console.log(error);
  //   });
  // const changeKeyword = keyword => {
  //   setParams({...params, q: `${keyword}`});
  // };
  // axios.get(params) => {
  //   const ref = firebase().ref()
  //   let data = await (await fetch(ref+params+'.json')).json();
  //   return data;
  // }
  // axios
  //   .get('https://wit-idea-20fa8-default-rtdb.firebaseio.com/')
  //   .then(function response(response) {
  //     console.log(response);
  //   })
  //   .catch(function (error) {
  //     console.log(error);
  //   });
  //파이어베이스 스토리지 이미지 가져오기 https://wit-idea-20fa8-default-rtdb.firebaseio.com/
  // const reference = firebase
  //   .app()
  //   .database('https://wit-idea-20fa8-default-rtdb.firebaseio.com/')
  //   .ref('/users/123');
  // console.log(reference);

  // useEffect(() => {
  //   const db = firestore()
  //     .collection('userIdeaData')
  //     .doc('2A1NC1xuvKTSZ66p9UZp15qnGLL2')
  //     .collection('item')
  //     .doc('6OdI7wrzLU5iULHDALJI')
  //     .onSnapshot(documentSnapshot => {
  //       console.log(documentSnapshot.data().keyword[0]);
  //     });
  // }, []);
  return (
    <View style={{flex: 1, backgroundColor: 'pink'}}>
      <Text>안녕하세요</Text>
    </View>
  );
};

export default YoutubeApi;
