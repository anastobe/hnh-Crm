import React, { useState } from 'react';
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
import styles from "./Auth.style.js"
import { ICONS,COLORS,FONTS,SIZES } from '../../constraints/Index'
import Loader from '../../components/Loader'

const Home = ({ navigation }) => {


  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")

  
  //loader
  const [load, setload] = useState(false)


  return (
    <>
    <StatusBar barStyle="dark-content" backgroundColor={'#f9f9f9'} />
    <SafeAreaView style={styles.SafeAreaView1} />
    <SafeAreaView style={styles.SafeAreaView2}>

      <View style={[styles.outerWrapper, { margin: 20 }]}>

       {load &&  <Loader /> }

        <ScrollView>
          <View>

             <TouchableOpacity onPress={()=> navigation.goBack() } >
              <Icon name={ICONS.IONICONS.backarrow} size={25} color={COLORS.black} />
             </TouchableOpacity>

             <View>
               <Text style={{ fontSize: SIZES.h1, marginTop: SIZES.h1, color: COLORS.black , ...FONTS.h1}} > Login</Text>
             </View>

             <View style={{ marginTop: SIZES.largeTitle}} >

               <View>
                 <TextInputComponent
                   PlaceHolderHeading="   Enter Email"
                   InputFieldIcons="mail-outline"
                   PlaceHolderName="  Enter Your Email"
                   TextChange={setemail}
                   value={email}
                 />
               </View>

               <View style={{ marginTop: SIZES.largeTitle}} >
                 <TextInputComponent
                   PlaceHolderHeading="   Enter Password"
                   InputFieldIcons="lock-closed-outline"
                   PlaceHolderName="  Enter Your Password"
                   hideKey="hiddenkey"
                   TextChange={setpassword}
                   value={password}
                   />
               </View>

             </View>



          </View>
        </ScrollView>
        <TouchableOpacity  onPress={() => navigation.navigate("NavigagatetoBottom")}>
          <Button buttonName="Log In" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  </>
  )
}



export default Home
