import { getUser } from '../../api/fakeApiUser'



  //new
  export const openModal = (details) => {
    console.log("openModal == >",details);
    return (dispatch) => {
        dispatch({ type: "OPEN_MODAL", payload: details })
    }
}

  export const closeModal = () => {
    return (dispatch) => {
        dispatch({ type: "CLOSE_MODAL" })
    }
}



export const fetchDataUser = () => async dispatch => {
  try {
    dispatch(fetchUserRequest())
    const { data } = await getUser()
    dispatch(fetchUserSuccess(data))
  } catch (error) {
    dispatch(fetchUserFail())
  }
}
