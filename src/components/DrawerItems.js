import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ICONS,COLORS,FONTS,SIZES,Images } from '../constraints/Index'

const DrawerItems = (
  props,
) => {


  return (
    <View style={{ alignItems: 'center', height: 50, backgroundColor: COLORS.darkblue, marginTop: 2 }} >
      <Text style={{ lineHeight: 50, color: COLORS.white, fontSize: 18 }} >{props.names}</Text>
    </View>
    );
};


const styles = StyleSheet.create({

});

export default DrawerItems;
