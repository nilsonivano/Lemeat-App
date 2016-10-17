import React, {PropTypes} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Dimensions,
    TouchableOpacity,
} from 'react-native';

import {colors} from '../config/styles';
import {Actions} from 'react-native-router-flux';

const propTypes = {
    style: PropTypes.object,
};

class CustomCallout extends React.Component {
    render() {
        var truckId = this.props.TruckId;
        return (
            <View style={[styles.container, this.props.style]}>
                <View style={styles.bubble}>
                    <View style={styles.amount}>
                        <Text style={styles.truckName}>{this.props.TruckName}</Text>
                        <Text style={styles.smallText}>{this.props.AgendaAddress}</Text>
                        <Text style={styles.smallText}>{this.props.AgendaInfo}</Text>
                    </View>
                </View>
            </View>
        );
    }
}

CustomCallout.propTypes = propTypes;

const window = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        alignSelf: 'flex-start',
    },
    bubble: {
        flexDirection: 'row',
        alignSelf: 'flex-start',
        backgroundColor: 'white',
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 2,
    },
    amount: {
        flex: 1,
    },
    arrow: {
        backgroundColor: 'transparent',
        borderWidth: 16,
        borderColor: 'transparent',
        borderTopColor: 'white',
        alignSelf: 'center',
        marginTop: -32,
    },
    arrowBorder: {
        backgroundColor: 'transparent',
        borderWidth: 16,
        borderColor: 'transparent',
        borderTopColor: '#007a87',
        alignSelf: 'center',
        marginTop: -0.5,
    },
    smallText: {
        fontSize: 12,
        color: colors.secondaryTextColor,
        marginBottom: 5,
    },
    truckName: {
        fontSize: 14,
        fontWeight: '400',
        color: colors.primaryTextColor
    },
});

module.exports = CustomCallout;