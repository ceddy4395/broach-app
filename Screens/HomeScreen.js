import React from 'react';
import {View, Text, TextInput, StyleSheet, AsyncStorage} from 'react-native';
import {
    MKButton,
    MKColor, MKSpinner,
} from 'react-native-material-kit';

import {StoreGlobal} from "../App";

// var login = 'user';
// var password = 'userPass';

export class HomeScreen extends React.Component {

    constructor() {
        super();
        this.state = {
            isLoading: true
        };
    }

    static navigationOptions = {
        header: (<View><Text style={{
            padding: 10,
            fontSize: 30,
            color: 'white',
            fontWeight: 'bold',
            textAlign: 'center',
            backgroundColor: '#1f3151'
        }}>BROACH</Text></View>),
    };

    static getInitialState() {
        return {
            login: null
        }
    }

    componentDidMount(): void {
        this.checkLogin();
    }

    checkLogin() {
        AsyncStorage.multiGet(['username', 'password'], (err, keys) => {
            let username = keys[0][1];
            let password = keys[1][1];
            if (err || username == null || password == null) {
                // this means we cannot get the username/password
                console.log("There were no username/password")
            } else {
                console.log("checking login");
                this.setState({
                    loggingIn: true
                });
                fetch("http://145.94.205.6:1234/login?username=" + username + "&password=" + password, {
                    method: 'POST',
                    credentials: 'include'
                }).then(response => {
                    if (!response.ok) {
                        this.setState({
                            login: false,
                            loggingIn: false
                        })
                    } else {
                        console.log("logged in");
                        this.setState({
                            login: true
                        });
                        StoreGlobal({type: 'set', key: 'username', value: username})
                    }

                });
            }
        });
    }

    render() {
        if (this.state.login) {
            return this.showHomePage();
        } else if (this.state.loggingIn) {
            return (
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <MKSpinner/>
                    <Text>Trying to login</Text>
                </View>
            )
        } else {
            return this.showLoginScreen();
        }
    }

    showLoginScreen() {
        return (
            <View>
                <View>
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => this.setState({name: text})}
                        placeholder="Name"
                    />
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => this.setState({password: text})}
                        secureTextEntry={true}
                        placeholder="Password"
                    />
                    <MKButton
                        shadowRadius={2}
                        shadowOffset={{width: 0, height: 2}}
                        shadowOpacity={.7}
                        shadowColor="black"
                        style={styles.button}
                        onPress={() => {
                            AsyncStorage.multiSet([['username', this.state.name],
                                ['password', this.state.password]], (err) => {
                                if (!err) {
                                    this.checkLogin();
                                } else {
                                    console.log(err);
                                }
                            })
                        }}
                    >
                        <Text pointerEvents="none"
                              style={styles.button_login}>
                            Login
                        </Text>
                    </MKButton>
                </View>
            </View>
        )
    }


    showHomePage() {
        return (
            <View style={styles.view_style}>
                <MKButton
                    backgroundColor={'#1f3151'}
                    shadowRadius={2}
                    shadowOffset={{width: 0, height: 2}}
                    shadowOpacity={.7}
                    shadowColor="black"
                    style={styles.button}
                    onPress={() => {
                        this.props.navigation.navigate('Vereneging')
                    }}
                >
                    <Text pointerEvents="none"
                          style={styles.button_text}>
                        Vereneging
                    </Text>
                </MKButton>
                <MKButton
                    backgroundColor={'#1f3151'}
                    shadowRadius={2}
                    shadowOffset={{width: 0, height: 2}}
                    shadowOpacity={.7}
                    shadowColor="black"
                    style={styles.button}
                    onPress={() => {
                        this.props.navigation.navigate('Leden')
                    }}
                >
                    <Text pointerEvents="none"
                          style={styles.button_text}>
                        Leden
                    </Text>
                </MKButton>
                <MKButton
                    backgroundColor={'#1f3151'}
                    shadowRadius={2}
                    shadowOffset={{width: 0, height: 2}}
                    shadowOpacity={.7}
                    shadowColor="black"
                    style={styles.button}
                    onPress={() => {
                        this.props.navigation.navigate('Brevet')
                    }}
                >
                    <Text pointerEvents="none"
                          style={styles.button_text}>
                        Brevetten
                    </Text>
                </MKButton>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 60,
        alignItems: 'center'
    },
    view_style: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        backgroundColor: '#1f3151',
        flexDirection: 'column'
    },
    button_text: {
        color: 'white',
        fontWeight: 'bold',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 35,
        flex: 1,
        flexDirection: 'row',
    },
    button_login: {
        color: '#1f3151',
        fontWeight: 'bold',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 35,
        flex: 1,
        flexDirection: 'row',
    },
    button: {
        flex: -1,
        flexDirection: 'row',
        paddingLeft: 30
    },
    input: {
        width: 250,
        margin: 5
    }
});

