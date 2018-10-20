import {StyleSheet, Text, TouchableHighlight, View} from "react-native";
import React from "react";

export class Button extends React.Component {
    render() {
        return (
            <TouchableHighlight onPress={() => this.props.navigation.navigate('Vereneging')} underlayColor="white">
                <View style={styles.button}>
                    <Text style={styles.buttonText}>Vereneging</Text>
                </View>
            </TouchableHighlight>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 60,
        alignItems: 'center'
    },
    button: {
        marginBottom: 30,
        width: 260,
        alignItems: 'center',
        backgroundColor: '#2196F3'
    },
    buttonText: {
        padding: 20,
        color: 'white'
    }
});