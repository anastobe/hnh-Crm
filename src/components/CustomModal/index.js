import React, { forwardRef, useEffect, useState } from 'react'
import { Image } from 'react-native';
import { StyleSheet, Text, View } from 'react-native'
import Modal from 'react-native-modal';
import { useDispatch, useSelector } from 'react-redux';

const CustomModal = () => {

    const [showModal, setShowModal] = useState();

    const modalState = useSelector(state => state)

    // useEffect(() => {
    //     setShowModal(show);
    // }, [show])

    console.log("modal state==>",modalState)

    return (
        <Modal
            isVisible={false}
            animationIn="zoomInUp"
            animationOut="zoomOutDown"
            backdropOpacity={0.7}
            backdropColor={"#767373"}
            coverScreen
            animationInTiming={1000}
            animationOutTiming={1000}
        >
            <Text>anas bhai bhai</Text>
        </Modal>
    )
}

export default CustomModal
