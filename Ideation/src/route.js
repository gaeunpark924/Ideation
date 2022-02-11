import React from 'react';
import {StyleSheet,View, TextInput, Image, Text, Alert,DrawerButton, AsyncStorage} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import { createDrawerNavigator,
  DrawerItem,
  DrawerItemList,
  DrawerContentScrollView  } from "@react-navigation/drawer";
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

import { TouchableOpacity } from 'react-native-gesture-handler';
import { userInfo } from './User';
import auth from '@react-native-firebase/auth';
import Close from 'react-native-vector-icons/AntDesign';
import Back from 'react-native-vector-icons/Ionicons';
import { mainTheme } from './theme/theme';

// 앱이 각 화면이 전환될 수 있는 기본 틀을 제공한다.
const StackAuth = createStackNavigator();
const StackHome = createStackNavigator();
const Drawer = createDrawerNavigator();

const StackAuthNavigator = () => {
  //console.log("route StackAuthNavigator")
  return (
    <StackAuth.Navigator
      initialRouteName='Login'
      options={{headerStyle:{backgroundColor:'#fdf8ff'},}}>
        {/* // screenOptions={{headerShown:false,headerBackTitleVisible: true, headerStyle: {backgroundColor: '#E7D9FF'},}}> */}
      <StackAuth.Screen
        name="Login"
        component={Login}
        options={{
          title: ' 로그인',
          headerStyle: {backgroundColor:'#fdf8ff',shadowOpacity:0,elevation:0,height:70},
          headerLeft: null,
          headerTitleStyle: {
            fontFamily: 'SB_Aggro_M',
            fontSize: 28
          }
        }}/>
      <StackAuth.Screen
        name="LoginEmail"
        component={LoginEmail}
        options={{
          title: '이메일로 로그인',
          headerStyle:{backgroundColor:'#fdf8ff',shadowOpacity:0,elevation:0,height:70},
          headerTitleStyle:{
            fontFamily: 'SB_Aggro_M',
            fontSize: 24
          }
        }}
      />
      <StackAuth.Screen
        name="JoinEmail"
        component={JoinEmail}
        options={{
          title: '회원가입 1/3단계',
          headerStyle:{backgroundColor:'#fdf8ff',shadowOpacity:0,elevation:0,height:70},
          headerTitleStyle:{
            fontFamily: 'SB_Aggro_M',
            fontSize: 24
          }
        }}/>
      <StackAuth.Screen
        name="JoinPwd"
        component={JoinPwd}
        options={{
          title: '회원가입 2/3단계',
          headerStyle:{backgroundColor:'#fdf8ff',shadowOpacity:0,elevation:0,height:70},
          headerTitleStyle:{
            fontFamily: 'SB_Aggro_M',
            fontSize: 24
          }
        }}/>
      <StackAuth.Screen
        name="JoinPwdChecking"
        component={JoinPwdChecking}
        options={{
          title: '회원가입까지 다 왔어요!',
          headerStyle:{backgroundColor:'#fdf8ff',shadowOpacity:0,elevation:0,height:70},
          headerTitleStyle:{
            fontFamily: 'SB_Aggro_M',
            fontSize: 24
          }
        }}/>
      <StackAuth.Screen
        name="SearchPwd"
        component={SearchPwd}
        options={{
          title: '비밀번호 찾기',
          headerStyle:{backgroundColor:'#fdf8ff',shadowOpacity:0,elevation:0,height:70},
          headerTitleStyle:{
            fontFamily: 'SB_Aggro_M',
            fontSize: 24
          }
        }}/>
      <StackAuth.Screen name="welcome" component={welcome} options={{headerShown:false}}/>
    </StackAuth.Navigator>
  );
};

function LogoTitle() {
  return (
    <View style={{flexDirection:'row',alignItems:'center'}}>
      <TextInput
       style={{
         fontFamily: 'SB_Aggro_B',
         fontSize: 20,
         width:170,
        //  backgroundColor:'blue'
        //  
        }}
       placeholder='Puzzle Name'
       placeholderTextColor={mainTheme.colors.black}
      //  value={}
       //maxLength={15}
      //  onChangeText={(e)=>{setText(e)}}
       />
      <Image
          //style={styles.plus}
          style={{height:17, width:18}}
          source={require('./assets/pencil.png')}/>
    </View>
  );
}

function BackArrow({props}) {
  return (
    <View>
      <TouchableOpacity
       activeOpacity={0.8}>
      <Image
          //style={styles.plus}
          style={{height:29, width:24}}
          source={require('./assets/back.png')}/>
      </TouchableOpacity>
    </View>
  );
}
const StackHomeNavigator = ({route,navigation}) => {
  return (
    <StackHome.Navigator initialRouteName='idealist' options={{headerStyle:{backgroundColor:'#fdf8ff'},}}>
        {/* // screenOptions={{headerShown:false,headerBackTitleVisible: true, headerStyle: {backgroundColor: '#E7D9FF'},}}> */}
      <StackHome.Screen name="idealist" component={idealist} options={{headerShown:false}} />
      <StackHome.Screen
        name="ideadevelop"
        component={ideadevelop}
        options={{
          headerStyle: {
            backgroundColor: '#fdf8ff',
            borderBottomWidth: 2,
            borderBottomColor: '#1D1D1D',
          },
          // headerTitle: (props) => <LogoTitle {...props}/>, //headet Title
          //headerTitle: 'Puzzle name',
          // headerLeft: (props) => <BackArrow {...props}/>,
          headerBackImage : ()=>(<BackArrow/>),  //header Back
          headerTitleContainerStyle: {
            //borderWidth: 1,
            left: -20,  //header title과 header left 사이 공백 줄임
          },
          headerTitleStyle: {
            fontFamily: 'SB_Aggro_B',
            fontSize: 20
          }
        }}/>
      <StackHome.Screen
        name="ideamatching"
        component={ideamatching}
        options={{
          headerStyle:{backgroundColor:'#fdf8ff',borderBottomWidth:2,borderBottomColor:'#1D1D1D',},
          headerTitle: "ideamatching",
          headerTitleStyle:{
            fontFamily: 'SB_Aggro_B',
            fontSize: 20
          }
        }}/>
    </StackHome.Navigator>
  );
};

const CustomDrawerContent = (props) => {
  return (
      <DrawerContentScrollView
       contentContainerStyle={styles.wrapper}>
          {/* <DrawerItemList{...props}/> Navigator 속에 정의된 스크린 나열 */}
          {/* <View style={{paddingLeft:20, paddingBottom:40}}> */}
        <View style={{justifyContent:'space-between',flex:1}}>
          <View style={{widht:'100%',alignItems:'flex-end'}}>
            <TouchableOpacity style={{width:22,height:22,marginEnd:20,marginTop:20}} onPress={()=>{props.navigation.closeDrawer();}}>
              <Close style={{marginEnd:0}} name='close' size={22} color="#000"/>
            </TouchableOpacity>
          </View>
          <View style={{paddingLeft:20, paddingBottom:40}}>
          <View
            style={{
              paddingVertical:10,
              paddingHorizontal:5
            }}>
            <Text
            style={{
              fontSize:14,
              fontFamily:'SB_Aggro_L',              
            }}>{userInfo.email !== '' ? userInfo.email : '' }</Text>
          </View> 
          <TouchableOpacity
            style={{
              paddingHorizontal:10,
              paddingVertical:10
            }}
            onPress={()=>{
              Alert.alert(
                "경고","로그아웃 하시겠습니까?",
                [{text: "아니오", onPress: ()=> null,style:"cancel"},
                {text:"네", onPress: ()=> {
                  auth().signOut();
                  //사용자 정보 초기화
                  console.log("xxxxxxxx",userInfo)
                  userInfo.email = ''
                  userInfo.uid = ''
                  userInfo.emailVerified = false
                  console.log("xxxxxxxx",userInfo)
                  props.navigation.navigate("StackAuthNavigator");
                }}]);
              // userInfo.email = user.user.email
              // userInfo.uid = user.user.uid
              // userInfo.emailVerified = user.user.emailVerified 
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
                fontSize:18,
                fontFamily:'SB_Aggro_L',
              }}>로그아웃</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              paddingHorizontal:10,
              paddingVertical:10
            }}>
            <Text
              style={{
                fontSize:18,
                fontFamily:'SB_Aggro_L',
              }}>내 계정 설정</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              paddingHorizontal:10,
              paddingVertical:10
            }}>
            <Text
              style={{
                fontSize:18,
                fontFamily:'SB_Aggro_L',
              }}>앱 정보</Text>
          </TouchableOpacity>
          </View>
        </View>
          {/* <DrawerItem
            label = "로그아웃"
            labelStyle={{
              fontSize:18,
              fontFamily:'SB_Aggro_L',
              paddingHorizontal:0,
            }}
            onPress = {doLogout}/>
          <DrawerItem
            label = "내 계정 설정"
            labelStyle={{
              fontSize:18,
              fontFamily:'SB_Aggro_L',
            }}
            onPress = {doLogout}/>
          <DrawerItem
            label = "앱  정보"
            labelStyle={{
              fontSize:18,
              fontFamily:'SB_Aggro_L',
            }}
            onPress = {doLogout}/> */}
      </DrawerContentScrollView>
  )
}

const DrawerNavigator = () =>{
  return (
      <Drawer.Navigator
        initialRouteName='Loading'
        drawerType="front" //뒤 화면이 고정되고 위에 오버레이해서 덮음
        drawerPosition="left" //bar가 열리는 위치
        drawerContentOption={{
          //activeTintColor: 'blue'
          //activeBackgroundColor: 'yellow
        }}
        drawerStyle={{
          //backgroundColor: '#c6cbef'
          //width: 200
        }}
        drawerContent={(props) => <CustomDrawerContent {...props}/>}
        screenOptions={{swipeEnabled:false}}>
        <Drawer.Screen name= "Loading" component={Loading} options={{headerShown:false,unmountOnBlur:true,}}/>
        <Drawer.Screen name= "StackAuthNavigator" component={StackAuthNavigator} options={{headerShown:false,unmountOnBlur:true}}/>
        <Drawer.Screen name= "StackHomeNavigator" component={StackHomeNavigator} options={{headerShown:false,unmountOnBlur:true}}/>
      </Drawer.Navigator>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    //height:'100%',
    flex:1,
    margin: 0,
    backgroundColor:'#fdf8ff',//'#fdf8ff',
    //flexDirection: 'row',
    //justifyContent:'center',
    //justifyContent:'space-around',
    fontFamily:'SB_Aggro_M',
    //alignItems:'flex-end'
  },
});

export default DrawerNavigator ;

