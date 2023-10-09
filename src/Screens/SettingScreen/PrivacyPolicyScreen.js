
import React, { useState, useEffect, useContext, Component } from 'react';
import {
    SafeAreaView,
    Text,
    TouchableOpacity,
    View,
    Image,
    ScrollView,
    
} from 'react-native';
import Modal from 'react-native-modal';
import LinearGradient from 'react-native-linear-gradient';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { TextInput } from 'react-native-paper';
import constant from '../../CommanFiles/Constant/constant';
import icon from '../../CommanFiles/Constant/icon';
import styles from '../SettingScreen/SettingScreenStyle';
import { UserContextData } from '../../contexts/UserContext';
import { getApi, postApiWithData } from '../../Api/Api';
import ProgressLoader from 'rn-progress-loader';
import notificationIcon from '../../Assets/Images/notification.png';
import {
    MenuContext,
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
} from 'react-native-popup-menu';
import { useTranslation } from 'react-i18next';

const PrivacyPolicyScreen = ({ navigation }) => {
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
    const [redioButton, setRedioButton] = useState('Light');

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
                        onPress={() => navigation.navigate('SettingScreen')}>
                        <Image
                            source={require('../../Assets/Icons/Back.png')}
                        />
                    </TouchableOpacity>
                    <Text style={{ fontSize: 21, fontWeight: '700' }}>{t('Privacy Policy')}</Text>
                    <View style={{ flexDirection: 'row', }}>
                        <TouchableOpacity
                            onPress={() => { navigation.navigate('NotificationScreen') }}>
                            <Image source={notificationIcon} />
                        </TouchableOpacity>

                    </View>
                </View>
                <ScrollView horiztonal>
                <View style={{ margin: 15, marginTop: 20 }}>
                    <View style={{ flexDirection: 'row', }}>
                        <View >
                            <Text style={styles.jobTitleText}>Types of data collected </Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 15, }}>
                        <View >
                            <Text style={{ lineHeight: 20 }} >We collect different types of data depending on how you interact with us. This includes, for example, when you're on our site, responding to our promotional materials, and using our services to help you find a job. For example, we may collect your email address and resume information when you create your account. As another example, we may collect information about your activity on our site, such as the searches you conduct and jobs you apply to. For more information on the types of data we collect, check out Section 2 of our Privacy Policy. </Text>
                        </View>
                    </View>
                </View>
                <View style={{ margin: 15, marginTop: 20 }}>
                    <View style={{ flexDirection: 'row', }}>
                        <View >
                            <Text style={styles.jobTitleText}>How my data is used and disclosed
                            </Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 15, }}>
                        <View >
                            <Text style={{ lineHeight: 20 }} >Indeed uses data to help people get jobs. How we use and disclose your data also depends on how you use our site. We go into much greater detail in Sections 4, 5 and 9 of our Privacy Policy explaining our use and disclosure of your data, but this can include to provide our services to you, to protect you when you use our site, and to measure, improve, and promote our services.</Text>
                        </View>
                    </View>
                </View>
                <View style={{ margin: 15, marginTop: 20 }}>
                    <View style={{ flexDirection: 'row', }}>
                        <View >
                            <Text style={styles.jobTitleText}>Accessing and Deleting My Data
                            </Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 15, }}>
                        <View >
                            <Text style={{ lineHeight: 20 }} >Indeed offers all of its users rights to access and delete their data, as detailed in Section 8 of our Privacy Policy. To access or delete your data held by Indeed, just fill out this form.</Text>
                        </View>
                    </View>
                </View>
                <View style={{ margin: 15, marginTop: 20 }}>
                    <View style={{ flexDirection: 'row', }}>
                        <View >
                            <Text style={styles.jobTitleText}>Calls from Employers on Indeed
                            </Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 15, marginBottom:15 }}>
                        <View >
                            <Text style={{ lineHeight: 20 }} >You are currently unsubscribed from receiving calls from Indeed and employers who use Indeed, including using automated call technology, forwarded, or recorded calls. Calls from employers on Indeed about your applications will not be forwarded to you. You will be subscribed again the next time you apply to a job through Indeed.</Text>
                        </View>
                    </View>
                </View>
                </ScrollView>
            </SafeAreaView>
        </LinearGradient>
    );
};

export default PrivacyPolicyScreen;
