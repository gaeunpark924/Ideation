//IdeaList 아이디어 리스트 페이지
import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Modal} from 'react-native';
import {Button, Header, Card, Icon} from 'react-native-elements';
import Record from './Record';
// import Modal from 'react-native-modal';
const CenterComponent = () => {
  return (
    <View>
      <Text style={styles.CenterComponent}>아이디어 리스트</Text>
    </View>
  );
};
const RightComponent = () => {
  return (
    <View>
      <Icon name="menu" />
    </View>
  );
};
const IdeaMatching = () => {
  return (
    <View style={styles.container}>
      <Header
        centerComponent={<CenterComponent />}
        rightComponent={<RightComponent />}
        placement="center"
      />
      <View>
        <Button title="즉시기록 노출 아이디어 선택" />
      </View>
      <View style={{flexDirection: 'row'}}>
        <Text>아이디어 이름 </Text>
        <Text>작성 시간</Text>
      </View>
      <View>
        <View style={{flexDirection: 'row'}}>
          <Card containerStyle={{margin: 2, width: 24}}>
            <Card.Image source={require('../assets/pet1.jpg')}></Card.Image>
          </Card>
          <Card containerStyle={{margin: 2, width: 24}}>
            <Card.Image source={require('../assets/pet1.jpg')}></Card.Image>
          </Card>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Card containerStyle={{margin: 2, width: 24}}>
            <Card.Image source={require('../assets/pet1.jpg')}></Card.Image>
          </Card>
          <Card containerStyle={{margin: 2, width: 24}}>
            <Card.Image source={require('../assets/pet1.jpg')}></Card.Image>
          </Card>
        </View>
      </View>
      <View style={{flexDirection: 'row'}}>
        <Text>아이디어 이름 </Text>
        <Text>작성 시간</Text>
      </View>
      <View>
        <View style={{flexDirection: 'row'}}>
          <Card containerStyle={{margin: 2, width: 24}} />
          <Card containerStyle={{margin: 2}} />
        </View>
        <View style={{flexDirection: 'row'}}>
          <Card containerStyle={{margin: 2}} />
          <Card containerStyle={{margin: 2}} />
        </View>
      </View>
      <View style={{flexDirection: 'row'}}>
        <Text>아이디어 이름 </Text>
        <Text>작성 시간</Text>
      </View>
      <View>
        <View style={{flexDirection: 'row'}}>
          <Card containerStyle={{margin: 2, width: 24}} />
          <Card containerStyle={{margin: 2}} />
        </View>
        <View style={{flexDirection: 'row'}}>
          <Card containerStyle={{margin: 2}} />
          <Card containerStyle={{margin: 2}} />
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  CenterComponent: {
    fontSize: 24,
  },
});
export default IdeaMatching;
