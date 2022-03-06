import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, SectionList } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import Icon from 'react-native-vector-icons/Ionicons'
import { COLORS } from '../constraints/Theme';

const TextInputComponent = ({
  // propss,
  TextChange = () => { },
  value = "",


  ...props

  }) => {

  const [iconName, seticonName] = useState(true)    
  
  const [hideKey, sethideKey] = useState(props.hideKey)    
  //seepassword
  const [seepassword, setseepassword] = useState(true)

  return (
    <View>

      <View style={{ flexDirection: 'row', alignItems: 'center' }} >
      <Icon name={props.InputFieldIcons} size={25} color={COLORS.black} /><Text style={{ color: COLORS.black }} >{props.PlaceHolderHeading} </Text>
      </View>

      <View style={[styles.view,{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }]}>
        <View style={{ width: '90%' }} > 

        <TextInput
          placeholder={props.PlaceHolderName}
          onChangeText={TextChange}
          value={value}
          secureTextEntry={ hideKey === 'hiddenkey' && seepassword === true ? true : false}        
        />

        </View>
        
        <TouchableOpacity  onPress={ ()=> {setseepassword(!seepassword), seticonName(!iconName)} } >
        { hideKey === 'hiddenkey' ? <Icon style={{ marginRight: 10 }} name={iconName  ? 'eye-off-outline' : 'eye-outline' } size={22} color="#000" /> : <></> }
        </TouchableOpacity> 

        
      
      </View>


    </View>
    );
};


const styles = StyleSheet.create({
  view: {
    // borderColor: lightFerozee,
    borderWidth: 1,
    
  },
});

export default TextInputComponent;

