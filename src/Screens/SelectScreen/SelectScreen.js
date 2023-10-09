
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
import LinearGradient from 'react-native-linear-gradient';
import constant from '../../CommanFiles/Constant/constant';
import { UserContextData } from '../../contexts/UserContext';
import ProgressLoader from 'rn-progress-loader';
import homeIcon from '../../Assets/Images/home-screen-logo.png';
import JobIcon from '../../Assets/Images/job-Seekar.png';
import CompanyIcon from '../../Assets/Images/Company_icon.png';
import RightIcon from '../../Assets/Images/Right_Icon.png';

import { useTranslation } from 'react-i18next';

const SelectScreen = ({ navigation }) => {    
    const { storeData, setstoreData } = useContext(UserContextData);    
    const [loader, SetLoader] = useState(false);
    const [value, setValue] = useState(null);   

    const { t, i18n } = useTranslation();
    useEffect(() => {
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
                    <View style={{ flex: 1, alignItems: 'center', margin: 20, marginTop: 200 }}>
                        <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                            <Image style={{ width: 130, height: 120 }} source={homeIcon} />
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 30, marginBottom: 15, alignItems: 'center', marginLeft: 15 }}>
                        <Text style={{ fontSize: 20, color: '#001258', fontWeight: '700' }}>{t('Who are you')}?</Text>
                    </View>
                    

                    <TouchableOpacity onPress={() => { navigation.navigate('SignupScreen', {type: 'candidate' }) }}>
                        <View style={{ backgroundColor: '#11224E', margin: 15, borderRadius: 10, padding: 10 }}>
                            <View style={{ padding: 15 }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <View style={{ width: 230 }}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <View style={{}}>
                                                <Image style={{ marginRight: 15 }} source={JobIcon} />
                                            </View>
                                            <View >
                                                <Text style={{ color: '#2AA5DD', textTransform: 'uppercase', fontWeight: '700' }}>{t('Candidate')}</Text>
                                            </View>
                                        </View>
                                        <View style={{ flexDirection: 'row', marginTop: 15, alignItems: 'center' }}>
                                            <View >
                                                <Text style={{ color: '#fff', lineHeight: 20, }}>{t('You are looking for a job')}</Text>
                                            </View>
                                        </View>
                                    </View>
                                    <View style={{ backgroundColor: '#2BA9DC', height: 50, width: 50, borderRadius: 50, alignItems: 'center', justifyContent: 'center' }}>
                                        <Image style={{}} source={RightIcon} />
                                    </View>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => { navigation.navigate('SignupScreen', {type: 'company' }) }}>
                        <View style={{ backgroundColor: '#0D3044', margin: 15, borderRadius: 10, padding: 10 }}>
                            <View style={{ padding: 15 }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <View style={{ width: 230 }}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <View style={{}}>
                                                <Image style={{ marginRight: 15 }} source={CompanyIcon} />
                                            </View>
                                            <View >
                                                <Text style={{ color: '#27D49D', textTransform: 'uppercase', fontWeight: '700' }}>{t('Company')}</Text>
                                            </View>

                                        </View>
                                        <View style={{ flexDirection: 'row', marginTop: 15, alignItems: 'center' }}>
                                            <View >
                                                <Text style={{ color: '#fff', lineHeight: 20, }}>{t('You are looking for a candidate')}</Text>
                                            </View>

                                        </View>
                                    </View>
                                    <View style={{ backgroundColor: '#27D49D', height: 50, width: 50, borderRadius: 50, alignItems: 'center', justifyContent: 'center' }}>
                                        <Image style={{}} source={RightIcon} />
                                    </View>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>

                </View>
            </SafeAreaView>
        </LinearGradient>
    );
};

export default SelectScreen;
