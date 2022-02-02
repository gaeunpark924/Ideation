import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Image, Button, TextInput} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import SwipeCards from 'react-native-swipe-cards-deck';
import Pinoutline from 'react-native-vector-icons/MaterialCommunityIcons';
import Checkbox from 'react-native-vector-icons/Fontisto';
const SC = ({pinicon, saveicon}) => {
  function Card({data}) {
    const [fix, setFix] = useState(false); //card 고정된건지 아닌지
    const togglefix = () => {
      setFix(!fix);
    };

    const [checked, setChecked] = useState(false);
    const togglecheck = () => {
      setChecked(!checked);
      console.log(checked);
    };
    // 텍스트인지 이미지인지 판단
    const contents = () => {
      if (data.image === undefined) {
        return <Text> {data.text}</Text>;
      } else {
        return (
          <Image style={styles.cardthumbnail} source={{uri: data.image}} />
        );
      }
    };
    return (
      <View style={[styles.card, {backgroundColor: data.backgroundColor}]}>
        <View
          style={{
            flexDirection: 'row',
            flex: 1,
          }}>
          <View style={{flex: 1, paddingTop: 2}}>
            {saveicon ? (
              checked ? (
                <TouchableOpacity>
                  <Checkbox
                    name="checkbox-active"
                    size={24}
                    onPress={togglecheck}
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity>
                  <Checkbox
                    name="checkbox-passive"
                    size={24}
                    onPress={togglecheck}
                    backgroundColor="white"
                  />
                </TouchableOpacity>
              )
            ) : pinicon ? (
              fix ? (
                <TouchableOpacity
                  style={{
                    borderColor: 'black',
                    borderWidth: 1,
                    backgroundColor: 'gray',
                  }}>
                  <Pinoutline
                    name="pin-outline"
                    size={24}
                    onPress={togglefix}
                    style={{
                      padding: 2,
                      transform: [{rotate: '45deg'}],
                    }}
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={{borderColor: 'black', borderWidth: 1}}>
                  <Pinoutline
                    name="pin-outline"
                    size={24}
                    onPress={togglefix}
                    style={{
                      padding: 2,
                      backgroundColor: 'white',
                    }}
                  />
                </TouchableOpacity>
              )
            ) : fix ? (
              <TouchableOpacity
                style={{
                  borderColor: 'black',
                  borderWidth: 1,
                  backgroundColor: 'gray',
                }}>
                <Pinoutline
                  name="pin-outline"
                  size={24}
                  onPress={togglefix}
                  style={{
                    padding: 2,
                    transform: [{rotate: '45deg'}],
                  }}
                />
              </TouchableOpacity>
            ) : null}
          </View>
          <View style={{flex: 5}}></View>
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
          backgroundColor: '#FFF6DF',
        },
        {
          text: '',
          backgroundColor: '#FFF6DF',
          image:
            'https://i.ytimg.com/vi/NSusIPQiSVA/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCeKWUwyVSsbQZRGnfiZVIHYTlpfg',
        },
        {
          text: '점심 먹기',
          backgroundColor: '#FFF6DF',
          image: 'https://media.giphy.com/media/LkLL0HJerdXMI/giphy.gif',
        },
        {text: '냉장고 청소하기', backgroundColor: '#FFF6DF'},
        {text: '대충 씻기', backgroundColor: '#FFF6DF'},
        {text: '음...', backgroundColor: '#FFF6DF'},
        {text: '파카 유튜브 시청', backgroundColor: '#FFF6DF'},
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
          loop={true}
          actions={{
            nope: {onAction: handleNope, text: '패스..!'},
            yup: {onAction: handleYup, text: '또 볼 아이디어!'},
          }}
          hasMaybeAction={false}
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
  cardtext: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -10,
    fontSize: 18,
  },
  cardthumbnail: {
    zIndex: -1,
    marginTop: -103,
    width: 180,
    height: 205,
  },
});
