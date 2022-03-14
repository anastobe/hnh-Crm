import React, { forwardRef, useEffect, useState } from 'react'
import { Image } from 'react-native';
import { StyleSheet, Text, View,TextInput } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/Ionicons'
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import { useDispatch, useSelector } from 'react-redux';
import TextInputComponent from "../TextInputComponent"
import Button from "../Button"
import { ICONS,COLORS,FONTS,SIZES,Images } from '../../constraints/Index'
import Header from '../Header';
import { getApiwithToken, PostApiWithToken } from '../../api/fakeApiUser';
import { baseUrl_TimeLine } from '../../utils/baseUrl_TimeLine';
import  AsyncStorage from '@react-native-async-storage/async-storage'

const BreakInModal = forwardRef(({

}, ref) => {

    const [showModal, setShowModal] = useState();
    const [breakTypevalue, setbreakTypevalue] = useState("")
    const [breakTypeId, setbreakTypeId] = useState("")
    const [showMenu, setshowMenu] = useState("")
    const [breakTypeData, setbreakTypeData] = useState("")
    

    
    const dispatch = useDispatch()

    const modalState = useSelector(state => state)

    console.log("==>",modalState.userReducer) 

    const {
        show,
        confirmButtonAction,
        Data, 
    } = modalState.userReducer

    useEffect(() => {
        setShowModal(show);
    }, [show])


    useEffect(() => {
        getBreakTypeData()
      }, [])

    const getBreakTypeData = async () =>{
        const { data, status } = await getApiwithToken(`${baseUrl_TimeLine}/v1/break/type`)
        setbreakTypeData(data?.breakType)
    }
    
    console.log("api data==>",breakTypeData)

    const breakType = (name,id) =>{
        setbreakTypevalue(name)
        setbreakTypeId(id)
        setshowMenu(false)
    }
    
    const BreakIn = async () =>{

        const { data, status }= await PostApiWithToken(`${baseUrl_TimeLine}/v1/break/time/in`,
        {
            breakType_id: breakTypeId
        }   //becouse No Body Data There
        ,{
          headers: {
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxOTUsInByaW1hcnlfaWQiOjE5NSwibmFtZSI6IkFuYXMgQWhtZWQiLCJpbWFnZV91cmwiOiJodHRwczovL2RyaXZlLmdvb2dsZS5jb20vdWM_ZXhwb3J0PXZpZXcmaWQ9MVc4VDN2Qm9jVk9PM3FQSFNYQlpUaFRTTUJ5Z0JGemZ6IiwidHlwZSI6ImVtcGxveWVlIiwiZ2VuZGVyIjoiMCIsInN0YXR1c19pZCI6MSwic2Vjb25kYXJ5X251bWJlciI6IjAzMzMzNzQxODgxIiwicHJpbWFyeV9udW1iZXIiOiIwMzMyMjczMTY2MyIsInVzZXJzdGF0dXMiOnsibmFtZSI6IkFjdGl2ZSIsIm1lc3NhZ2UiOiJXZWxjb21lIFRvIENybSJ9LCJyZW1vdGVXb3JrIjoiMCIsImlwIjpbeyJpZCI6MSwiaXAiOiI1OS4xMDMuMTM4LjEzNSJ9LHsiaWQiOjcsImlwIjoiNTkxIC4gMDMxIC4gMzgxIC4gMzUifSx7ImlkIjo4LCJpcCI6Ijo6ZmZmZjoxMTUuMTg2LjQuMTU4In0seyJpZCI6OSwiaXAiOiIxMTUgLiAxODYgLiA0MTUgLiA4In0seyJpZCI6MTAsImlwIjoiOjpmZmZmOjU5LjEwMy4xMzguNDgifSx7ImlkIjoxMSwiaXAiOiI3ODYuNzg1LjI1NS4xMzMifSx7ImlkIjoxMiwiaXAiOiI4OC45OS41NTUuNjY2In0seyJpZCI6MTQsImlwIjoiOjpmZmZmOjU5LjEwMy4xMzguNDgifSx7ImlkIjoxNSwiaXAiOiJzNDU0MzU0MzU0In0seyJpZCI6MTYsImlwIjoiMzI0IC4gMzI1IC4gMzI1IC4gMzI1In0seyJpZCI6MTcsImlwIjoiMTkzLjE3Ni44NC4xNTcifSx7ImlkIjoxOCwiaXAiOiI6OmZmZmY6MjAyLjQ3LjQ0LjUxIn0seyJpZCI6MTksImlwIjoiMjAyLjQ3LjQ0LjUxIn0seyJpZCI6MjAsImlwIjoiMTEzLjIwMy4yMDUuMTM3In0seyJpZCI6MjEsImlwIjoiOjpmZmZmOjExMy4yMDMuMjA1LjEzNyJ9LHsiaWQiOjIyLCJpcCI6IjExMy4yMDMuMjA1LjEzNyJ9LHsiaWQiOjIzLCJpcCI6Ijo6ZmZmZjoxMTMuMjAzLjIwNS4xMzcifV0sInNoaWZ0TmFtZSI6Ik5ldyBhZnRlcm5vb24gU2hpZnQiLCJzaGlmdFN0YXJ0IjoiMTI6MDA6UE0iLCJzaGlmdEVuZCI6IjA4OjUwOlBNIiwic2hpZnRIb3VycyI6IjA4OjUwOjAwIiwic2hpZnRCcmVhayI6IjAxOjAwOjAwIiwic2hpZnRXb3JraW5nSG91cnMiOiIwNzo1MDowMCIsImVtcGxveWVlX3R5cGUiOiJtZW1iZXIiLCJzZWNvbmRhcnlfaWQiOjYxMCwiYnJlYWsiOiJmYWxzZSIsIk9mZmljaWFsYnJlYWsiOiJmYWxzZSJ9LCJpYXQiOjE2NDY2NDI5MTAsImV4cCI6MTY1MDA1NTcxMH0.whUlkp2ZsN9HYXr5WKEtt_qhi_DSwZq-b7gdLtE_KpE'
          }
      })
        if (status === "success") {
            console.log("data=====>",data.message)
            await AsyncStorage.setItem('BreakStatus', status)
            alert(data.message)
        } else {
          alert("BreakIn Not")
        }
      
    }

    return (
        <Modal
            isVisible={show}
            animationIn="zoomInUp"
            animationOut="zoomOutDown"
            backdropOpacity={0.7}
            backdropColor={"#020d1c"}
            coverScreen
            animationInTiming={1000}
            animationOutTiming={1000}
        >
            <Pressable  onPress={() => { confirmButtonAction() }}>
            <Icon style={{ alignSelf: "flex-end" }} name={ICONS.IONICONS.close} size={40} color="#fff" />
            </Pressable>

            {/* <ScrollView> */}

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderColor: "#fff", borderWidth: 1 }}>
       
        <TextInput
          placeholder=""
          onChangeText={setbreakTypevalue}
          value={breakTypevalue}      
        />
        <Pressable onPress={()=>{setshowMenu(!showMenu)}} >
        <Icon name={ICONS.IONICONS.dropDown} size={30} color="#fff" />
        </Pressable> 

      </View>

        {showMenu ? 
       <View style={{ marginTop: 30 }} >
            {breakTypeData && breakTypeData.map((v,i)=>{
                 return(
                    //  <></>
                     <View key={v.id} style={{ margin: 5 }} >
                        <Pressable onPress={()=>{breakType(v?.name, v?.id )}} >
                           <Button buttonName={v.name} />
                        </Pressable>
                     </View>
                 )
            })}
        </View> 
         : <></> } 

        <View style={{ marginTop: 20 }} >
          <Pressable onPress={()=>{BreakIn()}}>
            <Button  buttonName="Break In" />
          </Pressable>
        </View>

            {/* </ScrollView> */}


        </Modal>
    )
})

export default BreakInModal
