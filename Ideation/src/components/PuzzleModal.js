import React, { useEffect, useState, useCallback, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  Image,
  KeyboardAvoidingView,
  Pressable,
  Alert,
  ImageBackground,
  Dimensions
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { launchImageLibrary } from "react-native-image-picker";
import { ComplexAnimationBuilder } from 'react-native-reanimated';
import { BlurView, VibrancyView } from "@react-native-community/blur";
const { width, height } = Dimensions.get("window"); 

const PuzzleModal = ({
    closePuzzleModal,
    deletePuzzle,
    imageSource,
    textSource,
    row,
    column,
    puzzleType
    }) => {
   //const textRef = useRef(source)
    const [type, setType] = useState(puzzleType)
    const [text, setText] = useState(textSource)
    const [image, setImage] = useState(imageSource)
    const warning =  () =>{
      Alert.alert("경고","퍼즐을 삭제하시겠습니까?",
        [{text: "아니오", onPress: ()=> null, style:"cancel"},
        {text:"네", onPress: ()=> {deletePuzzle(row,column)}}]);
        //setVisibleM(false)
    }
    const takeImagefromphone = () => {
      const options = {
        title: "Select Avatar",
        storageOptions: {
          skipBackup: true,
          path: "images",
        },
      };
      launchImageLibrary(options, (response) => {
        // console.log('Response = ', response);
        if (response.didCancel) {
          // setProcessing(false)
          console.log("User cancelled image picker");
        } else if (response.error) {
          // setProcessing(false)
          console.log("ImagePicker Error: ", response.error);
        } else if (response.customButton) {
          // setProcessing(false)
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
          //console.log(source.uri)
          if (source.uri !== ''){
            setImage(source.uri)
          }
          type === 'text'
          ? setType('image')
          : null
          //여기서 다시 type을 image로 바꿔야 하나?

        }
      });
    };
    const changeType = () => {
      console.log('changeType',type)
      if (image==='' && type ==='text'){
        //처음 텍스트에서 빈 이미지 퍼즐로 전환할 때
        takeImagefromphone()
        //console.log('xxxxxxxxxx')
      }else{
        setType(type === 'text'
        ? 'image'
        : 'text'
        )
      }
    }
    return (
        <Modal
            animationType={'fade'}
            transparent={true}
            onRequestClose={()=>{
              type==='text' ? closePuzzleModal(row,column,text,type) : closePuzzleModal(row,column,image,type)}
            }
            onBackdropPress={() => closeModal()}>
          <BlurView
            blurType='light'
            style={{flex:1}}>
          <TouchableOpacity
            onPress={()=>{type==='text' ? closePuzzleModal(row,column,text,type) : closePuzzleModal(row,column,image,type)}}
            activeOpacity={1}
              style={{
                flex:1,
                backgroundColor: 'transparent',//'#000000AA',
                justifyContent:'space-between',
                flexDirection:'column',
                //position:'absolute',
                alignItems:'center'}}>
              {type === 'text'
              ? <View
                  style={{
                    backgroundColor:'#FFF4D9',
                    height:'50%',width:'90%',   //////제일 위에 50%
                    borderRadius:50,
                    borderWidth:1,
                    alignItems:'center',
                    justifyContent:'center',    ///15%  65%
                    marginTop:'15%'}}>
                  <TextInput
                    style={{fontSize:24, height:'80%',backgroundColor:'#FFF4D9',width:'80%'}}
                    placeholder='내용을 입력해주세요.(30자)'
                    value={text}
                    maxLength={30}
                    multiline={true}
                    onChangeText={(e) => { setText(e)}}
                    //setInit(!init ? true : true) //false -> true, true -> true
                    //textRef.current = e
                  
                      />
                </View>
              : <View
                  style={{
                    backgroundColor:'#FFF4D9',
                    height:'50%',width:'90%',
                    alignItems:'center',
                    justifyContent:'center',
                    marginTop:'15%'}}>
                  <Image
                    source={{uri:image}}
                    style={{
                    height: '100%',  
                    width: '100%',
                  //borderWidth: 1,
                  }}/>
                </View>
              }
              {type === 'text'
              ? <View
                  style={{
                    height:'7%', width:'90%',
                    backgroundColor: 'transparent',//'transparent',//'transparent',
                    marginTop:'20%',
                    justifyContent:'space-between'
                  }}>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={()=>{changeType()}}
                    style={{
                      width:'100%',
                      height:'100%',
                      backgroundColor:'white',
                      alignItems:'center',
                      justifyContent:'center',
                      borderWidth:1,
                      flexDirection:'row'}}>
                    <Image
                      //style={styles.plus}
                      style={{height:24, width:24,marginEnd:5}}
                      source={require('../assets/modal_rotate.png')}/>
                    <Text
                      style={{
                      fontSize:14,
                      fontFamily:'SB_Aggro_M'
                      }}>이미지 퍼즐로 전환</Text>
                  </TouchableOpacity>
                </View>
              : <View
                  style={{
                    height:'14%', width:'90%',
                    backgroundColor: 'transparent',//,//'transparent',
                    //marginBottom:'10%',
                    marginTop:'10%',
                    //flexDirection: 'column'
                    justifyContent:'space-between'
                  }}>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={()=>{changeType()}}
                    activeOpacity={0.8}
                    style={{
                      width:'100%',
                      height:'43%',
                      backgroundColor:'white',
                      alignItems:'center',
                      justifyContent:'center',
                      borderWidth:1,
                      flexDirection:'row'}}>
                    <Text
                      style={{
                        fontSize:14,
                        fontFamily:'SB_Aggro_M'
                      }}>텍스트 퍼즐로 전환</Text>
                    </TouchableOpacity>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={()=>{takeImagefromphone()}}
                    activeOpacity={0.8}
                    style={{
                      width:'100%',
                      height:'52%',
                      backgroundColor:'#E7D9FF',
                      alignItems:'center',
                      justifyContent:'center',
                      borderWidth:1,
                      flexDirection:'row'}}>
                    <Text
                      style={{
                        fontSize:14,
                        fontFamily:'SB_Aggro_M',
                      }}>앨범에서 이미지 변경</Text>
                  </TouchableOpacity>
                </View>
              }
                <View
                  style={{
                  height:'10%', width:'90%',
                  backgroundColor: 'transparent',//'transparent',
                  marginBottom:'10%',
                  justifyContent:'space-between'
                  }}>
                  <View
                    style={{
                      height:'100%', width:'100%',
                      backgroundColor:'transparent',
                      flexDirection:'row',
                      alignItems:'center',
                      justifyContent:'space-between'
                    }}>
                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={()=>{warning()}}>
                      <Image
                        //style={styles.plus}
                        style={{height:60, width:60}}
                        source={require('../assets/modal_delete.png')}/>
                    </TouchableOpacity>
                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={()=>{
                        type === 'image'
                        ? closePuzzleModal(row,column,image,type)
                        : closePuzzleModal(row, column, text,type)
                      }}>  
                    <Image
                      //style={styles.plus}
                      style={{height:60, width:60}}
                      source={require('../assets/modal_check.png')}/>
                    </TouchableOpacity>
                  </View>
                </View>
            </TouchableOpacity>
          </BlurView>
          {/* </Pressable>    */}
        </Modal>
    );
  };

const styles = StyleSheet.create({
    ideaComponent:{
      borderWidth: 1,
      borderStyle:'solid',
      marginBottom: 15,
      flexDirection: 'row',
      justifyContent: 'center'
    },
    title:{
      fontSize: 20,
      marginBottom: 7,
      fontFamily:'SB_Aggro_M'
    },
    update:{
      fontSize: 18,
      color: '#AEAEAE',
      fontFamily:'SB_Aggro_M'
    },
    menu:{
      padding:0,
      margin:0,
      elevation:0,
      borderWidth:1,
      borderStyle:'solid',
      //height:96,
      backgroundColor:'#fdf8ff'
    }
});

export default PuzzleModal;