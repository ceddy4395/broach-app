import React from "react";
import {ScrollView, Text, View} from "react-native";
import HTML from 'react-native-render-html'

const REQUEST_URL = "http://broach.nl/wp-json/wp/v2/posts/";

export class Nieuwsartiekel extends React.Component {
    itemId;
    itemName;
    constructor(props) {
        super(props);
        const { navigation } = props;
        this.itemId = navigation.getParam('id', '1');
        // this.itemId = '4191';
        // Nieuwsartiekel.itemName = "test";
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
    }

    getInitialState() {
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
            .then((responseData) => {
                this.setState({
                    content: responseData.content.rendered
                })
            }).done();
        this.ChangeThisTitle(this.itemName);
    }

    render() {
        if (!this.state.content) {
            return (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Text>Laden...</Text>
                    <Text>{REQUEST_URL + this.itemId}</Text>
                </View>
            )} else {
            return this.renderNieuws();
        }
    }

    renderNieuws() {
        return (<ScrollView style={{flex: 1}}>
            <HTML html={this.state.content}/>
        </ScrollView>);
    }

}