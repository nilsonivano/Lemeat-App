import React from 'react';
import {
    ListView,
    View,
    MapView,
    StyleSheet,
    Dimensions,
} from 'react-native';
import Loading from './Loading';

class TruckMap extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            markers: []
        };
    }

    componentWillMount() {
        fetch('http://lemeat.com/api/truckAgenda')
            .then((response) => {
                return response.json()
            })
            .then(response => {
                if (response.status = 'success') {
                    let currentTime = new Date();
                    console.log(currentTime);
                    let agendas = response.data;
                    var markers = [];
                    for (agenda of agendas) {
                        let agendaDateEnd = new Date(agenda.dateEnd);
                        if (typeof agenda.lat == 'string' && typeof agenda.lng == 'string' && agendaDateEnd > currentTime) {
                            let marker = {
                                latitude: agenda.lat,
                                longitude: agenda.lng,
                                title: agenda.truckName,
                                description: agenda.address,
                            };
                            markers.push(marker)
                        }
                    }
                    console.log(markers);
                    this.setState({
                        markers: markers,
                        loading: false,
                    });
                    console.log(this.state.markers)
                }
            })
            .catch((error) => {
                alert(error);
                console.error(error);
            });
    }

    render() {
        if (this.state.loading) {
            return <Loading/>
        }
        return (
            <MapView
                style={styles.map}
                onRegionChange={() => {
                }}
                onRegionChangeComplete={() => {
                }}
                showsUserLocation={true}
                followUserLocation={false}
                annotations={this.state.markers}
            />
        )
    }
}

TruckMap.propTypes = {
    markers: React.PropTypes.array
}

const window = Dimensions.get('window')

const styles = StyleSheet.create({
    map: {
        width: window.width,
        height: window.height,
        flexDirection: 'row'
    }
})

export default TruckMap