import React, {useContext} from 'react';
import {StyleSheet, View, Text, Alert, Dimensions} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import Loading from './screens/Loading';
import Login from './screens/login/Login';
import LoginEmail from './screens/login/LoginEmail';
import JoinEmail from './screens/join/JoinEmail';
import JoinPwd from './screens/join/JoinPwd';
import JoinPwdChecking from './screens/join/JoinPwdChecking';
import SearchPwd from './screens/pwd/SearchPwd';
import welcome from './screens/welcome';
import ideamatching from './screens/IdeaMatching';
import idealist from './screens/IdeaList';
import ideadevelop from './screens/IdeaDevelop';
import QnA from './screens/menu/QnA';
import AppInfo from './screens/menu/AppInfo';
import MySetting from './screens/menu/MySetting';
import {Clause, PersonalPolicy} from './screens/menu/InfoScreens'
import {DeleteUser, ReLogin} from './screens/menu/SettingScreens'
import { mainTheme } from "./theme/theme";

import {TouchableOpacity} from 'react-native-gesture-handler';
import auth from '@react-native-firebase/auth';
import Close from 'react-native-vector-icons/AntDesign';
import Back from 'react-native-vector-icons/MaterialIcons';

import {UserContext} from "../App"

// 앱이 각 화면이 전환될 수 있는 기본 틀을 제공한다.
const StackAuth = createStackNavigator();
const StackHome = createStackNavigator();
const Drawer = createDrawerNavigator();
const { width, height } = Dimensions.get("window");

const StackAuthNavigator = () => {
  return (
    <StackAuth.Navigator
      initialRouteName="Login"
      options={{headerStyle: {backgroundColor: mainTheme.colors.background}}}>
      {/* // screenOptions={{headerShown:false,headerBackTitleVisible: true, headerStyle: {backgroundColor: '#E7D9FF'},}}> */}
      <StackAuth.Screen
        name="Login"
        component={Login}
        options={{
          title: ' 로그인',
          headerStyle: styles.headerstyle,
          headerLeft: null,
          headerTitleStyle: {
            fontFamily: mainTheme.font.M,
            fontSize: 28,
          },
          // headerStyle: {backgroundColor: mainTheme.colors.background}
        }}
      />
      <StackAuth.Screen
          name="LoginEmail"
          component={LoginEmail}
          options={{title: '이메일로 로그인',headerShown:false}}
        />
        <StackAuth.Screen
          name="JoinEmail"
          component={JoinEmail}
          options={{title: '회원가입 1/3단계',headerShown:false}}
        />
        <StackAuth.Screen
          name="JoinPwd"
          component={JoinPwd}
          options={{title: '회원가입 2/3단계',headerShown:false}}
        />
        <StackAuth.Screen
          name="JoinPwdChecking"
          component={JoinPwdChecking}
          options={{title: '회원가입까지 다 왔어요!',headerShown:false}}
        />
        <StackAuth.Screen
          name="PersonalPolicy"
          component={PersonalPolicy}
          options={{title: '이용 약관',headerShown:false}}
        />
        <StackAuth.Screen
          name="SearchPwd"
          component={SearchPwd}
          options={{title: '비밀번호 찾기',headerShown:false}}
        />
      <StackAuth.Screen
        name="welcome"
        component={welcome}
        options={{headerShown: false}}
      />
    </StackAuth.Navigator>
  );
};

const BackArrow = () => {
  return (
    <View>
      <TouchableOpacity activeOpacity={0.8}>
        <Back
          style={{marginStart: 8}}
          name="arrow-back-ios"
          color="#000"
          size={24}
        />
      </TouchableOpacity>
    </View>
  );
};
const StackHomeNavigator = ({route, navigation}) => {
  return (
    <StackHome.Navigator
      initialRouteName="idealist"
      options={{headerStyle: {backgroundColor: mainTheme.colors.background}}}>
      <StackHome.Screen
        name="idealist"
        component={idealist}
        options={{headerShown: false}}
      />
      <StackHome.Screen
        name="ideadevelop"
        component={ideadevelop}
        options={{
          // headerStyle: {
          //   backgroundColor: mainTheme.colors.background,
          //   borderBottomWidth: 2,
          //   borderBottomColor: mainTheme.colors.black
          // },
          // headerBackImage: () => <BackArrow />, //header Back
          // headerTitleContainerStyle: {
          //   left: -20, //header title과 header left 사이 공백 줄임
          // },
          // headerTitleStyle: {
          //   fontFamily: mainTheme.font.B,
          //   fontSize: 20,
          // },
          headerShown:false
        }}
      />
      <StackHome.Screen
        name="ideamatching"
        component={ideamatching}
        options={{
          headerStyle: {backgroundColor: mainTheme.colors.background},
          headerTitle: '',
          headerTitleStyle: {
            fontFamily: mainTheme.font.B,
            fontSize: 20,
          },
          headerBackImage: () => <BackArrow />,
          headerTitleContainerStyle: {
            left: -25, //header title과 header left 사이 공백 줄임
          },
        }}
      />
    </StackHome.Navigator>
  );
};

const StackSetting = createStackNavigator();
const StackSettingNavigator = () => {
  return (
    <StackSetting.Navigator
      initialRouteName="MySetting">
      <StackSetting.Screen
        name="MySetting"
        component={MySetting}
        options={{title: '계정 설정',headerShown:false}}/>
      <StackSetting.Screen
        name="DeleteUser"
        component={DeleteUser}
        options={{title: '계정 삭제',headerShown:false}}/>
      <StackSetting.Screen
        name="ReLogin"
        component={ReLogin}
        options={({ route }) => ({ title: route.params.name,headerShown:false })}/>
      <StackSetting.Screen
        name="SearchPwd"
        component={SearchPwd}
        options={({ route }) => ({ title: route.params.name,headerShown:false })}/>
    </StackSetting.Navigator>
  );
};

const StackAppInfo = createStackNavigator();
const StackAppInfoNavigator = () => {
  return (
    <StackAppInfo.Navigator
      initialRouteName="AppInfo">
      <StackAppInfo.Screen
        name="AppInfo"
        component={AppInfo}
        options={{title: '앱 정보',headerShown:false}}/>
      <StackAppInfo.Screen
        name="Clause"
        component={Clause}
        options={{title: '이용 약관',headerShown:false}}/>
      <StackAppInfo.Screen
        name="PersonalPolicy"
        component={PersonalPolicy}
        options={{title: '개인정보 이용정책',headerShown:false}}/>
    </StackAppInfo.Navigator>
  );
};
//메뉴
const MenuText = (props) => {
  return(
    <Text {...props}
      style={styles.menutext}>
    </Text>
  )
}
const MenuTo = (props) => {
  return(
    <TouchableOpacity {...props}
      style={styles.menuto}>
    </TouchableOpacity>
  )
}
const CustomDrawerContent = props => {
  const userCnt = useContext(UserContext)
  return (
    <DrawerContentScrollView contentContainerStyle={styles.wrapper}>
      {/* <DrawerItemList{...props}/> Navigator 속에 정의된 스크린 나열 */}
      {/* <View style={{paddingLeft:20, paddingBottom:40}}> */}
      <View style={{justifyContent: 'space-between', flex: 1}}>
        <View style={{widht: '100%', alignItems: 'flex-end'}}>
          <TouchableOpacity
            style={{width: 22, height: 22, marginEnd: 20, marginTop: 20}}
            onPress={()=>{props.navigation.closeDrawer()}}>
            <Close style={{marginEnd: 0}} name="close" size={22} color="#000" />
          </TouchableOpacity>
        </View>
        <View style={{paddingLeft: 20, paddingBottom: 40}}>
          <View
            style={{paddingVertical: 10,paddingHorizontal: 5,}}>
            <Text style={{fontSize: 14,fontFamily: mainTheme.font.L,}}>{userCnt.email !== '' ? userCnt.email : ''}</Text>
          </View>
          <MenuTo onPress={() => {props.navigation.navigate('StackSettingNavigator');}}>
            <MenuText>내 계정 설정</MenuText>
          </MenuTo>
          <MenuTo onPress={() => {props.navigation.navigate('StackAppInfoNavigator');}}>
            <MenuText>앱 정보</MenuText>
          </MenuTo>
          <MenuTo onPress={() => {props.navigation.navigate('QnA');}}>
            <MenuText>문의하기</MenuText>
          </MenuTo>
          <MenuTo
            onPress={() => {
              Alert.alert('경고', '로그아웃 하시겠습니까?', [
                {text: '아니오', onPress: () => null, style: 'cancel'},
                {
                  text: '네',
                  onPress: () => {
                    auth().signOut();
                    userCnt.email = '';  //사용자 정보 초기화
                    userCnt.uid = ''
                    props.navigation.navigate('StackAuthNavigator');
                  },
                },
              ]);
            }}>
            <MenuText>로그아웃</MenuText>  
          </MenuTo>
        </View>
      </View>
    </DrawerContentScrollView>
  );
};
const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Loading"
      drawerType="front" //뒤 화면이 고정되고 위에 오버레이해서 덮음
      drawerPosition="left" //bar가 열리는 위치
      drawerContent={props => <CustomDrawerContent {...props} />}
      screenOptions={{swipeEnabled: false}}>
      <Drawer.Screen name="Loading" component={Loading} options={{headerShown: false, unmountOnBlur: true}}/>
      <Drawer.Screen name="StackAuthNavigator" component={StackAuthNavigator} options={{headerShown: false, unmountOnBlur: true}}/>
      <Drawer.Screen name="StackHomeNavigator" component={StackHomeNavigator} options={{headerShown: false, unmountOnBlur: true}}/>
      <Drawer.Screen name="StackSettingNavigator" component={StackSettingNavigator} options={{headerShown: false, unmountOnBlur: true}}/>
      <Drawer.Screen name="StackAppInfoNavigator" component={StackAppInfoNavigator} options={{headerShown: false, unmountOnBlur: true}}/>
      <Drawer.Screen name="QnA" component={QnA} options={{headerShown: false,}} 
        // options={{
        //   title: '문의하기',
        //   headerStyle: {backgroundColor: mainTheme.colors.background, shadowOpacity: 0, elevation: 0, height: 70,},
        //   unmountOnBlur: true,
        //   headerTitleStyle: {fontFamily: mainTheme.font.M, fontSize: 24,},
        //   headerTitleContainerStyle: { left: -10, },//header title과 header left 사이 공백 줄임
        // }}
      />
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  headerstyle:{
    backgroundColor: mainTheme.colors.background, //'#fdf8ff'
    shadowOpacity: 0,
    elevation: 0,
    height: 70,
  },
  headertitlestyle:{
    fontFamily: mainTheme.font.M, //'SB_Aggro_M'
    fontSize: 24,
  },
  headertitlecontainerstyle:{
    left: -10, //header title과 header left 사이 공백 줄임
  },
  headertitlecontainerstyle20:{
    left: -20, //header title과 header left 사이 공백 줄임
  },
  wrapper: {
    margin: 0,
    backgroundColor: mainTheme.colors.background,//'#fdf8ff',
    height:height,
    fontFamily: mainTheme.font.M, //'SB_Aggro_M',
  },
  menutext:{
    fontSize: 18,
    fontFamily: mainTheme.font.L, //'SB_Aggro_L',
  },
  menuto:{
    paddingHorizontal: 10,
    paddingVertical: 10,
  }
});

export default DrawerNavigator;

// const NavigationHeader = (props) => {
//   return(
//     <View style={{flexDirection:'row',width:'100%',backgroundColor: '#fdf8ff',alignItems:'center'}}>
//       <TouchableOpacity activeOpacity={0.8} onPress={()=>{props.navigation.goBack()}}>
//         <Back
//           style={{marginStart:5, marginEnd:8}} //
//           name="arrow-back-ios"
//           color="#000"
//           size={24}
//         />
//       </TouchableOpacity>
//       <Text
//         style={{
//           fontFamily: 'SB_Aggro_M',
//           fontSize: 24,
//           includeFontPadding: false,
//           alignItems:'center',
//         }}>
//         {props.title}
//       </Text>
//     </View>
//   )
// }
