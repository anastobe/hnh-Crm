import React, { useState,useEffect } from 'react'
import {
  SafeAreaView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  TextInput
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUser, selectAll } from '../../stores/user.reducer'
import  AsyncStorage from '@react-native-async-storage/async-storage'

//components
import Button from '../../components/Button'

//style
import styles from "./Home.style.js"
import Loader from '../../components/Loader'
import Header from '../../components/Header'
import { ICONS,COLORS,FONTS,SIZES,Images } from '../../constraints/Index'
import TimeLineCard from '../../components/TimeLineCard'
import { closeModal, openModal } from '../../stores/actions/user.action'

const Home = ({ navigation }) => {

  //loader
  const [load, setload] = useState(false)
  const [comment, setcomment] = useState("")



  //breakOut







  
  const [AsyncStorageValue, setAsyncStorageValue] = useState()


  const dispatch = useDispatch()

  
const BreakIn = async () => {

  let BreakStatus = await AsyncStorage.getItem('BreakStatus'); 
  setAsyncStorageValue(BreakStatus) 
  console.log("BreakStatus===>",BreakStatus)
  if (BreakStatus == 'successs') {
    dispatch(openModal({
      show: true,
      title: "BreakIn",
      confirmButtonAction: () => {
        dispatch(closeModal())
      },
      successIcon: true
    }))
  } else {
    console.log("issi screen p")
  }

};



  useEffect(()=>{
    BreakIn()
  },[])






  return (
    <>
    <StatusBar barStyle="dark-content" backgroundColor={'#f9f9f9'} />
    <SafeAreaView style={styles.SafeAreaView2}>
    
        <Header props={navigation} headerName="Timeline" />

       {/* {load &&  <Loader /> } */}
        
          
         <TimeLineCard />

         
    </SafeAreaView>
  </>
  )
}

const styleUser = StyleSheet.create({

})

export default Home
