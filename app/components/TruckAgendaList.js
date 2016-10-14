import React from 'react';
import{
    Text,
    View,
    StyleSheet,
} from 'react-native';

import TruckAgendaRow from './TruckAgendaRow';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {colors} from '../config/styles';
import {getDistanceFromLatLonInKm, deg2rad} from './auxFunctions';

class TruckAgendaList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userLoc: []
        };
    }

    getUserLoc() {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                var userLoc = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                };
                this.setState({
                    userLoc: userLoc
                })
            },
            (error) => alert(JSON.stringify(error)),
            {enableHighAccuracy: false, timeout: 20000, maximumAge: 1000}
        );
    }

    componentWillMount(){
        this.getUserLoc();
    }

    render() {
        var agendaList = this.props.agendaList;
        if(agendaList.length > 0){
            var userLoc = this.state.userLoc;
            for(i = 0; i < agendaList.length; i++){
                let userDistance = getDistanceFromLatLonInKm(userLoc.lat, userLoc.lng, agendaList[i].lat, agendaList[i].lng);
                agendaList[i].distance = userDistance;
            }
            return (
                <View style={{flexDirection: 'row'}}>
                    <View style={{padding: 10}}>
                        <Icon name="event-available" size={24} style={{color: colors.defaultPrimaryColor}}/>
                    </View>
                    <View style={styles.container}>
                        {agendaList.map(agenda =>(
                            <TruckAgendaRow
                                address={agenda.address}
                                dateStart={agenda.dateStart}
                                dateEnd={agenda.dateEnd}
                                distance={agenda.distance.toFixed(1)}
                                userLat={agenda.lat}
                                userLng={agenda.lng}
                            />
                        ))}
                    </View>
                </View>
            )
        } else{
            return (
                <View style={{flexDirection: 'row', padding: 10}}>
                        <Icon name="event-available" size={24} style={{color: colors.defaultPrimaryColor}}/>
                        <Text style={{marginLeft: 10}}>Sem agenda disponível para os próximos dias</Text>
                </View>
            )
        }

    }
}

TruckAgendaList.propTypes = {
    agenda: React.PropTypes.array,
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
        flex: 1
    }
})

export default TruckAgendaList