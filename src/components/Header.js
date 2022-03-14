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
import { getApiwithToken, PostApiWithToken } from '../api/fakeApiUser'
import { ICONS,COLORS,FONTS,SIZES,Images } from '../constraints/Index'
import { baseUrl_TimeLine } from '../utils/baseUrl_TimeLine'

import { useDispatch, useSelector } from 'react-redux'
import { closeModal, openModal } from '../stores/actions/user.action'


const Header = ({
  ...props
  
}) => {
  
  
  const [ShowBottom, setShowBottom] = useState(false)
  const [removeMargin, setremoveMargin] = useState(false)
  const [Data, setData] = useState([]);      
  const [ExpectedTimeOut, setExpectedTimeOut] = useState("")
  const [StatusBarValue, setStatusBarValue] = useState("")
  const dispatch = useDispatch()
  
      useEffect(() => {
        getData()
    }, [])
    
    const getData = async () => {
        const { data, status } = await getApiwithToken(`${baseUrl_TimeLine}/v1/attendance/get-time`)
        setData(data)
        getTimeDiff(data.workTime,data.Totaltime,data.withOutBreak)
        progressBarValue(data.workTime)
      }

//Expected Time Out Calculation
      const getTimeDiff = (workTime, Totaltime , ExpectedTimeOut) => {   //withOutBreak = Expected Time Out
        // Totaltime - workTime = Total Break In a Day 
        const Time = moment.duration(moment(Totaltime, "HH:mm:ss A").diff(moment(workTime, "HH:mm:ss A"))) ;
        
        const totalBreakinDay = `${Time.hours()}:${Time.minutes()}:${Time.seconds()}`  //break Calculated
        
        const currentTime = moment().format('h:mm:ss')
        // current time - (worktime)  
        var sub =  moment.duration(moment(currentTime, "HH:mm:ss A").diff(moment(workTime, "HH:mm:ss A"))) ;

        const totalBreakPlusLate = `${sub.hours()}:${sub.minutes()}:${sub.seconds()}` //totalBreak Calculated
        
        //new ExpectedTime Becomes
        const ExpectedTimeOutValue = moment.duration(ExpectedTimeOut).add(moment.duration(totalBreakPlusLate))
        const ExpectedTimeOutValueInFormat = `${ExpectedTimeOutValue.hours()}:${ExpectedTimeOutValue.minutes()}:${ExpectedTimeOutValue.seconds()}` 
        
        setExpectedTimeOut(ExpectedTimeOutValueInFormat)
        
      }

//statusBar

const progressBarValue = (workTime) =>{
  
  var format = 'hh:mm:ss'
  // var time = moment() gives you current time. no format required.
  var time = moment(workTime,format)
  
  if (time.isBetween(moment('00:00:01', format), moment('00:30:0', format))) {
    setStatusBarValue('6')
  } 
  else if(time.isBetween(moment('00:30:01', format), moment('01:00:0', format))) {
    setStatusBarValue('12')
  }
  else if(time.isBetween(moment('01:00:01', format), moment('01:30:00', format))) {
    setStatusBarValue('18')
  }
  else if(time.isBetween(moment('01:30:01', format), moment('02:00:00', format))) {
    setStatusBarValue('24')
  }
  else if(time.isBetween(moment('02:00:01', format), moment('02:30:00', format))) {
    setStatusBarValue('30')
  }
  else if(time.isBetween(moment('02:30:01', format), moment('03:00:00', format))) {
    setStatusBarValue('36')
  }
  else if(time.isBetween(moment('03:00:01', format), moment('03:30:00', format))) {
    setStatusBarValue('42')
  }
  else if(time.isBetween(moment('03:30:01', format), moment('04:00:00', format))) {
    setStatusBarValue('50')
  }
  else if(time.isBetween(moment('04:00:01', format), moment('04:30:00', format))) {
    setStatusBarValue('56')
  }
  else if(time.isBetween(moment('04:30:01', format), moment('05:00:00', format))) {
    setStatusBarValue('62')
  }
  else if(time.isBetween(moment('05:00:01', format), moment('05:30:00', format))) {
    setStatusBarValue('68')
  }
  else if(time.isBetween(moment('05:30:01', format), moment('06:00:00', format))) {
    setStatusBarValue('74')
  }
  else if(time.isBetween(moment('06:00:01', format), moment('06:30:00', format))) {
    setStatusBarValue('80')
  }
  else if(time.isBetween(moment('06:30:01', format), moment('07:00:00', format))) {
    setStatusBarValue('86')
  }
  else if(time.isBetween(moment('07:00:01', format), moment('07:30:00', format))) {
    setStatusBarValue('92')
  }
  else if(time.isBetween(moment('07:30:01', format), moment('08:00:00', format))) {
    setStatusBarValue('100')
  }
  
}


//timeIn
const timeIn = async () => {
  // const { data, status }
  const { data, status }= await PostApiWithToken(`${baseUrl_TimeLine}/v1/attendance/time/in`,
  ""   //becouse No Body Data There
  ,{
    headers: {
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxOTUsInByaW1hcnlfaWQiOjE5NSwibmFtZSI6IkFuYXMgQWhtZWQiLCJpbWFnZV91cmwiOiJodHRwczovL2RyaXZlLmdvb2dsZS5jb20vdWM_ZXhwb3J0PXZpZXcmaWQ9MVc4VDN2Qm9jVk9PM3FQSFNYQlpUaFRTTUJ5Z0JGemZ6IiwidHlwZSI6ImVtcGxveWVlIiwiZ2VuZGVyIjoiMCIsInN0YXR1c19pZCI6MSwic2Vjb25kYXJ5X251bWJlciI6IjAzMzMzNzQxODgxIiwicHJpbWFyeV9udW1iZXIiOiIwMzMyMjczMTY2MyIsInVzZXJzdGF0dXMiOnsibmFtZSI6IkFjdGl2ZSIsIm1lc3NhZ2UiOiJXZWxjb21lIFRvIENybSJ9LCJyZW1vdGVXb3JrIjoiMCIsImlwIjpbeyJpZCI6MSwiaXAiOiI1OS4xMDMuMTM4LjEzNSJ9LHsiaWQiOjcsImlwIjoiNTkxIC4gMDMxIC4gMzgxIC4gMzUifSx7ImlkIjo4LCJpcCI6Ijo6ZmZmZjoxMTUuMTg2LjQuMTU4In0seyJpZCI6OSwiaXAiOiIxMTUgLiAxODYgLiA0MTUgLiA4In0seyJpZCI6MTAsImlwIjoiOjpmZmZmOjU5LjEwMy4xMzguNDgifSx7ImlkIjoxMSwiaXAiOiI3ODYuNzg1LjI1NS4xMzMifSx7ImlkIjoxMiwiaXAiOiI4OC45OS41NTUuNjY2In0seyJpZCI6MTQsImlwIjoiOjpmZmZmOjU5LjEwMy4xMzguNDgifSx7ImlkIjoxNSwiaXAiOiJzNDU0MzU0MzU0In0seyJpZCI6MTYsImlwIjoiMzI0IC4gMzI1IC4gMzI1IC4gMzI1In0seyJpZCI6MTcsImlwIjoiMTkzLjE3Ni44NC4xNTcifSx7ImlkIjoxOCwiaXAiOiI6OmZmZmY6MjAyLjQ3LjQ0LjUxIn0seyJpZCI6MTksImlwIjoiMjAyLjQ3LjQ0LjUxIn0seyJpZCI6MjAsImlwIjoiMTEzLjIwMy4yMDUuMTM3In0seyJpZCI6MjEsImlwIjoiOjpmZmZmOjExMy4yMDMuMjA1LjEzNyJ9LHsiaWQiOjIyLCJpcCI6IjExMy4yMDMuMjA1LjEzNyJ9LHsiaWQiOjIzLCJpcCI6Ijo6ZmZmZjoxMTMuMjAzLjIwNS4xMzcifV0sInNoaWZ0TmFtZSI6Ik5ldyBhZnRlcm5vb24gU2hpZnQiLCJzaGlmdFN0YXJ0IjoiMTI6MDA6UE0iLCJzaGlmdEVuZCI6IjA4OjUwOlBNIiwic2hpZnRIb3VycyI6IjA4OjUwOjAwIiwic2hpZnRCcmVhayI6IjAxOjAwOjAwIiwic2hpZnRXb3JraW5nSG91cnMiOiIwNzo1MDowMCIsImVtcGxveWVlX3R5cGUiOiJtZW1iZXIiLCJzZWNvbmRhcnlfaWQiOjYxMCwiYnJlYWsiOiJmYWxzZSIsIk9mZmljaWFsYnJlYWsiOiJmYWxzZSJ9LCJpYXQiOjE2NDY2NDI5MTAsImV4cCI6MTY1MDA1NTcxMH0.whUlkp2ZsN9HYXr5WKEtt_qhi_DSwZq-b7gdLtE_KpE'
    }
})
  if (status === "success") {
    alert(data.message)
  } else {
    alert("Not SuccessFully Login")
  }

}



const BreakIn = async () => {

  
  dispatch(openModal({
    show: true,
    title: "BreakIn",
    confirmButtonAction: () => {
      dispatch(closeModal())
    },
    successIcon: true
  }))
};


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
           <TouchableOpacity onPress={()=>{timeIn()}} >
             <Text style={{ color: COLORS.black, padding: 10, borderRadius: 10, margin: 10 ,backgroundColor: COLORS.golden, ...FONTS.h4 }}  >Time In </Text>
           </TouchableOpacity>
         </View>    

         <View>
           <Text style={{ color: COLORS.black, padding: 10, borderRadius: 10, margin: 10 ,backgroundColor: COLORS.golden, ...FONTS.h4 }}  >Time Out</Text>
         </View>    

         <View>
           <TouchableOpacity onPress={()=>{  BreakIn() }} >
            <Text style={{ color: COLORS.black, padding: 10, borderRadius: 10, margin: 10 ,backgroundColor: COLORS.golden, ...FONTS.h4 }}  >Break In</Text>
           </TouchableOpacity>
         </View>    

         <View>
           <Text style={{ color: COLORS.black, padding: 10, borderRadius: 10, margin: 10 ,backgroundColor: COLORS.golden, ...FONTS.h4 }}  >Break Out</Text>
         </View>    
        
        </View>

       <View style={{ flexDirection: 'row', justifyContent:'space-around' }} >
       
       <View style={{ justifyContent: 'center' }} >
         <Text style={{ color: COLORS.white, ...FONTS.body4 }} >Total Time : {Data.Totaltime} </Text>
         <Text style={{ color: COLORS.white, ...FONTS.body4 }} >work Time  : {Data.workTime} </Text>
         <Text style={{ color: COLORS.white, ...FONTS.body4 }} >Expected Time: {ExpectedTimeOut}  </Text>
       </View>

       <View>         
         <CircularProgress value={StatusBarValue} circleBackgroundColor={COLORS.darkblue} activeStrokeWidth={14} textColor={COLORS.golden} activeStrokeColor={COLORS.golden} inActiveStrokeColor={"#fff"} inActiveStrokeWidth={5} subtitle={"Shift%"} subtitleColor={COLORS.white} subtitleFontSize={15} />
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



