import React from 'react';
import {
    StyleSheet,
    Dimensions,
    Text,
    View
} from 'react-native';

import {
    ScrollView,
    Row,
    Image,
    Divider,
    Tile,
    Screen,
    NavigationBar,
    Button,
} from '@shoutem/ui';

import {colors} from '../config/styles';
import {Actions} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import TruckAgendaList from './TruckAgendaList';
import ContactList from './ContactList';
import MenuRow from './MenuRow';

import Loading from './Loading';

class LemeatTruckProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
        };
    }

    fetchTruckInformation() {
        var lemeatApiAddress = "http://lemeat.com/api/truckInfo?id=";
        console.log(this.props.truckId);
        fetch(lemeatApiAddress + this.props.truckId)
            .then((response) => {
                return response.json();
            })
            .then((response) => {
                //Colocando a imagem certa
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

    componentWillMount() {
        this.fetchTruckInformation();
    }

    render() {
        var lemeatEntryPoint = "http://lemeat.com";
        if (this.state.data) {
            return (
                <Screen styleName="paper">
                    <ScrollView>
                        <Image
                            animationName="hero"
                            styleName="large-portrait hero"
                            source={{uri: lemeatEntryPoint + this.state.data[0].profile.img}}
                            key={this.state.data[0].profile.name}
                        >
                            <Tile animationName="hero">
                                <Text style={styles.truckTitle}>{this.state.data[0].profile.name}</Text>
                                <Text style={styles.truckSpeciality}>{this.state.data[0].profile.speciality}</Text>
                            </Tile>
                        </Image>
                        <Screen styleName="paper">
                            <View style={styles.container}>
                                <Text styleName="md-gutter">{this.state.data[0].profile.fullDescription}</Text>
                            </View>

                            <Divider styleName="line"/>
                            <View>
                                <TruckAgendaList
                                agendaList={this.state.data[0].agenda}
                                />
                            </View>
                            <Divider styleName="line"/>
                            <View>
                                <ContactList
                                contacts={this.state.data[0].profile.contacts}
                                />
                            </View>
                            <Divider styleName="line"/>
                            <View>
                                <MenuRow
                                menu={this.state.data[0].profile.menu}
                                />
                            </View>
                        </Screen>
                    </ScrollView>
                    <NavigationBar
                        styleName="clear"
                        leftComponent={(
                            <Button>
                                <Icon name="arrow-back"
                                      size={24}
                                      color='white'
                                      onPress={() => Actions.pop()}
                                />
                            </Button>
                        )}
                        rightComponent={(
                            <Button>
                                <Icon name="star-border"
                                      size={24}
                                      color='white'
                                />
                            </Button>
                        )}
                        share={{
                            link: '',
                            text: '',
                            title: 'Lemeat Food Truck Map',
                        }}
                    />
                </Screen>
            );
        }
        return (
            <Loading/>
        )
    }
}

LemeatTruckProfile.propTypes = {};

const window = Dimensions.get('window');

const styles = StyleSheet.create({
    container:{
        padding: 10
    },
    truckTitle: {
        color: 'white',
        fontSize: 24
    },
    truckSpeciality: {
        color: 'white',
        fontSize: 16
    }
})

export default LemeatTruckProfile