import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { COLORS } from '../constraints/Theme';


const Button = (
  props
) => {

  return (
    <View style={{ alignItems: 'center', backgroundColor: COLORS.darkblue, height: 50 }} >
        <Text style={{ lineHeight: 50, fontWeight: 'bold', fontSize: 20, color: COLORS.white }} >{props.buttonName}</Text>
    </View>
    );
};


const styles = StyleSheet.create({
  view: {
    // borderColor: lightFerozee,
    borderWidth: 1,
    
  },
});

export default Button;
