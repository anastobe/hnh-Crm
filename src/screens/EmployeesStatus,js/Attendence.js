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

import DateTimePicker from '@react-native-community/datetimepicker';

import Header from '../../components/Header'
import { ICONS,COLORS,FONTS,SIZES } from '../../constraints/Index'
import styles from "./EmployeeStatusStyle"

const Attendence = ({ navigation }) => {

  //calanderWork
  const [date, setDate] = useState(new Date(1598051730000));
  console.log("DobValue==>",date)
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setDate(currentDate);
  };

  return (
    <>
    <StatusBar barStyle="dark-content" backgroundColor={'#f9f9f9'} />
    <SafeAreaView style={styles.SafeAreaView2}>
    <Header props={navigation}  headerName="Attendence" />
      <ScrollView>

        <View>
            <Text>Attendence</Text>


            <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={'date'}
          is24Hour={true}
          display="default"
          onChange={onChange}
        /> 
        </View>

      </ScrollView>
    </SafeAreaView>
  </>
  )
}

const styleUser = StyleSheet.create({
})

export default Attendence
