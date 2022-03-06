import React, { useEffect, useState } from 'react'
import { FlatList, Image, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { connect, useDispatch ,useSelector} from 'react-redux';
import { ICONS,COLORS,FONTS,SIZES,Images } from '../constraints/Index'
import Icon from 'react-native-vector-icons/Ionicons'
import DrawerItems from '../components/DrawerItems';


const CustomDrawer = ({
    navigation,
    ...props
}) => {


    return (
        <View>
            <View style={{backgroundColor: "#f4f4f4" ,justifyContent: 'space-around', alignItems: 'center',  height: 180 }} >
                <Image style={{ width: 80, height: 80, borderRadius: 50, borderColor: COLORS.black, borderWidth:1 }} source={Images.profile} />
                <View style={{ alignItems: 'center' }} >
                  <Text style={{color: "#000", fontWeight: 'bold', ...FONTS.h3}} >Anas</Text>
                  <Text>anastobe968@gmail.com</Text>
                </View>
            </View>

        <ScrollView>


            <View style={{ alignItems: 'center', height: 50 }} >
                <Text style={{ lineHeight: 50, color: COLORS.black, fontSize: 18 }} >EMPLOYEES</Text>
            </View>            

        <TouchableOpacity onPress={()=>{navigation.navigate("TimeIn")}}>
            <DrawerItems names="Time In"/>
        </TouchableOpacity>

        <TouchableOpacity onPress={()=>{navigation.navigate("TimeOut")}}>
            <DrawerItems names="Time Out" navigation={props} />
        </TouchableOpacity>

        <TouchableOpacity onPress={()=>{navigation.navigate("BreakIn")}}>
            <DrawerItems names="Break In"/>
        </TouchableOpacity>

        <TouchableOpacity onPress={()=>{navigation.navigate("BreakOut")}}>
            <DrawerItems names="Break Out" />
        </TouchableOpacity>

            <View style={{ alignItems: 'center', height: 50 }} >
                <Text style={{ lineHeight: 50, color: COLORS.black, fontSize: 18 }} >EMPLOYEES STATUS</Text>
            </View>            

       <TouchableOpacity onPress={()=>{navigation.navigate("Attendence")}}>
            <DrawerItems names="Attendences"/>
        </TouchableOpacity>

        <TouchableOpacity onPress={()=>{navigation.navigate("Leaves")}}>
            <DrawerItems names="Leaves" />
        </TouchableOpacity>

        <TouchableOpacity onPress={()=>{navigation.navigate("Absent")}}>
            <DrawerItems names="Absent" />
        </TouchableOpacity>
        
        <TouchableOpacity onPress={()=>{navigation.navigate("SalaryCalculate")}}>
            <DrawerItems names="Salary Calculator"/>
        </TouchableOpacity>
        

        </ScrollView>
        </View>
    )
}


const styles = StyleSheet.create({
 
    //shadow
    shadow: {
        shadowColor: "#000",
        shadowOffset:{
            width: 2,
            height: 2
        },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3
  }
  
})

export default CustomDrawer

