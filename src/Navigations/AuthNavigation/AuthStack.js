import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../../Screens/LoginScreen/LoginScreen';


const Stack = createNativeStackNavigator();

const AuthStack = ({ navigation }) => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShadowVisible: false,
                headerStyle: {
                    backgroundColor: '#FFFFFF',
                },
            }}
            initialRouteName="LoginScreen">
            <Stack.Screen
                name="LoginScreen"
                component={LoginScreen}
                options={({ navigation }) => ({
                    title: '',
                    headerShown: false,
                    //headerLeft: () => <LeftHeaderIcon navigation={navigation} />,
                })}
            />
        </Stack.Navigator>
    );
};

export default AuthStack;