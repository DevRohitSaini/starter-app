
import React, { useState, useEffect, useContext, Component } from 'react';
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
    Keyboard
} from 'react-native';
import Modal from 'react-native-modal';
import LinearGradient from 'react-native-linear-gradient';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { TextInput } from 'react-native-paper';
import constant from '../../CommanFiles/Constant/constant';
import styles from '../HomeScreen/HomeScreenStyle';
import { UserContextData } from '../../contexts/UserContext';
import { getApi, postApiWithData } from '../../Api/Api';
import ProgressLoader from 'rn-progress-loader';
import notificationIcon from '../../Assets/Images/notification.png';
import next from '../../Assets/Images/right-ico.png';
import privacy from '../../Assets/Images/PrivacyIcon.png';
import about from '../../Assets/Images/AboutIcon.png';
import LightMode from '../../Assets/Images/LightMode.png';
import { useTranslation } from 'react-i18next';

const SettingScreen = ({ navigation }) => {
    const [selectedIndex, setSelectedIndex] = useState(1);
    const [value, setValue] = useState(null);
    const { storeData, setstoreData } = useContext(UserContextData);
    const [jobData, setJobData] = useState([]);
    const [isFocusdropdown1, setIsFocusdropdown1] = useState(false);
    const [hourlyRate, setHourlyRate] = useState('');
    const [proposal, setProposal] = useState('');
    const [loader, SetLoader] = useState(false);
    const [id, SetId] = useState('');
    const [userId, SetUserId] = useState('');
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    const [refreshing, setRefreshing] = useState(false);
    const [redioButton, setRedioButton] = useState('English');

    const { t, i18n } = useTranslation();
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
                    <TouchableOpacity
                        style={{ justifyContent: 'center', marginLeft: -5 }}
                        onPress={() => navigation.goBack() }>
                        <Image
                            source={require('../../Assets/Icons/Back.png')}
                        />
                    </TouchableOpacity>
                    <Text style={{ fontSize: 21, fontWeight: '700' }}>{t('Setting')}</Text>
                    <View style={{ flexDirection: 'row', }}>
                        <TouchableOpacity
                            onPress={() => { navigation.navigate('NotificationScreen') }}>
                            <Image source={notificationIcon} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ margin: 15 }}>
                    <TouchableOpacity
                        onPress={() => { navigation.navigate('DisplayModeScreen') }}>
                        <View style={{
                            flexDirection: 'row', width: '100%', justifyContent: 'space-between', alignItems: 'center',
                            borderColor: '#E4EAF1', borderWidth: 1, padding: 10,
                        }}>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',

                                    width: '90%',
                                }}>
                                {selectedIndex == 1 ? (
                                    <Image style={{ width: 40, height: 40 }} source={LightMode} />
                                ) : (
                                    <Image style={{ width: 40, height: 40 }} source={LightMode} />
                                )}
                                <Text style={{ marginLeft: 10, fontWeight: "700" }}
                                >
                                    {t('Display Mode')}
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
                        onPress={() => { navigation.navigate('PrivacyPolicyScreen') }}>
                        <View style={{
                            flexDirection: 'row', width: '100%', justifyContent: 'space-between', alignItems: 'center',
                            borderColor: '#E4EAF1', borderWidth: 1, marginTop: 15, padding: 10}}>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    width: '90%',}}>
                                {selectedIndex == 1 ? (
                                    <Image style={{ width: 40, height: 40 }} source={privacy} />
                                ) : (
                                    <Image style={{ width: 40, height: 40 }} source={privacy} />
                                )}
                                <Text style={{ marginLeft: 10, fontWeight: "700" }}
                                >
                                    {t('Privacy Policy')}
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
                        onPress={() => { navigation.navigate('AboutUsScreen') }}>
                        <View style={{
                            flexDirection: 'row', width: '100%', justifyContent: 'space-between', alignItems: 'center',
                            borderColor: '#E4EAF1', borderWidth: 1, marginTop: 15, padding: 10
                        }}>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    width: '90%',
                                }}>
                                {selectedIndex == 1 ? (
                                    <Image style={{ width: 40, height: 40 }} source={about} />
                                ) : (
                                    <Image style={{ width: 40, height: 40 }} source={about} />
                                )}
                                <Text style={{ marginLeft: 10, fontWeight: "700" }}
                                >
                                    {t('About Company')}
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
                        onPress={() => { navigation.navigate('ChangePasswordScreen') }}>
                        <View style={{
                            flexDirection: 'row', width: '100%', justifyContent: 'space-between', alignItems: 'center',
                            borderColor: '#E4EAF1', borderWidth: 1, marginTop: 15, padding: 10
                        }}>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    width: '90%',
                                }}>
                                {selectedIndex == 1 ? (
                                    <Image style={{ width: 40, height: 40 }} source={about} />
                                ) : (
                                    <Image style={{ width: 40, height: 40 }} source={about} />
                                )}
                                <Text style={{ marginLeft: 10, fontWeight: "700" }}
                                >
                                    {t('Change Password')}
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
            </SafeAreaView>
        </LinearGradient>
    );
};

export default SettingScreen;
