import React from 'react';
import{
    Text,
    View,
    StyleSheet,
    TouchableOpacity
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import {colors} from '../config/styles';
import moment from 'moment';
import br from 'moment/locale/pt-br';

class TruckAgendaRow extends React.Component {
    render() {
        moment.locale('pt-br');
        var date = moment(this.props.dateStart).format('MMMM Do YYYY');
        var dateStart = moment(this.props.dateStart).format('h:mm');
        var dateEnd = moment(this.props.dateEnd).format('h:mm');
        return (
            <TouchableOpacity>
                <View style={styles.row}>
                    <View style={styles.container}>
                        <Text style={styles.addressText}>{this.props.address}</Text>
                        <View style={styles.timeTable}>
                            <Text style={styles.timeTableText}>{date} {dateStart} às {dateEnd}</Text>
                        </View>
                    </View>
                    <View style={styles.distanceContainer}>
                        <Icon name="place" size={14} style={{color: colors.defaultPrimaryColor}}/>
                        <Text style={styles.distanceText}>{this.props.distance} km</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}

TruckAgendaRow.propTypes = {};

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row'
    },
    container: {
        flexDirection: 'column',
        flex: 1
    },
    timeTable: {
        flexDirection: 'row'
    },
    timeTableText: {
        fontSize: 12
    },
    addressText: {
        fontSize: 14,
        fontWeight: '500'
    },
    distanceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    distanceText: {
        fontSize: 14,
    }

})

export default TruckAgendaRow