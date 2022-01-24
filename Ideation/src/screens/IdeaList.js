import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  FlatList,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {Button, Header, Card, Icon} from 'react-native-elements';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {fetchPost, deletePost, snapshotPost} from '../actions';  //현재 코드에서 사용하지 않음

const IdeaComponent = (item, userUid) => {
  return (
      <TouchableOpacity key={item.postId} style={{marginBottom: 40, flexDirection: 'row', justifyContent: 'center'}} activeOpacity={0.8}>
         <TouchableOpacity style={{flex:1}}>
           <Card containerStyle={{height: 100, borderRadius: 4}}>
            <Card.Image
              style={{width: '100%', height: '100%'}}
              source={require('../assets/pet1.jpg')}></Card.Image>
           </Card>
         </TouchableOpacity>
        <View style={{flex:1}}>
           <Text style={{fontSize: 14, marginBottom: 5}}>{item.createDate}</Text>
          <Text style={{fontSize: 17, marginBottom: 5, fontWeight:'bold'}}>{item.title}</Text>
          <Text style={{fontSize: 14}}>{item.keyword}</Text>
          <Text style={{fontSize: 14}}>{item.updateDate}</Text>
          {/* <TouchableOpacity>
            <Text style={styles.delete_button_text} onPress={()=>{deletePost(item.postId, userUid)}}>삭제</Text>
          </TouchableOpacity> */}
        </View>
      </TouchableOpacity>
  );
};

const idealist = ({route,navigation}) => {
  const ideas = [];
  const {userUid} = route.params;
  const [post, setPost] = useState([])

  useEffect(()=>{
    const item = [];
    firestore()
      .collection('userIdeaData')
      .doc(userUid)
      .collection('item')
      .orderBy('updateTime','desc')  //업데이트 순으로 정렬
      .onSnapshot(querySnapshot => {
        querySnapshot.forEach((doc)=>{
          let postData = doc.data(); //아이디어 필드
          postData.postId = doc.id;
          item.push(postData);
        })
        setPost(item)
      })
  },[])

  const getToday = () => {
    var date = new Date();
    var year = date.getFullYear();
    var month = ("0"+(1+date.getMonth())).slice(-2)
    var day = ("0"+date.getDate()).slice(-2)
    return year+"."+month+"."+day
  }
  const createMyIdea = () => {  //테스트용
    console.log("userUid",userUid)
    firestore()
      .collection('userIdeaData')
      .doc(userUid)
      .collection('item')
      .add({
        title: '',
        keyword: ['',''],
        updateTime: firestore.FieldValue.serverTimestamp(),
        createTime: firestore.FieldValue.serverTimestamp(), //수정할 것
        createDate: getToday(),
        updateDate: getToday(),
      })
      .then(()=>{
        console.log('Completed Add!')
      })
      .catch(error => console.log(error))
  }
  const readMyIdea = () => { //테스트용
    firestore()
      .collection('userIdeaData')
      .doc(userUid)
      .collection('item')
      .orderBy('updateTime','desc') 
      .onSnapshot(querySnapshot => {
        const ideas = [];
        querySnapshot.forEach(documentSnapshot => {   
          ideas.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });
        console.log("데이터",ideas)
      })
  }
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={{flex: 1}}></View>
        <View style={styles.idealist}>
          <Text style={{fontSize: 25}}>아이디어 리스트</Text>
        </View>
        <View style={{flex: 1}}>
          <TouchableOpacity>
            <Icon
              name="dots-three-horizontal"
              type="entypo"
              style={styles.setting}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.top_buttons}>
        {/* <TouchableOpacity style={styles.top_button}>
          <Text style={styles.top_button_text} onPress={()=>{createMyIdea()}}>create</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.top_button}>
          <Text style={styles.top_button_text}  onPress={()=>{}}>read</Text>
        </TouchableOpacity> */}
      </View>
      <ScrollView style={{margin: 5}}>
        {post
        ?post.map((item)=>{
          return(IdeaComponent(item,userUid,post))
        })
        : null}
      </ScrollView>  
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    //marginTop: StatusBar.currentHeight || 0,  //상태바 높이만큼 낮추는 코드
  },
  idealist: {
    flex: 8,
    alignContent: 'center',
    alignItems: 'center',
    margin: 15,
  },
  setting: {},
  header: {
    flexDirection: 'row',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  top_buttons: {
    marginTop: 12,
    marginLeft: 15,
    marginRight: 15,
    flexDirection: 'row',
  },
  top_button: {
    padding: 5,
  },
  top_button_text: {
    fontSize: 20,
    backgroundColor: '#E7D9FF',
    padding: 10,
    borderRadius: 5,
    borderColor: 'black',
    borderWidth: 0.6,
  },
  card_button_row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
  },
  bottom_button: {
    width: 50,
  },
  CenterComponent: {
    fontSize: 24,
  },
  delete_button_text:{
    fontSize: 12,
    backgroundColor: '#E7D9FF',
    padding: 5,
    borderRadius: 5,
    borderColor: 'black',
    borderWidth: 0.6,
  }
});

export default idealist;
