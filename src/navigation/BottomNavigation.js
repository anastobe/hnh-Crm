import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { ICONS,COLORS,FONTS,SIZES,Images } from '../../constraints/Index'

// //screens
import Home from '../screens/Home/Home'
import Login from '../screens/Auth/Login'
import CustomDrawer from './customDrawer';
import TimeIn from '../screens/EmployeesFunctionality/TimeIn';
import TimeOut from '../screens/EmployeesFunctionality/TimeOut';
import BreakIn from '../screens/EmployeesFunctionality/BreakIn';
import BreakOut from '../screens/EmployeesFunctionality/BreakOut';
import Absent from '../screens/EmployeesStatus/Absent';
import Attendence from '../screens/EmployeesStatus/Attendence';
import Leaves from '../screens/EmployeesStatus/Leaves';
import SalaryCalculate from '../screens/EmployeesStatus/SalaryCalculate';

const Drawer = createDrawerNavigator();

 function NavigagatetoBottom() {

  return (
    <Drawer.Navigator
      screenOptions={{
        drawerActiveBackgroundColor: "#003C68",
        drawerActiveTintColor: "#fff",
        headerShown: false 
      }}
      drawerContent={(props) => <CustomDrawer {...props} />}
      initialRouteName="Home"
      >
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Login" component={Login} />
      
      {/* employees Functionality */}
      <Drawer.Screen name="TimeIn" component={TimeIn}  />
      <Drawer.Screen name="TimeOut" component={TimeOut}  />
      <Drawer.Screen name="BreakIn" component={BreakIn} />
      <Drawer.Screen name="BreakOut" component={BreakOut} />

      {/* EmployeesStatus */}
      <Drawer.Screen name="Absent" component={Absent} />
      <Drawer.Screen name="Attendence" component={Attendence} />
      <Drawer.Screen name="Leaves" component={Leaves} />
      <Drawer.Screen name="SalaryCalculate" component={SalaryCalculate} />
      
    </Drawer.Navigator>
  );
}


export default NavigagatetoBottom

