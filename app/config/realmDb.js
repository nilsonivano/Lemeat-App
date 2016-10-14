'use strict';

import Realm from 'realm';

class TruckFavorite extends Realm.Object {}
TruckFavorite.schema = {
    name: 'TruckFavorite',
    properties: {
        name: 'string',
        id: 'string',
    },
};

export default new Realm({schema: [TruckFavorite]});