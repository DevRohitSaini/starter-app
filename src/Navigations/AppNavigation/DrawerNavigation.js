import React from 'react';
// import 'react-native-gesture-handler';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  SafeAreaView,
  Dimensions,
  Keyboard,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import SideMenu from './SideMenu/SideMenu';
import AppStack from './AppStack';

const Drawer = createDrawerNavigator();
export default function DrawerNavigation() {

  return (
    <Drawer.Navigator
      // useLegacyImplementation={true}
      ScreenOption={{
        activeBackgroundColor: 'transparent',
        inactiveBackgroundColor: 'transparent',
        activeTintColor: 'green',
        //inactiveTintColor: COLORS.gray4,
      }}
      drawerStyle={{
        width: Dimensions.get('window').width - 10,
      }}
      drawerContent={props => <SideMenu {...props} />}
    >
      <Drawer.Screen
        name="AppStack"
        component={AppStack}
        options={{
          headerShown: false,
          drawerType: 'front',
        }}
      />
    </Drawer.Navigator>
  );
}