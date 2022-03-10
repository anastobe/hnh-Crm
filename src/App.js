import React from 'react'
import MainNavigation from './navigation/navigation'
import { Provider } from 'react-redux'
import { store } from './stores/index'
import CustomModal from './components/CustomModal'

const App = () => {
  return (
    <Provider store={store}>
      <MainNavigation />
      <CustomModal />
    </Provider>
  )
}

export default App
