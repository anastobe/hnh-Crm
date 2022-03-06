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
import Icon from 'react-native-vector-icons/Ionicons'
// import { useDispatch, useSelector } from 'react-redux'
// import { fetchUser, selectAll } from '../../stores/user.reducer'

//components
import TextInputComponent from "../../components/TextInputComponent"
import Button from '../../components/Button'

//style
import styles from "./Home.style.js"
import Loader from '../../components/Loader'
import Header from '../../components/Header'

const Home = ({ navigation }) => {

  //loader
  const [load, setload] = useState(false)

  console.log("navi==>",navigation)

  return (
    <>
    <StatusBar barStyle="dark-content" backgroundColor={'#f9f9f9'} />
    <SafeAreaView style={styles.SafeAreaView2}>
    
        <Header props={navigation} />

       {load &&  <Loader /> }
        <ScrollView>
        
          <Text>aas</Text>
        
        
        
        </ScrollView>  
    </SafeAreaView>
  </>
  )
}

const styleUser = StyleSheet.create({

})

export default Home
