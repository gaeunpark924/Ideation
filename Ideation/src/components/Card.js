import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Image, Button} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import SwipeCards from 'react-native-swipe-cards-deck';
import Pinoutline from 'react-native-vector-icons/MaterialCommunityIcons';
import Pin from 'react-native-vector-icons/Entypo';
import Icon2 from 'react-native-vector-icons/Octicons';

const SC = ({change, isChange}) => {
  function Card({data}) {
    const [fix, setFix] = useState('false');
    const contents = () => {
      if (data.image === undefined) {
        return <Text style={styles.cardtext}> {data.text}</Text>;
      } else {
        return (
          <Image style={styles.cardthumbnail} source={{uri: data.image}} />
        );
      }
    };
    const changecontents = () => {
      isChange(!change);
    };
    return (
      <View style={[styles.card, {backgroundColor: data.backgroundColor}]}>
        <View
          style={{
            flexDirection: 'row',
            flex: 1,
          }}>
          <View style={{flex: 1, paddingTop: 2}}>
            <TouchableOpacity>
              {fix === 'true' ? (
                <Pin
                  name="pin"
                  size={24}
                  rotation={90}
                  onPress={() => setFix('false')}
                  borderColor="black"
                  style={{
                    borderColor: 'black',
                    borderWidth: 1,
                    padding: 2,
                    backgroundColor: 'white',
                  }}
                />
              ) : (
                <Pinoutline
                  name="pin-outline"
                  size={24}
                  onPress={() => setFix('true')}
                  style={{
                    borderColor: 'black',
                    borderWidth: 1,
                    padding: 2,
                    backgroundColor: 'white',
                  }}
                />
              )}
            </TouchableOpacity>
          </View>
          <View style={{flex: 5}}></View>
          <View style={{flex: 1, paddingTop: 2, paddingRight: 1}}>
            <TouchableOpacity>
              <Icon2
                name="pencil"
                size={22}
                onPress={changecontents}
                style={{
                  borderColor: 'black',
                  borderWidth: 1,
                  padding: 4,
                  backgroundColor: 'white',
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{flex: 1}}>{contents()}</View>
      </View>
    );
  }

  function StatusCard({text}) {
    return (
      <View>
        <Text style={styles.cardsText}>{text}</Text>
      </View>
    );
  }
  const [cards, setCards] = useState();

  useEffect(() => {
    setTimeout(() => {
      setCards([
        {
          text: '공동체 참여 설계',
          backgroundColor: '#E7D9FF',
        },
        {
          text: '',
          backgroundColor: '#E7D9FF',
          image: 'https://media.giphy.com/media/GfXFVHUzjlbOg/giphy.gif',
        },
        {
          text: '점심 먹기',
          backgroundColor: '#E7D9FF',
          image: 'https://media.giphy.com/media/LkLL0HJerdXMI/giphy.gif',
        },
        {text: '냉장고 청소하기', backgroundColor: '#E7D9FF'},
        {text: '대충 씻기', backgroundColor: '#E7D9FF'},
        {text: '음...', backgroundColor: '#E7D9FF'},
        {text: '파카 유튜브 시청', backgroundColor: '#E7D9FF'},
      ]);
    }, 1000);
  }, []);

  function handleYup(card) {
    console.log(`Yup for ${card.text} ${card.image}`);
    return true; // return false if you wish to cancel the action
  }
  function handleNope(card) {
    console.log(`Nope for ${card.text} ${card.image}`);
    return true;
  }
  function handleMaybe(card) {
    console.log(`Maybe for ${card.text} ${card.image}`);
    return true;
  }

  return (
    <View style={styles.container}>
      {cards ? (
        <SwipeCards
          cards={cards}
          renderCard={cardData => <Card data={cardData} />}
          keyExtractor={cardData => String(cardData.text)}
          renderNoMoreCards={() => <StatusCard text="No more cards..." />}
          actions={{
            nope: {onAction: handleNope},
            yup: {onAction: handleYup},
            maybe: {onAction: handleMaybe},
          }}
          hasMaybeAction={false}
          yupText="좋아"
          nopeText="싫어"
          // If you want a stack of cards instead of one-per-one view, activate stack mode
          // stack={true}
        />
      ) : (
        <StatusCard text="Loading..." />
      )}
    </View>
  );
};
export default SC;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 180,
    height: '100%',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 70,
    marginTop: 10,
  },
  cardText: {
    fontSize: 28,
  },
  cardthumbnail: {
    zIndex: -1,
    marginTop: -103,
    width: 180,
    height: 205,
  },
});
