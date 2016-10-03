import React from 'react';
import{
    Text,
    View,
    StyleSheet
} from 'react-native';

class OpenStatusBox extends React.Component {
    render() {
        return (
            <View style={styles.statusBox}>
                <Text style={styles.openStatusText}>ABERTO</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    statusBox: {
        borderRadius: 5,
    },
    openStatusText: {
        fontSize: 12,
        fontWeight: '300',
        color: 'white',
        backgroundColor: 'green',
        padding: 3,
    }
})

export default OpenStatusBox