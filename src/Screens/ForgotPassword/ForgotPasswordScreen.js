import React, { useState, useRef, useEffect, useContext } from 'react';
import { Image, SafeAreaView, Text, TouchableOpacity, View, Linking, Keyboard, Alert } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { TextInput } from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import { UserContextData } from '../../contexts/UserContext';
import { SuccessToast, ErrorToast } from '../../Toast/ToastMsg';
import constant from '../../CommanFiles/Constant/constant';
import { setLoggedUserDetails } from '../../utils/CommonUtils';
import CustomButton from '../../Components/CustomButton/CustomButton';
import icon from '../../CommanFiles/Constant/icon';
import auth from '@react-native-firebase/auth';
import { useTranslation } from 'react-i18next';
import { loginApi, putApi, passwordApi } from '../../Api/Api';


const ForgotPasswordScreen = ({ navigation }) => {
  const { storeData, setstoreData } = useContext(UserContextData);
  const [loader, SetLoader] = useState(false);
  const [Mobile, setUserMobile] = useState('');
  const [isSent, setIsSent] = useState(false);
  const [isConfirm, setIsConfirm] = useState(false);

  const [authUser, setAuthUser] = useState(null);
  const [confirm, setConfirm] = useState(null);
  const [code, setCode] = useState('');

  const [NewPassword, setNewPassword] = useState('');
  const [passwordTextEntry, setPasswordTextEntry] = useState(true);

  const onAuthStateChanged = async userAuth => {
    if (!userAuth) {
      return;
    }
    if (userAuth) {
      console.log(userAuth);
      setAuthUser(userAuth);
    }
    return () => userReference();
  };

  const signOut = async () => {
    auth().signOut();
    setAuthUser(null);
    setIsSent(false);
    return () => userReference();
  };

  useEffect(() => {      
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  const confirmUser = async () => { 
    SetLoader(true); 
    if(Mobile ==''){
      ErrorToast('Please enter Mobile number');
      SetLoader(false);
    }else{      
      let jsonData = {
        "mobile": Mobile,
      };
      const confirmUserApiUrl = constant.checkCredential;
      const confirmUserApi  = await loginApi(confirmUserApiUrl, jsonData, false);
      
      if (confirmUserApi.isSuccess) {
        sendOtp();
        SetLoader(false);
      } else {
          console.log('loginResponse.accessToken give error:');
          ErrorToast('User not found, invalid mobile number.');
          SetLoader(false);
      }
    }
  }

  const sendOtp = async ()=>{
    SetLoader(true);
    console.log('ok=>', Mobile);
    try {
      const confirmation = await auth().signInWithPhoneNumber(
        `+91${String(Mobile)}`,
        true,
      );
      setConfirm(confirmation);
      console.log('msg', confirmation);
      setIsSent(true);      
      SetLoader(false);
    } catch (error) {
     console.log('Error.', error);
      SetLoader(false);
      ErrorToast('too many requests please try again later');
    }
  }

  const onValidate = () => {
    if (code == '') {
        ErrorToast('Please enter code');
    } else {            
      confirmCode();            
    }
  };
    
  const confirmCode = async () => {  
    SetLoader(true); 
    try {
      const verify = await confirm.confirm(code);
      setConfirm(null);
      setIsConfirm(true);
      SetLoader(false)      
    } catch (error) {
      SetLoader(false)
      alert('Invalid code');
    }
  } 

  const onValidatePassword = () => {    
    if (NewPassword == '') {
        ErrorToast('Please enter password');
    } else if (NewPassword.length < 6) {
        ErrorToast('Please enter 6 character password');
    } else {
        SavePassword();
    }           
  };

  const SavePassword = async () => {
    SetLoader(true); 
    let jsonData = {
        "mobile": Mobile,
        "password" : NewPassword           
    }     
    let url = constant.changePassword;         
    const apiResponse = await passwordApi(url, jsonData);
    if (apiResponse.isSuccess) { 
        navigation.navigate('LoginScreen');
        SuccessToast('Your password has been changed.');
        SetLoader(false);
    } else {
        ErrorToast('error: your request is not submitted.'); 
        SetLoader(false);
    }
  }; 

  const { t, i18n } = useTranslation();

  return (
    <LinearGradient
      colors={[constant.primaryGradiantColor, constant.secondaryGradiantColor]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAwareScrollView style={{ flex: 1 }}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}>
          <View style={{ flex: 1 }}>
            <View style={{ marginTop: 45, alignItems: 'center' }}>

            </View>
            <TouchableOpacity
              style={{ justifyContent: 'center', marginLeft: -5 }}
              onPress={() =>  navigation.goBack() }>
              <Image
                source={require('../../Assets/Icons/Back.png')}
              />
            </TouchableOpacity>

            <View style={{ marginTop: 20, marginHorizontal: 20 }}>
            {(() => {
              if(isConfirm){
                return(
                  <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'black' }}>
                    {t('Your new password')}
                  </Text>
                )
              }else{
                if(isSent){
                  return(
                  <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'black' }}>
                    {t('Enter the OTP sent to')} +91 {Mobile}
                  </Text>
                  )
                }else{
                  return(
                  <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'black' }}>
                    {t('Enter Your Mobile Number')}
                  </Text>
                  )
                }
              }              
            })()}

              {(() => {
                if(isConfirm){
                  return(
                    <View style={{ marginTop: 10 }}>
                      <TextInput
                          name="NewPassword"
                          mode="outlined"
                          keyboardType='ascii-capable'
                          secureTextEntry={passwordTextEntry ? true : false}
                          returnKeyType='done'
                          outlineColor='#ACB4D1'
                          theme={{
                              roundness: 0,
                              colors: {
                                  background: '#FFFFFF',
                                  primary: "#ACB4D1",
                                  text: '#787F9C',
                                  placeholder: '#787F9C',
                              },
                          }}
                          value={NewPassword}
                          label={t('New Password')}
                          onChangeText={value => {
                              //setFarmerCode(value.replace(/[^a-zA-Z0-9]/, ''));
                              setNewPassword(value);
                          }}
                          placeholder={t('Enter your new password')}
                      />
                      <TouchableOpacity
                          onPress={() => { setPasswordTextEntry(!passwordTextEntry) }}
                          style={{
                              position: 'absolute',
                              right: 0,
                              bottom: 12,
                              marginRight: 15,
                              zIndex: 1
                          }}>
                          <Image
                              source={passwordTextEntry ? icon.Eye : icon.EyeOff}
                              style={{ width: 34, height: 34, tintColor: '#787F9C' }}
                          />
                      </TouchableOpacity>
                    </View> 
                  )
                }else{
                  if(isSent){
                    return(
                      <View> 
                          <TextInput
                              name="otp"
                              mode="outlined"
                              keyboardType='numeric'
                              returnKeyType='next'
                              outlineColor='#ACB4D1'
                              maxLength={6}
                              theme={{
                                  roundness: 0,
                                  colors: {
                                      background: '#FFFFFF',
                                      primary: "#ACB4D1",
                                      text: '#787F9C',
                                      placeholder: '#787F9C'
                                  },
                              }}
                              value={code}
                              label={t('Enter OTP')}
                              onChangeText={value => {                                 
                                setCode(value);
                              }}
                          />
                      </View>
                    )
                  }else{
                    return(
                      <View> 
                          <TextInput
                              name="Mobile"
                              mode="outlined"
                              keyboardType='numeric'
                              returnKeyType='next'
                              outlineColor='#ACB4D1'
                              maxLength={10}
                              theme={{
                                  roundness: 0,
                                  colors: {
                                      background: '#FFFFFF',
                                      primary: "#ACB4D1",
                                      text: '#787F9C',
                                      placeholder: '#787F9C'
                                  },
                              }}
                              value={Mobile}
                              label={t('Mobile Number')}
                              onChangeText={value => {                                 
                                  setUserMobile(value);
                              }}
                              placeholder={t('Enter Your Mobile Number')}
                          />
                      </View>
                    )
                  }
                }                
              })()}
              {(() => {
                if(isSent){
                  return(
                  <View style={{ marginTop: 20, flexDirection: 'row', }}>
                    <Text style={{ color: '#707C98', textTransform: 'uppercase', fontWeight: '400', alignSelf: 'center', fontSize: 12, fontFamily: 'Poppins-SemiBold' }}>{t('Didn\'t receive OTP')}? </Text>
                    <TouchableOpacity
                      onPress={() => { sendOtp() }}>
                      <Text style={{ color: '#3786EE', textTransform: 'uppercase', fontWeight: '700', fontSize: 12, fontFamily: 'Poppins-Bold' }}>{t('RESEND OTP')}</Text>
                    </TouchableOpacity>
                  </View>
                  )
                }
              })()}
            </View>

          </View>
          {(() => {
            if(isConfirm){
              return(              
              <View style={{ marginTop: 40, marginBottom: 30, marginHorizontal: 20, }}>
                <CustomButton text={t('Update')} onPress={() => onValidatePassword()} />
              </View>
              )
            }else{            
              if(isSent){
                return(              
                <View style={{ marginTop: 40, marginBottom: 30, marginHorizontal: 20, }}>
                  <CustomButton text={t('Submit')} onPress={() => onValidate()} />
                </View>
                )
              }else{
                return(
                <View style={{ marginTop: 40, marginBottom: 30, marginHorizontal: 20, }}>
                  <CustomButton text={t('SEND OTP')} onPress={() => confirmUser()} />
                </View>
                )
              }
            }
          })()}
          
        </KeyboardAwareScrollView>

      </SafeAreaView>
    </LinearGradient>

  );
};

export default ForgotPasswordScreen;