import React from 'react';
import {
    ListView,
    View,
    StyleSheet,
    Dimensions
} from 'react-native';
import Loading from './Loading';

class LemeatCardList extends React.Component {
    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            loading: true,
            dataSource: ds.cloneWithRows([
                {
                    profile: {
                        name: 'Lalala', description: 'Lalala', img: ''
                    }
                }
            ])
        };
    }

    componentWillMount() {
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        fetch('http://lemeat.com/api/truckList')
            .then((response) => {
                return response.json();
            })
            .then((response) => {
                //Colocando a imagem certa
                for (let i = 0; i < response.length; i++) {
                    let img = response[i].profile.img;
                    let imgReplace = img.replace("http://localhost:3000", "http://lemeat.com");
                    response[i].profile.img = imgReplace;
                }
                this.setState({
                    loading: false,
                    dataSource: ds.cloneWithRows(response)
                })
            })
            .catch((error) => {
                alert(error);
                console.error(error);
            });
    }

    render() {
        if (this.state.loading) {
            return (
                <Loading/>
            )
        }
        return (
            <ListView style={styles.list}
                      dataSource={this.state.dataSource}
                      renderRow={(rowData) => {
                          console.log(rowData);
                          return (
                              <MaterialCard
                                  cardTitle={rowData.profile.name}
                                  cardDescription={rowData.profile.description}
                                  cardImg={rowData.profile.img}
                                  truckId={rowData._id}
                                  onPress={() => {
                                      this.props.navigator.push(Routes.getLemeatTruckProfileRoute(rowData._id))
                                  }
                                  }
                              />
                          )
                      }}
            />
        )
    }
}

LemeatCardList.propTypes = {
    navigator: React.PropTypes.object,
}

const window = Dimensions.get('window');

const styles = StyleSheet.create({
    list: {
        width: window.width,
        paddingLeft: 5,
        paddingRight: 5,
    },
});

export default LemeatCardList