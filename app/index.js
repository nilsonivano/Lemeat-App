import React, {Component} from 'react';
import {
    Text,
    View,
    TouchableOpacity
} from 'react-native';
import {
    Router,
    Scene,
    Actions
} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {colors} from './config/styles';

//importing layouts
import TruckMap from './components/TruckMap';
import LemeatTruckList from './components/LemeatTruckList';
import LemeatTruckProfile from './components/LemeatTruckProfile';
import LemeatDrawer from './components/LemeatDrawer';

// Simple component to render something in place of icon
const TabIcon = ({selected, title}) => {
    switch (title) {
        case 'Mapa':
            return (
                <View>
                    <Icon name="today" size={24}
                          style={{color: selected ? colors.defaultPrimaryColor : colors.lightPrimaryColor}}/>
                    {/*<Text style={{color: selected ? 'red' : 'black'}}>{title}</Text>*/}
                </View>
            );
        case 'Lista de Trucks':
            return (
                <View>
                    <Icon name="place" size={24}
                          style={{color: selected ? colors.defaultPrimaryColor : colors.lightPrimaryColor}}/>
                    {/*<Text style={{color: selected ? 'red' : 'black'}}>{title}</Text>*/}
                </View>
            );
    }
}

class App extends React.Component {
    renderMenuButton() {
        return (
            <TouchableOpacity style={{paddingLeft: 15, flex: 1, alignItems: 'flex-start', justifyContent: 'center'}}
                              onPress={() => {
                                  Actions.get('drawer').ref.toggle()
                              } }>
                <Icon name="menu" size={30} color={colors.defaultPrimaryColor}/>
            </TouchableOpacity>
        );
    };

    render() {
        return (
            <Router>
                <Scene key="drawer"
                       component={LemeatDrawer}
                       open={false}>
                    {/* Tab Container */}
                    <Scene
                        key="tabbar"
                        tabs={true}
                        tabBarStyle={{backgroundColor: 'white', position: 'absolute', top: 50}}
                    >
                        <Scene key="TruckList" pressOpacity={1} title="Lista de Trucks" icon={TabIcon}>
                            <Scene
                                key="LemeatTruckList"
                                component={LemeatTruckList}
                                title=""
                                navigationBarStyle={{backgroundColor: 'white'}}
                                leftButton={this.renderMenuButton}
                                hideNavBar={false}
                            />
                        </Scene>
                        <Scene key="map" pressOpacity={1} title="Mapa" icon={TabIcon}>
                            <Scene
                                key="mapa"
                                component={TruckMap}
                                title=""
                                navigationBarStyle={{backgroundColor: 'white'}}
                                leftButton={this.renderMenuButton}
                                hideNavBar={false}
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