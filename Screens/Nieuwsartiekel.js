import React from "react";
import {ScrollView, Text, View, Image} from "react-native";
import HTML from 'react-native-render-html'
import {
    MKSpinner,
} from 'react-native-material-kit';

const REQUEST_URL = "http://broach.nl/wp-json/wp/v2/posts/";
const MEDIA_URL = "http://broach.nl/wp-json/wp/v2/media/";

export class Nieuwsartiekel extends React.Component {
    itemId;
    itemName;
    constructor(props) {
        super(props);
        const { navigation } = props;
        this.itemId = navigation.getParam('id', '1');
        this.itemName = navigation.getParam('name', 'noname');
        this.state = {
            isLoading: true
        }
    }

    static navigationOptions = ({ navigation }) => {
        const {state} = navigation;
        return {
            title: `${state.params.title}`,
        };
    };

    ChangeThisTitle = (titleText) => {
        const {setParams} = this.props.navigation;
        setParams({ title: titleText })
    };

    static getInitialState() {
        return {
            content: null
        }
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData() {
        this.setState({
            content: null,
        });
        fetch(REQUEST_URL + this.itemId)
            .then((respone) => respone.json())
            .then(async (responseData) => {
                var media = await this.getMedia(responseData.featured_media);
                console.log("media: " + media);
                this.setState({
                    content: responseData.content.rendered,
                    media: media,
                })
            });
        this.ChangeThisTitle(this.itemName);
    }

    render() {
        if (!this.state.content) {
            return (
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <MKSpinner/>
                    <Text>Laden...</Text>
                    <Text>{REQUEST_URL + this.itemId}</Text>
                </View>
            )} else {
            return this.renderNieuws();
        }
    }

    renderNieuws() {
        return (<ScrollView style={{flex: 1}}>
            <Image source={{uri: this.state.media}} style={{
                marginTop: 20,
                flex: 1,
                alignSelf: 'center',
                width: 400,
                height: 200
            }}
                   resizeMode="contain"/>
            <HTML html={this.state.content}/>
        </ScrollView>);
    }

    getMedia = async (id) => {
        console.log("fetching: " + id);
        var data = await fetch(MEDIA_URL + id);
        var jsonData = await data.json();
        console.log("fetched: " + id);
        return jsonData.guid.rendered;
    };

}