import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import NavigagatetoBottom from "./BottomNavigation"
import Login from '../screens/Auth/Login'
import Icon from 'react-native-vector-icons/Ionicons'


// import { createDrawerNavigator } from '@react-navigation/drawer';
// const Drawer = createDrawerNavigator();


const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()


// function MyDrawer() {
//   return (
//     <Drawer.Navigator>
//       <Drawer.Screen name="Home" component={Home} />
//     </Drawer.Navigator>
//   );
// }



// function MyTabs() {
//   return (
//     <Tab.Navigator>
//       <Tab.Screen
//         name="Home"
//         component={Home}
//         options={{
//           headerShown: false,
//           tabBarIcon: ({ focused, color, size }) => {
//             return <Icon name={'ios-home'} size={25} color={color} />
//           }
//         }}
//       />
     
//     </Tab.Navigator>
//   )
// }


const MainNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
          
          <Tab.Screen name="Login" component={Login} />
          <Tab.Screen name="NavigagatetoBottom" component={NavigagatetoBottom} />




        {/* add your another screen here using -> Stack.Screen */}
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default MainNavigation
