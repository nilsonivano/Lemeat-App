import React from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
} from 'react-native';

class LemeatCard extends React.Component {
    render() {
        return (
            <View style={styles.card}>
                <Image style={styles.cardImg}
                       source={require('../../images/noImage.png')}/>
                <View style={{padding: 10}}>
                    <Text>{this.props.truckName}</Text>
                    <Text>{this.props.truckSpeciality}</Text>
                    <Text>{this.props.truckDescription}</Text>
                    <Icon name="ios-person" size={30} color="#4F8EF7"/>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    card: {
        flexDirection: 'column',
        borderRadius: 4,
        borderWidth: 0.5,
        borderColor: '#d6d7da',
        marginBottom: 5,
    },
    cardImg: {
        height: 100,
    }
});

export default LemeatCard