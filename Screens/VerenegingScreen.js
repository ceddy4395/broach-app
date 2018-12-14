import React from 'react';
import {View, Text, ScrollView, TouchableHighlight, StyleSheet, Image, Platform} from 'react-native';
import HTML from 'react-native-render-html'
import {Logo} from "../assets/logo.png";
import {
    MKSpinner,
    getTheme,
} from 'react-native-material-kit';

const theme = getTheme();

const REQUEST_URL = "http://broach.nl/wp-json/wp/v2/posts?per_page=5";
const MEDIA_URL = "http://broach.nl/wp-json/wp/v2/media/";

export class VerenegingScreen extends React.Component {
    prop;
    cards;

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
            .then(async (responseData) => {
                let artikels = [];
                for (let i = 0; i < responseData.length; i++) {
                    var uri = await this.getMedia(responseData[i].featured_media);
                    artikels.push(
                        <View style={VerenegingScreen.styles.container} key={responseData[i].id}>
                            <View style={theme.cardStyle}>
                                <Image source={{uri: uri}} style={theme.cardImageStyle}/>
                                <Text
                                    style={[theme.cardTitleStyle, VerenegingScreen.styles.title]}>{responseData[i].title.rendered}</Text>
                                <View
                                    style={{
                                        padding: 7,
                                    }}
                                >
                                    <HTML style={theme.cardContentStyle} html={responseData[i].excerpt.rendered}/>
                                </View>
                                <TouchableHighlight onPress={() => this.prop.navigation.navigate('Nieuwsartiekel', {
                                    id: responseData[i].id,
                                    name: responseData[i].title.rendered
                                })}>
                                    <Text style={theme.cardActionStyle}>Meer Lezen</Text>
                                </TouchableHighlight>
                            </View>
                        </View>);
                    console.log("finished with the view: " + responseData[i].featured_media);
                }
                this.setState({
                    nieuws: artikels,
                });
            });
    }

    render() {
        if (!this.state.nieuws) {
            return (
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <MKSpinner/>
                    <Text>Laden...</Text>
                </View>
            )
        } else {
            return this.renderNieuws();
        }
    }

    getMedia = async (id) => {
        console.log("fetching: " + id);
        var data = await fetch(MEDIA_URL + id);
        var jsonData = await data.json();
        console.log("fetched: " + id);
        return jsonData.guid.rendered;
    };

    renderNieuws() {
        return (<ScrollView style={{flex: 1, backgroundColor: "#1f3151"}}>
            {this.state.nieuws}
        </ScrollView>);
    }

    static styles = StyleSheet.create({
        container: {
            flex: 1,
            alignItems: 'stretch',
            backgroundColor: '#1f3151',
            padding: 20,
            marginTop: Platform.OS === 'android' ? 30 : 0,
        },
        title: {
            padding: 10,
        },
        activeTitle: {
            color: 'red',
        },
    });
}



