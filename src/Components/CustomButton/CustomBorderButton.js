import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

export default function CustomBorderButton({
  text,
  onPress,
  textStyle,
  isBlack,
  isGrayBackground,
}) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.Button]}>
        <Text style={[styles.Buttontext]}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  Button: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#ACB4D1',
    borderRadius: 0,
    borderWidth: 1,
    height: 55,
  },
  Buttontext: {
    color: '#ACB4D1',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
    color: '#ACB4D1',
    fontSize: 16,
  },
});
