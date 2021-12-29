import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import SwipeCards from 'react-native-swipe-cards-deck';

const SC = () => {
  function Card({data}) {
    return (
      <View style={[styles.card, {backgroundColor: data.backgroundColor}]}>
        <Text>{data.text}</Text>
        <Image source={data.image} />
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

  // replace with real remote data fetching
  useEffect(() => {
    setTimeout(() => {
      setCards([
        {text: '공동체 참여 설계', backgroundColor: '#E7D9FF'},
        //{image: require('../assets/pet1.jpg')},
        {text: '파카 유튜브 시청', backgroundColor: '#E7D9FF'},
        {text: '점심 먹기', backgroundColor: '#E7D9FF'},
        {text: '냉장고 청소하기', backgroundColor: '#E7D9FF'},
        {text: '대충 씻기', backgroundColor: '#E7D9FF'},
        {text: '음...', backgroundColor: '#E7D9FF'},
        {text: '파카 유튜브 시청', backgroundColor: '#E7D9FF'},
      ]);
    }, 3000);
  }, []);

  function handleYup(card) {
    console.log(`Yup for ${card.text}`);
    return true; // return false if you wish to cancel the action
  }
  function handleNope(card) {
    console.log(`Nope for ${card.text}`);
    return true;
  }
  function handleMaybe(card) {
    console.log(`Maybe for ${card.text}`);
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
          hasMaybeAction={true}

          // If you want a stack of cards instead of one-per-one view, activate stack mode
          // stack={true}
          // stackDepth={3}
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
  },
  cardsText: {
    fontSize: 28,
  },
});
