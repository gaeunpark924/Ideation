import React, {useState, useCallback, useEffect} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import axios from 'axios';
import {firebase} from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
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
  // const user = auth().currentUser;
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    auth().onAuthStateChanged(userState => {
      setUser(userState);

      if (loading) {
        setLoading(false);
      }
    });
    console.log(user);
  });
  return (
    <View style={{flex: 1, backgroundColor: 'pink'}}>
      <Text>안녕하세요</Text>
    </View>
  );
};

export default YoutubeApi;
