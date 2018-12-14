/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image} from 'react-native';
import logo from './assets/logo.png'
import {HomeScreen} from './Screens/HomeScreen.js'
import {VerenegingScreen} from "./Screens/VerenegingScreen"
import {LedenScreen} from "./Screens/LedenScreen.js";
import {StackNavigator} from 'react-navigation';
import {Nieuwsartiekel} from "./Screens/Nieuwsartiekel";
import {Brevet} from "./Screens/Brevet";
import {AftekenlijstScreen} from "./Screens/AftekenlijstScreen";

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
    android:
        'Double tap R on your keyboard to reload,\n' +
        'Shake or press menu button for dev menu',
});

const globalState = {};

export const StoreGlobal = (obj) => {

    if(obj.type==='set'){
        globalState[obj.key]=obj.value;
        return true;
    }else
    if(obj.type==='get'){
        return globalState[obj.key];
    }else{
        return null;
    }

};


type Props = {};
//https://github.com/github/fetch/issues/452#issue-195754488 example for login
export default class App extends Component<Props> {
    render() {
        return <RootStack/>;
    }
}

const RootStack = StackNavigator(
    {
        Home: {
            screen: HomeScreen,
        },
        Vereneging: {
            screen: VerenegingScreen,
        },
        Leden: {
            screen: LedenScreen,
        },
        Nieuwsartiekel: {
            screen: Nieuwsartiekel
        },
        Brevet: {
            screen: Brevet
        },
        AftekenlijstScreen: {
            screen: AftekenlijstScreen
        }
    },{
        initialRouteName: 'Home',
        navigationOptions: {
            headerStyle: {
                backgroundColor: '#1f3151',
                textAlign: 'center'
            }
        }
    }
);


