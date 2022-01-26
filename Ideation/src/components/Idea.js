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
          <Text style={{fontSize: 20, marginBottom: 5, fontWeight:'bold'}}>{item.title}</Text>
          <Text style={{fontSize: 14}}>{item.updateDate}</Text>
          <TouchableOpacity style={{position:'absolute', right: 10, top: 10}}>
          <Menu
              visible={visible}
              anchor={<Dot name='dots-three-vertical' size={20} color="#000" onPress={showMenu}/>}
              onRequestClose={hideMenu}
              style={{padding:0, margin:0, elevation:0, borderWidth:1, borderStyle:'solid',height:96}}>
              <MenuItem style={{height:32}}pressColor='#fff'>생성일 : {item.createDate}</MenuItem>
              <MenuDivider/>
              <MenuItem style={{height:32}}children={<Dot/>}>알림창 고정하기     {<Pin name='pin-outline' size={15}/>}</MenuItem>
              <MenuDivider/>
              <MenuItem style={{height:32}}textStyle={{color:'red'}} onPress={()=>{onDelete(item.postId)}}>삭제하기</MenuItem>   
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
    }
});

export default IdeaComponent;