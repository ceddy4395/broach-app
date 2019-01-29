import React from 'react'
import {ScrollView, Text, View, StyleSheet, Platform} from "react-native";
import {MKSpinner, MKSwitch, MKColor} from "react-native-material-kit";
import Dialog, {DialogContent, DialogTitle, SlideAnimation, DialogButton} from 'react-native-popup-dialog';
import {StoreGlobal} from "../App";
import {server_ip} from "../back-end/serverconnection";


export class AftekenlijstScreen extends React.Component {
    lijstSoort;
    lijst;

    constructor(props) {
        super(props);
        const {navigation} = props;
        this.lijstSoort = navigation.getParam('type', 'B');
        this.state = {
            isLoading: true,
            naam: StoreGlobal({type: "get", key: "username"}),
            data: navigation.getParam('responseData', false)
        };
        this.changeThisTitle(this.lijstSoort + "-lijst")
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
            }}>{state.params.type + "-lijst"}</Text></View>)
        }
    };

    static getInitialState() {
        return {
            lijst: null
        }
    }

    componentDidMount(): void {
        if (!this.state.data) {
            this.fetchData();
        } else {
            this.setState({
                lijst: this.createLijst(this.state.data)
            });
        }

    }

    fetchData() {
        this.setState({
            content: null,
        });
        console.log("REquest: " + server_ip + '/aftekenlijst/'+ this.lijstSoort);
        fetch(server_ip + '/aftekenlijst/'+ this.lijstSoort, {
            credentials: 'include'
        })
            .then(response => {
                console.log(response);
                return JSON.parse(response._bodyInit);
            })
            .then(responseData => {
                console.log("response: " + responseData);
                this.setState({
                    data: responseData
                });
                this.setState({
                    lijst: this.createLijst(this.state.data)
                });
            })
            .catch(err => {
                console.log("Error " + err);
                this.setState({error: true,})
            }).done();
    }
    createLijst(responseData) {
        let content = [];
        content.push(<Text key="walonderdelen" style={styles.title}>Walonderdelen</Text>);
        responseData["walOnderDelen"].forEach((item) => {
            content.push(this.maakAftekenItem(item.id, item.title, item.ondertekend));
        });
        content.push(<Text key="zeilen" style={styles.title}>Zeilen</Text>);
        responseData["zeilen"].forEach((item) => {
            content.push(this.maakAftekenItem(item.id, item.title, item.ondertekend));
        });
        content.push(<Text key="overig" style={styles.title}>Zeilen</Text>);
        responseData["overig"].forEach((item) => {
            content.push(this.maakAftekenItem(item.id, item.title, item.ondertekend));
        });
        return content;
    }

    changeThisTitle = (titleText) => {
        const {setParams} = this.props.navigation;
        setParams({title: titleText})
    };

    render() {
        console.log("rendering");
        if (!this.state.lijst) {
            return (
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <MKSpinner/>
                    <Text>Laden...</Text>
                    <Text>{this.lijstSoort + " lijst"}</Text>
                </View>
            )
        } else if (this.state.error) {
            return (<View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Text>Kan informatie niet laden, check je internet connectie en probeer opnieuw</Text>
            </View>)

        } else if (this.state.lijst) {
            return (<ScrollView style={styles.screen}>{this.state.lijst}</ScrollView>);
        }
    }

    maakAftekenItem(id, title, ondertekend) {
        var content = [];
        content.push(<View style={styles.container}
                           id={id}
                           key={id}>
            <View style={styles.blackbox}>
                <Text>{title}</Text>
            </View>
            <View style={styles.redbox}>
                <MKSwitch
                    checked={ondertekend}
                    onColor="rgba(255,152,0,.3)"
                    thumbOnColor={MKColor.Orange}
                    rippleColor="rgba(255,152,0,.2)"
                    onPress={() => console.log('orange switch pressed ' + id)}
                    onCheckedChange={(e) => {
                        if (e.checked === true) {
                            console.log("opening verify screen");
                            this.props.navigation.navigate('VerifyScreen', {
                                id: id,
                                soort: this.lijstSoort
                            });
                        }
                    }}/>
            </View>
        </View>);
        return content;
    }

}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 20,
        marginTop: Platform.OS === 'android' ? 15 : 0,
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        marginTop: Platform.OS === 'android' ? 15 : 0,
    },
    redbox: {
        alignItems: 'center',
    }, blackbox: {
        alignItems: 'center'
    },
    title: {
        fontWeight: 'bold',
        fontSize: 20
    }
});