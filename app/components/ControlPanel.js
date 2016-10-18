import React from 'react';
import{
    Text,
    View,
    StyleSheet,
    Image,
    TouchableOpacity,
} from 'react-native';

import {Divider} from '@shoutem/ui';
import Icon from 'react-native-vector-icons/MaterialIcons';
import images from '../config/images';
import {colors} from '../config/styles';
import TruckFavList from './TruckFavList';
import Communications from 'react-native-communications';

class ControlPanel extends React.Component {
    render() {
        return (
            <View
                style={styles.controlPanel}>
                <View style={styles.header}>
                    <Image
                        style={styles.lemeatLogo}
                        resizeMode='contain'
                        source={images.logoWrittenWhite}/>
                </View>
                <View style={styles.body}>
                    <Text style={styles.menuText}>Favoritos</Text>
                    <TruckFavList/>
                </View>
                <View style={styles.bottom}>
                    <Divider styleName="line"/>
                    <TouchableOpacity onPress={()=> Communications.web('https://play.google.com/store/apps/details?id=com.lemeat&hl=pt_BR')}>
                        <View style={styles.bottomMenuRow}>
                            <Icon name="thumb-up" size={24} color={colors.defaultPrimaryColor} style={{marginRight: 10}}/>
                            <Text style={styles.menuText}>Avalie o Lemeat no Google Play</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => Communications.email(['contato@lemeat.com'],null,null,'Sugestão / Feedback Lemeat','')}>
                        <View style={styles.bottomMenuRow}>
                            <Icon name="help" size={24} color={colors.defaultPrimaryColor} style={{marginRight: 10}}/>
                            <Text style={styles.menuText}>Ajuda & Feedback</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    controlPanel: {
        flex: 1,
    },
    header: {
        backgroundColor: colors.defaultPrimaryColor,
        height: 110,
    },
    lemeatLogo: {
        position: 'relative',
        width: 110,
        top: 40,
        left: 10,
    },
    body: {
        flex: 1,
        padding: 10,
    },
    bottom: {
        justifyContent: 'flex-end',
        marginBottom: 10,
    },
    bottomMenuRow: {
        padding: 10,
        flexDirection: 'row',

    },
    menuText: {
        fontSize: 14,
        fontWeight: '500',
        marginBottom: 10,
    }
})

export default ControlPanel