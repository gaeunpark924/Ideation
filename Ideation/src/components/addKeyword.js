import React, {useState, useCallback, useEffect} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import axios from 'axios';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

// searchItem에는 검색할 키워드가 들어감

const Addkeyword = keyword => {
  const [params, setParams] = useState({
    key: 'AIzaSyBuG4NGZUXTEkePD63t9uoqprOU_LSKs30',
    part: 'snippet',
    q: keyword,
    maxResults: 10,
    type: 'video',
    order: 'viewCount',
  });
  const [imageList, setImageList] = useState([]);
  axios.defaults.baseURL = 'https://www.googleapis.com/youtube/v3';
  axios
    .get('./search', {params})
    .then(response => {
      if (!response) {
        return;
      } else {
        let i = 0;
        for (i = 0; i < params.maxResults; i++) {
          image = response.data.items[i].snippet.thumbnails;
          setImageList([...imageList, image]);
        }
      }
    })
    .then(response => {
      console.log('YoutubeAPI success');
      firestore()
        .collection('categoryData')
        .doc('item')
        .collection(keyword)
        .doc()
        .set({
          keyword: keyword,
          data: imageList,
        });
    })
    .catch(error => {
      console.log(error);
    });

  // useEffect(() => {
  //   console.log(imageList);
  //   firestore()
  //     .collection('categoryData')
  //     .doc('item')
  //     .collection(keyword)
  //     .doc()
  //     .set({
  //       keyword: keyword,
  //       data: imageList,
  //     });
  // }, []);
  /* firebase userIdeaData 읽어오기 */
  // firestore에 키워드 추가하기
  // useEffect(() => {
  //   let idx = 0;
  //   YoutubeApi(tempkey.tempkey); //youtube api로부터 받아서 titlelist에 저장
  // });
  // const YoutubeApi = searchItem => {
  /* 유튜브 api 받아오기 */
  // const [titleList, setTitleList] = useState({title: ''});
  // const [thumbnailList, setThumbNailList] = useState();
  // const [params, setParams] = useState({
  //   key: 'AIzaSyBuG4NGZUXTEkePD63t9uoqprOU_LSKs30',
  //   part: 'snippet',
  //   q: searchItem,
  //   maxResults: 5,
  //   type: 'video',
  // });
  //   useEffect(() => {
  //     axios.defaults.baseURL = 'https://www.googleapis.com/youtube/v3';
  //     axios
  //       .get('./search', {params})
  //       .then(response => {
  //         if (!response) {
  //           return;
  //         } else {
  //           let i = 0;
  //           for (i = 0; i < params.maxResults; i++) {
  //             // console.log(response.data.items[i].snippet.description);
  //             // titleList[i] = response.data.items[i].snippet.title;
  //             setTitleList({
  //               ...titleList,
  //               ['title']: response.data.items[i].snippet.title,
  //             });
  //             // thumbnailList[i] =
  //             //   response.data.items[i].snippet.thumbnails.default.url;
  //             // setThumbNailList(
  //             //   ...thumbnailList,
  //             //   response.data.items[i].snippet.thumbnails.default.url,
  //             // );
  //           }
  //         }
  //       })
  //       .then(response => {
  //         console.log('타이틀' + titleList);
  //         console.log('썸네일' + thumbnailList);
  //       })
  //       .catch(error => {
  //         console.log(error);
  //       });
  //   }, [params, titleList, thumbnailList]);
  //   return titleList;
  // };
  // //categoryData -> doc(keyword) -> keyworddata
  // const obj = Object.assign({}, YoutubeApi(tempkey.tempkey));
  // const res = firestore()
  //   .collection('categoryData')
  //   .doc(tempkey.tempkey)
  //   .set(obj);
  // useEffect(() => {
  //   // .set({ddd: '222', text: '예빛'});
  // }, [tempkey.tempkey]);
  // const dataText = keyworddata.map(k => (
  //   <View>
  //     <Text>{k.label}</Text>
  //   </View>
  // ));
};

export {Addkeyword};
