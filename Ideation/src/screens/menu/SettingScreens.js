import React, {useEffect, useState, useRef, useContext , useLayoutEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Keyboard,
  Dimensions,
  SafeAreaView,
  KeyboardAvoidingView,
  Alert
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { mainTheme } from '../../theme/theme';
import {UserContext} from "../../../App"
import { CustomH } from '../../components/N';
const { width, height } = Dimensions.get("window");

export const ReLogin = ({route, navigation}) => {
  const userCnt = useContext(UserContext)
  const [error, setError] = useState('')
  const ref = useRef('')
  async function reLogin(){
    const credential = auth.EmailAuthProvider.credential(userCnt.email, ref.current);
    await auth().currentUser.reauthenticateWithCredential(credential)
      .then(()=>{
        //재인증 성공   
        setError('')   
        navigation.navigate("DeleteUser")
      })
      .catch((error) => {
        setError(error.code)
      })
  }
  const onPressSearch = () => {
    navigation.navigate("SearchPwd",{name:route.params.name})
  }
  const onPressNavigation = () =>{
    ref.current !== ''
    ? reLogin()
    : setError('empty')
  }
  useEffect(()=>{
    ref.current.focus()
  },[]);
  return (
    <View style={{flex:1,backgroundColor : mainTheme.colors.background,flexDirection:'column'}}>
      <CustomH name={'계정 삭제'} press={()=>{navigation.goBack()}}></CustomH>
      <TouchableOpacity
        activeOpacity={1}
        onPress={()=>{Keyboard.dismiss()}} 
        style={styles.container}>
        {/* <View style={styles.container}> */}
        <View style={{marginTop:110}}>
          <TextInput           //대문자로 시작하는건 React 컴포넌트//소문자는 html 컴포넌트
            ref={ref}
            underlineColorAndroid={'black'}
            style={{
              fontSize:18,
              fontFamily:'SB_Aggro_L',
            }}
            placeholder="비밀번호 입력"
            secureTextEntry={true}
            onChangeText={(e)=>{ref.current = e}}  //state 업데이트
            onSubmitEditing={onPressNavigation}
          />
          {
           error === '' ? <Text style={styles.textStyle}>본인 확인을 위해 다시 한번 로그인해주세요.</Text>
           : error === 'empty' ? <Text style={[styles.textStyle,{color:mainTheme.colors.warning}]}>비밀번호를 입력해주세요.</Text>
           : error === 'auth/wrong-password' && <Text style={[styles.textStyle,{color:mainTheme.colors.warning}]}>비밀번호가 틀렸습니다.</Text>
          }
        </View>
        <View>
          <View style={{alignItems:'center',marginBottom:20}}>
            <Text
              style={styles.textUseCondition}
              onPress={onPressSearch}>
                {"  비밀번호 찾기  "}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.bottomButton}
            onPress={onPressNavigation}
            activeOpacity={0.8}>
            <Text style={{fontSize:16, fontFamily:'SB_Aggro_M'}}>
              다시 로그인하기
            </Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </View>  
  );
};

export const DeleteUser = ({navigation}) => {
  const userCnt = useContext(UserContext)
  const deleteDoc = (uid) => {
    firestore()
      .collection('userIdeaData')
      .doc(uid)
      .get()
      .then(documentSnapshot => {   
        if (documentSnapshot.exists) {
          firestore()
            .collection('userIdeaData')
            .doc(uid)
            .delete()
            .then()
            .catch((error) => console.log(error));
        }
      })
      .catch((error)=>{
        console.log(error)
      });
  };
  const onPressNavigation = () => {
    auth().currentUser.delete()
      .then(()=>{
        deleteDoc(userCnt.uid)
        userCnt.email = ''
        userCnt.uid = ''
        Alert.alert("알림","계정이 삭제되었습니다.",[{text:"확인",onPress: ()=> {navigation.navigate('StackAuthNavigator')}}]);
      })
      .catch((error)=>{
        if (error.code === 'auth/requires-recent-login'){
          Alert.alert(
            "경고","재로그인 이후 시간이 많이 흘렀습니다. 다시 로그인 해주세요!",
            [{text:"확인",onPress: ()=> {navigation.goBack()}}]);
        }else{
          Alert.alert("error",error.code,[{text:"확인",onPress: ()=> {navigation.goback()}}]);
        }
      })
  };
  return (
    <View style={styles.container}>
        <View style={{marginTop:200}}>
          <View style={{height:'50%',justifyContent:'center',alignItems:'center'}}>
            <Text style={{paddingVertical:10,fontFamily:mainTheme.font.M,fontSize:16,color:mainTheme.colors.warning}}>정말로 계정을 삭제하시겠습니까?</Text>
            <Text style={{paddingVertical:10,fontFamily:mainTheme.font.L,fontSize:14,color:mainTheme.colors.black}}>계정을 삭제하면 아이디어를 복구할 수 없습니다.</Text>
          </View>
        </View>
        <View>
          <TouchableOpacity
            style={styles.bottomButton}
            onPress={onPressNavigation}
            activeOpacity={0.8}>
            <Text style={{fontSize:16, fontFamily:'SB_Aggro_M'}}>
              계정을 삭제합니다
            </Text>
          </TouchableOpacity>
        </View>
      </View>    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    paddingHorizontal: 20,
    paddingBottom:20,
    justifyContent: 'space-between',
    backgroundColor: mainTheme.colors.background
  },
  bottomButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    minWidth: 125, //최소 너비
    minHeight: 56, //최소 높이
    borderWidth: 1, //테두리 굵기
    borderColor: 'black', //테두리
    backgroundColor: mainTheme.colors.main1
  },
  textUseCondition: {
    color: '#000000',
    paddingBottom: 6,
    borderBottomWidth: 1,
    fontFamily: mainTheme.font.L,
    fontSize:14
    //textDecorationLine:'underline',
  },
  textStyle:{
    fontSize:14,
    fontFamily: mainTheme.font.M,
    marginLeft:5,
    marginTop:10
  },
});