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
  allrandom,
  confirmCheck,
  confirmCheckState,
  getData,
}) => {
  function Card({data}) {
    // card 고정된건지 여부
    const togglefix = () => {
      setIsfix(idx);
    };
    // card 체크된건지 여부
    const [checked, setChecked] = useState(false);
    const cd = useRef({text: data.text, image: data.image});
    const togglecheck = () => {
      setChecked(!checked);
      confirmCheck(idx);
      // getData({text: data.text, image: data.image});
      getcd();
    };
    const getcd = () => {
      // console.log(cd.current);
      // console.log('자식');
      // console.log(cd.current);
      getData(idx, cd.current);
    };
    // useEffect(() => {
    //   getcd();
    // });
    // 텍스트인지 이미지인지 판단
    const [text, setText] = useState('');
    // console.log(text);
    const contents = () => {
      const onChangeTextinput = e => {
        setText(e.target.value);
        // console.log(text);
      };
      if (whichcard[idx] && clicktextModal) {
        return (
          <View style={{marginTop: -20}}>
            <TextInput
              placeholder="생각나는 아이디어를 입력해주세요!(30자)"
              // onChange={onChangeTextinput}
              onChangeText={newtext => setText(newtext)}
              // onSubmitEditing={newtext=>setText(newtext)}
              value={text}
              style={{textAlign: 'center', fontFamily: 'SB_Aggro_L'}}
              numberOfLines={2}
              //editable
              maxLength={30}
            />
          </View>
        );
      } else {
        if (data.image === undefined || data.image === '') {
          return <Text style={{fontFamily: 'SB_Aggro_L'}}>{data.text}</Text>;
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
  // YoutubeAPI, FireStore 사용해서 이 부분 수정해주기
  let cards1 = [
    {
      text: keyword,
      backgroundColor: '#FFF6DF',
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
  ];
  let cards2 = [
    {
      text: keyword,
      backgroundColor: '#FFF6DF',
    },
    {
      text: '유튜브 관련!',
      backgroundColor: '#FFF6DF',
    },
    {
      text: '으아',
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
  ];
  let cards3 = [
    {
      text: keyword,
      backgroundColor: '#FFF6DF',
    },
    {
      text: '유튜브 관련!',
      backgroundColor: '#FFF6DF',
      image: 'https://i.ytimg.com/vi/I1V7LE9NBAM/hq720.jpg',
    },
    {
      text: '호롤룰루',
      backgroundColor: '#FFF6DF',
      image:
        'https://i.ytimg.com/vi/9yOnlf_FMsI/hqdefault.jpg?sqp=-oaymwEbCKgBEF5IVfKriqkDDggBFQAAiEIYAXABwAEG&rs=AOn4CLARAhxek4qEAj-B4d7G1MyH6Fc2oA',
    },
    {
      text: '점심 먹기',
      backgroundColor: '#FFF6DF',
      image: 'https://media.giphy.com/media/LkLL0HJerdXMI/giphy.gif',
    },
    {
      text: '냉장고 청소하기',
      backgroundColor: '#FFF6DF',
      image:
        'https://i.ytimg.com/vi/9yOnlf_FMsI/hqdefault.jpg?sqp=-oaymwEbCKgBEF5IVfKriqkDDggBFQAAiEIYAXABwAEG&rs=AOn4CLARAhxek4qEAj-B4d7G1MyH6Fc2oA',
    },
    {
      text: '대충 씻기',
      backgroundColor: '#FFF6DF',
      image:
        'https:i.ytimg.com/vi/9yOnlf_FMsI/hqdefault.jpg?sqp=-oaymwEbCKgBEF5IVfKriqkDDggBFQAAiEIYAXABwAEG&rs=AOn4CLARAhxek4qEAj-B4d7G1MyH6Fc2oA',
    },
    {text: '음...', backgroundColor: '#FFF6DF'},
    {text: '파카 유튜브 시청', backgroundColor: '#FFF6DF'},
  ];
  let cards4 = [
    {
      text: keyword,
      backgroundColor: '#FFF6DF',
    },
    {
      text: '유튜브 관련!',
      backgroundColor: '#FFF6DF',
      image:
        'https://i.ytimg.com/vi/vORDkdgLzEs/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBfx5vbQqtKCvnbHsh0JSvQrCCrug',
    },
    {
      text: '괴물쥐',
      backgroundColor: '#FFF6DF',
      image:
        'https://i.ytimg.com/an_webp/eYp6P-9ayUY/mqdefault_6s.webp?du=3000&sqp=CO6y_o8G&rs=AOn4CLBxbVxq_e-B-aFVRUpionQP0Mgf2Q',
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
  ];
  // useEffect(()=>{
  //   let newcards1=[];
  //   for(let i=0;i=cards1.length;i++){
  //     newcards1.push(cards1[i]);
  //   }
  //   console.log(newcards1);
  // })

  // 전체 카드 랜덤 매칭 -> 랜덤으로 섞어주는 함수
  function shuffle(sourceArray) {
    for (var i = 0; i < sourceArray.length - 1; i++) {
      var j = i + Math.floor(Math.random() * (sourceArray.length - i));
      var temp = sourceArray[j];
      sourceArray[j] = sourceArray[i];
      sourceArray[i] = temp;
    }
    return sourceArray;
  }
  useEffect(() => {
    setTimeout(() => {
      if (allrandom) {
        if (!isfix[0]) {
          shuffle(cards1);
        }
        if (!isfix[1]) {
          shuffle(cards2);
        }
        if (!isfix[2]) {
          shuffle(cards3);
        }
        if (!isfix[3]) {
          shuffle(cards4);
        }
      }
      if (keyword === '노래') {
        setCards(cards1);
      } else if (keyword === '유튜브') {
        setCards(cards2);
      } else if (keyword === '영화') {
        setCards(cards3);
      } else if (keyword === '드라마') {
        setCards(cards4);
      }
    }, 1000);
  }, [allrandom]);
  // console.log(cards);
  // console.log(keyword);
  function handleYup(card) {
    console.log(`Yup for ${card.text} ${card.image}`);
    return true; // return false if you wish to cancel the action
  }
  function handleNope(card) {
    console.log(`Nope for ${card.text} ${card.image}`);
    cardremo;
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
            nope: {
              onAction: handleNope,
              text: '그냥 패스',
              containerStyle: {width: 120},
              textStyle: {/*fontFamily:'SB 어그로 B'*/ alignItems: 'center'},
            },
            yup: {
              onAction: handleYup,
              text: '다시 보기',
              containerStyle: {width: 120},
              textStyle: {/*fontFamily:'SB 어그로 B'*/ alignItems: 'center'},
            },
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
    fontFamily: 'SB_Aggro_L',
  },
  cardthumbnail: {
    zIndex: -1,
    marginTop: -110,
    width: 180,
    height: 220,
  },
});
