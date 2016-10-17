import React from 'react';
import {
    StyleSheet,
    Dimensions,
    Text,
    View,
    TouchableOpacity
} from 'react-native';

import {
    ScrollView,
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
import Tag from './Tag';
import TruckAgendaList from './TruckAgendaList';
import ContactList from './ContactList';
import MenuRow from './MenuRow';
import Loading from './Loading';
import realm from '../config/realmDb';


class LemeatTruckProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            favorite: false
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
                });
                this.checkFavorite();
            })
            .catch((error) => {
                alert(error);
                console.error(error);
            });
    }

    componentWillMount() {
        this.fetchTruckInformation();

    }

    checkFavorite() {
        var id = this.state.data[0]._id;
        var name = this.state.data[0].profile.name;
        var find = realm.objects('TruckFavorite');
        var findFavorites = realm.objects('TruckFavorite').filtered('id = "' + id + '"');
        console.log(find, findFavorites);
        if (findFavorites.length > 0) {
            this.setState({
                favorite: true
            });
        } else {
            this.setState({
                favorite: false,
            });
        }
    }

    renderFavoriteStar() {
        if (this.state.favorite == true) {
            return (
                <Icon name="star"
                      size={24}
                      color='white'
                      onPress={()=> this.removeFavorite()}
                />
            )
        } else {
            return (
                <Icon name="star-border"
                      size={24}
                      color='white'
                      onPress={() => this.addFavorite()}
                />
            )
        }
    }

    addFavorite() {
        let name = this.state.data[0].profile.name;
        let id = this.state.data[0]._id;
        realm.write(()=> {
            let favorite = realm.create('TruckFavorite', {
                name: name,
                id: id
            });
            console.log(favorite.name + ' ' + favorite.id)
        });
        this.checkFavorite();
    }

    removeFavorite() {
        let id = this.state.data[0]._id;
        realm.write(()=> {
            let favorite = realm.objects('TruckFavorite').filtered('id = "' + id + '"');
            console.log(favorite);
            console.log(realm.delete(favorite));
        });
        this.checkFavorite();
    }

    returnTags() {
        if (this.state.data[0].profile.mainCity && this.state.data[0].profile.tags) {
            var city = this.state.data[0].profile.mainCity;
            var tags = this.state.data[0].profile.tags;
            var tagList = [];
            tagList.push(city);
            for (tag of tags) {
                tagList.push(tag)
            }
            console.log(tagList);
            return (
                tagList.map(function (tag) {
                    return (
                        <Tag tag={tag}></Tag>
                    )
                })
            )
        }
    }

    getTruckDescription(){
        var truckFullDescription = this.state.data[0].profile.fullDescription;
        if(truckFullDescription && truckFullDescription.length > 0){
            return truckFullDescription
        } else{
            return "Sem descrição disponível"
        }
    }

    render() {
        var lemeatEntryPoint = "http://lemeat.com";
        if (this.state.data) {
            return (
                <View style={{flex: 1}}>
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
                                <View style={styles.tagContainer}>
                                    {this.returnTags()}
                                </View>
                            </Tile>
                        </Image>
                        <Screen styleName="paper">
                            <View style={styles.container}>
                                <Text>{this.getTruckDescription()}</Text>
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
                    <View style={styles.navBarContainer}>
                        <TouchableOpacity
                            style={{paddingLeft: 15, justifyContent: 'center'}}
                            onPress={() => {
                                Actions.pop()
                            }}>
                            <Icon name="arrow-back" size={30} color='white'/>
                        </TouchableOpacity>
                        <View style={{flex: 1}}></View>
                        <TouchableOpacity
                            style={{paddingRight: 15, justifyContent: 'center'}}>
                            {this.renderFavoriteStar()}
                        </TouchableOpacity>
                    </View>
                </View>
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
    navBarContainer: {
        position: 'absolute',
        width: window.width,
        height: 60,
        backgroundColor: 'rgba(52,52,52,0)',
        top: 0,
        flexDirection: 'row'
    },
    container: {
        padding: 10
    },
    truckTitle: {
        color: 'white',
        fontSize: 24
    },
    truckSpeciality: {
        color: 'white',
        fontSize: 16
    },
    tagContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    }
})

export default LemeatTruckProfile