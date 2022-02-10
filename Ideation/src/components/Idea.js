import React, { useEffect, useState, useCallback } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import {Card} from 'react-native-elements';
import firestore from '@react-native-firebase/firestore';
import Dot from 'react-native-vector-icons/Entypo';
import Pin from 'react-native-vector-icons/MaterialCommunityIcons';
import {Menu, MenuItem, MenuDivider } from 'react-native-material-menu';

const IdeaComponent = ({item,onDelete}) => {
    const [visible, setVisible] = useState(false);
    const hideMenu = () => setVisible(false);
    const showMenu = () => setVisible(true);
    const [update, setUpdate] = useState('')
    const getToday = () => {
      var date = new Date();
      return date.getFullYear()+"-"+("0"+(1+date.getMonth())).slice(-2)+"-"+("0"+date.getDate()).slice(-2)
    }
    useEffect(()=>{
      var todayDate = new Date(getToday());
      var updateDate = new Date(item.updateDate);
      const diff = updateDate.getTime() - todayDate.getTime();
      setUpdate(String(Math.abs(diff / (1000*3600*24)))+'일 전 수정')
    },[])
    return (
      <TouchableOpacity
        key={item.postId}
        style={styles.ideaComponent}
        activeOpacity={0.8}>
        <TouchableOpacity activeOpacity={0.8} style={{flex:2}}>
          <Card containerStyle={{height: 100}}>
            <Card.Image
              style={{width: '100%', height: '100%'}}
              source={require('../assets/pet2.jpg')}>  
            </Card.Image>
          </Card>
        </TouchableOpacity>
        <View style={{flex:3, justifyContent: 'center'}}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.update}>{update}</Text>
          <TouchableOpacity style={{position:'absolute', right: 10, top: 10}}>
            <Menu
              visible={visible}
              anchor={<Dot name='dots-three-vertical' size={20} color="#000" onPress={showMenu}/>}
              onRequestClose={hideMenu}
              style={styles.menu}>
              <MenuItem style={{height:32}} textStyle={{fontFamily:'SB_Aggro_L',fontSize: 13}} pressColor='#fff'>생성일 : {item.createDate}</MenuItem>
              <MenuDivider/>
              {/* <MenuItem style={{height:32}} textStyle={{fontFamily:'SB_Aggro_L',fontSize: 13}} children={<Dot/>}>알림창 고정하기     {<Pin name='pin-outline' size={15}/>}</MenuItem>
              <MenuDivider/> */}
              <MenuItem style={{height:32}} textStyle={{color:'red',fontFamily:'SB_Aggro_L',fontSize: 13}} onPress={()=>{onDelete(item.postId)}}>삭제하기</MenuItem>   
            </Menu>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

const styles = StyleSheet.create({
    ideaComponent:{
      borderWidth: 1,
      borderStyle:'solid',
      marginBottom: 15,
      flexDirection: 'row',
      justifyContent: 'center'
    },
    title:{
      fontSize: 20,
      marginBottom: 7,
      fontFamily:'SB_Aggro_M'
    },
    update:{
      fontSize: 18,
      color: '#AEAEAE',
      fontFamily:'SB_Aggro_M'
    },
    menu:{
      padding:0,
      margin:0,
      elevation:0,
      borderWidth:1,
      borderStyle:'solid',
      //height:96,
      backgroundColor:'#fdf8ff'
    }
});

export default IdeaComponent;