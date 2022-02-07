import React from 'react';
import {StyleSheet, Text, View, TextInput, Switch} from 'react-native';
import ModalSelector from 'react-native-modal-selector';
import {WebView} from 'react-native-webview';

var WEB_URL = 'https://condescending-haibt-ae4398.netlify.app/';

export default function IdeaDevelop() {
  return <WebView source={{uri: WEB_URL}} style={{marginTop: 20}} />;
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
