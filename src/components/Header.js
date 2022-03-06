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
import Icon from 'react-native-vector-icons/Ionicons'
import { ICONS,COLORS,FONTS,SIZES,Images } from '../constraints/Index'

const Header = ({
    ...props
    
    }) => {


    return (
    <View style={{ justifyContent: 'space-around', flexDirection: 'row', height: 80, backgroundColor: COLORS.darkblue, alignItems: 'center', borderBottomRightRadius: 25, borderBottomLeftRadius: 25 }} >
        <TouchableOpacity onPress={() => props.props.openDrawer()} >
          <Icon name={ICONS.IONICONS.navIcon} size={25} color="#fff" />
        </TouchableOpacity>
        <Text style={{ color: "#fff", fontSize: 20 }} >{props.headerName}</Text> 
        <Image style={{ width: 50, height: 50, borderRadius: 50, borderColor: COLORS.white, borderWidth: 2 }} source={Images.profile} />
     </View>
  )
}

export default Header




