import React from 'react';
import { StackNavigator, } from 'react-navigation';
import { Button } from 'react-native-elements';

import login from '../screens/login';
import contacts from '../screens/contacts';
import chat from '../screens/chat';
import { AsyncStorage } from 'react-native';



var logout= (navigation) =>{
    
}

export const LoginScreen = StackNavigator({ //navigator to navigate through the three screens
    Login: {
        screen: login,
        navigationOptions: {
            header: null
        }
    },
    Contacts: {
        screen: contacts,
        navigationOptions: ({navigation}) => ({
            headerLeft: null,
            headerRight:<Button onPress={()=>AsyncStorage.setItem('user','').then (navigation.goBack())}  title='LOG-OUT' ></Button>,
            title: 'Contacts',
            headerTitleStyle: {
                fontWeight: '500',
                fontSize: 24,
                marginTop: 5,
                alignSelf: 'center'
            },
            headerStyle: {
                backgroundColor: '#0c6483',
            }
        })
    },
    Chats: {
        screen: chat,
        navigationOptions: {
            title: 'Chats',
            headerTitleStyle: {
                fontWeight: '500',
                fontSize: 24,
                marginTop: 5,
                textAlign: 'center',
                alignSelf: 'center'
            },
            headerStyle: {
                backgroundColor: '#0c6483',
            }
        },
    },
});



