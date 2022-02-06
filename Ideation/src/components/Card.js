import React, {useEffect, useState, useRef} from 'react';
import {StyleSheet, Text, View, Image, Button, TextInput} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import SwipeCards from 'react-native-swipe-cards-deck';
import Pinoutline from 'react-native-vector-icons/MaterialCommunityIcons';
import Checkbox from 'react-native-vector-icons/Fontisto';
import firestore from '@react-native-firebase/firestore';
//pinicon,saveicon : icon누름 여부
const SC = ({
  penicon,
  pinicon,
  saveicon,
  whichcard,
  idx,
  isfix,
  ischeck,
  keyword,
  setIsfix,
  clicktextModal,
}) => {
  function Card({data}) {
    // card 고정된건지 여부
    const togglefix = () => {
      setIsfix(idx);
    };
    // card 체크된건지 여부
    const [checked, setChecked] = useState(false);
    const togglecheck = () => {
      setChecked(!checked);
    };
    // 텍스트인지 이미지인지 판단
    const [text, setText] = useState('');
    // console.log(text);
    const contents = () => {
      const onChangeTextinput = e => {
        setText(e.target.value);
        // console.log(text);
      };
      if (whichcard[idx]&&clicktextModal) {
        return (
          <View style={{marginTop:-20}}>
            <TextInput
              placeholder="생각나는 아이디어를 입력해주세요!(30자)"
              // onChange={onChangeTextinput}
              onChangeText={newtext=>setText(newtext)}
              // onSubmitEditing={newtext=>setText(newtext)}
              value={text}
              style={{textAlign:'center',fontFamily:'SB 어그로 L'}}
              numberOfLines={2}
              //editable
              maxLength={30}
            />
          </View>
        );
      } else {
        if (data.image === undefined || data.image === '') {
          return <Text style={{fontFamily:'SB 어그로 L'}}>{data.text}</Text>;
        } else {
          return (
            <Image style={styles.cardthumbnail} source={{uri: data.image}} />
          );
        }
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
              isfix[idx] ? (
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
            ) : isfix[idx] ? (
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
  // Youtube api -> firestore -> setCards를 통해서 이미지나 텍스트 저장.
  let newCards = useRef();
  // useEffect(() => {
  //   const db = firestore()
  //     .collection('categoryData')
  //     .doc(keyword)
  //     .onSnapshot(documentSnapshot => {
  //       newCards.current = documentSnapshot.data();
  //     });
  // }, [keyword]);
  useEffect(() => {
    setTimeout(() => {
      if(keyword==='노래'){
        setCards([
          {
            text:keyword,
            backgroundColor:'#FFF6DF'
          },
          {
            text: '예빛',
            backgroundColor: '#FFF6DF',
          },
          {
            text: '검정치마',
            backgroundColor: '#FFF6DF',
            // image: newCards.current.thumbnail[0],
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
      }
      else if(keyword==='유튜브'){
        setCards([
          {
            text:keyword,
            backgroundColor:'#FFF6DF'
          },
          {
            text: '유튜브 관련!',
            backgroundColor: '#FFF6DF',
          },
          {
            text: '괴물쥐',
            backgroundColor: '#FFF6DF',
            // image: newCards.current.thumbnail[1],
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
      }
      else if(keyword==='영화'){
        setCards([
          {
            text:keyword,
            backgroundColor:'#FFF6DF'
          },
          {
            text: '유튜브 관련!',
            backgroundColor: '#FFF6DF',
            image:'https://i.ytimg.com/vi/I1V7LE9NBAM/hq720.jpg'
          },
          {
            text: '괴물쥐',
            backgroundColor: '#FFF6DF',
            // image: newCards.current.thumbnail[1],
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
      }
      else if(keyword==='드라마'){
        setCards([
          {
            text:keyword,
            backgroundColor:'#FFF6DF'
          },
          {
            text: '유튜브 관련!',
            backgroundColor: '#FFF6DF',
            image:'https://i.ytimg.com/vi/vORDkdgLzEs/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBfx5vbQqtKCvnbHsh0JSvQrCCrug'
          },
          {
            text: '괴물쥐',
            backgroundColor: '#FFF6DF',
            image: 'https://i.ytimg.com/an_webp/eYp6P-9ayUY/mqdefault_6s.webp?du=3000&sqp=CO6y_o8G&rs=AOn4CLBxbVxq_e-B-aFVRUpionQP0Mgf2Q',
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
      }
    }, 1000);
  }, [pinicon]);
  // console.log(cards);
  console.log(keyword);
  function handleYup(card) {
    console.log(`Yup for ${card.text} ${card.image}`);
    return true; // return false if you wish to cancel the action
  }
  function handleNope(card) {
    console.log(`Nope for ${card.text} ${card.image}`);
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
            nope: {onAction: handleNope, text: '그냥 패스',containerStyle:{width:120},textStyle:{/*fontFamily:'SB 어그로 B'*/alignItems:'center'}},
            yup: {onAction: handleYup, text: '다시 보기',containerStyle:{width:120},textStyle:{/*fontFamily:'SB 어그로 B'*/alignItems:'center'}},
          }}
          hasMaybeAction={false}
        />
      ) : (
        <StatusCard text="불러오는중..." />
      )}
    </View>
  );
};
export default React.memo(SC);

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
    fontSize: 18,
    fontFamily: 'SB 어그로 L',
  },
  cardthumbnail: {
    zIndex: -1,
    marginTop: -110,
    width: 180,
    height: 220,
  },
});
