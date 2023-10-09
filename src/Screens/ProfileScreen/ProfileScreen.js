import React, { useState, useEffect, useContext, RefreshControl } from 'react';
import { Image, SafeAreaView, Text, TouchableOpacity, View, Linking, } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { TextInput } from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import { UserContextData } from '../../contexts/UserContext';
import { SuccessToast, ErrorToast } from '../../Toast/ToastMsg';
import constant from '../../CommanFiles/Constant/constant';
import CustomButton from '../../Components/CustomButton/CustomButton';
import ProgressLoader from 'rn-progress-loader';
import styles from '../HomeScreen/HomeScreenStyle';
import notificationIcon from '../../Assets/Images/notification.png';
import profileImg from '../../Assets/Images/profileImage.png';
import { useTranslation } from 'react-i18next';

const ProfileScreen = ({ navigation }) => {
    const { storeData, setstoreData } = useContext(UserContextData);    
    const [loader, SetLoader] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = () => {
        console.log('pull to refresh')
        setRefreshing(true);
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
                <View style={styles.headerStyle}>
                    <TouchableOpacity
                        style={{ justifyContent: 'center', marginLeft: -5 }}
                        onPress={() => navigation.goBack()}>
                        <Image
                            source={require('../../Assets/Icons/Back.png')}
                        />
                    </TouchableOpacity>
                    <Text style={{ fontSize: 21, fontWeight: '700' }}>{t('Profile')}</Text>
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
                                if (storeData && storeData[0].user && storeData[0].user['profileImageURL']) {
                                    let source = storeData[0].user['profileImageURL'];
                                    {/* let subStr = source.split('3000/')[1]; */ }
                                    let imgUri = constant.serverUrl + source;
                                    return (<Image style={{ width: 80, height: 80, borderRadius: 10, position: 'relative' }} source={{ uri: imgUri + '?' + new Date() }} />)
                                } else {
                                    return (<Image style={{ width: 80, height: 80, borderRadius: 10, position: 'relative' }} source={profileImg} />)
                                }
                            })()}
                        </View>
                    </View>
                    {(() => {
                        if (storeData && storeData[0].user) {
                            return (
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
                                            value={storeData[0].user['name']}
                                            label={t('Your Name')}                                           
                                            editable={false}
                                            selectTextOnFocus={false}
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
                                            value={storeData[0].user['mobile']}
                                            label={t('Mobile Number')}                                            
                                            editable={false}
                                            selectTextOnFocus={false}
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
                                            value={storeData[0].user['email']}
                                            label={t('Email Id')}                                            
                                            editable={false}
                                            selectTextOnFocus={false}
                                        />
                                    </View>                                  

                                    <CustomButton text={t('Edit your details')} onPress={() => navigation.navigate('EditProfileScreen')} additionalStyle={{ marginTop: 40 }} />
                                </View>
                            )
                        }
                    })()}

                </KeyboardAwareScrollView>
            </SafeAreaView>
        </LinearGradient>
    );
};

export default ProfileScreen;