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
import SmallButton from '../../components/SmallButton';
import Loader from '../../components/Loader';

const SalaryCalculate = ({ navigation }) => {

  //states
  const [showstartDate, setshowstartDate] = useState(false);
  const [startDate, setstartDate] = useState();

  const [showEndDate, setshowEndDate] = useState(false);
  const [EndDate, setEndDate] = useState();

  const [showSalaryBtn, setshowSalaryBtn] = useState(false);

  //loader
  const [load, setload] = useState(false)

  const [Salary, setSalary] = useState(null);
  const [Day, setDay] = useState(0);
  const [HalfDay, setHalfDay] = useState(0);
  const [shortShift, setshortShift] = useState(0);
  const [Absent, setAbsent] = useState(0);
  const [discrepency, setdiscrepency] = useState(0);
  const [Inn, setInn] = useState(0);

  const [netSalary, setnetSalary] = useState(0);

  console.log("day bahir ===>",Day)
  console.log("HalfDay ===>",HalfDay)
  console.log("shortShift ===>",shortShift)
  console.log("Absent ===>",Absent)
  console.log("discrepency ===>",discrepency)
  console.log("In ===>",Inn)

  


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
      alert("Please Select Date ")
    }
  }

  
  const getData = async () => {
    setload(true)
    const { data, status } = await getApiwithToken(`${baseUrl_TimeLine}/v1/attendance/list/0/${startDate}/${EndDate}`)
    
    let dayCount = 0
    let HalfDayCount = 0
    let shortshiftCount = 0
    let AbsentCount = 0
    let discrepencyCount = 0
    let InnCount = 0


    data.AttendanceReport.map((v,i)=> {
      if (v.totalHour >= '07:50:00' || v.totalHour == undefined ) {
      console.log("present")
      dayCount++;
      setDay(dayCount)
    } else if (v.totalHour >= '06:00:00' && v.totalHour <= '07:49:00' ) { //short shift
      shortshiftCount++;
      setshortShift(shortshiftCount)
    }
    else if (v.totalHour >= '04:00:00' && v.totalHour <= '05:59:00' ) {  //half shift
      HalfDayCount++;
      setHalfDay(HalfDayCount)
    }

    //for Late
     if ( v.late >= '00:31:00 PM' && v.late <= '11:31:00 PM' ) {
       console.log("========================================>",v.date)
      InnCount++;
      setInn(InnCount)
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


  
    setshowSalaryBtn(true)
    setload(false)
  })}

  //calculationAlgorithm

  const [nDay, setnDay] = useState(0);
  const [nHalfDay, setnHalfDay] = useState(0);
  const [nshortShift, setnshortShift] = useState(0);
  const [nAbsent, setnAbsent] = useState(0);
  const [ndiscrepency, setndiscrepency] = useState(0);
  const [nInn, setnInn] = useState(0);

  
  console.log("nDay ===>",nDay)
  console.log("nHalfDay ===>",nHalfDay)
  console.log("nshortShift ===>",nshortShift)
  console.log("nAbsent ===>",nAbsent)
  console.log("ndiscrepency ===>",ndiscrepency)
  console.log("nInn ===>",nInn)

  const calculationAlgorithm = () => {
    //full Day
    setnDay(Day)

    //HalfDay
    setnshortShift(
      (shortShift <= 2) ? '0' 
      : 
      (shortShift == 3) ? '1' 
      : 
      (shortShift >= 4 && shortShift <= 6) ? '2' 
      :
      (shortShift >= 7 && shortShift <= 9) ? '3'
      : 
      (shortShift >= 10 && shortShift <= 12) ? '4' 
      : 
      (shortShift >= 13 && shortShift <= 15) ? '5' 
      :
      (shortShift >= 16 && shortShift <= 18) ? '6'
      : 
      (shortShift >= 19 && shortShift <= 21) ? '7' 
      :
      (shortShift >= 22 && shortShift <= 24) ? '8'
      : 
      (shortShift >= 25 && shortShift <= 27) ? '9' 
      : 
      (shortShift >= 28 && shortShift <= 30) ? '10' 
      : 
      (shortShift >= 31 && shortShift <= 32) ? '11' 
      : 
      0
      )
    
    //shortShift
    setnHalfDay(
      (setnHalfDay < 2) ? '0' 
      : 
      (setnHalfDay == 2) ? '1' 
      : 
      (setnHalfDay >= 3 && setnHalfDay <= 4) ? '2' 
      :
      (setnHalfDay >= 5 && setnHalfDay <= 6) ? '3'
      : 
      (setnHalfDay >= 7 && setnHalfDay <= 8) ? '4' 
      : 
      (setnHalfDay >= 9 && setnHalfDay <= 10) ? '5' 
      :
      (setnHalfDay >= 11 && setnHalfDay <= 12) ? '6'
      : 
      (setnHalfDay >= 13 && setnHalfDay <= 14) ? '7' 
      :
      (setnHalfDay >= 15 && setnHalfDay <= 16) ? '8'
      : 
      (setnHalfDay >= 17 && setnHalfDay <= 18) ? '9' 
      : 
      (setnHalfDay >= 19 && setnHalfDay <= 20) ? '10' 
      : 
      (setnHalfDay >= 21 && setnHalfDay <= 22) ? '11' 
      : 
      (setnHalfDay >= 23 && setnHalfDay <= 24) ? '12' 
      :
      (setnHalfDay >= 25 && setnHalfDay <= 26) ? '13'
      : 
      (setnHalfDay >= 27 && setnHalfDay <= 28) ? '14' 
      :
      (setnHalfDay >= 29 && setnHalfDay <= 30) ? '15'
      : 
      (setnHalfDay >= 31  && setnHalfDay <= 32) ? '16' 
      :
      0
      )

    setnAbsent(
      (Absent == 1) ? '1' 
      : 
      (Absent == 2) ? '2' 
      :
      (Absent == 3) ? '3'
      :
      (Absent == 4) ? '4' 
      :
      (Absent == 5) ? '5'
      :
      (Absent == 6) ? '6' 
      : 
      (Absent == 7) ? '7' 
      :
      (Absent == 8) ? '8'
      :
      (Absent == 9) ? '9' 
      :
      (Absent == 10) ? '10'
      :
      (Absent == 11) ? '11' 
      : 
      (Absent == 12) ? '12' 
      :
      (Absent == 13) ? '13'
      :
      (Absent == 14) ? '14' 
      :
      (Absent == 15) ? '15'
      :
      (Absent == 16) ? '16' 
      : 
      (Absent == 17) ? '17' 
      :
      (Absent == 18) ? '18'
      :
      (Absent == 19) ? '19' 
      :
      (Absent == 20) ? '20'
      :
      (Absent == 21) ? '21' 
      : 
      (Absent == 22) ? '22' 
      :
      (Absent == 23) ? '23'
      :
      (Absent == 24) ? '24' 
      :
      (Absent == 25) ? '25'
      :
      (Absent == 26) ? '26' 
      : 
      (Absent == 27) ? '27' 
      :
      (Absent == 28) ? '28'
      :
      (Absent == 29) ? '29' 
      :
      (Absent == 30) ? '30'
      :
      0
      )


    setndiscrepency(
      (discrepency < 3) ? '0' 
      : 
      (discrepency == 3) ? '1' 
      : 
      (discrepency >= 4 && discrepency <= 6) ? '2' 
      :
      (discrepency >= 7 && discrepency <= 9) ? '3'
      : 
      (discrepency >= 10 && discrepency <= 12) ? '4' 
      : 
      (discrepency >= 13 && discrepency <= 15) ? '5' 
      : 
      (discrepency >= 16 && discrepency <= 18) ? '6' 
      :
      (discrepency >= 19 && discrepency <= 21) ? '7'
      : 
      (discrepency >= 22 && discrepency <= 24) ? '7'
      : 
      (discrepency >= 25 && discrepency <= 27) ? '8' 
      : 
      (discrepency >= 28 && discrepency <= 30) ? '9' 
      : 
      0
      
      )
    setnInn(
      (Inn < 3) ? '0' 
      : 
      (Inn == 3) ? '1' 
      : 
      (Inn >= 4 && Inn <= 6) ? '2'
      : 
      (Inn >= 7 && Inn <= 9) ? '3'
      : 
      (Inn >= 10 && Inn <= 12) ? '4' 
      : 
      (Inn >= 13 && Inn <= 15) ? '5' 
      : 
      (Inn >= 16 && Inn <= 18) ? '6' 
      :
      (Inn >= 19 && Inn <= 21) ? '7'
      : 
      (Inn >= 22 && Inn <= 24) ? '8'
      : 
      (Inn >= 25 && Inn <= 27) ? '9' 
      : 
      (Inn >= 28 && Inn <= 30) ? '10' 
      : 
      (Inn >= 31 && Inn <= 32) ? '11' 
      : 
      0
      )

        SalaryValue()

  }

  const SalaryValue = () =>{

      let Total = parseInt(nHalfDay) + parseInt(nshortShift) + parseInt(nAbsent) + parseInt(ndiscrepency) + parseInt(nInn);
      let SingleDay = (parseInt(Salary)/30);
      let SubtractedSalary = parseInt(SingleDay) * parseInt(Total);
      let netSalary = parseInt(Salary) - parseInt(SubtractedSalary); 
      setnetSalary(netSalary.toFixed())
      console.log("=================================>",Total)
      console.log("=================================>",SingleDay)
      console.log("=================================>",netSalary)
      
  }


  //shift Status 

  function ShiftStatus () {
    return(
    <>
      <View>
      <Text style={{ ...FONTS.h3, margin: 10 }} > Shift Status </Text>
     </View>

  <View style={{ flexDirection: 'row', justifyContent: 'space-around', margin: 10 }} >
    
    <View style={{ width: 90, alignItems: 'center' }} >
     <View style={{ width: 50, height: 50, backgroundColor: COLORS.golden, justifyContent: 'center', alignItems: 'center', borderRadius: 50 }} >
     <Text style={{ color: COLORS.darkblue }} >
       {Day}
     </Text>
     </View>
     <View>
       <Text>Full Shift</Text>
     </View>
    </View>

    <View style={{ width: 90, alignItems: 'center' }} >
     <View style={{ width: 50, height: 50, backgroundColor: COLORS.golden, justifyContent: 'center', alignItems: 'center', borderRadius: 50 }} >
     <Text style={{ color: COLORS.darkblue }} >
       {HalfDay}
     </Text>
     </View>
     <View>
       <Text>Half Day</Text>
     </View>
    </View>

    <View style={{ width: 90, alignItems: 'center' }} >
     <View style={{ width: 50, height: 50, backgroundColor: COLORS.golden, justifyContent: 'center', alignItems: 'center', borderRadius: 50 }} >
     <Text style={{ color: COLORS.darkblue }} >
       {shortShift}
     </Text>
     </View>
     <View>
       <Text>Short Shift</Text>
     </View>
    </View>
    


    </View>

    <View style={{ flexDirection: 'row', justifyContent: 'space-around', margin: 10 }} >
    
    <View style={{ width: 90, alignItems: 'center' }} >
     <View style={{ width: 50, height: 50, backgroundColor: COLORS.golden, justifyContent: 'center', alignItems: 'center', borderRadius: 50 }} >
     <Text style={{ color: COLORS.darkblue }} >
       {discrepency}
     </Text>
     </View>
     <View>
       <Text>Discrepency</Text>
     </View>
    </View>

    <View style={{ width: 90, alignItems: 'center' }} >
     <View style={{ width: 50, height: 50, backgroundColor: COLORS.golden, justifyContent: 'center', alignItems: 'center', borderRadius: 50 }} >
     <Text style={{ color: COLORS.darkblue }} >
       {Absent}
     </Text>
     </View>
     <View>
       <Text>Absent</Text>
     </View>
    </View>

    
    <View style={{ width: 90, alignItems: 'center' }} >
     <View style={{ width: 50, height: 50, backgroundColor: COLORS.golden, justifyContent: 'center', alignItems: 'center', borderRadius: 50 }} >
     <Text style={{ color: COLORS.darkblue }} >
       {Inn}
     </Text>
     </View>
     <View>
       <Text>Lates</Text>
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
    {load &&  <Loader /> }
      <ScrollView>
        <View style={{ margin: 10 }} >
          
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

         <View style={{ alignItems: 'center', marginVertical: 20 }} >
           <TouchableOpacity onPress={()=>{ filter() }} >
             <SmallButton buttonName="Calculate Report" />
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


         
         <ShiftStatus />



         {showSalaryBtn ?
         <>
         <View>
         <TextInputComponent
            PlaceHolderHeading="   Enter Salary"
            InputFieldIcons="cash-outline"
            PlaceHolderName="  Enter Your Salary"
            TextChange={setSalary}
            value={Salary}
         />
       </View>

         <View style={{ alignItems: 'center', margin: 20 }} >
            <TouchableOpacity onPress={()=>{calculationAlgorithm()}} >
              <SmallButton buttonName="Show Salary" />
            </TouchableOpacity>
            <Text style={{ color: COLORS.darkblue, ...FONTS.h1, margin: 10 }} >{netSalary} Rs</Text>
         </View> 
         
         </>
         : <></> }

        
        
        </View>
      </ScrollView>
    </SafeAreaView>
  </>
  )
}

const styleUser = StyleSheet.create({
})

export default SalaryCalculate















































// import React, { useEffect, useState } from 'react'
// import {
//   SafeAreaView,
//   View,
//   Text,
//   StatusBar,
//   TouchableOpacity,
//   StyleSheet,
//   ScrollView
// } from 'react-native'
// import Button from '../../components/Button'
// import Header from '../../components/Header'
// import DateTimePicker from '@react-native-community/datetimepicker';
// import { ICONS,COLORS,FONTS,SIZES } from '../../constraints/Index'
// import styles from "./EmployeeStatusStyle"
// import { getApiwithToken } from '../../api/fakeApiUser';
// import { baseUrl_TimeLine } from '../../utils/baseUrl_TimeLine';
// import TextInputComponent from '../../components/TextInputComponent';
// import SmallButton from '../../components/SmallButton';
// import Loader from '../../components/Loader';

// const SalaryCalculate = ({ navigation }) => {

//   //states
//   const [showstartDate, setshowstartDate] = useState(false);
//   const [startDate, setstartDate] = useState();

//   const [showEndDate, setshowEndDate] = useState(false);
//   const [EndDate, setEndDate] = useState();

//   //loader
//   const [load, setload] = useState(false)

//   const [Salary, setSalary] = useState();
//   const [Day, setDay] = useState(0);
//   const [HalfDay, setHalfDay] = useState(0);
//   const [shortShift, setshortShift] = useState(0);
//   const [Absent, setAbsent] = useState(0);
//   const [discrepency, setdiscrepency] = useState(0);
//   const [Inn, setInn] = useState(0);

//   const [netSalary, setnetSalary] = useState(0);

//   console.log("day bahir ===>",Day)
//   console.log("HalfDay ===>",HalfDay)
//   console.log("shortShift ===>",shortShift)
//   console.log("Absent ===>",Absent)
//   console.log("discrepency ===>",discrepency)
//   console.log("In ===>",Inn)

  


//   //calanderWork
//   const [date] = useState(new Date(1598051730000));
//   const onChangeStartDate = (event) => {
//     const today = event.nativeEvent.timestamp
//     var dd = String(today.getDate()).padStart(2, '0')
//     var mm = String(today.getMonth() + 1).padStart(2, '0')
//     var yyyy = today.getFullYear()
//     setstartDate(`${yyyy}-${mm}-${dd}`)
//     setshowstartDate(false)
//   };

//   const onChangeEndDate = (event) => {
//     const today = event.nativeEvent.timestamp
//     var dd = String(today.getDate()).padStart(2, '0')
//     var mm = String(today.getMonth() + 1).padStart(2, '0')
//     var yyyy = today.getFullYear()
//     setEndDate(`${yyyy}-${mm}-${dd}`)
//     setshowEndDate(false)
//   };

//   const filter = () =>{
//     if (startDate && EndDate && Salary) {
//       getData()
//     } else {
//       alert("Please Select Date and Enter Salary")
//     }
//   }

  
//   const getData = async () => {
//     setload(true)
//     const { data, status } = await getApiwithToken(`${baseUrl_TimeLine}/v1/attendance/list/0/${startDate}/${EndDate}`)
    
//     let dayCount = 0
//     let HalfDayCount = 0
//     let shortshiftCount = 0
//     let AbsentCount = 0
//     let discrepencyCount = 0
//     let InnCount = 0


//     data.AttendanceReport.map((v,i)=> {
//       if (v.totalHour >= '07:50:00' || v.totalHour == undefined ) {
//       console.log("present")
//       dayCount++;
//       setDay(dayCount)
//     } else if (v.totalHour >= '06:00:00' && v.totalHour <= '07:49:00' ) {
//       HalfDayCount++;
//       setHalfDay(HalfDayCount)
//     }
//     else if (v.totalHour >= '04:00:00' && v.totalHour <= '05:59:00' ) {
//       shortshiftCount++;
//       setshortShift(shortshiftCount)
//     }

//     //for Late
//      if ( v.late >= '00:31:00 PM' && v.late <= '11:31:00 PM' ) {
//        console.log("========================================>",v.date)
//       InnCount++;
//       setInn(InnCount)
//     }    
    
//     //for Absent
//       if (v.type === 'absent') {
//       AbsentCount++;
//       setAbsent(AbsentCount)
//     }

//     //discrepency

//     if (v.discrepency == '1') {
//       discrepencyCount++;
//       setdiscrepency(discrepencyCount)
//     }


  
//     setload(false)
//   })}

//   //calculationAlgorithm

//   const [nDay, setnDay] = useState(0);
//   const [nHalfDay, setnHalfDay] = useState(0);
//   const [nshortShift, setnshortShift] = useState(0);
//   const [nAbsent, setnAbsent] = useState(0);
//   const [ndiscrepency, setndiscrepency] = useState(0);
//   const [nInn, setnInn] = useState(0);

  
//   console.log("nDay ===>",nDay)
//   console.log("nHalfDay ===>",nHalfDay)
//   console.log("nshortShift ===>",nshortShift)
//   console.log("nAbsent ===>",nAbsent)
//   console.log("ndiscrepency ===>",ndiscrepency)
//   console.log("nInn ===>",nInn)

//   const calculationAlgorithm = () => {
//     //full Day
//     setnDay(Day)

//     //HalfDay
//     setnHalfDay(
//       (HalfDay <= 2) ? '0' 
//       : 
//       (HalfDay == 3) ? '1' 
//       : 
//       (HalfDay >= 4 && HalfDay <= 6) ? '2' 
//       :
//       (HalfDay >= 7 && HalfDay <= 9) ? '3'
//       : 
//       (HalfDay >= 10 && HalfDay <= 12) ? '4' 
//       : 
//       (HalfDay >= 13 && HalfDay <= 15) ? '5' 
//       :
//       (HalfDay >= 16 && HalfDay <= 18) ? '6'
//       : 
//       (HalfDay >= 19 && HalfDay <= 21) ? '7' 
//       :
//       (HalfDay >= 22 && HalfDay <= 24) ? '8'
//       : 
//       (HalfDay >= 25 && HalfDay <= 27) ? '9' 
//       : 
//       (HalfDay >= 28 && HalfDay <= 30) ? '10' 
//       : 
//       0
//       )
    
//     //shortShift
//     setnshortShift(
//       (shortShift < 2) ? '0' 
//       : 
//       (shortShift == 2) ? '1' 
//       : 
//       (shortShift >= 3 && shortShift <= 4) ? '2' 
//       :
//       (shortShift >= 5 && shortShift <= 6) ? '3'
//       : 
//       (shortShift >= 7 && shortShift <= 8) ? '4' 
//       : 
//       (shortShift >= 9 && shortShift <= 10) ? '5' 
//       :
//       (shortShift >= 11 && shortShift <= 12) ? '6'
//       : 
//       (shortShift >= 13 && shortShift <= 14) ? '7' 
//       :
//       (shortShift >= 15 && shortShift <= 16) ? '8'
//       : 
//       (shortShift >= 17 && shortShift <= 18) ? '9' 
//       : 
//       (shortShift >= 19 && shortShift <= 20) ? '10' 
//       : 
//       (shortShift >= 21 && shortShift <= 22) ? '11' 
//       : 
//       (shortShift >= 23 && shortShift <= 24) ? '12' 
//       :
//       (shortShift >= 25 && shortShift <= 26) ? '13'
//       : 
//       (shortShift >= 27 && shortShift <= 28) ? '14' 
//       :
//       (shortShift >= 29 && shortShift <= 30) ? '15'
//       : 
//       (shortShift >= 31  && shortShift <= 32) ? '16' 
//       :
//       0
//       )

//     setnAbsent(
//       (Absent == 1) ? '1' 
//       : 
//       (Absent == 2) ? '2' 
//       :
//       (Absent == 3) ? '3'
//       :
//       (Absent == 4) ? '4' 
//       :
//       (Absent == 5) ? '5'
//       :
//       (Absent == 6) ? '6' 
//       : 
//       (Absent == 7) ? '7' 
//       :
//       (Absent == 8) ? '8'
//       :
//       (Absent == 9) ? '9' 
//       :
//       (Absent == 10) ? '10'
//       :
//       (Absent == 11) ? '11' 
//       : 
//       (Absent == 12) ? '12' 
//       :
//       (Absent == 13) ? '13'
//       :
//       (Absent == 14) ? '14' 
//       :
//       (Absent == 15) ? '15'
//       :
//       (Absent == 16) ? '16' 
//       : 
//       (Absent == 17) ? '17' 
//       :
//       (Absent == 18) ? '18'
//       :
//       (Absent == 19) ? '19' 
//       :
//       (Absent == 20) ? '20'
//       :
//       (Absent == 21) ? '21' 
//       : 
//       (Absent == 22) ? '22' 
//       :
//       (Absent == 23) ? '23'
//       :
//       (Absent == 24) ? '24' 
//       :
//       (Absent == 25) ? '25'
//       :
//       (Absent == 26) ? '26' 
//       : 
//       (Absent == 27) ? '27' 
//       :
//       (Absent == 28) ? '28'
//       :
//       (Absent == 29) ? '29' 
//       :
//       (Absent == 30) ? '30'
//       :
//       0
//       )


//     setndiscrepency(
//       (discrepency < 3) ? '0' 
//       : 
//       (discrepency == 3) ? '1' 
//       : 
//       (discrepency >= 4 && discrepency <= 6) ? '2' 
//       :
//       (discrepency >= 7 && discrepency <= 9) ? '3'
//       : 
//       (discrepency >= 10 && discrepency <= 12) ? '4' 
//       : 
//       (discrepency >= 13 && discrepency <= 15) ? '5' 
//       : 
//       (discrepency >= 16 && discrepency <= 18) ? '6' 
//       :
//       (discrepency >= 19 && discrepency <= 21) ? '7'
//       : 
//       (discrepency >= 22 && discrepency <= 24) ? '7'
//       : 
//       (discrepency >= 25 && discrepency <= 27) ? '8' 
//       : 
//       (discrepency >= 28 && discrepency <= 30) ? '9' 
//       : 
//       0
      
//       )
//     setnInn(
//       (Inn < 3) ? '0' 
//       : 
//       (Inn == 3) ? '1' 
//       : 
//       (Inn >= 4 && Inn <= 6) ? '2'
//       : 
//       (Inn >= 7 && Inn <= 9) ? '3'
//       : 
//       (Inn >= 10 && Inn <= 12) ? '4' 
//       : 
//       (Inn >= 13 && Inn <= 15) ? '5' 
//       : 
//       (Inn >= 16 && Inn <= 18) ? '6' 
//       :
//       (Inn >= 19 && Inn <= 21) ? '7'
//       : 
//       (Inn >= 22 && Inn <= 24) ? '8'
//       : 
//       (Inn >= 25 && Inn <= 27) ? '9' 
//       : 
//       (Inn >= 28 && Inn <= 30) ? '10' 
//       : 
//       (Inn >= 31 && Inn <= 32) ? '11' 
//       : 
//       0
//       )
//   }

//   const SalaryValue = () =>{
//     let Total = parseInt(nHalfDay) + parseInt(nshortShift) + parseInt(nAbsent) + parseInt(ndiscrepency) + parseInt(nInn);
//     let SingleDay = (parseInt(Salary)/30);
//     let SubtractedSalary = SingleDay * Total;
//     let netSalary = Salary - SubtractedSalary; 
//     setnetSalary(netSalary.toFixed())
//     console.log("=================================>",Total)
//     console.log("=================================>",SingleDay)
//     console.log("=================================>",netSalary)
//   }


//   //shift Status 

//   function ShiftStatus () {
//     return(
//     <>
//       <View>
//       <Text style={{ ...FONTS.h3, margin: 10 }} > Shift Status </Text>
//      </View>

//   <View style={{ flexDirection: 'row', justifyContent: 'space-around', margin: 10 }} >
    
//     <View style={{ width: 90, alignItems: 'center' }} >
//      <View style={{ width: 50, height: 50, backgroundColor: COLORS.golden, justifyContent: 'center', alignItems: 'center', borderRadius: 50 }} >
//      <Text style={{ color: COLORS.darkblue }} >
//        {Day}
//      </Text>
//      </View>
//      <View>
//        <Text>Full Shift</Text>
//      </View>
//     </View>

//     <View style={{ width: 90, alignItems: 'center' }} >
//      <View style={{ width: 50, height: 50, backgroundColor: COLORS.golden, justifyContent: 'center', alignItems: 'center', borderRadius: 50 }} >
//      <Text style={{ color: COLORS.darkblue }} >
//        {HalfDay}
//      </Text>
//      </View>
//      <View>
//        <Text>Half Day</Text>
//      </View>
//     </View>

//     <View style={{ width: 90, alignItems: 'center' }} >
//      <View style={{ width: 50, height: 50, backgroundColor: COLORS.golden, justifyContent: 'center', alignItems: 'center', borderRadius: 50 }} >
//      <Text style={{ color: COLORS.darkblue }} >
//        {shortShift}
//      </Text>
//      </View>
//      <View>
//        <Text>Short Shift</Text>
//      </View>
//     </View>
    


//     </View>

//     <View style={{ flexDirection: 'row', justifyContent: 'space-around', margin: 10 }} >
    
//     <View style={{ width: 90, alignItems: 'center' }} >
//      <View style={{ width: 50, height: 50, backgroundColor: COLORS.golden, justifyContent: 'center', alignItems: 'center', borderRadius: 50 }} >
//      <Text style={{ color: COLORS.darkblue }} >
//        {discrepency}
//      </Text>
//      </View>
//      <View>
//        <Text>Discrepency</Text>
//      </View>
//     </View>

//     <View style={{ width: 90, alignItems: 'center' }} >
//      <View style={{ width: 50, height: 50, backgroundColor: COLORS.golden, justifyContent: 'center', alignItems: 'center', borderRadius: 50 }} >
//      <Text style={{ color: COLORS.darkblue }} >
//        {Absent}
//      </Text>
//      </View>
//      <View>
//        <Text>Absent</Text>
//      </View>
//     </View>

    
//     <View style={{ width: 90, alignItems: 'center' }} >
//      <View style={{ width: 50, height: 50, backgroundColor: COLORS.golden, justifyContent: 'center', alignItems: 'center', borderRadius: 50 }} >
//      <Text style={{ color: COLORS.darkblue }} >
//        {Inn}
//      </Text>
//      </View>
//      <View>
//        <Text>Lates</Text>
//      </View>
//     </View>



//     </View>
//   </>
//     )
//   }

//   return (
//     <>
//     <StatusBar barStyle="dark-content" backgroundColor={'#f9f9f9'} />
//     <SafeAreaView style={styles.SafeAreaView2}>
//     <Header props={navigation}  headerName="Salary Calculate" />
//     {load &&  <Loader /> }
//       <ScrollView>
//         <View style={{ margin: 10 }} >
          
//           <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginVertical: 20 }} > 
//             <View>
//           <TouchableOpacity onPress={()=>{setshowstartDate(!showstartDate)}} >
//             <SmallButton buttonName="Start Date" />
//           </TouchableOpacity>
//             <Text>startDate {startDate} </Text>
//             </View>

//           <View>
//           <TouchableOpacity onPress={()=>{setshowEndDate(!showEndDate)}} >
//             <SmallButton buttonName="End Date" />
//           </TouchableOpacity>
//           <Text>EndDate  {EndDate} </Text>
//           </View>
        
//          </View>

//          <View>
//            <TextInputComponent
//               PlaceHolderHeading="   Enter Salary"
//               InputFieldIcons="cash-outline"
//               PlaceHolderName="  Enter Your Salary"
//               TextChange={setSalary}
//               value={Salary}
//            />
//          </View>

//          <View style={{ alignItems: 'center', marginVertical: 20 }} >
//            <TouchableOpacity onPress={()=>{ calculationAlgorithm(),filter() }} >
//              <SmallButton buttonName="Calculate Report" />
//            </TouchableOpacity>
//          </View>


//          {showstartDate && (<DateTimePicker
//                       testID="dateTimePicker"
//                       value={date}
//                       is24Hour={true}
//                       dateFormat="month day year"
//                       display="default"
//                       onChange={onChangeStartDate}
//           />)}
        
//         {showEndDate && (<DateTimePicker
//                       testID="dateTimePicker"
//                       value={date}
//                       is24Hour={true}
//                       dateFormat="month day year"
//                       display="default"
//                       onChange={onChangeEndDate}
//           />)}


         
//          <ShiftStatus />



//          <View style={{ alignItems: 'center', margin: 20 }} >
//             <TouchableOpacity onPress={()=>{SalaryValue()}} >
//               <SmallButton buttonName="Show Salary" />
//             </TouchableOpacity>
//             <Text style={{ color: COLORS.darkblue, ...FONTS.h1, margin: 10 }} >{netSalary} Rs</Text>
//          </View>

        
        
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   </>
//   )
// }

// const styleUser = StyleSheet.create({
// })

// export default SalaryCalculate
