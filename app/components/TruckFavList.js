import React, {
    Component,
    PropTypes,
} from 'react';

import {
    ListView
} from '@shoutem/ui';

import TruckFavRow from './TruckFavRow';
import realm from '../config/realmDb';

class TruckFavList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            favoriteList: []
        };
    }

    getFavorites(){
        var findFavorites = realm.objects('TruckFavorite');
        this.setState({
            favoriteList: findFavorites
        });
        console.log(findFavorites);
    }

    componentWillMount(){
        this.getFavorites();
    }

    render() {
        return (
            <ListView
                data={this.state.favoriteList}
                renderRow={favorite => (
                    <TruckFavRow truckFavorite={favorite.name} truckId={favorite.id}/>
                )}
            />
        );
    }
}

TruckFavList.propTypes = {};
TruckFavList.defaultProps = {};

export default TruckFavList;
