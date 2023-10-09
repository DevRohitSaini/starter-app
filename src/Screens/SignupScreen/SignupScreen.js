import React, { useState, useEffect, useContext } from 'react';
import { Image, SafeAreaView, Text, TouchableOpacity, View, Linking } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { TextInput } from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import { UserContextData } from '../../contexts/UserContext';
import { SuccessToast, ErrorToast } from '../../Toast/ToastMsg';
import constant from '../../CommanFiles/Constant/constant';
import { signupApi, loginApi } from '../../Api/Api';
import { setLoggedUserDetails } from '../../utils/CommonUtils';
import CustomButton from '../../Components/CustomButton/CustomButton';
import icon from '../../CommanFiles/Constant/icon';
import ProgressLoader from 'rn-progress-loader';
import { useTranslation } from 'react-i18next';
import SelectDropdown from 'react-native-select-dropdown';
import styles from '../HomeScreen/HomeScreenStyle';
import Fontisto from 'react-native-vector-icons/Fontisto';
import auth from '@react-native-firebase/auth';

const SignupScreen = ({ route, navigation }) => {
    const { storeData, setstoreData } = useContext(UserContextData);
    const [Fullname, SetFullname] = useState('');
    const [Mobile, setMobile] = useState('');
    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');
    const [loader, SetLoader] = useState(false);
    const [passwordTextEntry, setPasswordTextEntry] = useState(true);

    const [isSent, setIsSent] = useState(false);
    const [authUser, setAuthUser] = useState(null);
    const [confirm, setConfirm] = useState(null);
    const [code, setCode] = useState('');

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber;
    }, []);

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

    const onValidate = () => {
        if (Fullname == '' && Mobile == '' && Email == '' && Password == '') {
            ErrorToast('Please enter required fields');
        } else if (Fullname == '') {
            ErrorToast('Please enter your full name');
        } else if (Mobile == '') {
            ErrorToast('Please enter mobile number');
        } else if (Email !== '' && constant.KEmailRegex.test(Email) === false) {
            ErrorToast('Please enter valid email');
        } else if (Password == '') {
            ErrorToast('Please enter password');
        } else if (Password.length < 6) {
            ErrorToast('Please enter 6 character password');
        } else {
            confirmUser();
        }
    };

    const confirmUser = async () => {
        SetLoader(true);
        let jsonData = {
            "mobile": Mobile,
        };
        const confirmUserApiUrl = constant.checkCredential;
        const confirmUserApi = await loginApi(confirmUserApiUrl, jsonData, false);
        if (confirmUserApi.isSuccess) {
            console.log('loginResponse.accessToken give error:');
            ErrorToast('Mobile number already exist.');
            SetLoader(false);
        } else {
            sendOtp();
            SetLoader(false);
        }
    }

    const sendOtp = async () => {
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

    const onValidateCode = () => {
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
            SetLoader(false)
            signup();
        } catch (error) {
            SetLoader(false)
            alert('Invalid code');
        }
    }

    const signup = async () => {
        SetLoader(true);
        let jsonData = {
            "name": Fullname,
            "mobile": Mobile,
            "email": Email,
            "password": Password,
            "addressCoordinates": constant.latLong
        };
        const signupResponse = await signupApi(constant.signupUrl, jsonData, false);
        if (signupResponse.isSuccess) {
            let userInfo = [];
            userInfo.push(signupResponse);
            setstoreData(userInfo);
            if (Platform.OS === 'android') {
                setLoggedUserDetails(JSON.stringify(userInfo));
            } else {
                setLoggedUserDetails(userInfo);
            }
            navigation.navigate('HomeScreen');
            SuccessToast('Account created successfully');
            SetLoader(false);
        } else {
            console.log('loginResponse.accessToken give error: ');
            ErrorToast('Please enter valid Username and password');
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
                    <TouchableOpacity
                        style={{ justifyContent: 'center', marginLeft: -5 }}
                        onPress={() => {
                            navigation.goBack()
                        }
                        }>
                        <Image
                            source={require('../../Assets/Icons/Back.png')}
                        />
                    </TouchableOpacity>
                    <View style={{ flex: 1, alignItems: 'center', margin: 20 }}>
                        <View style={{ flex: 1, justifyContent: 'center', marginBottom: 0, lineHeight: 30 }}>
                            <Text style={{ fontWeight: 'bold', color: '#283054', fontSize: 25, }}>{t('Sign Up')}</Text>
                        </View>
                        <View style={{ flex: 1, justifyContent: 'center', padding: 0, marginTop: -40, lineHeight: 0 }}>
                            {(() => {
                                if (isSent) {
                                    return (
                                        <Text style={{ fontWeight: 'bold', color: '#283054', fontSize: 15 }}>{t('Enter the OTP sent to')} +91 {Mobile}</Text>
                                    )
                                } else {
                                    return (
                                        <Text style={{ fontWeight: 'bold', color: '#283054', fontSize: 15 }}>{t('Create a new account')}</Text>
                                    )
                                }
                            })()}
                        </View>
                    </View>
                    {(() => {
                        if (isSent) {
                            return (
                                <View style={{ flex: 1, margin: 20 }}>
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
                                    <View style={{ marginTop: 20, flexDirection: 'row', }}>
                                        <Text style={{ color: '#707C98', textTransform: 'uppercase', fontWeight: '400', alignSelf: 'center', fontSize: 12, fontFamily: 'Poppins-SemiBold' }}>{t('Didn\'t receive OTP')}? </Text>
                                        <TouchableOpacity
                                            onPress={() => { sendOtp() }}>
                                            <Text style={{ color: '#3786EE', textTransform: 'uppercase', fontWeight: '700', fontSize: 12, fontFamily: 'Poppins-Bold' }}>{t('RESEND OTP')}</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <CustomButton text={t('Sign Up')} onPress={() => onValidateCode()} additionalStyle={{ marginTop: 20 }} />
                                </View>
                            )
                        } else {
                            return (
                                <View style={{ flex: 1, margin: 20 }}>

                                    <View style={{ marginTop: 10 }}>
                                        <TextInput
                                            mode="outlined"
                                            label={t('Full Name')}
                                            placeholder={t('Enter your full Name')}
                                            keyboardType='default'
                                            returnKeyType='next'
                                            outlineColor='#ACB4D1'
                                            value={Fullname}
                                            onChangeText={value => {
                                                SetFullname(value);
                                            }}
                                            theme={{
                                                roundness: 0,
                                                colors: {
                                                    background: '#FFFFFF',
                                                    primary: "#ACB4D1",
                                                    text: '#787F9C',
                                                    placeholder: '#787F9C',
                                                },
                                            }}
                                        />
                                    </View>
                                    <View style={{ marginTop: 10 }}>
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
                                                setMobile(value);
                                            }}
                                            placeholder={t('Enter Your Mobile Number')}
                                        />
                                    </View>
                                    <View style={{ marginTop: 10 }}>
                                        <TextInput
                                            name="Email Address"
                                            mode="outlined"
                                            keyboardType='email-address'
                                            returnKeyType='next'
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
                                            value={Email}
                                            label={t('Email Id')}
                                            onChangeText={value => {
                                                setEmail(value);
                                            }}
                                            placeholder={t('Enter Your Email Id')}
                                        />
                                    </View>
                                    <View style={{ marginTop: 10 }}>
                                        <TextInput
                                            name="Password"
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
                                            value={Password}
                                            label={t('Password')}
                                            onChangeText={value => {
                                                setPassword(value);
                                            }}
                                            placeholder={t('Create Your Password')}
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

                                    <CustomButton text={t('SEND OTP')} onPress={() => onValidate()} additionalStyle={{ marginTop: 20 }} />
                                    <View style={{ marginTop: 30, flexDirection: 'row', justifyContent: 'center' }}>
                                        <Text style={{ color: '#707C98', textTransform: 'uppercase', fontWeight: '400', alignSelf: 'center', fontSize: 12, fontFamily: 'Poppins-SemiBold' }}>{t('Already have an account')}? </Text>
                                        <TouchableOpacity
                                            onPress={() => { navigation.navigate('LoginScreen') }}>
                                            <Text style={{ color: '#3786EE', textTransform: 'uppercase', fontWeight: '700', fontSize: 12, fontFamily: 'Poppins-SemiBold' }}>{t('Login')}</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            )
                        }
                    })()}

                </KeyboardAwareScrollView>

            </SafeAreaView>
        </LinearGradient>
    );
};

export default SignupScreen;