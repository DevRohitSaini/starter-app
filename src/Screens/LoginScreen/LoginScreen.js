import React, { useState, useEffect, useContext } from 'react';
import { Image, SafeAreaView, Text, TouchableOpacity, View, Linking, PermissionsAndroid } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { TextInput } from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import { UserContextData } from '../../contexts/UserContext';
import { SuccessToast, ErrorToast } from '../../Toast/ToastMsg';
import constant from '../../CommanFiles/Constant/constant';
import { loginApi } from '../../Api/Api';
import { setLoggedUserDetails } from '../../utils/CommonUtils';
import CustomButton from '../../Components/CustomButton/CustomButton';
import icon from '../../CommanFiles/Constant/icon';
import ProgressLoader from 'rn-progress-loader';
import homeIcon from '../../Assets/Images/home-screen-logo.png';
import { useTranslation } from 'react-i18next';

const LoginScreen = ({ navigation }) => {   
    const { storeData, setstoreData } = useContext(UserContextData);
    const [Mobile, setUserMobile] = useState('');
    const [Password, setPassword] = useState('');
    const [loader, SetLoader] = useState(false);
    const [passwordTextEntry, setPasswordTextEntry] = useState(true);        
   
    useEffect(() => {        
    }, []);

    const onValidate = () => {
        if (Mobile == '' && Password == '') {
            ErrorToast('Please enter Mobile and Password');
        } else if (Mobile == '') {
            ErrorToast('Please enter Mobile');
        } else if (Password == '') {
            ErrorToast('Please enter Password');
        } else if (Password.length < 6) {
            ErrorToast('Please enter 6 character password');
        } else {
            login();
        }
    };

    const login = async () => {        
        SetLoader(true);
        let jsonData = {
            "mobile": Mobile,
            "password": Password
        };        
        const loginResponse = await loginApi(constant.loginUrl, jsonData, false);       
        if (loginResponse.isSuccess) {
            let userInfo = [];
            userInfo.push(loginResponse);
            setstoreData(userInfo);
            if (Platform.OS === 'android') {
                setLoggedUserDetails(JSON.stringify(userInfo));
            } else {
                setLoggedUserDetails(userInfo);
            }  
            navigation.navigate('HomeScreen');            
            SuccessToast('Login Successfully');
            SetLoader(false);
        } else {
            console.log('loginResponse.accessToken give error: ');
            ErrorToast('Please enter valid mobile and password');
            SetLoader(false);
        }
    }; 
       
    const sendMessage = ()=>{
        const Buffer = require("buffer").Buffer;
        const accountSid = 'ACbdc64987b57c84616ce06a1d2c7e78da';
        const authToken = '373a0f9df4dfb2d285a935a9e4acf446';
        const messageUrl = 'https://api.twilio.com/2010-04-01/Accounts/' + accountSid + '/Messages.json'

        const body = new FormData();
        body.append('To', '+916377358684');
        body.append('From', '+12545002887'); 
        body.append('Body', 'this is test message');
        // console.log('body ==>', body);

        const auth = accountSid + ':' + authToken
        const base64 = new Buffer(auth).toString('base64');
        console.log('base64 ==>', base64);

        fetch(messageUrl, {
            method: 'POST',  headers: {
            'Authorization': 'Basic ' + base64
            },
            body: body,
        })
        .then(response => response.json())  
        .then(data => console.log(data))
        .catch(error => console.error(error));
    }

    const sendMessages = ()=>{
        // console.log("toNumbers =>", toNumbers);
        // console.log("messageBody =>", messageBody);
        const Buffer = require("buffer").Buffer;
        const accountSid = 'ACbdc64987b57c84616ce06a1d2c7e78da';
        const authToken = '373a0f9df4dfb2d285a935a9e4acf446';
        const messageUrl = 'https://api.twilio.com/2010-04-01/Accounts/' + accountSid + '/Messages.json';
        let contacts = ['+916377358684', '+916377358684'];
        let messageBody = 'this is a test message!!';
        // let body; 
    
        const auth = accountSid + ':' + authToken
        const base64 = new Buffer(auth).toString('base64');
        console.log('base64 ==>', base64);
        const headers = {Authorization: 'Basic ' + base64 };
    
        contacts.forEach((contact)=> {
          // console.log('contact ==>', contact);
          let body = new FormData();
          body.append('To', contact);
          body.append('From', '+12545002887'); 
          body.append('Body', messageBody);
      
          // console.log('body ==>', body);
    
          fetch(messageUrl, {
            method: 'POST', 
            headers,
            body,
          })
          .then(response => response.json())  
          .then(data => {
            console.log(data)
            // console.log('response ==>', data.status)
          })
          .catch(error => console.error(error));
        })
    }

    const sendMessage2 = ()=>{
        const Buffer = require("buffer").Buffer;
        const accountSid = 'ACbdc64987b57c84616ce06a1d2c7e78da';
        const authToken = '373a0f9df4dfb2d285a935a9e4acf446';
        const messageUrl = 'https://api.twilio.com/2010-04-01/Accounts/' + accountSid + '/Messages.json'

        const auth = accountSid + ':' + authToken
        const base64 = new Buffer(auth).toString('base64');
        console.log('base64 ==>', base64);

        const body = new FormData();
        body.append('To', '+916377358684');
        body.append('From', '+12545002887'); 
        body.append('Body', 'this is first message');

        fetch(messageUrl, {
            method: 'POST',  headers: {
            'Authorization': 'Basic ' + base64
            },
            body: body,
        })
        .then(response => response.json())  
        .then(data => console.log(data))
        .catch(error => console.error(error));


        const body2 = new FormData();
        body2.append('To', '+916377358684');
        body2.append('From', '+12545002887'); 
        body2.append('Body', 'this is second message');

        fetch(messageUrl, {
            method: 'POST',  headers: {
            'Authorization': 'Basic ' + base64
            },
            body: body2,
        })
        .then(response => response.json())  
        .then(data => console.log(data))
        .catch(error => console.error(error));
    }

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

                    <View style={{ flex: 1, alignItems: 'center', margin: 20 }}>
                        <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                            <Image style={{ width: 140, objectFit:'contain' ,height: 120 }} source={homeIcon} />
                        </View>
                        <View style={{ flex: 1, justifyContent: 'center' }}>
                            <Text style={{ fontWeight: 'bold', color: '#283054', fontSize: 28 }}>{t('Login')}</Text>
                        </View>
                        <View style={{ flex: 1, justifyContent: 'center' }}>
                            <Text style={{ fontWeight: 'bold', color: '#283054', fontSize: 15 }}>{t('Glad to see you')}!</Text>
                        </View>
                    </View>
                    
                    <View style={{ flex: 1, margin: 20 }}>
                        <View style={{}}> 
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
                                    //setFarmerCode(value.replace(/[^a-zA-Z0-9]/, ''));
                                    setPassword(value);
                                }}
                                placeholder={t('Enter Your Password')}
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

                        <View style={{ marginTop: 20, flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text onPress={() =>  navigation.navigate('ForgotPasswordScreen') } style={{ color: '#707C98', alignSelf: 'center', fontSize: 12, fontFamily: 'Poppins-SemiBold' }}>{t('Forgot Password')}!</Text>
                            <Text onPress={() =>  navigation.navigate('OtpScreen') } style={{ color: '#707C98', fontSize: 12, fontFamily: 'Poppins-SemiBold' }}>{t('Login with OTP')}</Text>
                        </View> 

                        <CustomButton text={t('Login')}  onPress={() => onValidate()} additionalStyle={{ marginTop: 80 }} />
                    
                        <View style={{ marginTop: 44, flexDirection: 'row', justifyContent: 'center' }}>
                            <Text style={{ color: '#707C98', textTransform: 'uppercase', fontWeight: '400', alignSelf: 'center', fontSize: 12, fontFamily: 'Poppins-SemiBold' }}>{t('I am new here')}. </Text>
                            <TouchableOpacity
                                onPress={() => {  navigation.navigate('SignupScreen') }}>
                                <Text style={{ color: '#3786EE', textTransform: 'uppercase', fontWeight: '700', fontSize: 12, fontFamily: 'Poppins-Bold' }}>{t('Sign Up')}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </KeyboardAwareScrollView>

            </SafeAreaView>

        </LinearGradient>
    );
};

export default LoginScreen;