import React, {useEffect, useState, useCallback, useRef, useContext} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Image,
  ImageBackground,
  BackHandler,
  Alert,
  ActivityIndicator,
  Keyboard,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {TextInput} from 'react-native-gesture-handler';
import Search from 'react-native-vector-icons/Ionicons';
import Sort from 'react-native-vector-icons/Fontisto';
import Menu from 'react-native-vector-icons/Feather';
import IdeaComponent from '../components/Idea';
import {UserContext} from "../../App"
import {Guide, Num} from "../components/N"

//import { fetchPost } from '../actions';
import { mainTheme } from '../theme/theme';

const { width, height } = Dimensions.get("window");
const idealist = ({route,navigation}) => {
  const userCnt = useContext(UserContext)
  const [userUid, setUserUid] = useState(userCnt.uid);
  const [post, setPost] = useState([]);
  const sortList = ['최근 수정 순 ', '최근 생성 순 ', '가나다 순 '];
  //const [deleted, setDeleted] = useRef(false)
  //const deleted = useRef(false)
  const [search, setSearch] = useState('');
  const [test, setTest] = useState(0);
  const [init, setInit] = useState(false);
  const [emptyList, setEmptyList] = useState(false);
  const [countIdea, setCountIdea] = useState(0);
  // const numOfIdea = useRef();
  const [numOfIdea, setNumOfIdea] = useState()
  const [sortIndex, setSortIndex] = useState(0)
  const [searchText, setSearchText] = useState()

  const getPosts = async (userUid) => {
    // console.log("getPost", userUid)
    const list = []
    await firestore()
        .collection('userIdeaData')
        .doc(userUid)
        .collection('item')
        .orderBy('updateTime', 'desc')
        .get()
        .then(querySnapshot => {
          if (querySnapshot.empty) {
            setEmptyList(true);
            getNumOfIdea()
          } else {
            querySnapshot.forEach(doc => {
              let postData = doc.data(); //문서 1개
              postData.postId = doc.id; //문서 id
              postData.createDate = parse(postData.createDate);
              list.push(postData);
              // console.log('postData',postData)
            })
            setEmptyList(false)
            setPost(list)
          }
          setSortIndex(0)
          setInit(true)
        })
        .catch((error)=>{
          console.log('error',error)
        })
  }
  const deletePost = (postId) => {
    firestore()
      .collection('userIdeaData')
      .doc(userUid)
      .collection('item')
      .doc(postId)
      .get()
      .then(documentSnapshot => {
        if (documentSnapshot.exists) {
          firestore()
            .collection('userIdeaData')
            .doc(userUid)
            .collection('item')
            .doc(postId)
            .delete() //firestore 에서 삭제
            .then(() => {
              Alert.alert('Delete', '삭제 되었습니다');
              decreaseIdea()
              getPosts(userUid);
            })
            .catch(error => console.log('deletePost', error));
        }
      });
  };
  const decreaseIdea = async () => {
    await firestore()
        .collection('ideaCount')
        .doc('numOfIdea')
        .update({numOfIdea:firestore.FieldValue.increment(-1)})
        .then(() => {
        })
        .catch((error)=>{
          console.log('error',error)
        })
  }
  const getNumOfIdea = async () => {
    await firestore()
        .collection('ideaCount')
        .doc('numOfIdea')
        .get()
        .then(querySnapshot => {
          setNumOfIdea(querySnapshot.data().numOfIdea)
        })
        .catch((error)=>{
          setNumOfIdea('166,483')
        })
  }
  const parse = (date) =>{
    const splitedData = date.split('-')
    return splitedData[0][2]+splitedData[0][3]+"."+splitedData[1]+"."+splitedData[2]
  }  
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
  //리스트화면이 포커스 되면
  useEffect(() => {
    const willFocusSubscription = navigation.addListener('focus', () => {
      getPosts(userUid)
      //getNumOfIdea()
    });
  return willFocusSubscription;
  }, []);
  const searchTitle = text => {
    setSearchText(text)
  };
  //정렬 index
  const plusIndex = () => {
    if (sortIndex < 2) {
      setSortIndex(sortIndex + 1);
    } else {
      setSortIndex(0);
    }
  };
  const menu = () => {
    Keyboard.dismiss();
    navigation.openDrawer();
  }
  const pressIdea = (items) => {
    navigation.navigate('ideadevelop', {puzzle: items, userUid:userUid})
  }
  return (
    <View style={styles.container}>
        <View style={{
          flexDirection:'row',
          backgroundColor: '#fdf8ff',
          alignItems: 'center',
          marginHorizontal: 15,
          marginTop: 25,
          marginBottom: 25,
        }}>
        <TouchableOpacity onPress={menu}>
          <Menu style={{marginEnd: 15}} name="menu" size={30} color="#000" />
        </TouchableOpacity>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            numberOfLines={1}
            autoComplete="off" //키보드 자동완성
            placeholder="아이디어 이름을 검색해보세요."
            //value={search}
            onChangeText={searchTitle}></TextInput>
          <TouchableOpacity disabled={true}>
            <Search style={{marginEnd: 15, transform: [{rotate: '15deg'}]}} name="ios-search" size={22} color="#000"/>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.title}>
        <Text style={styles.titlePuzzle}>Puzzles</Text>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          {!emptyList && <Text style={styles.titleSort}>{sortList[sortIndex]}</Text>}
          <TouchableOpacity onPress={plusIndex}>
            <Sort style={{marginEnd: 12, transform: [{rotate: '270deg'}]}} name="arrow-swap" size={22} color="#000" />
          </TouchableOpacity>
        </View>
      </View>
      {!init && <ActivityIndicator style={{justifyContent:'center',alignItems:'center'}} size="large" color="gray" />}
      {!emptyList
      ? <FlatList
          data={
            searchText ?
            post.filter(item => item.title.toLowerCase().includes(searchText.toLowerCase()))  //검색
            : sortIndex === 0 ?
            post.sort((a,b)=> b.updateTime - a.updateTime)  //수정시간 기준 내림차순
            : sortIndex === 1 ?
            post.sort((a, b) => b.createTime - a.createTime)  //생성 시간 기준 내림차순
            : sortIndex === 2 &&
            post.sort((a, b) => (a.title > b.title ? 1 : -1))  //
          }
          renderItem={({item})=>(
          <IdeaComponent
            item={item}
            onDelete={deletePost}
            pressIdea={pressIdea}/>
          )}
          keyExtractor={item => item.postId}
          style={{paddingHorizontal: 15}}></FlatList>
      : <View style={{flex:1}}>
          <View style={{flex:1,justifyContent: 'center',alignItems: 'center',}}>
            <Guide name={'퍼즐링 아이디어에서'}></Guide>
            <Num name={numOfIdea}></Num>
            <Guide name={'개의 아이디어가 탄생하고 있어요!'}></Guide>   
          </View>
          <View style={{height:157}}>
            <ImageBackground
              style={{width:285,height:57,alignItems:'center',position: 'absolute',right: 45,bottom: 100,}}
              source={require('../assets/empty.png')}>
              <Text style={{justifyContent:'center',fontFamily:mainTheme.font.L,color:mainTheme.colors.black,top:12}}>
                이곳을 눌러 아이디어를 만들어보세요!</Text>
            </ImageBackground>
            <TouchableOpacity
              style={styles.touchableOpacity}
              activeOpacity={0.8}
              onPress={() => {navigation.navigate('ideamatching', {uid: userUid});}}>
              <Image style={{height: 60, width: 60}} source={require('../assets/listTomatching.png')}/>
            </TouchableOpacity>
          </View>
        </View>} 
      {!emptyList &&
        <TouchableOpacity
          style={styles.touchableOpacity}
          activeOpacity={0.8}
          onPress={() => {navigation.navigate('ideamatching', {uid: userUid});}}>
          <Image style={{height: 60, width: 60}} source={require('../assets/listTomatching.png')}/>
        </TouchableOpacity>}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    //flex: 1,
    backgroundColor: '#fdf8ff',
    height:height
    // position:'absolute',height:height, left:0, bottom:0, margin: 10, marginTop: StatusBar.currentHeight || 0,  //상태바 높이만큼 낮추는 코드
  },
  searchContainer: {
    //flex:1,
    borderColor: '#000',
    borderWidth: 1,
    height: 48,
    width: width - 75,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fdf8ff',
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
  touchableOpacity: {
    position: 'absolute',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: 30,
  },
});

export default idealist;

