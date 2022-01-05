import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  FlatList,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {Button, Header, Card, Icon} from 'react-native-elements';

const IdeaComponent = () => {
  return (
    <View style={{marginBottom: 40}}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text style={{fontSize: 18}}>아이디어 이름</Text>
        <Text style={{fontSize: 12}}>작성 시간</Text>
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        <Card containerStyle={{width: 162, height: 80, borderRadius: 8}}>
          {/* <Card.Title style={{width: '100%', height: '10%'}}>콘텐츠 카드</Card.Title> */}
          <Card.Image
            style={{width: '100%', height: '100%'}}
            source={require('../assets/pet1.jpg')}></Card.Image>
        </Card>
        <Card
          containerStyle={{
            width: 162,
            height: 80,
            borderRadius: 8 /*width: (Dimensions.get('window').width-15)/2-2*/,
          }}>
          <Card.Image
            style={{width: '100%', height: '100%'}}
            source={require('../assets/pet2.jpg')}></Card.Image>
        </Card>
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        <Card containerStyle={{width: 162, height: 80, borderRadius: 8}}>
          {/* <Card.Title style={{width: '100%', height: '10%'}}>콘텐츠 카드</Card.Title> */}
          <Card.Image
            style={{width: '100%', height: '100%'}}
            source={require('../assets/pet1.jpg')}></Card.Image>
        </Card>
        <Card
          containerStyle={{
            width: 162,
            height: 80,
            borderRadius: 8 /*width: (Dimensions.get('window').width-15)/2-2*/,
          }}>
          <Card.Image
            style={{width: '100%', height: '100%'}}
            source={require('../assets/pet2.jpg')}></Card.Image>
        </Card>
      </View>
    </View>
  );
};

const idealist = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={{flex: 1}}></View>
        <View style={styles.idealist}>
          <Text style={{fontSize: 25}}>아이디어 리스트</Text>
        </View>
        <View style={{flex: 1}}>
          <TouchableOpacity>
            <Icon
              name="dots-three-horizontal"
              type="entypo"
              style={styles.setting}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.top_buttons}>
        <TouchableOpacity style={styles.top_button}>
          <Text style={styles.top_button_text}>즉시 노출 아이디어 선택</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={{margin: 15}}>
        <IdeaComponent />
        <IdeaComponent />
        <IdeaComponent />
        <IdeaComponent />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    //marginTop: StatusBar.currentHeight || 0,  //상태바 높이만큼 낮추는 코드
  },
  idealist: {
    flex: 8,
    alignContent: 'center',
    alignItems: 'center',
    margin: 15,
  },
  setting: {},
  header: {
    flexDirection: 'row',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  top_buttons: {
    marginTop: 12,
    marginLeft: 15,
    marginRight: 15,
    flexDirection: 'row',
  },
  top_button: {
    padding: 5,
  },
  top_button_text: {
    fontSize: 20,
    backgroundColor: '#E7D9FF',
    padding: 10,
    borderRadius: 5,
    borderColor: 'black',
    borderWidth: 0.6,
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
  CenterComponent: {
    fontSize: 24,
  },
});

export default idealist;
