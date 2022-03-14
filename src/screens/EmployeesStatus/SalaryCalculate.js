import React, { useEffect, useState } from 'react'
import {
  SafeAreaView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  StyleSheet,
  ScrollView
} from 'react-native'
import Button from '../../components/Button'
import Header from '../../components/Header'
import DateTimePicker from '@react-native-community/datetimepicker';
import { ICONS,COLORS,FONTS,SIZES } from '../../constraints/Index'
import styles from "./EmployeeStatusStyle"
import { getApiwithToken } from '../../api/fakeApiUser';
import { baseUrl_TimeLine } from '../../utils/baseUrl_TimeLine';
import TextInputComponent from '../../components/TextInputComponent';

const SalaryCalculate = ({ navigation }) => {

  //states
  const [showstartDate, setshowstartDate] = useState(false);
  const [startDate, setstartDate] = useState();

  const [showEndDate, setshowEndDate] = useState(false);
  const [EndDate, setEndDate] = useState();

  const [Salary, setSalary] = useState();
  const [Day, setDay] = useState(0);
  const [HalfDay, setHalfDay] = useState(0);
  const [shortShift, setshortShift] = useState(0);
  const [Absent, setAbsent] = useState(0);
  const [discrepency, setdiscrepency] = useState(0);
  const [In, setIn] = useState(0);

  console.log("day bahir ===>",Day)
  console.log("HalfDay ===>",HalfDay)
  console.log("shortShift ===>",shortShift)
  console.log("Absent ===>",Absent)
  console.log("discrepency ===>",discrepency)
  console.log("In ===>",In)

  


  //calanderWork
  const [date] = useState(new Date(1598051730000));
  const onChangeStartDate = (event) => {
    const today = event.nativeEvent.timestamp
    var dd = String(today.getDate()).padStart(2, '0')
    var mm = String(today.getMonth() + 1).padStart(2, '0')
    var yyyy = today.getFullYear()
    setstartDate(`${yyyy}-${mm}-${dd}`)
    setshowstartDate(false)
  };

  const onChangeEndDate = (event) => {
    const today = event.nativeEvent.timestamp
    var dd = String(today.getDate()).padStart(2, '0')
    var mm = String(today.getMonth() + 1).padStart(2, '0')
    var yyyy = today.getFullYear()
    setEndDate(`${yyyy}-${mm}-${dd}`)
    setshowEndDate(false)
  };

  const filter = () =>{
    if (startDate && EndDate) {
      getData()
    } else {
      alert("Plx Select Start and End Date")
    }
  }

  
  const getData = async () => {
    const { data, status } = await getApiwithToken(`${baseUrl_TimeLine}/v1/attendance/list/0/${startDate}/${EndDate}`)

    
    let dayCount = 0
    let HalfDayCount = 0
    let shortshiftCount = 0
    let AbsentCount = 0
    let discrepencyCount = 0
    let InCount = 0


    data.AttendanceReport.map((v,i)=> {if (v.totalHour >= '07:50:00' || v.totalHour == undefined ) {
      console.log("present")
      dayCount++;
      setDay(dayCount)
    } else if (v.totalHour >= '06:00:00' && v.totalHour <= '07:49:00' ) {
      HalfDayCount++;
      setHalfDay(HalfDayCount)
    }
    else if (v.totalHour >= '04:00:00' && v.totalHour <= '05:59:00' ) {
      shortshiftCount++;
      setshortShift(shortshiftCount)
    }

    //for Late
    if (v.in !== '00:00:00' || v.in !== '' || v.in !== 'holiday'  ) {
      InCount++;
      console.log("========================================>",v.date)
      setIn(InCount)
    }    
    
    //for Absent
      if (v.type === 'absent') {
      AbsentCount++;
      setAbsent(AbsentCount)
    }

    //discrepency

    if (v.discrepency == '1') {
      discrepencyCount++;
      setdiscrepency(discrepencyCount)
    }


  
  })}

  //calculationAlgorithm

  function calculationAlgorithm() {

  }


  //shift Status 

  function ShiftStatus () {
    return(
    <>
      <View>
      <Text> Shift Status </Text>
     </View>

  <View style={{ flexDirection: 'row', justifyContent: 'space-around', margin: 10 }} >
    
    <View>
     <View style={{ width: 50, height: 50, backgroundColor: COLORS.darkblue, justifyContent: 'center', alignItems: 'center', borderRadius: 50 }} >
     <Text style={{ color: COLORS.white }} >
       {Day}
     </Text>
     </View>
     <View>
       <Text>Full Shift</Text>
     </View>
    </View>

    <View>
     <View style={{ width: 50, height: 50, backgroundColor: COLORS.darkblue, justifyContent: 'center', alignItems: 'center', borderRadius: 50 }} >
     <Text style={{ color: COLORS.white }} >
       {HalfDay}
     </Text>
     </View>
     <View>
       <Text>Half Day</Text>
     </View>
    </View>

    <View>
     <View style={{ width: 50, height: 50, backgroundColor: COLORS.darkblue, justifyContent: 'center', alignItems: 'center', borderRadius: 50 }} >
     <Text style={{ color: COLORS.white }} >
       {shortShift}
     </Text>
     </View>
     <View>
       <Text>Short Shift</Text>
     </View>
    </View>


    </View>
  </>
    )
  }

  return (
    <>
    <StatusBar barStyle="dark-content" backgroundColor={'#f9f9f9'} />
    <SafeAreaView style={styles.SafeAreaView2}>
    <Header props={navigation}  headerName="Salary Calculate" />
      <ScrollView>
        <View style={{ margin: 10 }} >
          <View>
            <Text>SalaryCalculatee</Text>
          </View>
          
          <View> 
          <TouchableOpacity onPress={()=>{setshowstartDate(!showstartDate)}} >
            <Button buttonName="Start Date" />
          </TouchableOpacity>
            <Text>startDate {startDate} </Text>

          <TouchableOpacity onPress={()=>{setshowEndDate(!showEndDate)}} >
            <Button buttonName="End Date" />
          </TouchableOpacity>
          <Text>EndDate  {EndDate} </Text>
        
          <TouchableOpacity onPress={()=>{filter()}} >
            <Button buttonName="Filter" />
          </TouchableOpacity>
        
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

         <View>
           <View style={{ marginTop: 30 }} >
            <Text style={{ fontWeight: 'bold', fontSize: 20 }} > Enter You Salary </Text>
           </View>
           <TextInputComponent
              PlaceHolderHeading="   Enter Salary"
              InputFieldIcons="cash-outline"
              PlaceHolderName="  Enter Your Salary"
              TextChange={setSalary}
              value={Salary}
           />
         </View>
         
         <ShiftStatus />

         <View>
           <TouchableOpacity onPress={()=>{ calculationAlgorithm() }} >
             <Button buttonName="Calculate Salary" />
           </TouchableOpacity>
         </View>

         <View style={{ alignItems: 'center', margin: 20 }} >
           <Text style={{ color: COLORS.darkblue, ...FONTS.h1 }} >10000 Rs</Text>
         </View>

        
        
        </View>
      </ScrollView>
    </SafeAreaView>
  </>
  )
}

const styleUser = StyleSheet.create({
})

export default SalaryCalculate
