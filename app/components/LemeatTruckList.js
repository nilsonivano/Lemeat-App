import React, {Component} from 'react'
import {
    View,
    StyleSheet,
    Dimensions,
    Image,
    Text
} from 'react-native'
import {
    ListView,
    NavigationBar,
    Screen,
    Icon,
    Title,
    Button,
    DropDownMenu
} from '@shoutem/ui'
import TruckRow from './TruckRow'
import Loading from './Loading'
import Drawer from 'react-native-drawer'
import images from '../config/images'
import {colors} from '../config/styles'
import ControlPanel from './ControlPanel'
import {getDistanceFromLatLonInKm, deg2rad} from './auxFunctions'

class LemeatTruckList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            initialPosition: 'unknown',
            lastPosition: 'unknown',
        };
    }

    watchID: ?number = null;

    //Drawer Controls
    closeControlPanel = () => {
        this._drawer.close()
    };
    openControlPanel = () => {
        this._drawer.open()
    };

    //Loading information
    componentWillMount() {
        //Getting user location
        navigator.geolocation.getCurrentPosition(
            (position) => {
                var initialPosition = JSON.stringify(position);
                console.log(position);
                this.setState({initialPosition});
                var userLat = position.coords.latitude;
                var userLng = position.coords.longitude;
                fetch('http://lemeat.com/api/truckList?lat=' + userLat + '&lng=' + userLng)
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
                        this.setState({
                            data: response
                        })
                    })
                    .catch((error) => {
                        alert(error);
                        console.error(error);
                    });
            },
            (error) => alert(JSON.stringify(error)),
            {enableHighAccuracy: false, timeout: 20000, maximumAge: 1000}
        );
        this.watchID = navigator.geolocation.watchPosition((position) => {
            var lastPosition = JSON.stringify(position);
            this.setState({lastPosition});
        });

    }

    componentWillUnmount() {
        navigator.geolocation.clearWatch(this.watchID);
    }

    render() {
        if (this.state.data) {
            return (
                <Drawer
                    ref={(ref) => this._drawer = ref}
                    type="static"
                    content={<ControlPanel />}
                    openDrawerOffset={100}
                    styles={drawerStyles}
                    tweenHandler={Drawer.tweenPresets.parallax}
                >
                    <Screen styleName="paper">
                        <ListView
                            style={styles.TruckList}
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
                        <NavigationBar
                            style={styles.NavigationBar}
                            leftComponent={
                                <Button
                                    onPress={() => this.openControlPanel()}>
                                    <Icon name="sidebar"/>
                                </Button>
                            }
                            centerComponent={<Image
                                style={styles.NavigationBarLogo}
                                source={images.logoWritten}
                                resizeMode='contain'
                            />}
                            rightComponent={<DropDownMenu
                                options={[
                                    {name: 'Todos', value: 1},
                                    {name: 'Sport', value: 1},
                                    {name: 'World', value: 1},
                                    {name: 'Lifestyle', value: 1},
                                    {name: 'Food', value: 1},
                                    {name: 'Music', value: 1},
                                    {name: 'Movies', value: 1},
                                    {name: 'Tech', value: 1},
                                    {name: 'Fun', value: 1},
                                    {name: 'Fashion', value: 1},
                                ]}
                                titleProperty="name"
                                valueProperty="value"
                            />}
                        />
                    </Screen>
                </Drawer>

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
    NavigationBar: {
        backgroundColor: colors.defaultPrimaryColor
    },
    NavigationBarLogo: {
        width: 40
    }
});

const drawerStyles = {
    drawer: {shadowColor: 'gray', shadowOpacity: 0.2, shadowRadius: 3},
    main: {paddingLeft: 3},
}

export default LemeatTruckList