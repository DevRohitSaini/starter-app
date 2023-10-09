import React, { useState, useEffect, useContext } from 'react';
import { Image, SafeAreaView, Text, TouchableOpacity, View, Linking, } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { TextInput } from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import { UserContextData } from '../../contexts/UserContext';
import { SuccessToast, ErrorToast } from '../../Toast/ToastMsg';
import constant from '../../CommanFiles/Constant/constant';
import { putApi, postApi } from '../../Api/Api';
import { setLoggedUserDetails } from '../../utils/CommonUtils';
import CustomButton from '../../Components/CustomButton/CustomButton';
import icon from '../../CommanFiles/Constant/icon';
import ProgressLoader from 'rn-progress-loader';
import homeIcon from '../../Assets/Images/home-screen-logo.png';
import { useTranslation } from 'react-i18next';

const ChangePasswordScreen = ({ navigation }) => {
   
    const { storeData, setstoreData } = useContext(UserContextData);
    const [OldPassword, setOldPassword] = useState('');
    const [PasswordMatch, setMatchPassword] = useState(false);
    const [NewPassword, setNewPassword] = useState('');
    const [loader, SetLoader] = useState(false);
    const [passwordTextEntry, setPasswordTextEntry] = useState(true);
        
    const onValidate = () => {
        if(PasswordMatch){
            if (NewPassword == '') {
                ErrorToast('Please enter password');
            } else if (NewPassword.length < 6) {
                ErrorToast('Please enter 6 character password');
            } else {
                SavePassword();
            }
        }else{
            if (OldPassword == '') {
                ErrorToast('Please enter old password');
            } else {
                checkCredentials();
            }
        }
        
    };

    const checkCredentials = async () => {        
        SetLoader(true);
        let jsonData = {
            "password": OldPassword
        };      
        let apiUrl = constant.userApi+'check-credentials/' + storeData[0].user._id;
        const apiResponse = await postApi(apiUrl, String(storeData[0].accessToken), jsonData); 
        console.log('apiResponse: ',apiResponse);      
        if (apiResponse.isSuccess) {
            setMatchPassword(true);
            SetLoader(false);
        } else {
            console.log('loginResponse: ',apiResponse);
            ErrorToast('Please enter valid password');
            SetLoader(false);
        }
    };

    const SavePassword = async () => {
        SetLoader(true);       
        
        let jsonData = {
            "password" : NewPassword           
        } 
        let url = constant.userApi + storeData[0].user._id;        
        const apiResponse2 = await putApi(url, String(storeData[0].accessToken), jsonData);
        console.log('ApiResponse: ',apiResponse2); 
        if (apiResponse2.isSuccess) {          
            setMatchPassword(false);
            navigation.navigate('SettingScreen');
            SuccessToast('Your password has been changed.');
            SetLoader(false);
        } else {
            ErrorToast('error: your request is not submitted.'); 
            SetLoader(false);
        }
    }; 
    

    const { t, i18n } = useTranslation();
    
    useEffect(() => {
        
    }, []);

    return (
        <LinearGradient
            colors={[constant.primaryGradiantColor, constant.secondaryGradiantColor]}
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
                
                <KeyboardAwareScrollView
                    keyboardShouldPersistTaps="handled"
                    contentContainerStyle={{ flexGrow: 1 }}
                    showsVerticalScrollIndicator={false}
                    onKeyboardWillShow={(frames) => {
                        console.log('Keyboard event', frames)
                    }}>
                    <View>
                        <TouchableOpacity
                            style={{ justifyContent: 'center', marginLeft: -5 }}
                            onPress={() => navigation.navigate('SettingScreen')}>
                            <Image
                                source={require('../../Assets/Icons/Back.png')}
                            />
                        </TouchableOpacity>                    
                    </View>

                    <View style={{ flex: 1, alignItems: 'center', margin: 20 }}>
                        <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                            <Image style={{ width: 130, height: 120 }} source={homeIcon} />
                        </View>
                        <View style={{ flex: 1, justifyContent: 'center' }}>
                            <Text style={{ fontWeight: 'bold', color: '#283054', fontSize: 28 }}>{t('Change Password')}</Text>
                        </View>
                        <View style={{ flex: 1, justifyContent: 'center' }}>
                        {(() => {
                            if(!PasswordMatch){                            
                                return (
                                <Text style={{ fontWeight: 'bold', color: '#283054', fontSize: 15 }}>{t('Confirm your old password')}</Text>
                                )
                            }else{
                                return (
                                    <Text style={{ fontWeight: 'bold', color: '#283054', fontSize: 15 }}>{t('Your new password')}</Text>
                                )
                            }         
                        })()}
                        </View>
                    </View>
                    
                    <View style={{ flex: 1, margin: 20 }}>                        
                    {(() => {
                        if(PasswordMatch){                            
                            return (
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
                            return (
                            <View style={{ marginTop: 10 }}>
                                <TextInput
                                    name="OldPassword"
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
                                    value={OldPassword}
                                    label={t('Password')}
                                    onChangeText={value => {
                                        //setFarmerCode(value.replace(/[^a-zA-Z0-9]/, ''));
                                        setOldPassword(value);
                                    }}
                                    placeholder={t('Enter your current password')}
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
                        }         
                    })()}
                        <CustomButton text={t('Submit')} onPress={() => onValidate()} additionalStyle={{ marginTop: 80 }} />                        
                    </View>
                </KeyboardAwareScrollView>

            </SafeAreaView>

        </LinearGradient>
    );
};

export default ChangePasswordScreen;