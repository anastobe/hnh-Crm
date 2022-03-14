const initialState = 0

export const userReducer = (state = initialState, action) => {
  const { payload } = action
  switch (action.type) {

 //new

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




export default userReducer
