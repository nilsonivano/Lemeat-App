import React, {
    Component,
    PropTypes,
} from 'react';

import {
    View,
    Text,
    TouchableOpacity
} from 'react-native';

import realm from '../config/realmDb';
import {colors} from '../config/styles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Actions} from 'react-native-router-flux';


class TruckFavRow extends Component {

    deleteFavorite() {
        var id = this.props.TruckId;
        realm.write(()=> {
            let favorite = realm.objects('TruckFavorite').filtered('id = "' + id + '"');
            console.log(favorite);
            realm.delete(favorite);
        });
    }

    render() {
        var truckId = this.props.truckId;
        return (
            <TouchableOpacity
                onPress={() => Actions.LemeatTruckProfile({truckId})}
            >
                <View style={{flexDirection: 'row', padding: 5}}>
                    <Text style={{flex: 1}}>{this.props.truckFavorite}</Text>
                    <Icon name="star" size={24} style={{color: colors.defaultPrimaryColor}}/>
                </View>
            </TouchableOpacity>
        );
    }
}

TruckFavRow.propTypes = {
    truckId: React.PropTypes.string,
    truckFavorite: React.PropTypes.string
};
TruckFavRow.defaultProps = {};

export default TruckFavRow;
