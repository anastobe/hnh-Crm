import React, { forwardRef, useEffect, useState } from 'react'
import { Image } from 'react-native';
import { StyleSheet, Text, View } from 'react-native'
import Modal from 'react-native-modal';
import { useDispatch, useSelector } from 'react-redux';
import { TEXT_BLACK_COLOR, THEME_COLOR } from '../../utils/colors';
import { HELVETICA_BOLD, HELVETICA_REGULAR } from '../../utils/fonts';
import Button from '../Button';
import { closeModal } from './store/action';

const CustomModal = forwardRef(({

}, ref) => {

    const [showModal, setShowModal] = useState();

    const modalState = useSelector(state => state.modal)

    const {
        show,
        containerStyle,
        title,
        titleStyle,
        descriptionStyle,
        discription,
        confirmButtonAction,
        successIcon,
        firstButtonTitle,
        secondButtonTitle,
        secondButtonPress,secondButton
    } = modalState


    useEffect(() => {
        setShowModal(show);
    }, [show])

    return (
        <Modal
            isVisible={show}
            animationIn="zoomInUp"
            animationOut="zoomOutDown"
            backdropOpacity={0.7}
            backdropColor={"#767373"}
            coverScreen
            animationInTiming={1000}
            animationOutTiming={1000}
        >
            <View style={[styles.container, containerStyle]}>


                <View style={{ paddingBottom: 20, alignItems: "center", width: "100%" }}>
                    {/* {successIcon && <View style={styles.successContainer} />} */}
                    {successIcon && <Image source={require("../../assets/images/modalIcon.png")} style={styles.successContainer} />}

                    <Text style={[styles.titleStyle, titleStyle]}>{title}</Text>


                    <Text style={[styles.descriptionStyle, descriptionStyle]}>{discription}</Text>

                </View>
                <View style={{ width: "100%", position: "absolute", bottom: -30, alignItems: "center" }}>
                    <Button
                        title={firstButtonTitle}
                        onPress={() => {
                            confirmButtonAction()
                        }}
                    />
                </View>
                {secondButton && <View style={{ width: "100%", position: "absolute", bottom: -85, alignItems: "center" }}>
                    <Button
                        title={secondButtonTitle}
                        onPress={() => {
                            secondButtonPress()
                        }}
                        containerStyle={{ backgroundColor: "#DEDEDE" }}
                        titleStyle={{ color: THEME_COLOR }}
                    />
                </View>}
            </View>
        </Modal>
    )
})

export default CustomModal

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff", borderRadius: 20, paddingVertical: 20, alignItems: "center"
    },
    titleStyle: {
        fontFamily: HELVETICA_BOLD,
        color: TEXT_BLACK_COLOR,
        fontSize: 20,
        width: "95%",
        textAlign: "center"
    },
    descriptionStyle: {
        fontFamily: HELVETICA_REGULAR,
        color: TEXT_BLACK_COLOR,
        fontSize: 20,
        textAlign: "center",
        width: "85%",
        marginTop: 20
    },
    successContainer: {
        height: 75,
        width: 70,
    }
})
