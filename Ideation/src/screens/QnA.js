import React, { useEffect, useLayoutEffect } from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import { mainTheme } from '../theme/theme';
import Back from 'react-native-vector-icons/MaterialIcons';

const App = ({route, navigation}) => {
//   const {userUid, email, emailVerified} = route.params;
  //헤더
  useLayoutEffect(() => {
    navigation.setOptions({
    //   headerTitle: () => (
    //     <PuzzleTitle title={puzzle.title}></PuzzleTitle>
    //   ),
      headerLeft: () => (
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={()=>navigation.navigate("StackHomeNavigator")}>
          <Back
            style={{marginStart:18}}
            name='arrow-back-ios'
            color="#000"
            size={24}/>
        </TouchableOpacity>
      ),  
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
        {/* <TouchableOpacity
          onPress={()=>{navigation.navigate('StackHomeNavigator')}}>
            <Text>버튼</Text>
        </TouchableOpacity> */}
        {/* <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text>go Back</Text> //navigation.navigate('StackHomeNavigator')}>
                </TouchableOpacity>
        </View> */}
        <Text style={{fontFamily:'SB_Aggro_M',fontSize:14,color:mainTheme.colors.fontGray,marginBottom:10}}>자주 묻는 질문</Text>
      <View style={{paddingVertical:10}}>
        <Text style={styles.title}> Q1.퍼즐링 아이디어는 어떤 서비스인가요?</Text>
        <Text style={styles.content}> 퍼즐링 아이디어는 작은 발상에서부터 아이디어를 점차 발전시켜 나갈 수 있도록 다양한 텍스트 및 이미지를 제공해 퍼즐 형태로 자유롭게 조합할 수 있는 서비스입니다.</Text>
      </View>
      <View style={{paddingVertical:10}}>
        <Text style={styles.title}> Q2.다른 사용자들과 아이디어를 공유할 수 없나요?</Text>
        <Text style={styles.content}> 퍼즐링 아이디어는 현재 사용자가 개별적으로 아이디어를 발전시키는 서비스를 우선적으로 제공하고 있습니다. 추후 해당 기능이 추가된다면 공지사항을 통해 안내해 드리도록 하겠습니다.</Text>
      </View>
      <View style={{paddingVertical:10}}>
        <Text style={styles.title}> Q3.회원가입 없이 서비스를 이용할 수 없나요?</Text>
        <Text style={styles.content}> 사용자분들이 발전시킨 아이디어를 개별적으로 관리할 수 있는 서비스를 제공하기 위해 이메일을 통한 간단한 회원가입 이후 서비스를 이용할 수 있도록 하고 있습니다.</Text>
      </View>
      <View style={{paddingVertical:10}}>
        <Text style={{fontFamily:'SB_Aggro_M',fontSize:14,color:mainTheme.colors.fontGray}}>추가 문의사항이 있으시다면,</Text>
        <Text style={{fontFamily:'SB_Aggro_M',fontSize:14,color:mainTheme.colors.fontGray}}>아래 이메일로 문의해주세요.</Text>
        <Text style={{fontFamily:'SB_Aggro_M',fontSize:14,color:mainTheme.colors.fontGray,marginTop:10}}>dwch01@naver.com</Text>
        <Text style={{fontFamily:'SB_Aggro_M',fontSize:14,color:mainTheme.colors.fontGray}}>qkrrkdms924@naver.com</Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor:mainTheme.colors.background,
    padding:20
  },
  title:{
    fontFamily:'SB_Aggro_M',
    fontSize:14,
    color:mainTheme.colors.black,
    marginBottom:10  
  },
  content:{
    fontSize:13,
    color:mainTheme.colors.black  
  }
});
export default App;