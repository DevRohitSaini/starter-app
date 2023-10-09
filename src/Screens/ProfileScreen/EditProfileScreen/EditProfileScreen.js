import React, { useState, useEffect, useContext } from 'react';
import { Image, SafeAreaView, Text, TouchableOpacity, View, Linking, Button, Platform } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { TextInput, RadioButton } from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import { setLoggedUserDetails } from '../../../utils/CommonUtils';
import CustomButton from '../../../Components/CustomButton/CustomButton';
import icon from '../../../CommanFiles/Constant/icon';
import ProgressLoader from 'rn-progress-loader';
import styles from '../../HomeScreen/HomeScreenStyle';
import notificationIcon from '../../../Assets/Images/notification.png';
import languageIcon from '../../../Assets/Images/language.png';
import profileImg from '../../../Assets/Images/profileImage.png';
import addIcon from '../../../Assets/Images/addIcon.png';
import constant from '../../../CommanFiles/Constant/constant';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Modal from 'react-native-modal';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { UserContextData } from '../../../contexts/UserContext';
import { putApi } from '../../../Api/Api';
import { SuccessToast, ErrorToast } from '../../../Toast/ToastMsg';
import { useTranslation } from 'react-i18next';
import { uploadImg } from '../../../Api/Api';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import Moment from 'moment';

const EditProfileScreen = ({ navigation }) => {
    const { storeData, setstoreData } = useContext(UserContextData);
    const [Fullname, setFullname] = useState('');
    const [Mobile, setMobile] = useState('');
    const [Email, setEmail] = useState('');
    const [userGender, setUserGender] = useState('');

    const [Street, setUserStreet] = useState('');
    const [City, setUserCity] = useState('');
    const [Postcode, setUserPostcode] = useState('');
    const [addressCoordinates, setAddressCoordinates] = useState([]);
    const [Password, setPassword] = useState('');

    const [loader, SetLoader] = useState(false);
    const [passwordTextEntry, setPasswordTextEntry] = useState(true);
    const [connectionStatus, setConnectionStatus] = useState('');
    const [visibleImagePicker, setVisibleImagePicker] = useState(false);

    const [profilePicUri, setProfilePicUri] = useState('');
    const [profilePicFile, setProfilePicFile] = useState('');

    const [isDatePickerVisible, setisDatePickerVisible] = useState(false);
    const [modalOption, setModalOption] = useState('');
    const [refreshing, setRefreshing] = useState(false);

    const [userDOB, setUserDOB] = useState('');
    const [show, setShow] = useState(false);

    useEffect(() => {
        setUserData();
    }, []);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setShow(false);
        setUserDOB(currentDate);
    };
    const showMode = (currentMode) => {
        DateTimePickerAndroid.open({
            value: userDOB,
            onChange,
            mode: currentMode,
            is24Hour: true,
        });
    };
    const showDatepicker = () => {
        showMode('date');
    };

    const Opengallary = async () => {
        let options = {
            title: 'Select Image',
            type: 'library',
            options: {
                selectionLimit: 1,
                mediaType: 'photo',
                includeBase64: false,
            },
        };
        launchImageLibrary(options, response => {
            if (response.didCancel) {
                console.log('user cancle image picker');
            } else if (response.error) {
                console.log('imagepicker error:', response.error);
                ErrorToast('error: your request is not submitted');
            } else if (response.customButton) {
                console.log('user taped custom button: ', response.customButton);
            } else {
                console.log('RESP', response.assets[0]);
                if (response.assets[0].type != 'image/gif') {
                    if (response.assets[0].fileSize < 20971520) {
                        setProfilePicUri(response.assets[0].uri);
                        setProfilePicFile(response.assets[0]);
                        setModalOption('');

                        const formDate = new FormData();
                        formDate.append('profileImage', {
                            uri: response.assets[0].uri,
                            type: response.assets[0].type,
                            name: response.assets[0].fileName
                        });

                        uploadFunc(formDate);

                    } else {
                        ErrorToast(Message.KImageSize);
                    }

                } else {
                    ErrorToast(Message.KInvalidFormate);
                }
            }
        });
    };

    const Opencamera = () => {
        let options = {
            storageOptions: {
                path: 'images',
                mediaType: 'photo',
            },
            includeBase64: false,
            maxWidth: 500,
            maxHeight: 500,
            quality: 1,
        };
        launchCamera(options, response => {
            console.log('Response = ', response);
            if (response.didCancel) {
                console.log('user cancle image picker');
            } else if (response.error) {
                console.log('imagepicker error:', response.error);
                ErrorToast('error: your request is not submitted');
            } else if (response.customButton) {
                console.log('user taped custom button: ', response.customButton);
            } else {
                console.log('RESP', response.assets[0]);
                if (response.assets[0].fileSize < 20971520) {
                    const source = { uri: 'data:image/jpeg;base64,' + response.base64 };
                    setProfilePicUri(response.assets[0].uri);
                    setProfilePicFile(response.assets[0]);
                    setModalOption('');

                    const formDate = new FormData();
                    formDate.append('profileImage', {
                        uri: response.assets[0].uri,
                        type: response.assets[0].type,
                        name: response.assets[0].fileName
                    });

                    uploadFunc(formDate);
                } else {
                    ErrorToast(Message.KImageSize);
                }
            }
        });
    };

    const uploadFunc = async (data) => {
        SetLoader(true);
        let uploadUrl = constant.uploadProfile + storeData[0].user._id;
        let token = String(storeData[0].accessToken);
        let res = await fetch(
            uploadUrl,
            {
                method: 'post',
                body: data,
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                },
            }
        );
        let responseJson = await res.json();
        if (responseJson.isSuccess && responseJson.savedUser !== undefined) {
            let userInfo = [{
                "accessToken": storeData[0].accessToken,
                "user": responseJson.savedUser
            }];
            setstoreData(userInfo);
            if (Platform.OS === 'android') {
                setLoggedUserDetails(JSON.stringify(userInfo));
            } else {
                setLoggedUserDetails(userInfo);
            }
            SuccessToast('Image uploaded successfully');
            SetLoader(false);
        } else {
            ErrorToast('error: your request is not submitted');
            console.log(responseJson)
            SetLoader(false);
        }
    }

    const setUserData = () => {
        if (storeData && storeData[0].user) {
            setFullname(storeData[0].user['name']);
            setMobile(storeData[0].user['mobile']);
            setEmail(storeData[0].user['email']);
            setUserStreet(storeData[0].user['street']);
            setUserCity(storeData[0].user['city']);
            setUserPostcode(storeData[0].user['postcode']);
            setAddressCoordinates(storeData[0].user['addressCoordinates']);
            setUserGender(storeData[0].user['gender']);

            if (storeData[0].user['dob']) {
                setUserDOB(new Date(storeData[0].user['dob']));
            } else {
                setUserDOB(new Date());
            }            

            if (storeData[0].user['profileImageURL']) {
                let source = storeData[0].user['profileImageURL'];
                // let subStr = source.split('3000/')[1];
                let imgUri = constant.serverUrl + source;
                setProfilePicUri(imgUri);
            }

        }
    }

    const SaveData = async () => {
        SetLoader(true);

        let jsonData = {
            "name": Fullname,
            "mobile": Mobile,
            "email": Email,
            "gender": userGender,
            "dob": userDOB,
            "street": Street,
            "city": City,
            "postcode": Postcode,
            "addressCoordinates": addressCoordinates,
        }
        let url = constant.userApi + storeData[0].user._id;
        const ApiResponse = await putApi(url, String(storeData[0].accessToken), jsonData);

        if (ApiResponse.isSuccess) {
            let userInfo = [{
                "accessToken": storeData[0].accessToken,
                "user": ApiResponse.savedUser
            }];
            setstoreData(userInfo);
            if (Platform.OS === 'android') {
                setLoggedUserDetails(JSON.stringify(userInfo));
            } else {
                setLoggedUserDetails(userInfo);
            }
            SetLoader(false);
            navigation.navigate('ProfileScreen');
            SuccessToast('Your data saved successfully.');
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
                    <TouchableOpacity
                        style={{ justifyContent: 'center', marginLeft: -5 }}
                        onPress={() => navigation.goBack()}>
                        <Image
                            source={require('../../../Assets/Icons/Back.png')}
                        />
                    </TouchableOpacity>
                    <Text style={{ fontSize: 21, fontWeight: '700' }}>{t('Your details')}</Text>
                    <View style={{ flexDirection: 'row', }}>
                        <TouchableOpacity
                            onPress={() => { navigation.navigate('NotificationScreen') }}>
                            <Image source={notificationIcon} />
                        </TouchableOpacity>
                    </View>
                </View>

                <KeyboardAwareScrollView
                    keyboardShouldPersistTaps="handled"
                    contentContainerStyle={{ flexGrow: 1 }}
                    showsVerticalScrollIndicator={false}
                    onKeyboardWillShow={(frames) => {
                        console.log('Keyboard event', frames)
                    }}>
                    <View style={{ alignItems: 'center', margin: 20, marginBottom: 0 }}>
                        <View style={{ flex: 1, }}>
                            {(() => {
                                if (profilePicUri != '') {
                                    return (<Image style={{ width: 80, height: 80, borderRadius: 10, position: 'relative' }} source={{ uri: profilePicUri + '?' + new Date() || null }} />)
                                } else {
                                    return (<Image style={{ width: 80, height: 80, borderRadius: 10, position: 'relative' }} source={profileImg} />)
                                }
                            })()}
                            <TouchableOpacity
                                onPress={() => setVisibleImagePicker(true)}>
                                <Image style={{ width: 40, height: 40, borderRadius: 10, position: 'absolute', bottom: -20, right: -15 }} source={addIcon} />
                            </TouchableOpacity>

                        </View>
                    </View>
                    <View style={{ margin: 20, marginTop: 40 }}>


                        <View style={{}}>
                            <TextInput
                                name="Full Name"
                                mode="outlined"
                                keyboardType='default'
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
                                value={Fullname}
                                label={t('Your Name')}
                                onChangeText={value => {
                                    setFullname(value);
                                }}
                                placeholder={t('Enter Your Full Name')}
                            />
                        </View>
                        <View style={{ marginTop: 15 }}>
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
                        <View style={{ marginTop: 15 }}>
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

                        <View>
                            <View style={{ marginTop: 15 }}>
                                <Text style={{ fontWeight: "bold", fontSize: 15 }}>{t('Your Gender')}</Text>
                                <RadioButton.Group onValueChange={value => setUserGender(value)} value={userGender}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <Text>{t('Male')}</Text>
                                        <RadioButton value="Male" />
                                    </View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <Text>{t('Female')}</Text>
                                        <RadioButton value="Female" />
                                    </View>
                                </RadioButton.Group>
                            </View>
                            <View style={{ marginTop: 15 }}>
                                <Text style={{ fontWeight: "bold", fontSize: 15 }}>{t('Date of birth')} :  {Moment(userDOB).format('DD/MM/YYYY')}</Text>
                                <CustomButton additionalStyle={{ marginTop: 15, marginBottom: 15, color: "white" }} onPress={showDatepicker} text={t('Select date')} title={t('Select date')} />
                            </View>
                        </View>

                        <View style={{ marginTop: 15 }}>
                            <TextInput
                                name="Street"
                                mode="outlined"
                                keyboardType='default'
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
                                value={Street}
                                label={t('Your Address')}
                                onChangeText={value => {
                                    setUserStreet(value);
                                }}
                                placeholder={t('Enter your full address')}
                            />
                        </View>
                        <View style={{ marginTop: 15 }}>
                            <TextInput
                                name="City"
                                mode="outlined"
                                keyboardType='default'
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
                                value={City}
                                label={t('Your City')}
                                onChangeText={value => {
                                    setUserCity(value);
                                }}
                                placeholder={t('Enter Your City')}
                            />
                        </View>
                        <View style={{ marginTop: 15 }}>
                            <TextInput
                                name="Postcode"
                                mode="outlined"
                                keyboardType='numeric'
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
                                value={Postcode}
                                label={t('Your Postcode')}
                                onChangeText={value => {
                                    setUserPostcode(value);
                                }}
                                placeholder={t('Enter Your Postcode')}
                            />
                        </View>
                        <CustomButton text={t('Update')} onPress={() => SaveData()} additionalStyle={{ marginTop: 40 }} />
                    </View>

                    <Modal
                        isVisible={visibleImagePicker}
                        onModalHide={() => {
                            if (modalOption == 1) {
                                Opengallary();
                            } else if (modalOption == 2) {
                                Opencamera();
                            }
                        }}
                        swipeDirection="down"
                        onSwipeComplete={() => setVisibleImagePicker(false)}
                        onBackdropPress={() => setVisibleImagePicker(false)}>

                        <View style={{
                            width: '100%',
                            paddingHorizontal: 20,
                            marginLeft: -20,
                            height: 250,
                            bottom: -280,
                            borderTopRightRadius: 30,
                            borderTopLeftRadius: 30,
                            backgroundColor: 'white',
                        }}>
                            <View style={{ marginTop: 5 }}>
                                <TouchableOpacity
                                    onPress={() => {
                                        setModalOption(1);
                                        setVisibleImagePicker(false);
                                    }}
                                >
                                    <View >
                                        <Ionicons
                                            name="images"
                                            size={30}
                                        // color={Constant.primaryGreen}
                                        />
                                    </View>
                                    <View>
                                        <Text>{t('Gallery')}</Text>
                                    </View>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={() => {
                                        setVisibleImagePicker(false);
                                        setModalOption(2);
                                    }}
                                >
                                    <View >
                                        <AntDesign
                                            name="camera"
                                            size={30}
                                        // color={Constant.primaryGreen}
                                        />
                                    </View>
                                    <View>
                                        <Text>{t('Camera')}</Text>
                                    </View>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={() => {
                                        setVisibleImagePicker(false);
                                        setModalOption('');
                                    }}
                                >
                                    <View >
                                        <MaterialIcons
                                            name="cancel"
                                            size={30}
                                        // color={Constant.primaryGreen}
                                        />
                                    </View>
                                    <View>
                                        <Text >{t('Cancel')}</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>

                    </Modal>

                </KeyboardAwareScrollView>
            </SafeAreaView>
        </LinearGradient>
    );
};

export default EditProfileScreen;