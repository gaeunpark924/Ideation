import React, { useEffect, useState } from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
// export const deletePost = async (postId, userUid)=>{
//   console.log(postId)
//   const subsriber = await firestore()
//     .collection('userIdeaData')
//     .doc(userUid)
//     .collection('item')
//     .doc(postId)
//     .delete()
//     .then(()=>{
//       console.log('아이디어가 삭제 되었습니다')
//     })
//     .catch((error)=>{console.error(error)})
// }
export const fetchPost = async (userUid) =>{
  const post = []
  const querySnapshot = await firestore()
      .collection('userIdeaData')
      .doc(userUid)
      .collection('item')
      .orderBy('updateTime','desc')
      .get();
  querySnapshot.forEach((doc)=>{
    let postData = doc.data();
    postData.postId = doc.id;
    post.push(postData);
  })
  console.log(userUid)
  return {post}
}
// export const snapshotPost = async (userUid) =>{
//   const post = []
//   const querySnapshot = await firestore()
//       .collection('userIdeaData')
//       .doc(userUid)
//       .collection('item')
//       .orderBy('updateTime','desc')
//       .get();
//   querySnapshot.forEach((doc)=>{
//     let postData = doc.data();
//     postData.postId = doc.id;
//     post.push(postData);
//   })
//   return {post}
// }

