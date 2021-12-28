import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {Card, Divider} from 'react-native-elements';
import Keyword from '../components/keyword';
import Icon from 'react-native-vector-icons/FontAwesome';
import Swiper from 'react-native-deck-swiper';

const MyIdea = () => {
  return (
    <View style={styles.container}>
      <View style={styles.sv}>
        <ScrollView
          style={styles.keyword}
          horizontal={true}
          contentContainerStyle={{
            alignContent: 'center',
            alignItems: 'center',
          }}>
          <View style={styles.addkeyword}>
            <Text style={{fontSize: 16, marginRight: 7}}>키워드 추가</Text>
            <TouchableOpacity>
              <Text style={styles.addbutton}>+</Text>
            </TouchableOpacity>
          </View>
          <Keyword name="랜덤" />
          <Keyword name="자연" />
          <Keyword name="건축" />
          <Keyword name="예술" />
          <Keyword name="뷰티" />
          <Keyword name="디자인" />
          <Keyword name="교육" />
          <Keyword name="테크" />
          <Keyword name="유튜브" />
          <Keyword name="파카" />
          <Keyword name="정성하" />
        </ScrollView>
      </View>
      <View style={styles.body}>
        <View style={styles.contents_card}>
          <View style={{flexDirection: 'row'}}>
            <View style={styles.containers}>
              <Swiper
                cards={['DO', 'MORE', 'OF', 'WHAT', 'MAKES', 'YOU', 'HAPPY']}
                renderCard={card => {
                  return (
                    <View style={styles.card}>
                      <Text style={styles.text}>{card}</Text>
                    </View>
                  );
                }}
                onSwiped={cardIndex => {
                  console.log(cardIndex);
                }}
                onSwipedAll={() => {
                  console.log('onSwipedAll');
                }}
                cardIndex={0}
                backgroundColor={'#4FD0E9'}
                stackSize={3}>
                <Button
                  onPress={() => {
                    console.log('oulala');
                  }}
                  title="Press me">
                  You can press me
                </Button>
              </Swiper>
            </View>
          </View>
        </View>
      </View>
      <TouchableOpacity style={styles.cardsave}>
        <Text style={{fontSize: 20}}>카드 조합 저장</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.randommatching}>
        <Text style={{fontSize: 25}}>전체 카드 랜덤 매칭</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {flex: 1},
  sv: {flex: 1},
  topsidebar: {flex: 1, backgroundColor: 'blue'},
  card: {
    flex: 0.5,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#E8E8E8',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  text: {
    textAlign: 'center',
    fontSize: 50,
    backgroundColor: 'transparent',
  },
  addkeyword: {
    flexDirection: 'row',
    width: 120,
    textAlign: 'center',
    justifyContent: 'center',
    backgroundColor: '#E7D9FF',
    height: '100%',
    alignItems: 'center',
    borderColor: 'black',
  },
  addbutton: {},
  body: {flex: 10, marginBottom: 50},
  cardsave: {
    flex: 1,
    borderColor: 'black',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  randommatching: {
    flex: 2,
    backgroundColor: '#E7D9FF',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 3,
    borderColor: 'black',
  },
});
export default MyIdea;
