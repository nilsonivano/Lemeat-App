import React, {Component} from 'react';
import {Text} from 'react-native';
import {Router, Scene} from 'react-native-router-flux';

//importing layouts
import TruckMap from './components/TruckMap';
import LemeatTruckList from './components/LemeatTruckList';
import LemeatTruckProfile from './components/LemeatTruckProfile';

// Simple component to render something in place of icon
const TabIcon = ({selected, title}) => {
    return (
        <Text style={{color: selected ? 'red' : 'black'}}>{title}</Text>
    );
}

const App = () => {
    return (

        <Router>
            <Scene key="root">
                {/* Tab Container */}
                <Scene
                    key="tabbar"
                    tabs={true}
                    tabBarStyle={{backgroundColor: 'white'}}
                >
                    <Scene key="TruckList" title="Lista de Trucks" icon={TabIcon}>
                        <Scene
                            key="LemeatTruckList"
                            component={LemeatTruckList}
                            title="LemeatTruckList"
                            hideNavBar
                        />
                    </Scene>
                    <Scene key="map" title="Mapa" icon={TabIcon}>
                        <Scene
                            key="mapa"
                            component={TruckMap}
                            title="Mapa"
                            hideNavBar
                        />
                    </Scene>
                </Scene>
                <Scene
                    key="LemeatTruckProfile"
                    component={LemeatTruckProfile}
                />
            </Scene>
        </Router>
    );
}

export default App;