import React from 'react';
import{
    Text,
    View,
    StyleSheet,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import {colors} from '../config/styles';

class ContactRow extends React.Component {
    render() {
        return (
            <View style={styles.row}>
                <View style={styles.iconContainer}>
                    <Icon name={this.props.contactTypeIcon} size={24} style={{color: colors.defaultPrimaryColor}}/>
                </View>
                <View style={styles.container}>
                    <Text style={styles.contactType}>{this.props.contactType}</Text>
                    <Text style={styles.contactText}>{this.props.contactText}</Text>
                </View>
            </View>
        )
    }
}

ContactRow.propTypes = {};

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row'
    },
    container: {
        flexDirection: 'column',
        flex: 1
    },
    contactText: {
        fontSize: 12
    },
    contactType: {
        fontSize: 14,
        fontWeight: '500'
    },
    iconContainer: {
        width: 40,
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
})

export default ContactRow