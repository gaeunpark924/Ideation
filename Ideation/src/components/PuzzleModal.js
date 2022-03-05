import React, { useEffect, useState, useCallback, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  Image,
  Alert,
  Dimensions,
  Keyboard
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { launchImageLibrary } from "react-native-image-picker";
import { BlurView} from "@react-native-community/blur";
import { mainTheme } from '../theme/theme';
const { width, height } = Dimensions.get("window"); 
const ImageText = (props) => {
  return(
    <View {...props}
      style={[styles.imagetext,props.style]}>
    </View>
  )
}
const SubView = (props) => {
  return(
    <View {...props}
      style={[styles.subview,props.style]}>
    </View>
  )
}
const LongButton = (props) => {
  return(
    <TouchableOpacity {...props}
      activeOpacity={0.8}
      style={[styles.longbutton,props.style]}>
    </TouchableOpacity>
  )
}
const PuzzleModal = ({
    closePuzzleModal,
    deletePuzzle,
    imageSource,
    textSource,
    row,
    column,
    puzzleType
    }) => {
    const [type, setType] = useState(puzzleType)
    const [text, setText] = useState(textSource)
    const [image, setImage] = useState(imageSource)
    const modalRef = useRef()
    const warning =  () =>{
      Alert.alert("경고","퍼즐을 삭제하시겠습니까?",
        [{text: "아니오", onPress: ()=> null, style:"cancel"},
        {text:"네", onPress: ()=> {deletePuzzle(row,column)}}]);
    }
    const takeImagefromphone = () => {
      Keyboard.dismiss()
      const options = {
        title: "Select Avatar",
        storageOptions: {
          skipBackup: true,
          path: "images",
        },
      };
      launchImageLibrary(options, (response) => {
        if (response.didCancel) {
          console.log("User cancelled image picker");
        } else if (response.error) {
          console.log("ImagePicker Error: ", response.error);
        } else if (response.customButton) {
          console.log("User tapped custom button: ", response.customButton);
        } else {
          console.log('Response = ', response.assets[0].uri);
          const tmp = response.assets[0];
          const source = {
            uri:
              Platform.OS === "android"
                ? tmp.uri
                : tmp.uri.replace("file://", ""),
            fileName: response.fileName,
          };
          //console.log('행, 열',clickedEmptyIndex.current[0],clickedEmptyIndex.current[1])
          if (source.uri !== ''){
            setImage(source.uri)
          }
          type === 'text'
          ? setType('image')
          : null
        }
      });
    };
    const changeType = () => {
      Keyboard.dismiss()
      if (image==='' && type ==='text'){ //처음 텍스트에서 빈 이미지 퍼즐로 전환할 때
        takeImagefromphone()
      }else{
        setType(type === 'text'
        ? 'image'
        : 'text'
        )
      }
    }
    const onPressBackGround = () => {
      Keyboard.dismiss()
      type==='text'? closePuzzleModal(row,column,text,type): closePuzzleModal(row,column,image,type)
    }
    return (
        <Modal
          ref={modalRef}
          animationType={'fade'}
          transparent={true}
          onRequestClose={()=>{
            type==='text' ? closePuzzleModal(row,column,text,type) : closePuzzleModal(row,column,image,type)}
          }
          onBackdropPress={() => closeModal()}>
          <BlurView blurType='light' style={{height:height}}>
            <View style={{flex:1}}>
              <TouchableOpacity
                onPress={onPressBackGround}
                activeOpacity={1}
                style={{
                  flex:1,
                  backgroundColor: 'transparent',//'#000000AA',
                  justifyContent:'space-between',
                  flexDirection:'column',
                  alignItems:'center'}}>
              {type === 'text'
              ? <ImageText style={{backgroundColor:'#FFF4D9',borderRadius:50}}>
                  <TextInput
                    style={{fontSize:24, height:'80%',backgroundColor:'#FFF4D9',width:'80%'}}
                    placeholder='내용을 입력해주세요.(30자)'
                    value={text}
                    maxLength={30}
                    multiline={true}
                    onChangeText={(e) => {setText(e)}}/>
                </ImageText>
              : <ImageText style={{backgroundColor:'#FFF4D9'}}>
                  <Image
                    source={{uri:image}}
                    style={{height:'100%',width: '100%',}}/>
                </ImageText>
              }
              {type === 'text'
              ? <SubView style={{height:'7%',marginTop:'20%'}}>
                  <LongButton
                    style={{height:'100%',backgroundColor:'white',}}
                    onPress={()=>{changeType()}}>
                    <Image
                      style={{height:24,width:24,marginEnd:5}}
                      source={require('../assets/modal_rotate.png')}/>
                    <Text style={styles.buttontext}>이미지 퍼즐로 전환</Text>
                  </LongButton>    
                </SubView>
              : <SubView style={{height:'20%',marginTop:'0%'}}>
                  <View style={{
                    height:'20%',alignItems:'center',justifyContent:'center',
                    borderRadius:20,borderColor:mainTheme.colors.fontGray,borderWidth:1,
                    backgroundColor:mainTheme.colors.white,flexDirection:'row'}}>
                    <Image
                  style={{
                    width: 14,
                    height: 14,
                    marginEnd:5}}
                  source={require('../assets/warning.png')}
                  resizeMode='cover'/>   
                    <Text style={{color:mainTheme.colors.fontGray}}>직접 업로드한 이미지는 앱 삭제 시 저장되지 않습니다.</Text>
                  </View>
                  <LongButton
                    style={{height:'31%',backgroundColor:'white',}} //43
                    onPress={()=>{changeType()}}>
                    <Text style={styles.buttontext}>텍스트 퍼즐로 전환</Text>
                  </LongButton>
                  <LongButton
                    style={{height:'37%',backgroundColor:'#E7D9FF',}}  //52
                    onPress={takeImagefromphone}>
                    <Text style={styles.buttontext}>앨범에서 이미지 변경</Text>
                  </LongButton>
                </SubView>
              }
                <SubView style={{height:'10%',marginBottom:'10%',flexDirection:'row',alignItems:'center'}}>
                  <TouchableOpacity activeOpacity={0.8} onPress={warning}>
                    <Image
                      style={{height:60, width:60}}
                      source={require('../assets/modal_delete.png')}/>
                  </TouchableOpacity>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={()=>{
                      type === 'image'? closePuzzleModal(row,column,image,type) : closePuzzleModal(row,column,text,type)
                    }}>  
                  <Image
                    style={{height:60, width:60}}
                    source={require('../assets/modal_check.png')}/>
                  </TouchableOpacity>
                </SubView>
              </TouchableOpacity>
            </View>
          </BlurView>
        </Modal>
    );
  };

const styles = StyleSheet.create({
    imagetext:{
      height:'50%',
      width:'90%',   //////제일 위에 50%
      alignItems:'center',
      justifyContent:'center', ///15%  65%
      marginTop:'15%',
      borderWidth:1
    },
    subview:{
      width:'90%',
      backgroundColor: 'transparent',
      justifyContent:'space-between',
    },
    longbutton:{
      width:'100%',
      alignItems:'center',
      justifyContent:'center',
      borderWidth:1,
      flexDirection:'row'
    },
    buttontext:{
      fontSize:14,
      fontFamily:'SB_Aggro_M'
    }
});

export default PuzzleModal;

// onLayout={onLayout}
// const onLayout = e => {
//   const { height } = e.nativeEvent.layout; //View의 높이
//   //console.log('출력',height)
// }

//onPressIn={pressIn} //TextInput 눌렸을때