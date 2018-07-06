import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, AsyncStorage } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';


export interface Props {
    name: string;  
}

export interface State {
    data: string[],
    receiver: string,
}
export default class Contacts extends React.Component {

    constructor(props: Props) {
        super(props);
        this.state = {
            data: [],
            receiver: ''
            
        };
    }

    componentDidMount() {
        this.makeRemoteRequest(); //load the list of contacts on Mount
    }

    makeRemoteRequest = async () => {
        var user:string=await AsyncStorage.getItem('user')

        const url = 'http://10.101.4.36:3000/users/list/'+user;
        //alert(url);
        this.setState({ 
            loading: true
         });

        fetch(url)
            .then(res => res.json())
            .then(res => {
                this.setState({
                    data: [...res.results],
                    error: res.error || null,
                    loading: false,
                    receiver: ''
                });
            })
            .catch(error => {
                this.setState({ error, loading: false });
            });
        console.log(this.state.data);
    };
  
    renderSeperator = () => {
        return (
            <View style={styles.separator}></View>
        )
    }

    chatWindow = (receiver: string) => {
        //alert(receiver);
        this.setState({ receiver: receiver })
        AsyncStorage.setItem('receiver', receiver)
        this.props.navigation.navigate('Chats', null); //Naviate to chat screen after setting the receiver id
    }
    toTitleCase = function (str: any) {  //function to convert normal string to Title case
        str = str.toLowerCase().split(' ');
        for (var i = 0; i < str.length; i++) {
            str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
        }
        return str.join(' ');
    };
    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.state.data}
                    renderItem={({ item }) => (
                        <TouchableOpacity>
                            <ListItem
                                roundAvatar
                                title={this.toTitleCase(item.first) + " " + this.toTitleCase(item.last)}
                                titleStyle={{ fontWeight: 'bold', fontSize: 17, color: '#210333' }}
                                subtitle={item.email}
                                subtitleStyle={{ fontSize: 17, color: '#474242' }}
                                avatar={{ uri: item.thumbnail }}
                                //badge={{ value: 3, textStyle: { color: 'orange' }, containerStyle: { marginTop: -20 } }}
                                containerStyle={{ borderBottomWidth: 0 }}
                                rightIcon={<Icon name="chevron-right" size={20} color="black" />}
                                onPress={() => this.chatWindow(item.email)}/>
                        </TouchableOpacity>
                    )}
                    keyExtractor={item => item.email}
                    ItemSeparatorComponent={this.renderSeperator}
                />
            </View>
        );
    }

}


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#dbeeff',
        flex: 1,
    },
    separator: {
        height: 1,
        width: '86%',
        backgroundColor: '#210333',
        marginLeft: '14%'
    }
});
