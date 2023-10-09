import React, { useState, useEffect, useContext } from 'react';
//import { UserContext } from '../../contexts/UserContext';
import { UserContextData } from '../../contexts/UserContext';
import AppStack from '../AppNavigation/AppStack';
import DrawerNavigation from '../AppNavigation/DrawerNavigation';
import AuthStack from '../AuthNavigation/AuthStack';


const RootNavigation = () => {
    useEffect(() => {
        console.log('root navigation')
    }, []);
    return (
        <UserContextData.Consumer>
            {({ storeData }) =>
            // console.log('storeData', storeData)
            (
                <>
                    {/* {storeData ? <AppStack /> : <AuthStack />} */}
                    <DrawerNavigation />
                    {/* {<AuthStack />} */}
                </>
            )
            }
        </UserContextData.Consumer>
    );
};

export default RootNavigation;