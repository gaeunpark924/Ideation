import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Remove from 'react-native-vector-icons/Feather';
const Keyword = props => {
  const name = props.name;
  const remove = e => {
    console.log(e.Keyword);
  };
  return (
    <View style={styles.keyword}>
      <Text style={styles.keywordname}>{name}</Text>
      <TouchableOpacity onPress={remove}>
        <Remove name="x" size={18} style={styles.deletebutton} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  keyword: {
    borderRightColor: 'black',
    borderWidth: 0.8,
    backgroundColor: '#E7D9FF',
    width: 100,
    height: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  keywordname: {
    fontSize: 16,
    marginRight: 10,
  },
});
export default Keyword;
