import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {Router, Scene} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {colors} from './config/styles';

//importing layouts
import TruckMap from './components/TruckMap';
import LemeatTruckList from './components/LemeatTruckList';
import LemeatTruckProfile from './components/LemeatTruckProfile';

// Simple component to render something in place of icon
const TabIcon = ({selected, title}) => {
    switch (title) {
        case 'Mapa':
            return (
                <View>
                    <Icon name="today" size={24} style={{color: selected ? colors.defaultPrimaryColor : colors.lightPrimaryColor}}/>
                    {/*<Text style={{color: selected ? 'red' : 'black'}}>{title}</Text>*/}
                </View>
            );
        case 'Lista de Trucks':
            return (
                <View>
                    <Icon name="place" size={24} style={{color: selected ? colors.defaultPrimaryColor : colors.lightPrimaryColor}}/>
                    {/*<Text style={{color: selected ? 'red' : 'black'}}>{title}</Text>*/}
                </View>
            );
    }
}

class App extends React.Component {
    render() {
        return (
            <Router>
                <Scene key="root">
                    {/* Tab Container */}
                    <Scene
                        key="tabbar"
                        tabs={true}
                        tabBarStyle={{backgroundColor: 'white', position: 'absolute', top: 69}}
                    >
                        <Scene key="TruckList" pressOpacity={1} title="Lista de Trucks" icon={TabIcon}>
                            <Scene
                                key="LemeatTruckList"
                                component={LemeatTruckList}
                                title="LemeatTruckList"
                                hideNavBar={true}
                            />
                        </Scene>
                        <Scene key="map" pressOpacity={1} title="Mapa" icon={TabIcon}>
                            <Scene
                                key="mapa"
                                component={TruckMap}
                                title="Mapa"
                                hideNavBar={true}
                            />
                        </Scene>
                    </Scene>
                    <Scene
                        key="LemeatTruckProfile"
                        component={LemeatTruckProfile}
                        hideNavBar={true}
                    />
                </Scene>
            </Router>
        );
    }
}

export default App;