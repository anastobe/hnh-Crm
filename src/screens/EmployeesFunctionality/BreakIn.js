import React, { useState } from 'react'
import {
  SafeAreaView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  StyleSheet,
  ScrollView
} from 'react-native'
import Header from '../../components/Header'

import { ICONS,COLORS,FONTS,SIZES } from '../../constraints/Index'
import styles from "./EmployeeFunctionalityStyle"

const BreakIn = ({ navigation }) => {


  return (
    <>
    <StatusBar barStyle="dark-content" backgroundColor={'#f9f9f9'} />
    <SafeAreaView style={styles.SafeAreaView2}>
    <Header props={navigation}  headerName="Break In" />
      <ScrollView>

        <View>
            <Text>BreakIn</Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  </>
  )
}

const styleUser = StyleSheet.create({
})

export default BreakIn
