// import React from 'react';
// import {StyleSheet, Text, View} from 'react-native';

// export default function IdeaCommunity() {
//   return (
//     <View style={styles.container}>
//       <Text>IdeaCommunity</Text>
//     </View>
//   );
// }
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });
import React, { useEffect, useState } from 'react';
import {ScrollView, Text, StyleSheet, TouchableOpacity} from 'react-native';
import YouTube from 'react-native-youtube';
import {normalize} from 'react-native-elements';

import * as youtubeApi from '../backend/youtubeApi';
import { Button } from 'react-native-elements/dist/buttons/Button';
import { Value } from 'react-native-reanimated';

export default function IdeaCommunity() {
  const [count, setCount] = useState(0);
  const [res_json, setRes_json] = useState(
    {
      channelId: 'UCQ2DWm5Md16Dc3xRwwhVE7Q',
      channelTitle: 'eo',
      title: '개발자 고민 무엇이든 물어보세요',
      videoId: 'sSI9lKojEjc',
    }
  );

  useEffect(() => {
    // youtubeApi.get_api_res('개발자', '').then((value) => {
    //   //console.log(value);
  //   setRes_json((prevState) => {
  //     return {
  //     ...prevState,
  //     channelId: value.channelId,
  //     channelTitle: value.channelTitle,
  //      title: value.title,
  //      videoId: value.videoId
  //     }
  //     }
  // ); 
    // }).catch((e) => {
    //   console.log(e);
    // })
  }, [count]);
  
  const onPress = () => setCount(prevCount => prevCount + 1);
  
  let json = {
    channelId: 'UCQ2DWm5Md16Dc3xRwwhVE7Q',
    channelTitle: 'eo',
    title: '개발자 고민 무엇이든 물어보세요',
    videoId: 'sSI9lKojEjc',
  };
  console.log(typeof(res_json));
  console.log(json);
  console.log(json.title)

  useEffect(() => {
  setRes_json((prevState) => {
        return {
        ...prevState,
        channelId: json.channelId,
        channelTitle: json.channelTitle,
         title: json.title,
         videoId: json.videoId
        }
        }
    ); 
  }, [count]);

    return (
      <ScrollView>
        <YouTube
         apiKey="AIzaSyDjUPq9DYoDCTbNdzgDkjDWZ3nKLd7LWhM" // process.env.REACT_APP_YOUTUBE_API_KEY
         videoId={res_json.videoId} //{res_json.videoId}
         style={{alignSelf: 'stretch', width:300, height: 170}}
         onReady={(e) => console.log('onReady')}
         onChangeState={(e) => console.log('onChangeState:', e.state)}
         onChangeQuality={(e) => console.log('onChangeQuality: ', e.quality)}
         onError={(e) => console.log('onError: ', e.error)}
         />
         

        <TouchableOpacity
          style={{
            alignItems: "center",
            backgroundColor: "#DDDDDD",
            padding: 10,
            marginTop: 100,
          }}
          onPress={onPress}
        > 

        <Text>effect button</Text>
        </TouchableOpacity>
        <Text>{count}</Text>

      </ScrollView>
    );


  // console.log(res_json);
  // console.log(res_json.videoId);
  // console.log(res_json.videoInfo[0].videoId)
  // if (res_json !== 0) {
  // return (
  //   <ScrollView style={style.container}>
  //     <YouTube
  //       apiKey="AIzaSyDjUPq9DYoDCTbNdzgDkjDWZ3nKLd7LWhM" // process.env.REACT_APP_YOUTUBE_API_KEY
  //       videoId={res_json.videoInfo[0].videoId.toString()} // 리스트에서 보낸 videoId를 받아옴
  //       style={{alignSelf: 'stretch', height: 270}}
  //       onReady={(e) => console.log('onReady')}
  //       onChangeState={(e) => console.log('onChangeState:', e.state)}
  //       onChangeQuality={(e) => console.log('onChangeQuality: ', e.quality)}
  //       onError={(e) => console.log('onError: ', e.error)}
  //     />
  //     {/* <Text style={style.title}>{res_json.title}</Text> */}
  //     {/* <TouchableOpacity onPress= {()=> webComponent()}> */}
  //     {/* <Text style={style.admin}>설명 ~~~~</Text> */}
  //     {/* </TouchableOpacity> */}
  //     {/* <Text style={style.body}>{res_json.desc}</Text> */}
  //   </ScrollView>
  // );
  // } else {
  //   return (
  //     <ScrollView style={style.container}>
  //     </ScrollView>
  //   );
  // }






  // let res_json = youtubeApi.getPlayList('개발자').then((value) => {
  //   console.log(value);
  //   return value;
  // });
  // console.log(res_json);
  // return (
  //   <ScrollView style={style.container}>
  //     <YouTube
  //       apiKey="AIzaSyDjUPq9DYoDCTbNdzgDkjDWZ3nKLd7LWhM" // process.env.REACT_APP_YOUTUBE_API_KEY
  //       videoId={res_json.videoId} // 리스트에서 보낸 videoId를 받아옴
  //       style={{alignSelf: 'stretch', height: 270}}
  //       onReady={(e) => console.log('onReady')}
  //       onChangeState={(e) => console.log('onChangeState:', e.state)}
  //       onChangeQuality={(e) => console.log('onChangeQuality: ', e.quality)}
  //       onError={(e) => console.log('onError: ', e.error)}
  //     />
  //     <Text style={style.title}>{res_json.title}</Text>
  //     {/* <TouchableOpacity onPress= {()=> webComponent()}> */}
  //     <Text style={style.admin}>설명 ~~~~</Text>
  //     {/* </TouchableOpacity> */}
  //     <Text style={style.body}>{res_json.desc}</Text>
  //   </ScrollView>
  // );
};


const style = StyleSheet.create({
  container: {
    //flex: 1,
    //backgroundColor: '#fff',
    //marginTop: StatusBar.currentHeight || 0,  //상태바 높이만큼 낮추는 코드
  },
  title: {

  },
  admin: {

  },
  body: {

  }
});
