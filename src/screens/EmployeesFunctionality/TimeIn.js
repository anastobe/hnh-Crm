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

const TimeIn = ({ navigation }) => {


  return (
    <>
    <StatusBar barStyle="dark-content" backgroundColor={'#f9f9f9'} />
    <SafeAreaView style={styles.SafeAreaView2}>
    <Header props={navigation}  headerName="Time In" />
      <ScrollView>


        <TouchableOpacity onPress={() => navigation.openDrawer()} >
            <Text>You Time In</Text>
            <Text>Your Time Out/ Expected Time Out</Text>
            <Text>Your Total Time</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  </>
  )
}

export default TimeIn
