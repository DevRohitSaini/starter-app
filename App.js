/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';

import {
  StatusBar,
  Platform,
  Alert,
  PermissionsAndroid
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { UserContextData } from './src/contexts/UserContext';
import { getLoggedUserDetails } from './src/utils/CommonUtils';
import RootNavigation from './src/Navigations/RootNavigation/RootNavigation';
import { RootSiblingParent } from 'react-native-root-siblings';
import SplashScreen from 'react-native-splash-screen';
import Geolocation from 'react-native-geolocation-service';
import constant from './src/CommanFiles/Constant/constant';

const App = () => {

  const [userDataObj, setUserDataObj] = useState([]);
  const [storeData, setstoreData] = useState('');
  const [data, setData] = useState('');

  useEffect(() => {
    getData();
    getCurrentLocationLatLong();
    setTimeout(() => {
      SplashScreen.hide();
    }, 3000);
  }, []);


  const getData = async () => {    
    let Data = await getLoggedUserDetails();    
    if (Data !== undefined && Data.userDataObj !== 'null') {
      setUserDataObj(Data.userDataObj);
      setstoreData(Data.userDataObj)      
      setData(Data)      
    } else {
      setstoreData('');
      Data.userDataObj([])
      setData(Data)
    }    
  };

  const getCurrentLocationLatLong = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            'title': 'Job Portal WFH App',
            'message': 'We need to access your location in order to list a job near you.',
            'buttonPositive': 'OK',
          }
        );
        console.log("granted: ",granted);
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Geolocation PermissionsAndroid =>',PermissionsAndroid.RESULTS.GRANTED);
          Geolocation.getCurrentPosition(
            position => {              
              constant.latLong.latitude = position.coords.latitude;
              constant.latLong.longitude = position.coords.longitude;
            },
            error => {
              Alert.alert(error);
            },
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 10000 },
          );
          console.log(constant.latLong)
        } else {
          CommonUtilsObj.showErrorToast(Message.userLocationDenied)
          console.log('location permission denied');
        }
      } catch (err) {
        console.log(err);
        Alert.alert(err);
      }
    } else {
      const auth = await Geolocation.requestAuthorization('whenInUse');      
      if (auth === 'granted') {
        Geolocation.getCurrentPosition(
          position => {
            //Alert.alert("getCurrentLocationLatLong - position Granted")
            console.log('location api called...');
            constant.latLong.latitude = position.coords.latitude;
            constant.latLong.longitude = position.coords.longitude;
          },
          error => {
            //Alert.alert("getCurrentLocationLatLong - Location permission denined");
            console.log('location permission denied' + error);
          },
          { enableHighAccuracy: true, timeout: 20000, maximumAge: 10000 },
        );
      }
    }
  };

  return (
    <>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor={'#ECF4FE'}//{Colors.lighter}
      />
      <UserContextData.Provider value={{ storeData, setstoreData }}>
        <NavigationContainer>
          <RootSiblingParent>
            <RootNavigation />
          </RootSiblingParent>
        </NavigationContainer>
      </UserContextData.Provider>
    </>
  );
};

export default App;
