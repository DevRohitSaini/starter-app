import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import constant from '../../CommanFiles/Constant/constant';
import LinearGradient from 'react-native-linear-gradient';

export default function CustomButton({
    text,
    onPress,
    additionalStyle,
}) {
    return (
        <LinearGradient
            colors={['#74B1FA', '#3786EE']}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={[{
                justifyContent: 'center', //marginTop: styleMarginTop ? styleMarginTop : 0, 
                borderRadius: 0, paddingVertical: 18,
                paddingHorizontal: 17,
                elevation: 3, 
                backgroundColor: ''
            }, additionalStyle]}>
            <TouchableOpacity onPress={onPress} style={{
                // justifyContent: 'center', marginTop: 80,
                // paddingVertical: 18,
                // paddingHorizontal: 17,
                // borderRadius: 5, //backgroundColor: '#C0C0C0'
            }}>
                <Text
                    style={{
                        fontSize: 16,textTransform:'capitalize', fontWeight:'700',
                        textAlign: 'center', color: '#FFFFFF', fontFamily: 'Poppins-Regular'
                    }}>
                    {text}
                </Text>
            </TouchableOpacity>
        </LinearGradient>
    );
}
