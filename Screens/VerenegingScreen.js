import React from 'react';
import {View, Text, ScrollView, TouchableHighlight} from 'react-native';
import HTML from 'react-native-render-html'
import {Button} from '../Button'

const REQUEST_URL = "http://broach.nl/wp-json/wp/v2/posts?per_page=5";

export class VerenegingScreen extends React.Component {
    prop;
    constructor(props) {
        super(props);
        this.prop = props;
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
                let artikels = [];
                for (let i = 0; i < responseData.length; i++ ) {
                    artikels.push(
                        <TouchableHighlight onPress={() => this.prop.navigation.navigate('Nieuwsartiekel', {id: responseData[i].id,
                            name: responseData[i].title.rendered})}>
                            <Text key={responseData[i].id}>{responseData[i].title.rendered}</Text>
                        </TouchableHighlight>);
                }
                this.setState({
                    // nieuws: {title: responseData[0].title.rendered,
                    //          content: responseData[0].content.rendered},
                    nieuws:artikels,
                });
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
        return (<ScrollView style={{flex: 1}}>
            {this.state.nieuws}
            {/*<HTML html={this.state.nieuws.content}/>*/}
        </ScrollView>);
    }
}

