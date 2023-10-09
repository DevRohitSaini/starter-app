import React from 'react';
import { Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../../Screens/HomeScreen/HomeScreen';

import constant from '../../CommanFiles/Constant/constant';

const Tab = createBottomTabNavigator();
export default function BottomTab() {


  return (
    <Tab.Navigator screenOptions={{ tabBarHideOnKeyboard: true }}>
      <Tab.Screen
        name="Jobs"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          //   tabBarHideOnKeyboard: true,
         
        }}
      />
      <Tab.Screen
        name="Proposal"
        component={ProposalScreen}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          
        }}
      />
    
      
    </Tab.Navigator>
  );
}


