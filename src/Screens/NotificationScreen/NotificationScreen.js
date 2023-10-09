
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
import {
    MenuContext,
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
} from 'react-native-popup-menu';
import { useTranslation } from 'react-i18next';

const data = [
    {
        id: 1,
        jobtitle: 'House Cleaning',
        salary: '3000 a month',
        location: 'Travel Hawks Pvt Ltd.',
    },
    {
        id: 2,
        jobtitle: 'Plumbing Feeting',
        salary: '3000 a month',
        location: 'Arvind MargPvt Ltd',

    },
    {
        id: 3,
        jobtitle: 'House Cleaning',
        salary: '3000 a month',
        location: 'Travel Hawks Pvt Ltd.',
    },
    {
        id: 4,
        jobtitle: 'Plumbing Feeting',
        salary: '3000 a month',
        location: 'Arvind MargPvt Ltd',
    },
];

const countryList = [
    { label: 'Item 1', value: 'Egypt' },
    { label: 'Item 2', value: 'Canada' },
    { label: 'Item 3', value: 'Australia' },

];
const onPressDelete = async () => {
    //console.log('logout');
    // SetLoader(true);
    // setstoreData('');
    // if (Platform.OS === 'android') {
    //   setLoggedUserDetails(JSON.stringify(''));
    // } else {
    //   setLoggedUserDetails('');
    // }
    // //navigation.navigate('AppStack');
    // SuccessToast('Logout Successfully')
    // SetLoader(false);
    Alert.alert(
      "Delete Notification",
      "Are you sure, you want to Delete?",
      [
        {
          text: "No",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "Yes", onPress: () => { console.log("OK Pressed"); onConfirmPressLogOut(); } }
      ],
      { cancelable: false },
    );
  };

const ClearAll = props => {
    console.log('clearall');
    return (
        <View
            style={[
                // CommonStyle.shadowcss,
                {shadowColor: 'black',
                shadowOffset: {width: 0, height: 1},
                shadowOpacity: 1,
                shadowRadius: 2,
                elevation: 2,
                    position: 'absolute',
                    top: 10,
                    right: 0,
                    padding: 15,
                    backgroundColor: 'white',
                    borderRadius: 10,
                    marginTop: 2,
                    zIndex: 2,
                    marginRight: 10,
                },
            ]}>
            <TouchableOpacity
                style={{ marginLeft: 3 }}
                onPress={() => {
                    props.visiblecomp(false);onPressDelete()
                }}>
                <Text>Delete</Text>
            </TouchableOpacity>
        </View>
    );
};

const NotificationScreen = ({ navigation }) => {
    const [visible, setVisible] = useState(false);
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
    const [selectedIndex, setSelectedIndex] = useState();
    const { t, i18n } = useTranslation();

    const renderNotification = ({ item ,index}) => {
        return (
            <View >
                <View style={styles.jobListMailContainer}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 15, paddingBottom: 15, }}>
                        <View style={{
                            paddingHorizontal: 10, flexDirection: 'row',
                        }}>
                            <View>
                                <View style={{
                                    flexDirection: 'row', flex: 1,
                                }}>
                                    <Text style={{ color: '#848484', marginBottom: 5, width: 200 }}>{item.location}.</Text>
                                    <Text style={{ color: '#848484', marginBottom: 5, marginLeft: 15 }}> 3h ago</Text>
                                </View>
                                <Text style={styles.jobTitleText}>{item.jobtitle}</Text>
                            </View>
                        </View>
                        <TouchableOpacity  onPress={() =>{ setVisible(!visible),setSelectedIndex(index)}} >
                        <Image style={{ marginRight: 15 }} source={dotIcon} />
                        
                        </TouchableOpacity>
                       
                        <View>
                        {(visible && selectedIndex==index) ? (
                                <ClearAll
                                    visiblecomp={x => {
                                        // clearAllNotification();
                                        setVisible(x);
                                    }}
                                />
                            ) : null}
                        </View>
                    </View>
                </View>
            </View>
        );
    };
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
                    <Text style={{ fontSize: 21, fontWeight: '700' }}>{t('Notification')}</Text>
                    <View style={{ flexDirection: 'row', }}>
                        <View>
                            {/* <Image style={{  }} source={notificationIcon} /> */}
                            
                        </View>
                       
                    </View>
                </View>
                <View style={{ flex: 1 }}>
                    <FlatList
                        data={data}
                        //data={jobData}
                        keyExtractor={item => item.id}
                        renderItem={renderNotification}
                        //ListFooterComponent={renderFooter}
                        // onEndReached={() => handleMore()}
                        onEndReachedThreshold={0}
                        refreshing={refreshing}
                        onRefresh={() => { onRefresh() }}
                    />
                </View>
            </SafeAreaView>
        </LinearGradient>
    );
};

export default NotificationScreen;
