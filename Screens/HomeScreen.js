import React from 'react';
import {View, Text, TouchableHighlight, StyleSheet} from 'react-native';


export class HomeScreen extends React.Component {
    static navigationOptions = {
        title: 'Broach',
    };

    render() {
        return (
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor:'#1f3151'}}>
                <Text style={{color: '#ffffff'}}>Home Screen</Text>
                <TouchableHighlight onPress={() => this.props.navigation.navigate('Vereneging')} underlayColor="white">
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>Vereneging</Text>
                    </View>
                </TouchableHighlight>
            </View>
        );
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

