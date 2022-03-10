import moment from 'moment'
import React,{useEffect, useState} from 'react'
import {
  SafeAreaView,
  View,
  Text,
  Alert,
  StatusBar,
  TouchableOpacity,
  ActivityIndicator,
  Image
} from 'react-native'

//icons
import CircularProgress from 'react-native-circular-progress-indicator';
import Icon from 'react-native-vector-icons/Ionicons'
import { getApiwithToken } from '../api/fakeApiUser'
import { ICONS,COLORS,FONTS,SIZES,Images } from '../constraints/Index'
import { baseUrl_TimeLine } from '../utils/baseUrl_TimeLine'

const Header = ({
    ...props
    
    }) => {


      const [ShowBottom, setShowBottom] = useState(false)
      const [removeMargin, setremoveMargin] = useState(false)
      const [Data, setData] = useState([]);      
      const [ExpectedTimeOut, setExpectedTimeOut] = useState("")


      useEffect(() => {
        getData()
    }, [])
    const getData = async () => {
        const { data, status } = await getApiwithToken(`${baseUrl_TimeLine}/v1/attendance/get-time`)
        setData(data)
      }


      const getTimeDiff = async (workTime, Totaltime, ExpectedTimeOut ) => {   //withOutBreak = Expected Time Out
        // Totaltime - workTime = Total Break In a Day 
        const Time = moment.duration(moment(Totaltime, "HH:mm:ss A").diff(moment(workTime, "HH:mm:ss A"))) ;
        
        const totalBreakinDay = `${Time.hours()}:${Time.minutes()}:${Time.seconds()}`  //break Calculated
        console.log("total break1 ==>",totalBreakinDay)
        
        const currentTime = moment().format('h:mm:ss')
        // current time - (worktime)  
        var sub =  moment.duration(moment(currentTime, "HH:mm:ss A").diff(moment(workTime, "HH:mm:ss A"))) ;

        const totalBreakPlusLate = `${sub.hours()}:${sub.minutes()}:${sub.seconds()}` //totalBreak Calculated
        console.log("totalBreakPlusLate ==>",totalBreakPlusLate )


        //new ExpectedTime Becomes
        const ExpectedTimeOutValue = moment.duration(ExpectedTimeOut).add(moment.duration(totalBreakPlusLate))
        const ExpectedTimeOutValueInFormat = `${ExpectedTimeOutValue.hours()}:${ExpectedTimeOutValue.minutes()}:${ExpectedTimeOutValue.seconds()}` 
        
        // setExpectedTimeOut(ExpectedTimeOutValueInFormat)
        


      }

      getTimeDiff(Data.workTime, Data.Totaltime, Data.withOutBreak)



    return (

    <View>

      <View style={{ justifyContent: 'space-around', flexDirection: 'row', height: 80, backgroundColor: COLORS.darkblue, alignItems: 'center', borderBottomRightRadius: removeMargin ? 0 : 25 , borderBottomLeftRadius: removeMargin ? 0 : 25 }} >
        <TouchableOpacity onPress={() => props.props.openDrawer()} >
          <Icon name={ICONS.IONICONS.navIcon} size={25} color="#fff" />
        </TouchableOpacity>
        <Text style={{ color: "#fff", fontSize: 20 }} >{props.headerName}</Text> 

        <TouchableOpacity onPress={() =>{ setShowBottom(!ShowBottom), setremoveMargin(!removeMargin) }}>
          <Image style={{ width: 50, height: 50, borderRadius: 50, borderColor: COLORS.golden, borderWidth: 2 }} source={Images.profile} />
        </TouchableOpacity>


      </View>

       {ShowBottom ? 
       
       <View style={{  backgroundColor: COLORS.darkblue, height: 200, }} >

        <View style={{ flexDirection: "row", justifyContent: 'space-around' }} >
        
         <View>
           <Text style={{ color: COLORS.black, padding: 10, borderRadius: 10, margin: 10 ,backgroundColor: COLORS.golden, ...FONTS.h4 }}  >Time In </Text>
         </View>    

         <View>
           <Text style={{ color: COLORS.black, padding: 10, borderRadius: 10, margin: 10 ,backgroundColor: COLORS.golden, ...FONTS.h4 }}  >Time Out</Text>
         </View>    

         <View>
           <Text style={{ color: COLORS.black, padding: 10, borderRadius: 10, margin: 10 ,backgroundColor: COLORS.golden, ...FONTS.h4 }}  >Break In</Text>
         </View>    

         <View>
           <Text style={{ color: COLORS.black, padding: 10, borderRadius: 10, margin: 10 ,backgroundColor: COLORS.golden, ...FONTS.h4 }}  >Break Out</Text>
         </View>    
        
        </View>

       <View style={{ flexDirection: 'row', justifyContent:'space-around' }} >
       
       <View style={{ justifyContent: 'center' }} >
         <Text style={{ color: COLORS.white, ...FONTS.body4 }} >Total Time : {Data.Totaltime} </Text>
         <Text style={{ color: COLORS.white, ...FONTS.body4 }} >work  Time : {Data.workTime} </Text>
         <Text style={{ color: COLORS.white, ...FONTS.body4 }} >Expected Time : no val  </Text>
       </View>

       <View>         
         <CircularProgress value={80} circleBackgroundColor={COLORS.darkblue} activeStrokeWidth={14} textColor={COLORS.golden} activeStrokeColor={COLORS.golden} inActiveStrokeColor={"#fff"} inActiveStrokeWidth={5} subtitle={"Shift%"} subtitleColor={COLORS.white} subtitleFontSize={15} />
       </View>

        </View> 
        
        </View> 
        : 
        
        <></> 
        
        }

    </View>
  )
}

export default Header











// myEnd = Data.Totaltime;
// myStart  = Data.workTime;

// console.log("myEnd==>",myEnd)
// console.log("mmyStartyEnd==>",myStart)


// function getTimeDiff(start, end) {
// const Time = moment.duration(moment(end, "HH:mm:ss A").diff(moment(start, "HH:mm:ss A")));
// return Time
// }

// diff = getTimeDiff(myStart, myEnd)
// const diffTime = `${diff.hours()}:${diff.minutes()}:${diff.seconds()}`
// console.log("difference Time==>",diffTime);
// console.log("expected Time==>",Data.withOutBreak);

// var d = moment.duration(Data.withOutBreak).add(moment.duration(diffTime))
// console.log(moment.utc(d.as('milliseconds')).format("HH:mm:ss")) 



