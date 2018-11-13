import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Button} from '../Button'

const REQUEST_URL = "http://broach.nl/wp-json/wp/v2/posts?per_page=1";

export class VerenegingScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true
        };
        this.fetchData = this.fetchData.bind(this);
    }
    static navigationOptions = {
        headerTitle: "Vereneging",
    };

    getInitialState() {
        return {
            // Card is initially set to null so that the loading message shows.
            nieuws: null,
        };
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData() {
        this.setState({
            nieuws: null,
        });
        fetch(REQUEST_URL)
            .then((response) => response.json())
            .then((responseData) => {

                this.setState({
                    nieuws: responseData,
                })
            })
            .done();

    }

    render() {
        if (!this.state.nieuws) {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Laden...</Text>
            </View>
        )} else {
            return this.renderNieuws();
        }
    }

    renderNieuws() {
        return (<View>
            <Text>Nieuws is geladen: {this.state.nieuws}</Text>
        </View>);
    }
}

