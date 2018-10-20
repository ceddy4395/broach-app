import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Button} from '../Button'

export class VerenegingScreen extends React.Component {
    static navigationOptions = {
        headerTitle: "Vereneging",
        headerRight: (
            <Button/>
        ),
    };

    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Details Screen</Text>
            </View>
        );
    }
}

