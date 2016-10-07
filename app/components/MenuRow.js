import React from 'react';
import{
    Text,
    View,
    StyleSheet
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import {colors} from '../config/styles';

class MenuRow extends React.Component {
    render() {
        if(this.props.menu){
            return (
                <View style={styles.row}>
                    <Text style={styles.cardapioTitle}>Cardápio oferecido</Text>
                    <Text>{this.props.menu}</Text>
                </View>
            )
        }
        return(
            <View style={styles.row}>
                <Text style={styles.cardapioTitle}>Cardápio oferecido</Text>
                <Text>Informação não disponível</Text>
            </View>
        )
    }
}

MenuRow.propTypes = {};

const styles = StyleSheet.create({
    row:{
        padding: 10,
    },
    cardapioTitle: {
        fontSize: 16,
        fontWeight: '500'
    }
})

export default MenuRow