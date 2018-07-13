import React from 'react';
import { StackNavigator, } from 'react-navigation';
import { Button ,Icon} from 'react-native-elements';


import login from '../screens/login';
import contacts from '../screens/contacts';
import chat from '../screens/chat';
import { AsyncStorage,Image } from 'react-native';



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
            headerRight:<Button icon ={{name:'home' ,color:'black',size:20}} onPress={()=>AsyncStorage.setItem('user','').then (navigation.goBack())}  title='LOG-OUT' ></Button>,
            title: 'Contacts',
            headerTitleStyle: {
                fontWeight: '500',
                fontSize: 24,
                marginTop: 5,
                alignSelf: 'center',
                color:'white'
            },
            headerStyle: {
                backgroundColor:'black',
            }
        })
    },
    Chats: {
        screen: chat,
        navigationOptions:({navigation}) => ( {
            title: navigation.state.params.items,
            headerRight:<Image style={{width:40,height:40,marginRight:30,borderRadius:10}} source={{uri:navigation.state.params.image}}/>,
            headerTitleStyle: {
                fontWeight: '500',
                fontSize: 24,
                marginTop: 5,
                textAlign: 'center',
                alignSelf: 'center',
                color:'white'
            },
            headerStyle: {
                backgroundColor: 'black',
                opacity:10
            }
        }),
    },
});



