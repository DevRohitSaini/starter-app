
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
import icon from '../../CommanFiles/Constant/icon';
import styles from '../HomeScreen/HomeScreenStyle';
import CustomBorderButton from '../../Components/CustomButton/CustomBorderButton';
import CustomButton from '../../Components/CustomButton/CustomButton';
import { UserContextData } from '../../contexts/UserContext';
import ProgressLoader from 'rn-progress-loader';
import notificationIcon from '../../Assets/Images/notification.png';
import SelectLanguage from '../../Assets/Images/SelectLanguage.png'
import Fontisto from 'react-native-vector-icons/Fontisto';
import homeIcon from '../../Assets/Images/home-screen-logo.png';
import JobIcon from '../../Assets/Images/job-Seekar.png';
import CompanyIcon from '../../Assets/Images/Company_icon.png';
import RightIcon from '../../Assets/Images/Right_Icon.png';



import {
    MenuContext,
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
} from 'react-native-popup-menu';
import { useTranslation } from 'react-i18next';

const LoginLanguageScreen = ({ navigation }) => {
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
    const [redioButton, setRedioButton] = useState('');

    const languageChange = async (value) => {
        i18n.changeLanguage(value);
    }

    const { t, i18n } = useTranslation();

    useEffect(() => {
        console.log('lunguage by default=>', i18n.language);
        setRedioButton(i18n.language);
    }, []);

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
                <View>
                <View style={{ margin: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <Image source={SelectLanguage} style={{
                        alignSelf: 'stretch', width: 330, marginTop: 20,
                        height: 315
                    }} />
                </View>
                <View style={{ flexDirection: 'row', marginTop: 30, marginBottom:30, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ fontSize: 18, fontWeight: '700' }}>~~ {t('Select Your Language')} ~~</Text>
                </View>
                <View style={styles.jobListMailContainer}>
                    <View style={{ padding: 15 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <View >
                                <Text>हिंदी </Text>
                            </View>
                            <TouchableOpacity onPress={() => { setRedioButton('hi'); languageChange('hi')  }}>
                                <Fontisto name={redioButton == 'hi' ? 'radio-btn-active' : 'radio-btn-passive'} size={20} color={'#99CCFF'} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={styles.jobListMailContainer}>
                    <View style={{ padding: 15 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <View>
                                <Text>English</Text>
                            </View>
                            <TouchableOpacity onPress={() => { setRedioButton('en'); languageChange('en')  }}>
                                <Fontisto name={redioButton == 'en' ? 'radio-btn-active' : 'radio-btn-passive'} size={20} color={'#99CCFF'} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <CustomButton text={t('Next')} onPress={() => {navigation.navigate('LoginScreen') }} additionalStyle={{ marginTop: 25, margin:15 }} />
                </View>
            </SafeAreaView>
        </LinearGradient>
    );
};

export default LoginLanguageScreen;
