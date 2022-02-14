import React from 'react';
import {StyleSheet, View, Text, Alert} from 'react-native';
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
import QnA from './screens/QnA';
import AppInfo from './screens/AppInfo';
import MySetting from './screens/MySetting';
import Clause from './screens/Clause';
import PersonalPolicy from './screens/PersonalPolicy';

import {TouchableOpacity} from 'react-native-gesture-handler';
import {userInfo} from './User';
import auth from '@react-native-firebase/auth';
import Close from 'react-native-vector-icons/AntDesign';
import Back from 'react-native-vector-icons/MaterialIcons';

// 앱이 각 화면이 전환될 수 있는 기본 틀을 제공한다.
const StackAuth = createStackNavigator();
const StackHome = createStackNavigator();
const Drawer = createDrawerNavigator();

const StackAuthNavigator = () => {
  return (
    <StackAuth.Navigator
      initialRouteName="Login"
      options={{headerStyle: {backgroundColor: '#fdf8ff'}}}>
      {/* // screenOptions={{headerShown:false,headerBackTitleVisible: true, headerStyle: {backgroundColor: '#E7D9FF'},}}> */}
      <StackAuth.Screen
        name="Login"
        component={Login}
        options={{
          title: ' 로그인',
          headerStyle: {
            backgroundColor: '#fdf8ff',
            shadowOpacity: 0,
            elevation: 0,
            height: 70,
          },
          headerLeft: null,
          headerTitleStyle: {
            fontFamily: 'SB_Aggro_M',
            fontSize: 28,
          },
        }}
      />
      <StackAuth.Screen
        name="LoginEmail"
        component={LoginEmail}
        options={{
          title: '이메일로 로그인',
          headerStyle: {
            backgroundColor: '#fdf8ff',
            shadowOpacity: 0,
            elevation: 0,
            height: 70,
          },
          headerTitleStyle: {
            fontFamily: 'SB_Aggro_M',
            fontSize: 24,
          },
          headerBackImage: () => <BackArrow />,
          headerTitleContainerStyle: {
            left: -20, //header title과 header left 사이 공백 줄임
          },
        }}
      />
      <StackAuth.Screen
        name="JoinEmail"
        component={JoinEmail}
        options={{
          title: '회원가입 1/3단계',
          headerStyle: {
            backgroundColor: '#fdf8ff',
            shadowOpacity: 0,
            elevation: 0,
            height: 70,
          },
          headerTitleStyle: {
            fontFamily: 'SB_Aggro_M',
            fontSize: 24,
          },
          headerBackImage: () => <BackArrow />,
          headerTitleContainerStyle: {
            left: -20, //header title과 header left 사이 공백 줄임
          },
        }}
      />
      <StackAuth.Screen
        name="JoinPwd"
        component={JoinPwd}
        options={{
          title: '회원가입 2/3단계',
          headerStyle: {
            backgroundColor: '#fdf8ff',
            shadowOpacity: 0,
            elevation: 0,
            height: 70,
          },
          headerTitleStyle: {
            fontFamily: 'SB_Aggro_M',
            fontSize: 24,
          },
          headerBackImage: () => <BackArrow />,
          headerTitleContainerStyle: {
            left: -20, //header title과 header left 사이 공백 줄임
          },
        }}
      />
      <StackAuth.Screen
        name="JoinPwdChecking"
        component={JoinPwdChecking}
        options={{
          title: '회원가입까지 다 왔어요!',
          headerStyle: {
            backgroundColor: '#fdf8ff',
            shadowOpacity: 0,
            elevation: 0,
            height: 70,
          },
          headerTitleStyle: {
            fontFamily: 'SB_Aggro_M',
            fontSize: 24,
          },
          headerBackImage: () => <BackArrow />,
          headerTitleContainerStyle: {
            left: -20, //header title과 header left 사이 공백 줄임
          },
        }}
      />
      <StackAuth.Screen
        name="SearchPwd"
        component={SearchPwd}
        options={{
          title: '비밀번호 찾기',
          headerStyle: {
            backgroundColor: '#fdf8ff',
            shadowOpacity: 0,
            elevation: 0,
            height: 70,
          },
          headerTitleStyle: {
            fontFamily: 'SB_Aggro_M',
            fontSize: 24,
          },
          headerBackImage: () => <BackArrow />,
          headerTitleContainerStyle: {
            left: -20, //header title과 header left 사이 공백 줄임
          },
        }}
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
      options={{
        headerStyle: {
          backgroundColor: '#fdf8ff',
        },
      }}>
      <StackHome.Screen
        name="idealist"
        component={idealist}
        options={{headerShown: false}}
      />
      <StackHome.Screen
        name="ideadevelop"
        component={ideadevelop}
        options={{
          headerStyle: {
            backgroundColor: '#fdf8ff',
            borderBottomWidth: 2,
            borderBottomColor: '#1D1D1D',
          },
          // eaderTitle: (props) => <LogoTitle {...props}/>, //headet Title
          // headerLeft: (props) => <BackArrow {...props}/>,
          headerBackImage: () => <BackArrow />, //header Back
          headerTitleContainerStyle: {
            left: -20, //header title과 header left 사이 공백 줄임
          },
          headerTitleStyle: {
            fontFamily: 'SB_Aggro_B',
            fontSize: 20,
          },
        }}
      />
      <StackHome.Screen
        name="ideamatching"
        component={ideamatching}
        options={{
          headerStyle: {backgroundColor: '#fdf8ff'},
          headerTitle: '',
          headerTitleStyle: {
            fontFamily: 'SB_Aggro_B',
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
  //console.log("route StackAuthNavigator")
  return (
    <StackSetting.Navigator
      initialRouteName="Login"
      options={{headerStyle: {backgroundColor: '#fdf8ff'}}}>
      <StackAuth.Screen
        name="SearchPwd"
        component={SearchPwd}
        options={{
          title: '이메일 변경',
          headerStyle: {
            backgroundColor: '#fdf8ff',
            shadowOpacity: 0,
            elevation: 0,
            height: 70,
          },
          headerTitleStyle: {
            fontFamily: 'SB_Aggro_M',
            fontSize: 24,
          },
          headerBackImage: () => <BackArrow />,
          headerTitleContainerStyle: {
            left: -20, //header title과 header left 사이 공백 줄임
          },
        }}
      />
      <StackAuth.Screen
        name="SearchPwd"
        component={SearchPwd}
        options={{
          title: '비밀번호 재설정',
          headerStyle: {
            backgroundColor: '#fdf8ff',
            shadowOpacity: 0,
            elevation: 0,
            height: 70,
          },
          headerTitleStyle: {
            fontFamily: 'SB_Aggro_M',
            fontSize: 24,
          },
          headerBackImage: () => <BackArrow />,
          headerTitleContainerStyle: {
            left: -20, //header title과 header left 사이 공백 줄임
          },
        }}
      />
      {/* <StackSetting.Screen name="welcome" component={welcome} options={{headerShown:false}}/> */}
    </StackSetting.Navigator>
  );
};

const StackAppInfo = createStackNavigator();
const StackAppInfoNavigator = () => {
  return (
    <StackAppInfo.Navigator
      initialRouteName="AppInfo"
      options={{headerStyle: {backgroundColor: '#fdf8ff'}}}>
      <StackAppInfo.Screen
        name="AppInfo"
        component={AppInfo}
        options={{
          title: '앱 정보',
          headerStyle: {
            backgroundColor: '#fdf8ff',
            shadowOpacity: 0,
            elevation: 0,
            height: 70,
          },
          headerTitleStyle: {
            fontFamily: 'SB_Aggro_M',
            fontSize: 24,
          },
          headerTitleContainerStyle: {
            left: -10, //header title과 header left 사이 공백 줄임
          },
        }}
      />
      <StackAppInfo.Screen
        name="Clause"
        component={Clause}
        options={{
          title: '이용 약관',
          headerStyle: {
            backgroundColor: '#fdf8ff',
            shadowOpacity: 0,
            elevation: 0,
            height: 70,
          },
          headerTitleStyle: {
            fontFamily: 'SB_Aggro_M',
            fontSize: 24,
          },
          headerTitleContainerStyle: {
            left: -10,
          },
        }}
      />
      <StackAppInfo.Screen
        name="PersonalPolicy"
        component={PersonalPolicy}
        options={{
          title: '개인정보 이용정책',
          headerStyle: {
            backgroundColor: '#fdf8ff',
            shadowOpacity: 0,
            elevation: 0,
            height: 70,
          },
          headerTitleStyle: {
            fontFamily: 'SB_Aggro_M',
            fontSize: 24,
          },
          headerTitleContainerStyle: {
            left: -10,
          },
        }}
      />
    </StackAppInfo.Navigator>
  );
};

const CustomDrawerContent = props => {
  return (
    <DrawerContentScrollView contentContainerStyle={styles.wrapper}>
      {/* <DrawerItemList{...props}/> Navigator 속에 정의된 스크린 나열 */}
      {/* <View style={{paddingLeft:20, paddingBottom:40}}> */}
      <View style={{justifyContent: 'space-between', flex: 1}}>
        <View style={{widht: '100%', alignItems: 'flex-end'}}>
          <TouchableOpacity
            style={{width: 22, height: 22, marginEnd: 20, marginTop: 20}}
            onPress={() => {
              props.navigation.closeDrawer();
            }}>
            <Close style={{marginEnd: 0}} name="close" size={22} color="#000" />
          </TouchableOpacity>
        </View>
        <View style={{paddingLeft: 20, paddingBottom: 40}}>
          <View
            style={{
              paddingVertical: 10,
              paddingHorizontal: 5,
            }}>
            <Text
              style={{
                fontSize: 14,
                fontFamily: 'SB_Aggro_L',
              }}>
              {userInfo.email !== '' ? userInfo.email : ''}
            </Text>
          </View>
          <TouchableOpacity
            style={{
              paddingHorizontal: 10,
              paddingVertical: 10,
            }}
            onPress={() => {
              props.navigation.navigate('MySetting', {email: userInfo.email});
            }}>
            <Text
              style={{
                fontSize: 18,
                fontFamily: 'SB_Aggro_L',
              }}>
              내 계정 설정
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              paddingHorizontal: 10,
              paddingVertical: 10,
            }}
            onPress={() => {
              props.navigation.navigate('StackAppInfoNavigator');
            }}>
            <Text
              style={{
                fontSize: 18,
                fontFamily: 'SB_Aggro_L',
              }}>
              앱 정보
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              paddingHorizontal: 10,
              paddingVertical: 10,
            }}
            onPress={() => {
              props.navigation.navigate('QnA');
            }}>
            <Text
              style={{
                fontSize: 18,
                fontFamily: 'SB_Aggro_L',
              }}>
              문의하기
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              paddingHorizontal: 10,
              paddingVertical: 10,
            }}
            onPress={() => {
              Alert.alert('경고', '로그아웃 하시겠습니까?', [
                {text: '아니오', onPress: () => null, style: 'cancel'},
                {
                  text: '네',
                  onPress: () => {
                    auth().signOut();
                    //사용자 정보 초기화
                    userInfo.email = '';
                    userInfo.uid = '';
                    userInfo.emailVerified = false;
                    props.navigation.navigate('StackAuthNavigator');
                  },
                },
              ]);
              // const resetAction = StackActions.reset({
              //   index: 0,
              //   actions: [NavigationActions.navigate({
              //     routeName: "StackHomeNavigator",
              //     // params:{
              //     //   "userUid":user.user.uid
              //     // }
              //   })]
              // })
              // navigation.dispatch(resetAction)
              //navigation.popToTop();
            }}>
            <Text
              style={{
                fontSize: 18,
                fontFamily: 'SB_Aggro_L',
              }}>
              로그아웃
            </Text>
          </TouchableOpacity>
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
      <Drawer.Screen
        name="Loading"
        component={Loading}
        options={{headerShown: false, unmountOnBlur: true}}
      />
      <Drawer.Screen
        name="StackAuthNavigator"
        component={StackAuthNavigator}
        options={{headerShown: false, unmountOnBlur: true}}
      />
      <Drawer.Screen
        name="StackHomeNavigator"
        component={StackHomeNavigator}
        options={{headerShown: false, unmountOnBlur: true}}
      />
      <Drawer.Screen
        name="StackSettingNavigator"
        component={StackSettingNavigator}
        options={{headerShown: false, unmountOnBlur: true}}
      />
      <Drawer.Screen
        name="StackAppInfoNavigator"
        component={StackAppInfoNavigator}
        options={{headerShown: false, unmountOnBlur: true}}
      />
      <Drawer.Screen
        name="QnA"
        component={QnA}
        options={{
          title: '문의하기',
          headerStyle: {
            backgroundColor: '#fdf8ff',
            shadowOpacity: 0,
            elevation: 0,
            height: 70,
          },
          unmountOnBlur: true,
          headerTitleStyle: {
            fontFamily: 'SB_Aggro_M',
            fontSize: 24,
          },
          headerTitleContainerStyle: {
            left: -10, //header title과 header left 사이 공백 줄임
          },
        }}
      />
      <Drawer.Screen
        name="MySetting"
        component={MySetting}
        options={{
          title: '계정 설정',
          headerStyle: {
            backgroundColor: '#fdf8ff',
            shadowOpacity: 0,
            elevation: 0,
            height: 70,
          },
          unmountOnBlur: true,
          headerTitleStyle: {
            fontFamily: 'SB_Aggro_M',
            fontSize: 24,
          },
          headerTitleContainerStyle: {
            left: -10, //header title과 header left 사이 공백 줄임
          },
        }}
      />
      <Drawer.Screen
        name="AppInfo"
        component={AppInfo}
        options={{
          title: '앱 정보',
          headerStyle: {
            backgroundColor: '#fdf8ff',
            shadowOpacity: 0,
            elevation: 0,
            height: 70,
          },
          unmountOnBlur: true,
          headerTitleStyle: {
            fontFamily: 'SB_Aggro_M',
            fontSize: 24,
          },
          headerTitleContainerStyle: {
            left: -10, //header title과 header left 사이 공백 줄임
          },
        }}
      />
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    //height:'100%',
    flex: 1,
    margin: 0,
    backgroundColor: '#fdf8ff', //'#fdf8ff',
    //flexDirection: 'row',
    //justifyContent:'center',
    //justifyContent:'space-around',
    fontFamily: 'SB_Aggro_M',
    //alignItems:'flex-end'
  },
});

export default DrawerNavigator;
