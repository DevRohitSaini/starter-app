import React, { useState, useEffect, useContext } from 'react';
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  Image,
  StatusBar,
  ActivityIndicator,
  FlatList,
  Alert,
  Keyboard,
  PermissionsAndroid,
  Platform
} from 'react-native';
// import { FlatList } from 'react-native-gesture-handler';
import Modal from 'react-native-modal';
import LinearGradient from 'react-native-linear-gradient';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { TextInput } from 'react-native-paper';
import constant from '../../CommanFiles/Constant/constant';
import icon from '../../CommanFiles/Constant/icon';
import styles from '../HomeScreen/HomeScreenStyle';
import { UserContextData } from '../../contexts/UserContext';
import ProgressLoader from 'rn-progress-loader';
import { ErrorToast, SuccessToast } from '../../Toast/ToastMsg';
import Moment from 'moment';
import SearchIcon from '../../Assets/Images/SearchIcon.png';
import LocationIcon from '../../Assets/Images/Location.png';
import ruppeIcon from '../../Assets/Images/ruppeIcon.png';
import bagIcon from '../../Assets/Images/bagIcon.png';
import timeIcon from '../../Assets/Images/timeIcon.png';
import locationMain from '../../Assets/Images/locationMain.png';
import notificationIcon from '../../Assets/Images/notification.png';
import Geolocation from 'react-native-geolocation-service';
import { useTranslation } from 'react-i18next';
import EmptyList from '../../Components/EmptyList/EmptyList';

const HomeScreen = ({ navigation }) => {
  const { storeData, setstoreData } = useContext(UserContextData);  
  const [loader, SetLoader] = useState(false);  
  const [refreshing, setRefreshing] = useState(false); 

  const getCurrentLocationLatLong = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: '',
            message: 'Need access to your location ',
          },
        );
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
          console.log('latLong=>',constant.latLong)
        } else {
          CommonUtilsObj.showErrorToast(Message.userLocationDenied)
          console.log('location permission denied');
        }
      } catch (err) {
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

  const onRefresh = () => {
    console.log('pull to refresh')    
    setRefreshing(true);
  };

  const { t, i18n } = useTranslation();

  useEffect(() => {
    getCurrentLocationLatLong();
  }, []);

  return (

    <LinearGradient
      colors={[
        constant.primaryGradiantColor,
        constant.secondaryGradiantColor,
      ]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={{ flex: 1 }}>

      <SafeAreaView style={{ flex: 1 }}>
        <ProgressLoader
          visible={loader}
          isModal={true}
          isHUD={true}
          hudColor={'#fff'}
          height={200}
          width={200}
          color={'#000'}
        />

        <View style={styles.headerStyle}>
          <TouchableOpacity onPress={() => {
            navigation.openDrawer();
            Keyboard.dismiss();
          }}>
            <Image source={icon.Menu} style={styles.headerIconStyle} />
          </TouchableOpacity>
          <Text style={{ fontSize: 21, fontWeight: '700' }}>{t('Dashboard')}</Text>
          <View style={{ flexDirection: 'row', }}>
          <TouchableOpacity 
            onPress={() => {navigation.navigate('NotificationScreen') }}>
            <Image style={styles.headerIconStyle} source={notificationIcon} />
          </TouchableOpacity>
          </View>
        </View>        

        
      </SafeAreaView>
    </LinearGradient>
  );
};

export default HomeScreen;
