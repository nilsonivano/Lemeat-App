import React from 'react';
import {
    ListView,
    View,
    StyleSheet,
    Dimensions,
    Text,
} from 'react-native';
import Loading from './Loading';
import MapView from 'react-native-maps';
import images from '../config/images';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {colors} from '../config/styles';
import moment from 'moment';
import br from 'moment/locale/pt-br';
import CustomCallout from './CustomCallout';

class TruckMap extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            markers: [],
            region: {
                latitude: -23.553400,
                longitude: -46.631425,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            },
        };
    }

    getUserLocation() {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                var currentPosition = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421
                };
                console.log(currentPosition);
                this.setState({
                    region: currentPosition,
                    loading: false,
                })
            },
            (error) => alert(JSON.stringify(error)),
            {enableHighAccuracy: false, timeout: 20000, maximumAge: 1000}
        );
    }

    getMarkers() {
        fetch('http://lemeat.com/api/truckAgenda')
            .then((response) => {
                return response.json()
            })
            .then(response => {
                let agendas = response;
                console.log(agendas);
                var markers = [];
                moment.locale('pt-br');
                for (agenda of agendas) {
                    if (typeof agenda.lat == 'string' && typeof agenda.lng == 'string') {
                        let date = moment(agenda.dateStart).format('MMMM Do YYYY');
                        let dateStart = moment(agenda.dateStart).format('h:mm');
                        let dateEnd = moment(agenda.dateEnd).format('h:mm');
                        let markerAgendaDescription = date + " " + dateStart + " às " + dateEnd;
                        let marker = {
                            latlng: {
                                latitude: parseFloat(agenda.lat),
                                longitude: parseFloat(agenda.lng)
                            },
                            latitude: agenda.lat,
                            longitude: agenda.lng,
                            title: agenda.truckName,
                            address: agenda.address,
                            agendaDescription: markerAgendaDescription,
                            truckId: agenda.addedBy
                        };
                        markers.push(marker)
                    }
                }
                this.setState({
                    markers: markers
                });
            })
            .catch((error) => {
                alert(error);
                console.error(error);
            });
    }

    componentWillMount() {
        this.getUserLocation();

    }

    componentDidMount() {
        this.getMarkers();
    }

    render() {
        return (
            <MapView
                style={styles.map}
                region={this.state.region}>
                {this.state.markers.map(marker => (
                    <MapView.Marker
                        coordinate={marker.latlng}
                        image={images.marker.truck150}
                        calloutOffset={{x: 0, y: 0}}
                        calloutAnchor={{x: 0.5, y: 1.3}}
                    >
                        <MapView.Callout tooltip style={styles.customView}>
                            <CustomCallout TruckName={marker.title} AgendaAddress={marker.address} AgendaInfo={marker.agendaDescription} TruckId={marker.truckId}>
                            </CustomCallout>
                        </MapView.Callout>
                    </MapView.Marker>
                ))}
                <MapView.Marker
                    coordinate={this.state.region}
                    image={images.marker.userLoc150}
                />
            </MapView>
        )
    }
}

TruckMap.propTypes = {
    markers: React.PropTypes.array
};

const window = Dimensions.get('window');

const styles = StyleSheet.create({
    map: {
        height: window.height,
        width: window.width,
    },
    customView: {
        width: window.width * 0.8,
        height: 150,
    },
});

export default TruckMap