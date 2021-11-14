import React from 'react';
import {StyleSheet, Text, View, SafeAreaView, StatusBar, FlatList, ScrollView, Dimensions} from 'react-native';
import {Button, Header, Card, Icon} from 'react-native-elements';


const CenterComponent = () => {
  return (
    <View style={{flexDirection: 'row'}}>
      <Text style={{fontSize: 24}}>
        아이디어 리스트
      </Text> 
    </View>
  );
};

const LeftComponent = () => {
  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Icon name="menu" />
    </View>
  );
};

const RightComponent = () => {
  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Icon name="dots-three-horizontal" type="entypo"/>
    </View>
  );
};

const MyIdea = () => {

  return (
    <SafeAreaView style={styles.container}>
      <Header
        leftComponent={<LeftComponent />}
        centerComponent={<CenterComponent />}
        rightComponent={<RightComponent />}
        containerStyle={{flex: 1, position: 'absolute', minHeight: 50}}
        placement="center"
      />
      <View style={styles.top_buttons}>
        <Button style={styles.top_button} title="즉시기록 노출 아이디어 선택" />
      </View>
      <ScrollView style={{backgroundColor: 'pink', margin: 15}}>
        <View style={{backgroundColor:'green', flexDirection: 'row', justifyContent:'space-between'}}>
          <Text style={{fontSize: 18}}>아이디어 이름</Text>
          <Text style={{fontSize: 10}}>작성 시간</Text>
        </View>
          <View style={{flexDirection: 'row', justifyContent: 'center', backgroundColor:'yellow'}}>
            <Card containerStyle={{width: 162, height: 80, borderRadius: 8}}>
              <Card.Title>콘텐츠 카드</Card.Title>
              <Card.Image style={{marginHorizontal:'0%', marginVertical:'0%'}} source={require('../assets/pet1.jpg')}></Card.Image>
            </Card>
            <Card containerStyle={{width: (Dimensions.get('window').width-15)/2-2}}>
              <Card.Title >콘텐츠 카드</Card.Title>
              <Card.Image source={require('../assets/pet2.jpg')}></Card.Image>
            </Card>
          </View>
          {/* <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <Card>
              <Card.Title>콘텐츠 카드</Card.Title>
              <Card.Image source={require('../assets/pet3.jpg')}></Card.Image>
            </Card>
            <Card>
              <Card.Title>콘텐츠 카드</Card.Title>
              <Card.Image source={require('../assets/pet4.jpg')}></Card.Image>
            </Card>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <Card>
              <Card.Title>콘텐츠 카드</Card.Title>
              <Card.Image source={require('../assets/pet3.jpg')}></Card.Image>
            </Card>
            <Card>
              <Card.Title>콘텐츠 카드</Card.Title>
              <Card.Image source={require('../assets/pet4.jpg')}></Card.Image>
            </Card>
          </View> 
        </View>*/}
      </ScrollView>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    //marginTop: StatusBar.currentHeight || 0,  //상태바 높이만큼 낮추는 코드
  },
  top_buttons: {
    marginTop: 90, //작동 안됨... useHeaderHeight(),  import {useHeaderHeight} from '@react-navigation/stack';
    marginLeft: 15,
    marginRight: 15,
    flexDirection: 'row',
  },
  top_button: {
    padding: 5,
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
});

export default MyIdea;
