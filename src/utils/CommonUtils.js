import userDefaults from 'react-native-user-defaults';
import DefaultPreference from 'react-native-default-preference';
import { Platform } from 'react-native';
import constant from '../CommanFiles/Constant/constant';



const setLoggedUserDetails = data => {
  console.log('Data', data);
  if (Platform.OS === 'android') {
    DefaultPreference.set(constant.KUserDetailsKey, data)
      .then(data => getLoggedUserDetails())
      .catch(function (err) {
        console.log(err);
      });
  } else {
    userDefaults
      .set(constant.KUserDetailsKey, data)
      .then(data => getLoggedUserDetails());
  }
};

const getLoggedUserDetails = () => {
  console.log("Calling getLoggedUserDetails from CommonUtils....")
  let loggedUserData = [];
  let authenticationToken = '';
  if (Platform.OS === 'android') {
    return DefaultPreference.get(constant.KUserDetailsKey)
      .then(function (data) {
        let obj = JSON.parse(data);

        console.log('User Details =>' + JSON.stringify(obj));
        let Data = {
          userDataObj: obj,
        };
        return Data;
      })
      .catch(function (err) {
        console.log(err);
      });
  } else {
    return userDefaults
      .get(constant.KUserDetailsKey)
      .then(data => {
        let obj = JSON.parse(data);
        let Data = {
          userDataObj: obj,
        };
        console.log("User Details Data done... ");
        return Data;

      })
      .catch(function (err) {
        console.log("Error: ", err);
      });
  }
};

export { setLoggedUserDetails, getLoggedUserDetails };
