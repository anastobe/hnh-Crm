import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput,ActivityIndicator } from 'react-native';
import { COLORS } from '../constraints/Theme';


const Loader = () => {

  return (
    <View style={styles.Container} >
        <ActivityIndicator size="large" color={COLORS.black} />
    </View>
    );
};


const styles = StyleSheet.create({
  Container: {
    position: 'absolute', 
    flex: 1, 
    justifyContent: 'center', 
    backgroundColor: 'rgba(0,0,0,0.2)', 
    zIndex: 999, 
    top: 0,
    right: 0, 
    left: 0, 
    bottom: 0, 
    alignItems: 'center' 
  },
});

export default Loader;
