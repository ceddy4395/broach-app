import React from 'react'
import {ScrollView, Text, View, StyleSheet, TextInput, Platform} from "react-native";
import {MKButton} from "react-native-material-kit";
import {StoreGlobal} from "../App";
import {server_ip} from "../back-end/serverconnection";

let REQUEST_URL = "http://10.0.2.2:1234";

export class VerifyScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            aftekenId: props.navigation.getParam('id', 0),
            soort: props.navigation.getParam('soort', 'B'),
            naam: StoreGlobal({type: "get", key: "username"})
        }
    }

    static navigationOptions = ({navigation}) => {
        const {state} = navigation;
        return {
            header: (<View><Text style={{
                padding: 10,
                fontSize: 30,
                color: 'white',
                fontWeight: 'bold',
                textAlign: 'center',
                backgroundColor: '#1f3151'
            }}>{"Verifieer aftekenen"}</Text></View>)
        }
    };

    render() {
        return (<View>
            <Text style={{paddingLeft: 30}}>Naam van afteken persoon</Text>
            <TextInput
                placeholder={"naam"}
                style={styles.input}
                onChangeText={(text) => this.setState({name: text})}/>
            <MKButton
                backgroundColor={'#1f3151'}
                shadowRadius={2}
                shadowOffset={{width: 0, height: 2}}
                shadowOpacity={.7}
                shadowColor="black"
                style={styles.button}
                onPress={() => this.aftekenen()}><Text style={styles.button_text}>Aftekenen</Text></MKButton>
        </View>)
    }

    aftekenen() {
        console.log("aftekenen...");
        fetch(server_ip + '/aftekenlijst/' + this.state.aftekenId + '/' + this.state.name, {
            credentials: 'include'
        }).then(response => response.json())
            .then(responseData => this.props.navigation.navigate('AftekenlijstScreen', {
                type: this.state.soort,
                responseData: responseData
            }))

    }
}

const styles = StyleSheet.create({
    input: {
        width: 250,
        margin: 30
    },
    button_text: {
        color: 'white',
        fontWeight: 'bold',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 15,
    },
    button: {
        paddingLeft: 30
    }
});