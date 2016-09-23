import React, {Component} from 'react';
import {Text} from 'react-native';
import {Router, Scene} from 'react-native-router-flux';

// New Imports
import ScarletScreen from './ScarletScreen';
import GrayScreen from './GrayScreen';
import TruckMap from './components/TruckMap';

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
                    tabBarStyle={{backgroundColor: '#FFFFFF'}}
                >
                    {/* Tab and it's scenes */}
                    <Scene key="osu" title="OSU" icon={TabIcon} direction="vertical">
                        <Scene key="scarlet"
                               component={ScarletScreen}
                               title="Scarlet"
                               hideNavBar
                        />
                    </Scene>

                    {/* Tab and it's scenes */}
                    <Scene key="um" title="UM" icon={TabIcon}>
                        <Scene
                            key="gray"
                            component={GrayScreen}
                            title="Gray"
                            hideNavBar
                        />
                    </Scene>
                    <Scene key="map" title="Mapa" icon={TabIcon}>
                        <Scene key="mapa"
                               component={TruckMap}
                               title="Mapa"
                               hideNavBar
                        />
                    </Scene>
                </Scene>
            </Scene>
        </Router>
    );
}

export default App;