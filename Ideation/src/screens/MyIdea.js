import React from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
import {Icon, Card, Divider} from 'react-native-elements';
const MyIdea = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={{fontSize: 24}}>
          키워드 매칭 이름
          <Icon name="edit" style={{marginLeft: 5}} />
        </Text>
        <Text>(더블탭해서 이름바꾸기)</Text>
      </View>
      <View style={styles.body}>
        <View style={styles.top_button}>
          <Button
            style={styles.top_button}
            title="카테고리 설정"
            color="gray"
          />
          <Button style={styles.top_button} title="키워드 입력" color="gray" />
          <Button
            style={styles.top_button}
            title="카드 조합 저장"
            color="gray"
          />
        </View>
        <View style={styles.contents_card}>
          <View style={{flexDirection: 'row'}}>
            <Card>
              <View style={{flexDirection: 'row'}}>
                <Button title="카드고정" color="gray" />
                <Button title="직접입력" color="gray" />
              </View>
              <Card.Image source={require('../assets/pet1.jpg')}></Card.Image>
            </Card>
            <Card>
              <View style={{flexDirection: 'row'}}>
                <Button title="카드고정" color="gray" />
                <Button title="직접입력" color="gray" />
              </View>
              <Card.Image source={require('../assets/pet1.jpg')}></Card.Image>
            </Card>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Card>
              <View style={{flexDirection: 'row'}}>
                <Button title="카드고정" color="gray" />
                <Button title="직접입력" color="gray" />
              </View>
              <Card.Image source={require('../assets/pet1.jpg')}></Card.Image>
            </Card>
            <Card>
              <View style={{flexDirection: 'row'}}>
                <Button title="카드고정" color="gray" />
                <Button title="직접입력" color="gray" />
              </View>
              <Card.Image source={require('../assets/pet1.jpg')}></Card.Image>
            </Card>
          </View>
        </View>
        <View style={styles.footer}>
          <Button
            style={styles.bottom_button}
            title="전체 카드 랜덤 매칭"
            color="gray"
          />
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.2,
    borderBottomColor: 'black',
  },
  body: {
    flex: 10,
  },
  top_button: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    marginLeft: 15,
    marginRight: 15,
  },
  contents_card: {
    flex: 8,
    marginBottom: 100,
  },
  footer: {
    flex: 1,
    margin: 10,
    paddingLeft: 60,
    paddingRight: 60,
  },
  bottom_button: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MyIdea;
