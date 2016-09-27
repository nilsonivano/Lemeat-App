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

    closeControlPanel = () => {
        this._drawer.close()
    };
    openControlPanel = () => {
        this._drawer.open()
    };

    render() {
        if (this.state.data) {
            return (
                <Drawer
                    ref={(ref) => this._drawer = ref}
                    type="overlay"
                    content={<ControlPanel />}
                    tapToClose={true}
                    openDrawerOffset={0.2} // 20% gap on the right side of drawer
                    panCloseMask={0.2}
                    closedDrawerOffset={-3}
                    styles={drawerStyles}
                    tweenHandler={(ratio) => ({
                        main: { opacity:(2-ratio)/2 }
                    })}
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
        marginTop: 15,
        marginBottom: 10,
        height: 30
    }
});

const drawerStyles = {
    drawer: { shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 3},
    main: {paddingLeft: 3},
}

export default LemeatTruckList