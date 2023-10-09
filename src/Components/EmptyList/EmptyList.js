import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import noJob from '../../Assets/Images/noJob-Graphic.png';
import { useTranslation } from 'react-i18next';
import CustomButton from '../../Components/CustomButton/CustomButton';


const EmptyList = ({ navigation }) =>  {
    const { t, i18n } = useTranslation();
    return (
        <View >
            <View style={{ margin: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <Image source={noJob} style={{
                     resizeMode:'contain',  width: 300, marginTop: 80,
                    height: 300
                }} />
            </View>
            <View style={{ flexDirection: 'row', marginTop: 30, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 23, fontWeight: 'Bold', textAlign:'center', lineHeight:35 }}>{t('You are not apply for any loan yet')} </Text>
            </View>
            <CustomButton text={t('Apply for Loan')}   additionalStyle={{ marginTop: 80 }} />
        </View>
    );
};

export default EmptyList;