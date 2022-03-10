export const openModal = (details) => {
    console.log(details);
    return (dispatch) => {
        dispatch({ type: "OPEN_MODAL", payload: details })
    }
}

export const closeModal = () => {
    return (dispatch) => {
        dispatch({ type: "CLOSE_MODAL" })
    }
}