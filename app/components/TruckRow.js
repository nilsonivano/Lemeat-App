import React, {Component} from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    Text,
    View,
    Dimensions
} from 'react-native';
import {
    Row,
    Image,
    Divider,
} from '@shoutem/ui';
import OpenStatusBox from './OpenStatusBox';
import Tag from './Tag';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {colors} from '../config/styles';
import images from '../config/images';
import moment from 'moment';
import br from 'moment/locale/pt-br';
import {Actions} from 'react-native-router-flux';

class TruckRow extends React.Component {
    checkOpenStatus() {
        if (this.props.statusOpen) {
            return (
                <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
                    <View style={styles.statusBox}>
                        <Text style={styles.openStatusText}>ABERTO</Text>
                    </View>
                    <View style={{flex: 1}}></View>
                </View>
            )
        }
    }

    checkAgendaStatus() {
        if (this.props.haveAgenda) {
            moment.locale('pt-br');
            var agendaStart = moment(this.props.agendaStart).calendar();
            var distance = (this.props.distance).toFixed(1);
            return (
                <View style={{flexDirection: 'column', marginTop: 5}}>
                    <View style={{flexDirection: 'row'}}>
                        <Icon name="today" size={14} color={colors.defaultPrimaryColor}/>
                        <Text style={styles.smallText}>{agendaStart}</Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        <Icon name="place" size={14} color={colors.defaultPrimaryColor}/>
                        <Text style={styles.smallText}>{distance} km</Text>
                    </View>
                </View>
            )
        }
    }

    returnTags() {
        if (this.props.mainCity && this.props.tags) {
            var city = this.props.mainCity;
            var tags = this.props.tags;
            var tagList = [];
            tagList.push(city);
            for (tag of tags) {
                tagList.push(tag)
            }
            return (
                tagList.map(tag => (
                        <Tag tag={tag}/>
                    )
                )
            )
        }
    }

    getImg() {
        if (this.props.haveImg) {
            return (
                <Image
                    styleName="medium rounded-corners"
                    source={{uri: this.props.img}}
                />
            )
        } else {
            return (
                <Image
                    styleName="medium rounded-corners"
                    source={images.LemeatNoImage}
                />
            )
        }
    }

    render() {
        var truckId = this.props.truckId;
        return (
            <TouchableOpacity
                onPress={() => Actions.LemeatTruckProfile({truckId})}
            >
                <Row>
                    <View style={{flexDirection: 'column', width: window.width, paddingRight: 10}}>
                        <View style={{flexDirection: 'row'}}>
                            {this.getImg()}
                            <View style={styles.infoContainer}>
                                <Text style={styles.truckName}>{this.props.truckName}</Text>
                                <Text style={styles.truckSpeciality}>{this.props.speciality}</Text>
                                {this.checkOpenStatus()}
                                {this.checkAgendaStatus()}
                            </View>
                        </View>
                        <View style={styles.tagContainer}>
                            {this.returnTags()}
                        </View>
                    </View>
                </Row>
                <Divider styleName="line"/>
            </TouchableOpacity>
        )
    }
}

TruckRow.defaultProps = {
    mainCity: "",
    tags: "",
    agendaStart: "",
    agendaEnd: "",
    tags: [],

};

TruckRow.propTypes = {};

const window = Dimensions.get('window');

const styles = StyleSheet.create({
    smallText: {
        fontSize: 10,
        color: colors.secondaryTextColor
    },
    statusBox: {
        borderRadius: 2,
        backgroundColor: 'green',
    },
    openStatusText: {
        fontSize: 12,
        fontWeight: '300',
        color: 'white',
        padding: 3,
    },
    infoContainer: {
        flexDirection: 'column',
        flexWrap: 'wrap',
        paddingRight: 10,
        flex: 1
    },
    tagContainer: {
        marginTop: 10,
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingRight: 10
    },
    tagBox: {
        borderRadius: 10,
        backgroundColor: colors.defaultPrimaryColor,
        marginRight: 5,
    },
    tagText: {
        fontSize: 10,
        fontWeight: '300',
        color: 'white',
        padding: 5,
    },
    truckName: {
        fontSize: 14,
        fontWeight: '400',
        color: colors.primaryTextColor
    },
    truckSpeciality: {
        fontSize: 12,
        color: colors.secondaryTextColor,
        marginBottom: 5,
        flexWrap: 'wrap',
    }
});

export default TruckRow