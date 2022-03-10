import React, { useState,useEffect,useRef } from 'react'
import {
  SafeAreaView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  TextInput,
  FlatList,
  Modal
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import RBSheet from "react-native-raw-bottom-sheet";
import { getApiwithToken } from '../api/fakeApiUser'
import { baseUrl_TimeLine } from '../utils/baseUrl_TimeLine'

// import { useDispatch, useSelector } from 'react-redux'
// import { fetchUser, selectAll } from '../../stores/user.reducer'

import { ICONS,COLORS,FONTS,SIZES,Images } from '../constraints/Index'
import Loader from './Loader'
import axios from 'axios';

const TimeLineCard = ({ navigation }) => {

  //loader
  const [load, setload] = useState(false)
  const [comments, setcomments] = useState("")
  const [Data, setData] = useState();
  const [MessagesData, setMessagesData] = useState();
  const [showTextInput, setshowTextInput] = useState(false);
  
  const refRBSheet = useRef();
  
  //timeline post / news feeds
useEffect(() => {
    getData()
}, [])
const getData = async () => {
    setload(true)
    const { data, status } = await getApiwithToken(`${baseUrl_TimeLine}/v1/news-feeds/list`)
    setData(data.lists)
    setload(false)
}
const renderItem = ({item}) =>{


    return(
        <View key={item.id} style={{ marginTop: 10 }} >
        <View style={{ flexDirection: 'row',alignItems: 'center', justifyContent: 'space-between' }} >
          <View  style={{ flexDirection: 'row', alignItems: 'center' }} >
            <Image style={{ width: 50, height: 50, borderRadius: 50, borderColor: COLORS.black, borderWidth: 1 }} source={{ uri: item.imgurl}} />
            <Text>    {item.name}</Text>
          </View>

          <View>
            <Text>{item.date}    </Text>
          </View>
        </View>
        
        <View>
          <Image style={{ width: SIZES.width, height: 200, resizeMode: 'contain'  }} source={{ uri: item.media }} />
        </View>
        <View>
            <Text style={{ marginVertical: 10 }} >   {item.title}</Text>
        </View>


        <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 20}} >
        {/* refRBSheet.current.open(), */}
         <TouchableOpacity  onPress={() =>{ getMessages(item.id) }} >
          <Text>
              <Icon name={ICONS.IONICONS.mail} size={30} color={COLORS.darkblue} />{item.comment}
          </Text>
         </TouchableOpacity>

         <TouchableOpacity  onPress={() =>{ sendLikes(item.id) }} >
           <Text style={{ marginLeft: 20 }} >
           {/* thumbdown */}
            {item.isLike == 0 ? <><Icon name={ICONS.IONICONS.thumbdown} size={30} color={COLORS.darkblue} /><Text>{item.isLike}</Text></> 
            : 
            <><Icon name={ICONS.IONICONS.thumb} size={30} color={COLORS.golden} /><Text>{item.isLike}</Text></>  }
           </Text>
          </TouchableOpacity>


          <TouchableOpacity onPress={()=>{ setshowTextInput(!showTextInput) }} >
           <Text style={{ marginLeft: 20 }} >
              <Icon name={ICONS.IONICONS.message} size={30} color={COLORS.darkblue} />{showTextInput ?  "No Comments" : "AddComments" }
           </Text>
          </TouchableOpacity>

        </View>


        {showTextInput ? <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderColor: "#000", borderWidth: 1, margin: 10 }} >
           <TextInput placeholder="  Add Comments" onChangeText={setcomments} value={comments} />
           <TouchableOpacity  onPress={() =>{ sendComment(item.id) }}>
            <Icon name={ICONS.IONICONS.send} size={30} color={COLORS.darkblue} />
           </TouchableOpacity>
        </View> : null }

      </View>
    )
  }


  
//get messages
const getMessages = async (v) => {
    setload(true)
    const { data, status } = await getApiwithToken(`${baseUrl_TimeLine}/v1/news-feeds/comment/view/${v}`)

    if (status === 'success') {
        setMessagesData(data.lists)
        setload(false)
        refRBSheet.current.open()
    } else {
        alert("Error")
        setload(false)
    }
}
const BottomSheet = () =>{
    
    const renderMessage = ({item}) =>{
        return(
            <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                
                 <Image style={{ width: 50, height: 50, borderRadius: 50, borderColor: COLORS.black, borderWidth: 1, margin: 10 }} source={{ uri: item.image}} />
                
                <View style={{ backgroundColor: COLORS.darkblue, marginLeft: 10, width: '70%', borderRadius: 10, padding: SIZES.base }} >
                  <Text style={{ color: COLORS.white, fontWeight: 'bold', ...FONTS.h3 }} >{item.name}</Text>
                  <Text style={{ color: COLORS.white }} >   {item.comment}</Text>
                </View>
    
            </View>
        )
      }

      return(
          <ScrollView>
        <RBSheet
        ref={refRBSheet}
        closeOnDragDown={false}
        closeOnPressMask={false}
        height={SIZES.height}
        openDuration={250}
        customStyles={{
          wrapper: {
            backgroundColor: "transparent"
          },
          draggableIcon: {
            backgroundColor: "#000"
          }
        }} >
       
       <TouchableOpacity style={{ alignItems: 'flex-end', margin: 10 }}   onPress={() => refRBSheet.current.close()} >
         <Icon name={ICONS.IONICONS.close} size={30} color={COLORS.darkblue} />
       </TouchableOpacity>
       
       <FlatList
            data={MessagesData}
            renderItem={renderMessage}
            keyExtractor={item => `${item.id}`}
            scrollEnabled={true}
        />
        




      </RBSheet>
          </ScrollView>
      )
  }


//send Comment
const sendComment = (postId) =>{
    const config = {
        headers: { 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxOTUsInByaW1hcnlfaWQiOjE5NSwibmFtZSI6IkFuYXMgQWhtZWQiLCJpbWFnZV91cmwiOiJodHRwczovL2RyaXZlLmdvb2dsZS5jb20vdWM_ZXhwb3J0PXZpZXcmaWQ9MVc4VDN2Qm9jVk9PM3FQSFNYQlpUaFRTTUJ5Z0JGemZ6IiwidHlwZSI6ImVtcGxveWVlIiwiZ2VuZGVyIjoiMCIsInN0YXR1c19pZCI6MSwic2Vjb25kYXJ5X251bWJlciI6IjAzMzMzNzQxODgxIiwicHJpbWFyeV9udW1iZXIiOiIwMzMyMjczMTY2MyIsInVzZXJzdGF0dXMiOnsibmFtZSI6IkFjdGl2ZSIsIm1lc3NhZ2UiOiJXZWxjb21lIFRvIENybSJ9LCJyZW1vdGVXb3JrIjoiMCIsImlwIjpbeyJpZCI6MSwiaXAiOiI1OS4xMDMuMTM4LjEzNSJ9LHsiaWQiOjcsImlwIjoiNTkxIC4gMDMxIC4gMzgxIC4gMzUifSx7ImlkIjo4LCJpcCI6Ijo6ZmZmZjoxMTUuMTg2LjQuMTU4In0seyJpZCI6OSwiaXAiOiIxMTUgLiAxODYgLiA0MTUgLiA4In0seyJpZCI6MTAsImlwIjoiOjpmZmZmOjU5LjEwMy4xMzguNDgifSx7ImlkIjoxMSwiaXAiOiI3ODYuNzg1LjI1NS4xMzMifSx7ImlkIjoxMiwiaXAiOiI4OC45OS41NTUuNjY2In0seyJpZCI6MTQsImlwIjoiOjpmZmZmOjU5LjEwMy4xMzguNDgifSx7ImlkIjoxNSwiaXAiOiJzNDU0MzU0MzU0In0seyJpZCI6MTYsImlwIjoiMzI0IC4gMzI1IC4gMzI1IC4gMzI1In0seyJpZCI6MTcsImlwIjoiMTkzLjE3Ni44NC4xNTcifSx7ImlkIjoxOCwiaXAiOiI6OmZmZmY6MjAyLjQ3LjQ0LjUxIn0seyJpZCI6MTksImlwIjoiMjAyLjQ3LjQ0LjUxIn0seyJpZCI6MjAsImlwIjoiMTEzLjIwMy4yMDUuMTM3In0seyJpZCI6MjEsImlwIjoiOjpmZmZmOjExMy4yMDMuMjA1LjEzNyJ9LHsiaWQiOjIyLCJpcCI6IjExMy4yMDMuMjA1LjEzNyJ9LHsiaWQiOjIzLCJpcCI6Ijo6ZmZmZjoxMTMuMjAzLjIwNS4xMzcifV0sInNoaWZ0TmFtZSI6Ik5ldyBhZnRlcm5vb24gU2hpZnQiLCJzaGlmdFN0YXJ0IjoiMTI6MDA6UE0iLCJzaGlmdEVuZCI6IjA4OjUwOlBNIiwic2hpZnRIb3VycyI6IjA4OjUwOjAwIiwic2hpZnRCcmVhayI6IjAxOjAwOjAwIiwic2hpZnRXb3JraW5nSG91cnMiOiIwNzo1MDowMCIsImVtcGxveWVlX3R5cGUiOiJtZW1iZXIiLCJzZWNvbmRhcnlfaWQiOjYxMCwiYnJlYWsiOiJmYWxzZSIsIk9mZmljaWFsYnJlYWsiOiJmYWxzZSJ9LCJpYXQiOjE2NDY2NDI5MTAsImV4cCI6MTY1MDA1NTcxMH0.whUlkp2ZsN9HYXr5WKEtt_qhi_DSwZq-b7gdLtE_KpE' }
    };
    const bodyParameters = {
        newsFeedsId: postId,
        comment: comments
    };
    axios.post( 
      `${baseUrl_TimeLine}/v1/news-feeds/comment/store`,
      bodyParameters,
      config
    )
    .then((response)=>{
        if (response.data.status == "success") {
            alert(response.data.message)   
            setshowTextInput(false)
            setcomments("")
            getData()

        } else {
            alert("Message Not Saved")
        }
    })
    .catch((e)=>{
        alert("Network Error")
    })
}

//send likes
const sendLikes = (postId) =>{
    console.log("send comment===>",postId)
    setload(true)
    const config = {
        headers: { 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxOTUsInByaW1hcnlfaWQiOjE5NSwibmFtZSI6IkFuYXMgQWhtZWQiLCJpbWFnZV91cmwiOiJodHRwczovL2RyaXZlLmdvb2dsZS5jb20vdWM_ZXhwb3J0PXZpZXcmaWQ9MVc4VDN2Qm9jVk9PM3FQSFNYQlpUaFRTTUJ5Z0JGemZ6IiwidHlwZSI6ImVtcGxveWVlIiwiZ2VuZGVyIjoiMCIsInN0YXR1c19pZCI6MSwic2Vjb25kYXJ5X251bWJlciI6IjAzMzMzNzQxODgxIiwicHJpbWFyeV9udW1iZXIiOiIwMzMyMjczMTY2MyIsInVzZXJzdGF0dXMiOnsibmFtZSI6IkFjdGl2ZSIsIm1lc3NhZ2UiOiJXZWxjb21lIFRvIENybSJ9LCJyZW1vdGVXb3JrIjoiMCIsImlwIjpbeyJpZCI6MSwiaXAiOiI1OS4xMDMuMTM4LjEzNSJ9LHsiaWQiOjcsImlwIjoiNTkxIC4gMDMxIC4gMzgxIC4gMzUifSx7ImlkIjo4LCJpcCI6Ijo6ZmZmZjoxMTUuMTg2LjQuMTU4In0seyJpZCI6OSwiaXAiOiIxMTUgLiAxODYgLiA0MTUgLiA4In0seyJpZCI6MTAsImlwIjoiOjpmZmZmOjU5LjEwMy4xMzguNDgifSx7ImlkIjoxMSwiaXAiOiI3ODYuNzg1LjI1NS4xMzMifSx7ImlkIjoxMiwiaXAiOiI4OC45OS41NTUuNjY2In0seyJpZCI6MTQsImlwIjoiOjpmZmZmOjU5LjEwMy4xMzguNDgifSx7ImlkIjoxNSwiaXAiOiJzNDU0MzU0MzU0In0seyJpZCI6MTYsImlwIjoiMzI0IC4gMzI1IC4gMzI1IC4gMzI1In0seyJpZCI6MTcsImlwIjoiMTkzLjE3Ni44NC4xNTcifSx7ImlkIjoxOCwiaXAiOiI6OmZmZmY6MjAyLjQ3LjQ0LjUxIn0seyJpZCI6MTksImlwIjoiMjAyLjQ3LjQ0LjUxIn0seyJpZCI6MjAsImlwIjoiMTEzLjIwMy4yMDUuMTM3In0seyJpZCI6MjEsImlwIjoiOjpmZmZmOjExMy4yMDMuMjA1LjEzNyJ9LHsiaWQiOjIyLCJpcCI6IjExMy4yMDMuMjA1LjEzNyJ9LHsiaWQiOjIzLCJpcCI6Ijo6ZmZmZjoxMTMuMjAzLjIwNS4xMzcifV0sInNoaWZ0TmFtZSI6Ik5ldyBhZnRlcm5vb24gU2hpZnQiLCJzaGlmdFN0YXJ0IjoiMTI6MDA6UE0iLCJzaGlmdEVuZCI6IjA4OjUwOlBNIiwic2hpZnRIb3VycyI6IjA4OjUwOjAwIiwic2hpZnRCcmVhayI6IjAxOjAwOjAwIiwic2hpZnRXb3JraW5nSG91cnMiOiIwNzo1MDowMCIsImVtcGxveWVlX3R5cGUiOiJtZW1iZXIiLCJzZWNvbmRhcnlfaWQiOjYxMCwiYnJlYWsiOiJmYWxzZSIsIk9mZmljaWFsYnJlYWsiOiJmYWxzZSJ9LCJpYXQiOjE2NDY2NDI5MTAsImV4cCI6MTY1MDA1NTcxMH0.whUlkp2ZsN9HYXr5WKEtt_qhi_DSwZq-b7gdLtE_KpE' }
    };
    const bodyParameters = {
        newsFeedsId: postId,
    };
    axios.post( 
      `${baseUrl_TimeLine}/v1/news-feeds/like`,
      bodyParameters,
      config
    )
    .then((response)=>{
        if (response.data.status == "success") {
            alert(response.data.message)   
            getData()
            setload(false)
        } else {
            alert("Message Not Saved")
            setload(false)
        }
    })
    .catch((e)=>{
        alert("Network Error")
        setload(false)
    })
}


//modal


  return (
    <>
      
       {load &&  <Loader /> }
        <ScrollView>
        
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#000" }}>
        </View>


        <FlatList
            data={Data}
            renderItem={renderItem}
            keyExtractor={item => `${item.id}`}
            scrollEnabled={true}
            />
        
        
        </ScrollView>  
        <BottomSheet />
  </>
  )
}

const styleUser = StyleSheet.create({

})

export default TimeLineCard

