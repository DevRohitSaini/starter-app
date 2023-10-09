import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../../Screens/LoginScreen/LoginScreen';
import SignupScreen from '../../Screens/SignupScreen/SignupScreen';
import OtpScreen from '../../Screens/OtpScreen/OtpScreen';
import ForgotPasswordScreen from '../../Screens/ForgotPassword/ForgotPasswordScreen';
import ComingSoonScreen from '../../Screens/ComingSoonScreen/ComingSoonScreen';
import SettingScreen from '../../Screens/SettingScreen/SettingScreen';
import DisplayModeScreen from '../../Screens/SettingScreen/DisplayModeScreen';
import PrivacyPolicyScreen from '../../Screens/SettingScreen/PrivacyPolicyScreen';
import AboutUsScreen from '../../Screens/SettingScreen/AboutUsScreen';
import ChangePasswordScreen from '../../Screens/SettingScreen/ChangePasswordScreen';
import LanguageScreen from '../../Screens/LanguageScreen/LanguageScreen';
import NotificationScreen from '../../Screens/NotificationScreen/NotificationScreen';
import LoginLanguageScreen from '../../Screens/LoginLanguageScreen/LoginLanguageScreen';
import HomeScreen from '../../Screens/HomeScreen/HomeScreen';
import ProfileScreen from '../../Screens/ProfileScreen/ProfileScreen';
import EditProfileScreen from '../../Screens/ProfileScreen/EditProfileScreen/EditProfileScreen';


const Stack = createNativeStackNavigator();
const AppStack = ({ navigation }) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShadowVisible: false,
        headerStyle: {
          backgroundColor: '#FFFFFF',
        },
      }}
      initialRouteName="LoginScreen">
      {/* <Stack.Screen
                name="LoginScreen"
                component={LoginScreen}
                options={({ navigation }) => ({
                    title: '',
                    headerShown: false,
                    //headerLeft: () => <LeftHeaderIcon navigation={navigation} />,
                })}
            /> */}
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignupScreen"
        component={SignupScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="OtpScreen"
        component={OtpScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ForgotPasswordScreen"
        component={ForgotPasswordScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ComingSoonScreen"
        component={ComingSoonScreen}
        options={{ headerShown: false }}
      />   
      <Stack.Screen
        name="SettingScreen"
        component={SettingScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DisplayModeScreen"
        component={DisplayModeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PrivacyPolicyScreen"
        component={PrivacyPolicyScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AboutUsScreen"
        component={AboutUsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ChangePasswordScreen"
        component={ChangePasswordScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="LoginLanguageScreen"
        component={LoginLanguageScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="LanguageScreen"
        component={LanguageScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="NotificationScreen"
        component={NotificationScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ headerShown: false }}
      />      
      <Stack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EditProfileScreen"
        component={EditProfileScreen}
        options={{ headerShown: false }}
      />       
    </Stack.Navigator>
  );
};

export default AppStack;
