const initialState = {
    show: "",
    containerStyle: {},
    title: "Modal Title",
    titleStyle: {},
    descriptionStyle: {},
    discription: "modal description",
    confirmButtonAction: () => { },
    successIcon: true,
    firstButtonTitle: "CONTINUE",
    secondButtonTitle: "Buy Me A Drink First",
    secondButtonPress: () => {},
    secondButton: false,

}

export default (state = initialState, { type, payload }) => {


    console.log("type=============================>", type , "payload==>", payload)


    switch (type) {

        case "OPEN_MODAL":
            return { 
                ...state, 
                ...payload 
            }
        case "CLOSE_MODAL":
            return { ...initialState }

        default:
            return state
    }
}
