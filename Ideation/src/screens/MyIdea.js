import React from 'react';
import {StyleSheet, Text, View, Separator, SafeAreaView} from 'react-native';
import {Button, Header, Card, Icon} from 'react-native-elements';
const CenterComponent = () => {
  return (
    <View>
      <Text style={{fontSize: 24}}>
        키워드 매칭 이름
        <Icon name="edit" style={{marginLeft: 5}} />
      </Text>
      <Text style={{fontSize: 16}}>(더블탭해서 이름바꾸기)</Text>
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
const MyIdea = () => {
  return (
    <View style={styles.container}>
      <Header
        centerComponent={<CenterComponent />}
        containerStyle={{flex: 1}}
        leftComponent={<LeftComponent />}
        placement="center"
      />
      <View style={styles.top_buttons}>
        <Button style={styles.top_button} title="카테고리 설정" />
        <Button style={styles.top_button} title="키워드 입력" />
        <Button style={styles.top_button} title="카드 조합 저장" />
      </View>
      <View>
        <View style={{flexDirection: 'row'}}>
          <Card>
            <View style={{flexDirection: 'row'}}>
              <Button title="카드고정" />
              <Button title="직접입력" />
            </View>
            <Card.Image source={require('../assets/pet1.jpg')}></Card.Image>
          </Card>
          <Card>
            <View style={{flexDirection: 'row'}}>
              <Button title="카드고정" />
              <Button title="직접입력" />
            </View>
            <Card.Image source={require('../assets/pet2.jpg')}></Card.Image>
          </Card>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Card>
            <View style={{flexDirection: 'row'}}>
              <Button title="카드고정" />
              <Button title="직접입력" />
            </View>
            <Card.Image source={require('../assets/pet3.jpg')}></Card.Image>
          </Card>
          <Card>
            <View style={{flexDirection: 'row'}}>
              <Button title="카드고정" />
              <Button title="직접입력" />
            </View>
            <Card.Image source={require('../assets/pet4.jpg')}></Card.Image>
          </Card>
        </View>
      </View>
      <View>
        <Button style={styles.bottom_button} title="전체 카드 랜덤 매칭" />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  top_buttons: {
    justifyContent: 'space-between',
    marginLeft: 10,
    marginRight: 10,
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
