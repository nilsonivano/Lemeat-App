import React from 'react';
import Drawer from 'react-native-drawer';
import ControlPanel from './ControlPanel';
import {Actions, DefaultRenderer} from 'react-native-router-flux';

class LemeatDrawer extends React.Component {
    componentDidMount() {
        Actions.refresh({key: 'drawer', ref: this.refs.navigation});
    }

    render() {
        const state = this.props.navigationState;
        const children = state.children;

        return (
            <Drawer
                styles={drawerStyles}
                ref="navigation"
                type="displace"
                // onOpen={() => Actions.refresh({ key:  'drawer', open: true })}
                // onClose={() => Actions.refresh({ key: 'drawer', open: false })}
                content={<ControlPanel />}
                tapToClose
                openDrawerOffset={0.2}
                panCloseMask={0.2}
                negotiatePan
                tweenHandler={(ratio) => ({
                    main: {opacity: Math.max(0.54, 1 - ratio)}
                })}
            >
                <DefaultRenderer navigationState={children[0]} onNavigate={this.props.onNavigate}/>
            </Drawer>
        );
    }
}

const drawerStyles = {
    drawer: {shadowColor: 'gray', shadowOpacity: 0.2, shadowRadius: 3},
    main: {paddingLeft: 3},
}

export default LemeatDrawer