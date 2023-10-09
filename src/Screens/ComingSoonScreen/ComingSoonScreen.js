
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
import { getApi, postApiWithData } from '../../Api/Api';
import ProgressLoader from 'rn-progress-loader';
import { ErrorToast, SuccessToast } from '../../Toast/ToastMsg';
import Moment from 'moment';
import { setLoggedUserDetails } from '../../utils/CommonUtils';
import languageIcon from '../../Assets/Images/language.png';
import SearchIcon from '../../Assets/Images/SearchIcon.png';
import LocationIcon from '../../Assets/Images/Location.png';
import ruppeIcon from '../../Assets/Images/ruppeIcon.png';
import bagIcon from '../../Assets/Images/bagIcon.png';
import timeIcon from '../../Assets/Images/timeIcon.png';
import locationMain from '../../Assets/Images/locationMain.png';
import notificationIcon from '../../Assets/Images/notification.png';
import { Dropdown } from 'react-native-element-dropdown';
import dotIcon from '../../Assets/Images/dotIcon.png';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {
    MenuContext,
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
} from 'react-native-popup-menu';
import comingSoon from '../../Assets/Images/ComingSoon.png';
import { useTranslation } from 'react-i18next';

const ComingSoonScreen = ({ navigation }) => {
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
                        onPress={() => {navigation.navigate('NotificationScreen') }}>
                        <Image style={styles.headerIconStyle} source={notificationIcon} />
                    </TouchableOpacity>                        
                    </View>
                </View>
                <View style={{ margin: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
          <Image source={comingSoon} style={{
            alignSelf: 'stretch', width: 330, marginTop: 80,
            height: 300
          }} />

        </View>
        <View style={{ flexDirection: 'row', marginTop: 30, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ fontSize: 18, fontWeight: '700' }}>~~~ {t('See you Soon')} ~~~</Text>
        </View>
       
        <View style={{ margin: 20 }}>
          <CustomButton text={t('Back To Home')}  onPress={() => { navigation.goBack() }} additionalStyle={{ marginTop: 30 }} />
        </View>
            </SafeAreaView>
        </LinearGradient>
    );
};

export default ComingSoonScreen;
