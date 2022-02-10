import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Image,
  BackHandler,
  Alert,
} from 'react-native';
import {Button, Header, Card, Icon} from 'react-native-elements';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { TextInput } from 'react-native-gesture-handler';
import Search from 'react-native-vector-icons/Ionicons';
import Sort from 'react-native-vector-icons/Fontisto';
import Menu from 'react-native-vector-icons/Feather';
import IdeaComponent from '../components/Idea';
import {createDrawerNavigator} from 'react-navigation-drawer';
import { userInfo } from '../User';

//import { fetchPost } from '../actions';
import { transform } from '@babel/core';
import { set } from 'react-hook-form';
//import { Icon } from 'react-native-elements';
const { width, height } = Dimensions.get("window");
const idealist = ({route,navigation}) => {
  const ideas = [];
  //const {userUid} = route.params;
  const [userUid,setUserUid] = useState()//useRef(userInfo.uid)
  const [post, setPost] = useState([])
  const [postSearch, setPostSearch] = useState([])
  const [postFilter, setPostFilter] = useState([])
  const sortList = ['최근 수정 순 ','최근 생성 순 ','가나다 순 ']
  const [index, setIndex] = useState(0)
  //const [deleted, setDeleted] = useRef(false)
  //const deleted = useRef(false)
  const [search, setSearch] = useState('')
  const [test, setTest] = useState(0)
  const testRef = useRef(0)
  const [init, setInit] = useState(false)
  const [emptyList, setEmptyList] = useState(false)
  const [countIdea, setCountIdea] = useState(0); 

  const getPosts = async (userUid) => {
    console.log("getPost")
    const list = []
    await firestore()
        .collection('userIdeaData')
        .doc(userUid)
        .collection('item')
        .orderBy('updateTime','desc')
        .get()
        .then((querySnapshot)=>{
          if(querySnapshot.empty){
            setEmptyList(true)
          }else{
            querySnapshot.forEach((doc)=>{
              let postData = doc.data(); //문서 1개
              postData.postId = doc.id; //문서 id
              postData.createDate = parse(postData.createDate)
              list.push(postData);
            })
          }
          setIndex(0)
        })
    setPost(list)
    setPostSearch(list)
    setPostFilter(list)
    //console.log("list",list)
  }
  const parse= (date) =>{
    const splitedData = date.split('-')
    return splitedData[0][2]+splitedData[0][3]+"."+splitedData[1]+"."+splitedData[2]
  }
  const deletePost = (postId) => {
    console.log('Current Post Id: ', postId);
    firestore()
      .collection('userIdeaData')
      .doc(userUid)
      .collection('item')
      .doc(postId)
      .get()
      .then(documentSnapshot => {
        if (documentSnapshot.exists) {
          console.log('exist');
          firestore()
            .collection('userIdeaData')
            .doc(userUid)
            .collection('item')
            .doc(postId)
            .delete()   //firestore 에서 삭제
            .then(()=>{
              Alert.alert('Delete','삭제 되었습니다',);
              //deleted.current = false
              //setDeleted(true);
              getPosts(userInfo.uid)
            })
            .catch(error => console.log('deletePost', error));
        }
      })
  }
  // useEffect(()=>{
  //   console.log("그냥 useEffect")
  //   setUserUid(userInfo.uid)
  //   getPosts(userInfo.uid);
  // },[])
  //console.log('렌더링', userInfo.uid)
  useEffect(()=>{
    //console.log("useEffect",userInfo.uid)
    setUserUid(userInfo.uid)
    getPosts(userInfo.uid);
    // if (deleted){
    //   //getPosts(userInfo.uid);  //삭제 후 서버에서 데이터 다시
    //   setDeleted(false);
    //   deleted
    // }
  },[])
  //백 버튼
  useFocusEffect(
    useCallback(() => {
      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        () => {
          Alert.alert('Stop', '앱을 종료하시겠습니까?', [
            {text: '아니오', onPress: () => null, style: 'cancel'},
            {
              text: '네',
              onPress: () => {
                BackHandler.exitApp();
              },
            },
          ]);
          return true;
        },
      );
      return () => backHandler.remove();
    }, []),
  );
  const getToday = () => {
    var date = new Date();
    var year = date.getFullYear();
    var month = ('0' + (1 + date.getMonth())).slice(-2);
    var day = ('0' + date.getDate()).slice(-2);
    return year + '.' + month + '.' + day;
  };
  const searchTitle = text => {
    if (text) {
      const tmpPost = post.filter(item => item.title.includes(text));
      setPostSearch(tmpPost);
      setPostFilter(tmpPost);
    } else {
      setPostSearch(post);
      setPostFilter(post);
    }
  };
  const plusIndex = () => {
    var idx = index;
    if (index < 3) {
      idx = index + 1;
      setIndex(index + 1);
    } else {
      idx = 0;
      setIndex(0);
    }
    filterItem(idx);
  };
  const filterItem = idx => {
    const tmpPost = postSearch;
    // console.log("출력",idx, postSearch)
    switch (idx) {
      case 0: //수정
        setPostFilter(postSearch);
        break;
      case 1: //생성
        tmpPost.sort((a, b) => a.createTime - b.createTime);
        setPostFilter(tmpPost);
        console.log('xxx', postSearch);
        break;
      case 2: //이름
        tmpPost.sort((a, b) => a.updateTime - b.updateTime);
        setPostFilter(tmpPost);
        break;
      case 3: //이름
        tmpPost.sort((a, b) => (a.title > b.title ? 1 : -1));
        setPostFilter(tmpPost);
        break;
      default:
        setPostFilter(postSearch);
        // console.log("출력")
        break;
    }
  }
  const menu = () => {
    navigation.openDrawer();
  }
  return (
    <View style={styles.container}>
      {/* <View style={styles.header}> */}
        <TouchableOpacity onPress={()=>{navigation.navigate("ideadevelop")}}>
        {/* <TouchableOpacity onPress={()=>{setTest(test+1)}}> */}
          <Text> 아이디어 발전 </Text>
        </TouchableOpacity>
        <View style={{
          flexDirection:'row',
          backgroundColor: '#fdf8ff',//'//'blue',//'#fdf8ff',
          //justifyContent: 'center',
          alignItems: 'center',
          marginHorizontal:15,
          marginTop: 25,
          marginBottom: 25
        }}>
          <TouchableOpacity onPress={menu}>
          <Menu style={{marginEnd:15}} name='menu' size={30} color="#000"/> 
          </TouchableOpacity> 
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              numberOfLines={1}
              autoComplete='off'  //키보드 자동완성
              placeholder='아이디어 이름을 검색해보세요.'
              //value={search}
              onChangeText={searchTitle}>
            </TextInput>
            <TouchableOpacity disabled={true}>
              {/* <Image
                style={{resizeMode:'cover',marginEnd:15}}
                source={require('../assets/list_search.png')}/> */}
              <Search style={{marginEnd:15, transform:[{rotate: '15deg'}]}} name='ios-search' size={22} color="#000"/>  
            </TouchableOpacity>
          </View>
        </View>
      {/* </View> */}
      <View style={styles.title}>
        <Text style={styles.titlePuzzle}>Puzzles</Text>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={styles.titleSort}>{sortList[index]}</Text>
          <TouchableOpacity onPress={plusIndex}>
            {/* <Image
              style={{resizeMode:'cover',marginEnd:10}}
              source={require('../assets/list_sort.png')}/> */}
            <Sort style={{marginEnd:12, transform:[{rotate: '270deg'}]}} name='arrow-swap' size={22} color="#000"/>
          </TouchableOpacity>
        </View>
      </View>
      {!emptyList
      ? <FlatList
          data={postFilter}
          renderItem={({item})=>(
            <IdeaComponent
              item={item}
              onDelete={deletePost}/>
          )}
          keyExtractor={(item)=>item.postId}
          style={{paddingHorizontal: 15}}>
        </FlatList>
      : <View style={styles.emptyStyle}>
          <Text style={{
            fontFamily:'SB_Aggro_L',
            fontSize:16,
            color:'#595959',
            textAlign: 'center',
            backgroundColor:'#fdf8ff',
            marginBottom:5}}>퍼즐링 아이디어에서</Text>
          <Text style={{
            fontFamily:'SB_Aggro_M',
            fontSize:32,
            color:'#7023D2',
            textAlign: 'center',
            backgroundColor:'#fdf8ff',
            marginVertical:5}}>{countIdea}</Text>
          <Text style={{
            fontFamily:'SB_Aggro_L',
            fontSize:16,
            color:'#595959',
            textAlign: 'center',
            backgroundColor:'#fdf8ff',
            marginVertical:5}}>개의 아이디어가 탄생하고 있어요!</Text>
        </View>
      }
      
      <TouchableOpacity
        style={styles.touchableOpacity}
        activeOpacity={1}
        onPress={()=>{navigation.navigate("ideamatching", {uid: userUid})}}>
        <Image
          //style={styles.plus}
          style={{height:60, width:60}}
          source={require('../assets/listTomatching.png')}/>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fdf8ff',
    //margin: 10
    //marginTop: StatusBar.currentHeight || 0,  //상태바 높이만큼 낮추는 코드
  },
  searchContainer: {
    //flex:1,
    borderColor:'#000',
    borderWidth:1,
    height:48,
    width:width-75,
    flexDirection:'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fdf8ff',
    // marginHorizontal:15,
    // marginTop: 25,
    // marginBottom: 25
  },
  searchInput: {
    flex: 1,
    borderStyle: 'solid',
    padding: 0,
    margin: 0,
    marginHorizontal: 8,
    fontSize: 18,
    fontFamily: 'SB_Aggro_L',
  },
  title: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 15,
    marginBottom: 12,
  },
  titlePuzzle: {
    fontSize: 24,
    fontFamily: 'SB_Aggro_B',
  },
  titleSort: {
    marginEnd: 3,
    fontSize: 14,
    fontFamily: 'SB_Aggro_L',
  },
  // header: {
  //   flexDirection: 'row',
  //   //borderBottomColor: 'black',
  //   //borderBottomWidth: 1,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   backgroundColor: '#fdf8ff',
  //   borderStyle: 'solid',
  //   margin: 15
  // },
  card_button_row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
  },
  CenterComponent: {
    fontSize: 24,
  },
  touchableOpacity: {
    position: 'absolute',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: 30,
  },
  emptyStyle: {
    //height:'100%',
    flex:1,
    backgroundColor: '#fdf8ff',//'blue',//'#fdf8ff',
    justifyContent:'center',
    alignItems:'center'
  },
  // plus:{
  //   resizeMode: 'contain',
  //   width: 50,
  //   height: 50
  // },
});

export default idealist;
