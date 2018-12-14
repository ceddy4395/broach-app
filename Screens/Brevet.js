import React from 'React';
import {Text, View, StyleSheet} from "react-native";
import {MKButton} from "react-native-material-kit";
import HTML from 'react-native-render-html'


export class Brevet extends React.Component {
    static navigationOptions = {
        title: "brevet",
    };

    render() {
        return (
            <View style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'space-evenly',
                backgroundColor: '#1f3151',
                flexDirection: 'column'
            }}>
                <MKButton
                    backgroundColor={'#1f3151'}
                    shadowRadius={2}
                    shadowOffset={{width: 0, height: 2}}
                    shadowOpacity={.7}
                    shadowColor="black"
                    style={styles.button}
                    onPress={() => this.props.navigation.navigate('AftekenlijstScreen', {
                        type: 'B'
                    })}>
                    <Text pointerEvents="none" numberOfLines={1}
                          style={styles.button_text}>
                        B-aftekenlijst
                    </Text>
                </MKButton>
                <MKButton
                    backgroundColor={'#1f3151'}
                    shadowRadius={2}
                    shadowOffset={{width: 0, height: 2}}
                    shadowOpacity={.7}
                    shadowColor="black"
                    style={styles.button}
                    onPress={() => this.props.navigation.navigate('AftekenlijstScreen', {
                        type: 'D'
                    })}>
                    <Text pointerEvents="none" numberOfLines={1}
                          style={styles.button_text}>
                        D-aftekenlijst
                    </Text>
                </MKButton>
                <MKButton
                    backgroundColor={'#1f3151'}
                    shadowRadius={2}
                    shadowOffset={{width: 0, height: 2}}
                    shadowOpacity={.7}
                    shadowColor="black"
                    style={styles.button}
                    onPress={() => this.props.navigation.navigate('AftekenlijstScreen', {
                        type: 'SB'
                    })}>
                    <Text pointerEvents="none" style={styles.button_text}>
                        SB-aftekenlijst
                    </Text>
                </MKButton>
                <MKButton
                    backgroundColor={'#1f3151'}
                    shadowRadius={2}
                    shadowOffset={{width: 0, height: 2}}
                    shadowOpacity={.7}
                    shadowColor="black"
                    style={styles.button}
                    onPress={() => this.props.navigation.navigate('AftekenlijstScreen', {
                        type: 'RS'
                    })}>
                    <Text pointerEvents="none" style={styles.button_text}>
                        RS-aftekenlijst
                    </Text>
                </MKButton>
            </View>)
    }
}

const styles = StyleSheet.create({
    button_text: {
        color: 'white',
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
    }
});