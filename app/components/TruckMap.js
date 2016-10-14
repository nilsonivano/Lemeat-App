import React from 'react';
import {
    ListView,
    View,
    StyleSheet,
    Dimensions,
} from 'react-native';
import Loading from './Loading';
import MapView from 'react-native-maps';
import images from '../config/images';

class TruckMap extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            markers: [],
            region: {
                latitude: 37.78825,
                longitude: -122.4324,
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

    getMarkers(){
        fetch('http://lemeat.com/api/truckAgenda')
            .then((response) => {
                return response.json()
            })
            .then(response => {
                    let agendas = response;
                    console.log(agendas);
                    var markers = [];
                    for (agenda of agendas) {
                        if (typeof agenda.lat == 'string' && typeof agenda.lng == 'string') {
                            let marker = {
                                latlng: {
                                    latitude: parseFloat(agenda.lat),
                                    longitude: parseFloat(agenda.lng)
                                },
                                latitude: agenda.lat,
                                longitude: agenda.lng,
                                title: agenda.truckName,
                                description: agenda.address,
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

    componentDidMount(){
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
                        title={marker.title}
                        description={marker.description}
                        image={images.marker.truck150}
                    />
                ))}
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
    }
});

export default TruckMap