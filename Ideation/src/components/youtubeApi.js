import React, {useState, useCallback, useEffect} from 'react';
import axios from 'axios';
import firestore from '@react-native-firebase/firestore';
const YoutubeApi = () => {
  /* 유튜브 api 받아오기 */
  // firestore()
  //   .collection('categoryData')
  //   .doc('노래')
  //   .add({titleList: titleList})
  //   .then(() => {
  //     console.log('categorydata added');
  //   });
};

export default YoutubeApi;

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

// axios.defaults.baseURL = 'https://www.googleapis.com/youtube/v3';
// const [params, setParams] = useState({
//   key: 'AIzaSyBuG4NGZUXTEkePD63t9uoqprOU_LSKs30',
//   part: 'snippet',
//   // q: {search},
//   q: '노래',
//   maxResults: 5,
//   type: 'video',
//   order: 'viewCount',
// });

// const [titleList, setTitleList] = useState([]);
// axios
//   .get('./search', {params})
//   .then(response => {
//     if (!response) {
//       return;
//     } else {
//       let i = 0;
//       for (i = 0; i < params.maxResults; i++) {
//         title = response.data.items[i].snippet.title;
//         setTitleList([...titleList, title]);
//       }
//     }
//   })
//   .catch(error => {
//     console.log(error);
//   });
