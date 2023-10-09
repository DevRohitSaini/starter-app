import { Dimensions } from 'react-native';
/*need to chage as per development or prodcution*/

//const serverURL = 'https://api.ocaapp.ch/';
const serverURL = "http://192.168.1.2:4000/"
const apiURL = serverURL + "api/";
//const siteURL = "http://45.80.152.23:4552/";

const isAWS = false;

const headerFormData = {
    Accept: 'application/json',
    'Content-Type': 'multipart/form-data',
};
const headerURLEncoded = {
    Accept: 'application/json',
    'Content-Type': 'application/x-www-form-urlencoded',
    Authorization: 'Bearer ',
};

const headerJSON = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    //"Authorization": 'Bearer ',
};

const constant = {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,

    latLong:{
        latitude:'',
        longitude:''
    },

    headerFormData: headerFormData,
    headerURLEncoded: headerURLEncoded,
    headerJSON: headerJSON,

    primaryGradiantColor: '#FFFFFF',
    secondaryGradiantColor: '#FFFFFF',
    borderColor: '#EFF4F9',
    border2Color: '#EFF4F9',
    InActiveIconColor: '#A2A8C2',
    ActiveIconColor: '#74B1FA',
    display:'flex',
    
    isAws: isAWS,
    serverUrl : serverURL,
    apiUrl: apiURL,
    // mainSiteUrl: 'https://portal.goindia.care/signup?employee',
    loginUrl: apiURL + 'auth/login/',
    signupUrl: apiURL + 'auth/signup/',
    checkCredential: apiURL + 'auth/check-credentials/',
    otpLogin: apiURL + 'auth/otp-login/',
    changePassword: apiURL + 'auth/change-password/',
        
    userApi: apiURL + 'users/',     
    loanApi: apiURL + 'loans/',

    TWILIO_ACCOUNT_SID :'ACbdc64987b57c84616ce06a1d2c7e78da',
    TWILIO_AUTH_TOKEN:'373a0f9df4dfb2d285a935a9e4acf446',
    // getFarmerDashBoardDetailsUrl: apiURL + 'GetFarmerDashBoardDetails?',
    // getFarmerMilkCollectionDetailsUrl: apiURL + 'GetFarmerMilkCollectionDetails?',
    // getFarmerTotalPaymentDetailsUrl: apiURL + 'GetFarmerTotalPaymentDetails?',
    // getFarmerRemainingPaymentDetailsUrl: apiURL + 'FarmerPaymentCollectionDetails',
    // getFarmerPaymentDetailsUrl: apiURL + 'FarmerPaymentDetailsByID',

    KUserDetailsKey: 'FarmerDetails',
    KEmailRegex: /^(([^<>()\[\]\\.,#$!/%&*;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,4}))$/,
    KMobileRegex: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/

};

export default constant;