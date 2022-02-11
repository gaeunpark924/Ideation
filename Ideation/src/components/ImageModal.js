import React, { useEffect, useState, useCallback, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  Image,
  Alert,
  KeyboardAvoidingView
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { launchImageLibrary } from "react-native-image-picker";

const ImageModal = ({
    closeImageModal,
    transformImageModal,
    deleteImageModal,
    source,
    row,
    column
    }) => {
    //const [close, setClose] = useState(false)
    const [show, setShow] = useState(false)
    const [imageUri, setImageUri] = useState(source)
    const textRef = useRef()
    //const [visibleM, setVisibleM] = useState(true)
    const close = () =>{
      Alert.alert("경고","퍼즐을 삭제하시겠습니까?",
        [{text: "아니오", onPress: ()=> null, style:"cancel"},
        {text:"네", onPress: ()=> {deleteImageModal(row,column)}}]);
        //setVisibleM(false)
    }
    const showModal = () => {
        setShow(true)
    
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
          setImageUri(source.uri)
        }
      });
    };

    return (
        <Modal
            animationType={'fade'}
            transparent={true}
            //visible={visibleM}
            // onRequestClose={closeModal}
            >
            <View
              style={{
                flex:1,
                backgroundColor:'#000000AA',
                justifyContent:'space-between',
                flexDirection:'column',
                alignItems:'center'}}>
                <View
                  style={{
                    backgroundColor:'#FFF4D9',
                    height:'50%',width:'90%',
                    alignItems:'center',
                    justifyContent:'center',
                    marginTop:'15%'}}>
                  <Image
                    source={{uri:imageUri}}
                    style={{
                      height: '100%',  
                      width: '100%',
                      //borderWidth: 1,
                    }}/>
                </View>
                <View
                  style={{
                    height:'15%', width:'90%',
                    backgroundColor: 'transparent',//,//'transparent',
                    //marginBottom:'10%',
                    marginTop:'10%',
                    justifyContent:'space-between'
                    }}>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={()=>{transformImageModal()}}
                    activeOpacity={0.8}
                    style={{
                        width:'100%',
                        height:'45%',
                        backgroundColor:'white',
                        alignItems:'center',
                        justifyContent:'center',
                        borderWidth:1,
                        flexDirection:'row'}}>
                    {/* <Image
                      //style={styles.plus}
                      style={{height:24, width:24,marginEnd:5}}
                      source={require('../assets/modal_rotate.png')}/> */}
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
                        height:'50%',
                        backgroundColor:'#E7D9FF',
                        alignItems:'center',
                        justifyContent:'center',
                        borderWidth:1,
                        flexDirection:'row'}}>
                    {/* <Image
                      //style={styles.plus}
                      style={{height:24, width:24,marginEnd:5}}
                      source={require('../assets/modal_rotate.png')}/> */}
                    <Text
                      style={{
                        fontSize:14,
                        fontFamily:'SB_Aggro_M',
                      }}>앨범에서 이미지 변경</Text>
                  </TouchableOpacity>
                </View>
                  <View
                    style={{
                      height:'10%', width:'90%',
                      marginBottom:'10%',
                      backgroundColor:'transparent',
                      flexDirection:'row',
                      alignItems:'center',
                      justifyContent:'space-between'
                    }}>
                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={()=>{close()}}>
                      <Image
                        //style={styles.plus}
                        style={{height:60, width:60}}
                        source={require('../assets/modal_delete.png')}/>
                    </TouchableOpacity>
                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={()=>{closeImageModal()}}>  
                    <Image
                      //style={styles.plus}
                      style={{height:60, width:60}}
                      source={require('../assets/modal_check.png')}/>
                    </TouchableOpacity>
                  </View>
                {/* <View style={{backgroundColor:'#FFF4D9',height:'50%',width:'50%'}}>

                </View> */}
                {/* <Text>텍스트 모달</Text> */}
            </View>
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

export default ImageModal;