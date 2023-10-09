import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  SafeAreaView,
  ScrollView,
  Text,
  Alert,
  Platform,
  Image,
  TouchableOpacity,
} from 'react-native';
// import userDefaults from 'react-native-user-defaults';
// import DefaultPreference from 'react-native-default-preference';
import ProgressLoader from 'rn-progress-loader';
import style from './SideMenuStyle';
import languageIcon from '../../../Assets/Images/language.png';
import jobpost from '../../../Assets/Images/job-post.png';
import next from '../../../Assets/Images/right-ico.png';
import close from '../../../Assets/Icons/Close.png';
import profile from '../../../Assets/Images/profileIcon.png';
import myjob from '../../../Assets/Images/myjobIcon.png';
import setting from '../../../Assets/Images/settingIcon.png';
import logout from '../../../Assets/Images/logoutIcon.png';
import profileImg from '../../../Assets/Images/profileImage.png';
import manageAccount from '../../../Assets/Images/manageAccount.png';
import { UserContextData } from '../../../contexts/UserContext';
import { setLoggedUserDetails } from '../../../utils/CommonUtils';
import { SuccessToast, ErrorToast } from '../../../Toast/ToastMsg';
import Language from '../../../Assets/Images/languageIcon.png';
import { useTranslation } from 'react-i18next';
import Fontisto from 'react-native-vector-icons/Fontisto';
import dashboardIcon from '../../../Assets/Images/dashboardIcon.png'
import constant from '../../../CommanFiles/Constant/constant';

let image = {
  uri: 'https://cdn2.vectorstock.com/i/1000x1000/20/76/man-avatar-profile-vector-21372076.jpg',
};

const SideMenu = ({ navigation }) => {
  // const navigation = useNavigation();
  //const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext)

  const [selectedIndex, setSelectedIndex] = useState(1);
  const { storeData, setstoreData } = useContext(UserContextData);
  const [AccountType, settype] = useState('');
  const [loading, setLoading] = useState(false);
  const [loader, SetLoader] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [active, setActive] = useState(false);
  const CurrentUserName = '';
  const CurrentUserMobile = '';

  useEffect(() => {
  }, []);

  const onPressLogOut = async () => {

    Alert.alert(
      "Logout",
      "Are you sure, you want to Logout?",
      [
        {
          text: "No",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "Yes", onPress: () => { console.log("OK Pressed"); onConfirmPressLogOut(); } }
      ],
      { cancelable: false },
    );
  };

  const onConfirmPressLogOut = async () => {
    console.log('logout');
    setLoading(true);
    setstoreData('');
    if (Platform.OS === 'android') {
      setLoggedUserDetails(JSON.stringify(''));
    } else {
      setLoggedUserDetails('');
    }
    navigation.navigate('LoginScreen');
    SuccessToast('Logout Successfully')
    setLoading(false);
  };

  const onRefresh = () => {
    console.log('pull to refresh')
    setRefreshing(true);
    setJobData([]);
    setPage(1);
    setTimeout(() => { getJobsDetails(1); }, 1000);
  };

  const { t, i18n } = useTranslation();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ProgressLoader
        visible={loading}
        isModal={true}
        isHUD={true}
        hudColor={'#fff'}
        height={200}
        width={200}
        color={'#000'}
      />
      <View style={style.container}>

        <ScrollView
          // {...props}
          showsVerticalScrollIndicator={false}>

          <TouchableOpacity onPress={() => { navigation.closeDrawer() }}>
            <Image style={{ marginTop: 15, padding: 15, }} source={close} />
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.8}
            style={style.userInfoSection}
            onPress={() => {
              navigation.navigate('ProfileScreen');
            }}>
            <View style={[{
              marginRight: 10,
              borderRadius: 5,
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
            }]}
            >
              <View>
                {(() => {
                  if (storeData && storeData[0].user && storeData[0].user['profileImageURL']) {
                    let source = storeData[0].user['profileImageURL'];
                    {/* let subStr = source.split('3000/')[1]; */ }
                    let imgUri = constant.serverUrl + source;
                    return (<Image style={{ width: 50, height: 50, marginRight: 15, marginLeft: 15, borderRadius: 5 }} source={{ uri: imgUri + '?' + new Date() }} />)
                  } else {
                    return (<Image style={{ width: 50, height: 50, marginRight: 15, marginLeft: 15, borderRadius: 5 }} source={profileImg} />)
                  }
                })()}
              </View>

              {(() => {
                if (storeData && storeData[0].user) {
                  return (
                    <View>
                      <Text style={{ fontWeight: "700", fontSize: 16 }} >
                        {storeData[0].user['name']}
                      </Text>

                      <Text style={{ fontWeight: "700", fontSize: 12, marginTop: 5 }}>
                        {storeData[0].user['mobile']}
                      </Text>
                    </View>
                  )
                }
              })()}
            </View>
          </TouchableOpacity>

          <View
            style={{
              width: '100%',
              height: 1,
              backgroundColor: '#E9EBEF',
              marginTop: 10,
              marginBottom: 20
            }}
          />
          <View style={{ width: '100%', }}>

            <TouchableOpacity
              onPress={() => {
                navigation.navigate('HomeScreen');
              }}
              style={{
                display: 'flex',
              }}
            >
              <View style={{
                flexDirection: 'row', width: '100%', justifyContent: 'space-between', alignItems: 'center',
                backgroundColor: "#F8FCFF", padding: 10,
              }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    width: '90%',
                    marginTop: 10,
                  }}>
                  {selectedIndex == 1 ? (
                    <Image style={{ width: 40, height: 40 }} source={dashboardIcon} />
                  ) : (
                    <Image style={{ width: 40, height: 40 }} source={dashboardIcon} />
                  )}
                  <Text style={{ marginLeft: 10, fontWeight: "700" }}
                  >
                    {t('Dashboard')}
                  </Text>
                </View>
                <View style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 10,
                  width: '15%',
                }}>
                  <Image source={next} />
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => { navigation.navigate('ProfileScreen') }}>

              <View style={{
                flexDirection: 'row', width: '100%', justifyContent: 'space-between', alignItems: 'center',
                backgroundColor: "#F8FCFF", padding: 10, marginTop: 10,
              }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    width: '90%',
                    marginTop: 10,
                  }}>
                  {selectedIndex == 1 ? (
                    <Image style={{ width: 40, height: 40 }} source={profile} />
                  ) : (
                    <Image style={{ width: 40, height: 40 }} source={profile} />
                  )}
                  <Text style={{ marginLeft: 10, fontWeight: "700" }}
                  >
                    {t('Profile')}
                  </Text>
                </View>
                <View style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 10,
                  width: '15%',
                }}>
                  <Image source={next} />
                </View>
              </View>
            </TouchableOpacity> 

            <TouchableOpacity
              onPress={() => { navigation.navigate('LanguageScreen') }}
            >
              <View style={{
                flexDirection: 'row', width: '100%', justifyContent: 'space-between', alignItems: 'center',
                backgroundColor: "#F8FCFF", marginTop: 15, padding: 10
              }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    width: '90%',
                  }}>
                  {selectedIndex == 1 ? (
                    <Image style={{ width: 40, height: 40 }} source={Language} />
                  ) : (
                    <Image style={{ width: 40, height: 40 }} source={Language} />
                  )}
                  <Text style={{ marginLeft: 10, fontWeight: "700" }}
                  >
                    {t('Language Setting')}
                  </Text>
                </View>
                <View style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 10,
                  width: '15%',
                }}>
                  <Image source={next} />
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => { navigation.navigate('SettingScreen') }}
            >
              <View style={{
                flexDirection: 'row', width: '100%', justifyContent: 'space-between', alignItems: 'center',
                backgroundColor: "#F8FCFF", marginTop: 15, padding: 10
              }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    width: '90%',
                  }}>
                  {selectedIndex == 1 ? (
                    <Image style={{ width: 40, height: 40 }} source={setting} />
                  ) : (
                    <Image style={{ width: 40, height: 40 }} source={setting} />
                  )}
                  <Text style={{ marginLeft: 10, fontWeight: "700" }}
                  >
                    {t('Setting')}
                  </Text>
                </View>
                <View style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 10,
                  width: '15%',
                }}>
                  <Image source={next} />
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => onPressLogOut()}
            >
              <View style={{
                flexDirection: 'row', width: '100%', justifyContent: 'space-between', alignItems: 'center',
                backgroundColor: "#F8FCFF", marginTop: 15, padding: 10
              }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    width: '90%',
                  }} onPress={() => onPressLogOut()}>
                  {selectedIndex == 1 ? (
                    <Image style={{ width: 40, height: 40 }} source={logout} />
                  ) : (
                    <Image style={{ width: 40, height: 40 }} source={logout} />
                  )}
                  <Text style={{ marginLeft: 10, fontWeight: "700" }}
                  >
                    {t('Logout')}
                  </Text>
                </View>
                <View style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 10,
                  width: '15%',
                }}>
                  <Image source={next} />
                </View>
              </View>
            </TouchableOpacity>

          </View>
        </ScrollView>

        <View
          style={{
            width: '100%',
            height: 0.5,
            backgroundColor: 'black',
          }}
        />

      </View>
    </SafeAreaView>
  );
};

export default SideMenu;




