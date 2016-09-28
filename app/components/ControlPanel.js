import React from 'react';
import{
    Text,
    View,
    StyleSheet
} from 'react-native';

import {
    Screen,
    Icon,
    Title,
    Divider
} from '@shoutem/ui'

class ControlPanel extends React.Component {
    render() {
        return (
            <View
                style={styles.ControlPanel}>
                <Text>Que Legal</Text>
                <Divider/>
                <Text>Esse Lemeat!!</Text>
                <Divider/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    ControlPanel:{
        marginTop: 50,
        marginLeft: 10,
    }
})

export default ControlPanel