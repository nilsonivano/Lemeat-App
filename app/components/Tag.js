import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';

import {colors} from '../config/styles';

class Tag extends React.Component {
    render() {
        return (
            <View style={styles.tagBox}>
                <Text style={styles.tagText}>{this.props.tag}</Text>
            </View>
        )
    }
}

Tag.defaultProps = {};

Tag.propTypes = {
    tag: React.PropTypes.string
};

const styles = StyleSheet.create({
    tagBox: {
        height:25,
        borderRadius: 30,
        backgroundColor: colors.defaultPrimaryColor,
        marginRight: 5,
        marginTop: 5,
    },
    tagText: {
        fontSize: 10,
        fontWeight: '300',
        color: 'white',
        padding: 5,
    }
});

export default Tag