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

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
    android:
        'Double tap R on your keyboard to reload,\n' +
        'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {
    render() {
        return <RootStack/>;
        //     <View style={styles.container}>
        //         <Text style={styles.welcome}>Broach App</Text>
        //         <Image style={styles.logoStyle} source={logo}/>
        //     </View>
        // );
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
        }
    },{
        initialRouteName: 'Home',
        navigationOptions: {
            headerStyle: {
                backgroundColor: '#1f3151',
            },
            headerTintColor: '#ffffff'

        }
    }
);


