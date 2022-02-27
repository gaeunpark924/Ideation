import React, {useEffect, useState, useRef} from 'react';
import {StyleSheet, Text, View, Image, Button, TextInput} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import SwipeCards from 'react-native-swipe-cards-deck';
import Pinoutline from 'react-native-vector-icons/MaterialCommunityIcons';
import Checkbox from 'react-native-vector-icons/Fontisto';
import firestore from '@react-native-firebase/firestore';
import Youtube from './youtubeApi';
import axios from 'axios';
//pinicon,saveicon : icon누름 여부
const SC = ({
  penicon,
  pinicon,
  saveicon,
  whichcard,
  idx,
  isfix,
  ischeck,
  keywordlist,
  setIsfix,
  clicktextModal,
  allrandom,
  confirmCheck,
  confirmCheckState,
  getData,
}) => {
  function Card({data}) {
    // card 고정된건지 여부
    // console.log('카드 rendering');
    const togglefix = () => {
      setIsfix(idx);
    };
    // console.log(keywordlist);
    // card 체크된건지 여부
    const [checked, setChecked] = useState(false);
    // 카드의 text와 image 데이터
    const cd = useRef({text: data.text, image: data.image});
    const togglecheck = () => {
      setChecked(!checked);
      confirmCheck(idx);
      getcd();
    };
    const getcd = () => {
      getData(idx, cd.current);
    };
    // useEffect(() => {
    //   getcd();
    // });
    // 텍스트인지 이미지인지 판단
    const [text, setText] = useState('');
    // console.log(text);
    const onChangeTextinput = e => {
      console.log(e);
      setText(e);
    };
    const saveText = () => {
      setCards(prev => [
        ...prev.map(e => {
          if (e.hasOwnProperty('text')) {
            e.text = text;
          } else {
            return e;
          }
        }),
      ]);
      whichcard[idx] = false;
    };
    const Contents = ({isSelected, isTextModalClicked, isPenClicked}) => {
      const [condition, setConditions] = useState([
        isSelected,
        isTextModalClicked,
        isPenClicked,
      ]);
      return condition.every(e => e === true) ? (
        <View style={{marginTop: -20}}>
          <TextInput
            placeholder="생각나는 아이디어를 입력해주세요!"
            onChangeText={onChangeTextinput}
            value={text}
            style={{textAlign: 'center', fontFamily: 'SB_Aggro_L'}}
            onEndEditing={saveText}
          />
        </View>
      ) : data.image === undefined || data.image === '' ? (
        <Text style={{fontFamily: 'SB_Aggro_L'}}>{data.text}</Text>
      ) : (
        <Image style={styles.cardthumbnail} source={{uri: data.image}} />
      );
    };
    return (
      <View style={[styles.card, {backgroundColor: '#FFF6DF'}]}>
        <View
          style={{
            flexDirection: 'row',
            flex: 1,
          }}>
          <View style={{flex: 1, paddingTop: 2}}>
            {saveicon ? ( // 저장버튼 누른경우
              checked ? ( // 체크된 경우
                <TouchableOpacity>
                  <Checkbox
                    name="checkbox-active"
                    size={24}
                    onPress={togglecheck}
                    style={{backgroundColor: 'white'}}
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity>
                  <Checkbox //체크 안된 경우
                    name="checkbox-passive"
                    size={24}
                    onPress={togglecheck}
                    style={{backgroundColor: 'white'}}
                  />
                </TouchableOpacity>
              )
            ) : pinicon ? ( // 고정 버튼 누른 경우
              isfix[idx] ? ( //해당 index 카드 고정된 경우
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
                // 고정 안된 경우
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
        <View style={{flex: 1}}>
          <Contents
            isSelected={whichcard[idx]}
            isTextModalClicked={clicktextModal}
            isPenClicked={penicon}
          />
        </View>
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
  useEffect(() => {
    console.log(whichcard[idx], clicktextModal, penicon);
  }, [whichcard, clicktextModal]);
  const [cards, setCards] = useState();
  // firestore에서 해당 키워드 데이터 불러오기 -> 배열로 return해서 선택된 키워드 전체의 값을 받아온다.
  const [cd, setCd] = useState([]);
  // const getCardData = keywordlist => {
  //   // console.log('getCardData');
  //   const newcd = [];
  //   for (let i = 0; i < keywordlist.length; i++) {
  //     firestore()
  //       .collection('categoryData')
  //       .get()
  //       .then(querySnapshot => {
  //         querySnapshot.forEach(doc => {
  //           // console.log('doc.data ' + doc.data()['건축'].image.length);
  //           for (let j = 0; j < doc.data()[keywordlist[i]].image.length; j++) {
  //             let temp = doc.data()[keywordlist[i]].image[j];
  //             if (temp === undefined) {
  //               newcd.push(keywordlist[i] + '키워드 정보');
  //             } else {
  //               newcd.push(temp);
  //             }
  //           }
  //         });
  //       });
  //   }
  //   setCd(newcd);
  // };
  // 키워드에 해당하는 데이터를 cd에 저장함.
  useEffect(() => {
    async function getCardData(keywordlist) {
      const newcd = [];
      for (let i = 0; i < keywordlist.length; i++) {
        firestore()
          .collection('categoryData')
          .get()
          .then(querySnapshot => {
            querySnapshot.forEach(doc => {
              // console.log('doc.data ' + doc.data()['건축'].image.length);
              for (
                let j = 0;
                j < doc.data()[keywordlist[i]].image.length;
                j++
              ) {
                let temp = doc.data()[keywordlist[i]].image[j];
                if (temp === undefined) {
                  newcd.push(keywordlist[i] + '키워드 정보');
                } else {
                  newcd.push(temp);
                }
              }
            });
          });
      }
      await setCd(newcd);
    }
    getCardData(keywordlist);
  }, [keywordlist]);
  let cards1 = [
    {
      text: keywordlist[0],
    },
    {
      image: cd[0],
    },
    {
      image: cd[1],
    },
    {
      image: cd[2],
    },
    {
      image: cd[2],
    },
    {
      image: cd[3],
    },
    {
      image: cd[4],
    },
    {
      image: cd[5],
    },
    {
      image: cd[6],
    },
    {
      image: cd[7],
    },
  ];
  let cards2 = [
    {
      text: keywordlist[1],
    },
    {
      image: cd[8],
    },
    {
      image: cd[9],
    },
    {
      image: cd[10],
    },
    {
      image: cd[11],
    },
    {
      image: cd[12],
    },
  ];
  let cards3 = [
    {
      text: keywordlist[2],
    },
    {
      image: cd[13],
    },
    {
      image: cd[14],
    },
    {
      image: cd[15],
    },
    {
      image: cd[16],
    },
    {
      image: cd[17],
    },
  ];
  let cards4 = [
    {
      text: keywordlist[3],
    },
    {
      image: cd[cd.length - 6],
    },
    {
      image: cd[cd.length - 5],
    },
    {
      image: cd[cd.length - 4],
    },
    {
      image: cd[cd.length - 3],
    },
    {
      image: cd[cd.length - 2],
    },
    {
      image: cd[cd.length - 1],
    },
  ];
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
      // setCards(cards1);
      if (idx === 0) {
        setCards(cards1);
      } else if (idx === 1) {
        setCards(cards2);
      } else if (idx === 2) {
        setCards(cards3);
      } else if (idx === 3) {
        setCards(cards4);
      }
    }, 1000);
  }, [allrandom]);

  // 카드 오른쪽으로 옮겼을때
  function handleYup(card) {
    return true; // return false if you wish to cancel the action
  }

  // 카드 왼쪽으로 옮겼을때
  function handleNope(card) {
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
              text: '',
              containerStyle: {width: 0, borderColor: '#fdf8ff'},
            },
            yup: {
              onAction: handleYup,
              text: '',
              containerStyle: {width: 0, borderColor: '#fdf8ff'},
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
    fontSize: 18,
    fontFamily: 'SB_Aggro_L',
  },
  cardthumbnail: {
    zIndex: -1,
    marginTop: -100,
    width: 180,
    height: 200,
  },
});
