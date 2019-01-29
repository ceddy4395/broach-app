import React from "react";
import {Button} from "../Button";
import {Text, View} from "react-native";

export class LedenScreen extends React.Component {
    static navigationOptions = {
        headerTitle: "Leden",

    };

    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Details Screen</Text>
            </View>
        );
    }
}