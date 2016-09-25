import React from 'react';
import {
    View,
    StyleSheet,
    Dimensions
} from 'react-native';
import {ListView} from '@shoutem/ui';
import TruckRow from './TruckRow';
import Loading from './Loading';

class LemeatTruckList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
        };
    }

    componentWillMount() {
        fetch('http://lemeat.com/api/truckList')
            .then((response) => {
                return response.json();
            })
            .then((response) => {
                //Colocando a imagem certa
                for (let i = 0; i < response.length; i++) {
                    let img = response[i].profile.img;
                    let imgReplace = img.replace("http://localhost:3000", "http://lemeat.com");
                    response[i].profile.img = imgReplace;
                }
                console.log(response);
                this.setState({
                    data: response
                })
            })
            .catch((error) => {
                alert(error);
                console.error(error);
            });
    }

    render() {
        if (this.state.data) {
            return (
                <ListView
                    data={this.state.data}
                    renderRow={function (truck) {
                        return (
                            <TruckRow
                                truckId={truck._id}
                                truckName={truck.profile.name}
                                speciality={truck.profile.speciality}
                                img={truck.profile.img}
                                truckAgenda={truck.dateStart}
                                distance={truck.userDistance}/>
                        )
                    }
                    }
                />
            )
        } else {
            return (
                <Loading/>
            )
        }
    }
}

LemeatTruckList.propTypes = {};

const window = Dimensions.get('window');

const styles = StyleSheet.create({
    list: {
        width: window.width,
        paddingLeft: 5,
        paddingRight: 5,
    },
});

export default LemeatTruckList