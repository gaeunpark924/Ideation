import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container: {
      flex : 1,
      backgroundColor: 'white',
      flexDirection: 'column',
      padding : 20,
      justifyContent: 'space-between'
    },
    bottomButton:{
        justifyContent : 'center',
        alignItems: "center",
        width: '100%',
        minWidth : 125,          //최소 너비
        minHeight : 56,          //최소 높이
        borderWidth : 2,         //테두리 굵기
        borderColor : 'black',   //테두리
        backgroundColor : '#E7D9FF',   //배경
    },
    textUseCondition:{  //이용약관보기
        color:"#000000",
        paddingBottom : 6,
        borderBottomWidth : 2,
        //textDecorationLine:'underline',
    },
});

// const styles = StyleSheet.create({
//     container: {
//       flex : 1,
//       backgroundColor: 'white',
//       flexDirection: 'column',
//       padding: 20,
//       justifyContent: 'space-between' //space-around
//     },
//     button:{
//         width: '100%',
//         minWidth : 125,
//         minHeight : 56,
//         justifyContent: 'center',
//         backgroundColor : '#E7D9FF',
//     },
// });

// const styles = StyleSheet.create({
//     container: {
//       flex : 1,
//       backgroundColor: 'white',
//       flexDirection: 'column',
//       padding : 20,
//       justifyContent: 'space-between' //space-around
//     },
//     button:{
//         width: '100%',
//         minWidth : 125,
//         minHeight : 56,
//         justifyContent: 'center',
//         backgroundColor : '#E7D9FF',
//     },
//     textUseCondition:{
//         color:"#000000",
//         textDecorationLine:'underline',
//     },
// });

export default styles;