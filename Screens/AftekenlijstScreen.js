import React from 'react'
import {ScrollView, Text, View, StyleSheet, Platform} from "react-native";
import {MKSpinner, MKSwitch, MKColor} from "react-native-material-kit";
import {StoreGlobal} from "../App";

var REQUEST_URL = "http://145.94.205.6:1234";

export class AftekenlijstScreen extends React.Component {
    lijstSoort;
    lijst;

    constructor(props) {
        super(props);
        const {navigation} = props;
        this.lijstSoort = navigation.getParam('type', 'b');
        this.state = {
            isLoading: true,
            naam: StoreGlobal({type: "get", key: "username"})
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
        this.fetchData();
    }

    fetchData() {
        this.setState({
            content: null,
        });
        fetch(REQUEST_URL + '/aftekenlijst/' + this.state.name, {
            credentials: 'include'
        })
            .then(response => response.json())
            .then(responseData => {
                console.log(responseData);
                let content = [];
                content.push(<Text style={styles.title}>Walonderdelen</Text>);
                responseData['walOnderDelen'].forEach((item) => {
                    content.push(this.maakAftekenItem(item.id, item.title, item.ondertekend));
                });

                this.setState({
                    lijst: content
                })
            })
            .catch(err => {
                console.log("Error " + err);
                this.setState({error: true,})
            }).done();
    }

    changeThisTitle = (titleText) => {
        const {setParams} = this.props.navigation;
        setParams({title: titleText})
    };

    render() {
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

    renderLijst() {
        return (<ScrollView style={styles.screen}>
            <Text style={styles.title}>Walonderdelen</Text>
            <View style={styles.container}>
                <View style={styles.blackbox}>
                    <Text>Zetten van de mast</Text>
                </View>
                <View style={styles.redbox}>
                    <MKSwitch
                        onColor="rgba(255,152,0,.3)"
                        thumbOnColor={MKColor.Orange}
                        rippleColor="rgba(255,152,0,.2)"
                        onPress={() => console.log('orange switch pressed')}
                        onCheckedChange={(e) => console.log('orange switch checked', e)}
                    />
                </View>
            </View>
        </ScrollView>);
    }

    maakAftekenItem(id, title, ondertekend) {
        return (<View style={styles.container}
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
                    onCheckedChange={(e) => console.log('orange switch checked' + id, e)}/>
            </View>
        </View>)
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