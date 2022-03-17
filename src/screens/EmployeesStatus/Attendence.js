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
import Button from '../../components/Button'
import Header from '../../components/Header'
import SmallButton from '../../components/SmallButton'
import { ICONS,COLORS,FONTS,SIZES } from '../../constraints/Index'
import styles from "./EmployeeStatusStyle"

const Attendence = ({ navigation }) => {

  //states
  const [showstartDate, setshowstartDate] = useState(false);
  const [startDate, setstartDate] = useState();

  const [showEndDate, setshowEndDate] = useState(false);
  const [EndDate, setEndDate] = useState();

 console.log()


  return (
    <>
    <StatusBar barStyle="dark-content" backgroundColor={'#f9f9f9'} />
    <SafeAreaView style={styles.SafeAreaView2}>
    <Header props={navigation}  headerName="Attendence" />
      <ScrollView>
        <View>

          <View>
            <Text>Attendence</Text>
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginVertical: 20 }} > 
            <View>
          <TouchableOpacity onPress={()=>{setshowstartDate(!showstartDate)}} >
            <SmallButton buttonName="Start Date" />
          </TouchableOpacity>
            <Text>startDate {startDate} </Text>
            </View>

          <View>
          <TouchableOpacity onPress={()=>{setshowEndDate(!showEndDate)}} >
            <SmallButton buttonName="End Date" />
          </TouchableOpacity>
          <Text>EndDate  {EndDate} </Text>
          </View>
        
         </View>

         
         {showstartDate && (<DateTimePicker
                      testID="dateTimePicker"
                      value={date}
                      is24Hour={true}
                      dateFormat="month day year"
                      display="default"
                      onChange={onChangeStartDate}
          />)}
        
        {showEndDate && (<DateTimePicker
                      testID="dateTimePicker"
                      value={date}
                      is24Hour={true}
                      dateFormat="month day year"
                      display="default"
                      onChange={onChangeEndDate}
          />)}





        </View>
      </ScrollView>
    </SafeAreaView>
  </>
  )
}

const styleUser = StyleSheet.create({
})

export default Attendence
