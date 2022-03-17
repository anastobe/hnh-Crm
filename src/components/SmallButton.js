import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { COLORS } from '../constraints/Theme';


const SmallButton = (
  props
) => {

  return (
    <View style={{ alignItems: 'center', backgroundColor: COLORS.golden, borderRadius: 10 ,height: 50 }} >
          <Text style={{ lineHeight: 50, fontWeight: 'bold', fontSize: 20, color: COLORS.darkblue, }} >   {props.buttonName}   </Text>
    </View>
    );
};


export default SmallButton;
