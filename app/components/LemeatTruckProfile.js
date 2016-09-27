import React from 'react';
import {
    StyleSheet,
    Dimensions,
} from 'react-native';

import {
    ScrollView,
    Icon,
    Row,
    Subtitle,
    Text,
    Title,
    View,
    Image,
    Divider,
    Tile,
    Screen,
    NavigationBar,
    Button,
} from '@shoutem/ui';

import {Actions} from 'react-native-router-flux';

import Loading from './Loading';

class LemeatTruckProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
        };
    }

    componentWillMount() {
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
                                <Title>{this.state.data[0].profile.name}</Title>
                                <Subtitle>{this.state.data[0].profile.speciality}</Subtitle>
                            </Tile>
                        </Image>

                        <Screen styleName="paper">
                            <Text styleName="md-gutter">{this.state.data[0].profile.fullDescription}</Text>

                            <Divider styleName="line"/>

                            <Row>
                                <Icon name="laptop"/>
                                <View styleName="vertical">
                                    <Subtitle>Visitar Página</Subtitle>
                                    <Text>{this.state.data[0].profile.contacts.website}</Text>
                                </View>
                                <Icon name="right-arrow"/>
                            </Row>

                            <Divider styleName="line"/>

                            <Row>
                                <Icon name="email"/>
                                <View styleName="vertical">
                                    <Subtitle>Email</Subtitle>
                                    <Text>{this.state.data[0].profile.contacts.email}</Text>
                                </View>
                            </Row>

                            <Divider styleName="line"/>

                            <Row>
                                <Icon name="facebook"/>
                                <View styleName="vertical">
                                    <Subtitle>Facebook</Subtitle>
                                    <Text>{this.state.data[0].profile.contacts.facebook}</Text>
                                </View>
                            </Row>

                            <Divider styleName="line"/>
                        </Screen>
                    </ScrollView>
                    <NavigationBar
                        styleName="clear"
                        leftComponent={(
                            <Button>
                                <Icon
                                    name="back"
                                    onPress={() => Actions.pop()}/>
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

})

export default LemeatTruckProfile