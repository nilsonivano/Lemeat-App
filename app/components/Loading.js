import React from 'react';
import {
    View,
    ActivityIndicator,
    StyleSheet
} from 'react-native';
import {colors} from '../config/styles';

const Loading = (props) => {
    return (
        <View style={styles.container}>
            <ActivityIndicator
                animating
                size={props.size}
                {...props}
            />
        </View>
    );
};

Loading.propTypes = {
    size: React.PropTypes.string,
};

Loading.defaultProps = {
    size: 'large',
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.background,
    },
});

export default Loading;
