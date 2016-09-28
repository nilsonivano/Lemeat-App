import React, {Component} from 'react';
import {
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import {
    Row,
    Subtitle,
    Caption,
    Image,
    View,
    Divider
} from '@shoutem/ui';
import {Actions} from 'react-native-router-flux';

class TruckRow extends React.Component {
    render() {
        var truckId = this.props.truckId;
        return (
            <TouchableOpacity
                onPress={() => Actions.LemeatTruckProfile({truckId})}
            >
                <Row>
                    <Image
                        styleName="medium rounded-corners"
                        source={{uri: this.props.img}}
                    />
                    <View styleName="vertical stretch">
                        <Subtitle>{this.props.truckName}</Subtitle>
                        <Caption>{this.props.speciality}</Caption>
                        <View styleName="horizontal space-between">

                            <Caption>{this.props.distance}</Caption>
                        </View>
                    </View>
                </Row>
                <Divider styleName="line"/>
            </TouchableOpacity>
        )
    }
}

TruckRow.defaultProps = {
    truckName: "Truck Name",
    truckAgenda: "Lalala",
}

TruckRow.propTypes = {
    truckId: React.PropTypes.string,
    img: React.PropTypes.string,
    truckName: React.PropTypes.string,
    speciality: React.PropTypes.string,
    truckAgenda: React.PropTypes.string,
    distance: React.PropTypes.string,
}

export default TruckRow