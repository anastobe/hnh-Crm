import React, { useEffect, useState } from 'react'
import MainNavigation from './navigation/navigation'
import { store } from './stores/index'
import BreakInModal from './components/CustomModal/BreakInModal'
import  AsyncStorage from '@react-native-async-storage/async-storage'
import { useDispatch, useSelector,Provider } from 'react-redux'
import { closeModal, openModal } from './stores/actions/user.action'


const App = () => {
  

  return (
    <Provider store={store}>
      <MainNavigation />
      <BreakInModal />
    </Provider>
  )
}

export default App
