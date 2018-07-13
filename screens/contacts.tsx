import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, AsyncStorage } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {apiUrl} from '../API config/config';
import BackgroundImage from '../components/backgroundImage';


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

//load the list of contacts on Mount
    componentDidMount() {
        this.makeRemoteRequest(); 
    }

    makeRemoteRequest = async () => {
        var user:string=await AsyncStorage.getItem('user')

        const url = apiUrl+'users/list/'+user;
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


    chatWindow = (receiver: string,image:string) => {
        //alert(receiver);
        this.setState({ receiver: receiver })
        AsyncStorage.setItem('receiver', receiver)
        var name=this.toTitleCase(receiver.split('.')[0])
        this.props.navigation.navigate('Chats', {items:name,image:image}); //Naviate to chat screen after setting the receiver id
    }

    //function to convert normal string to Title case
    toTitleCase = function (str: any) {  
        str = str.toLowerCase().split(' ');
        for (var i = 0; i < str.length; i++) {
            str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
        }
        return str.join(' ');
    };
    render() {
        return (
            <View style={styles.container}>
                <BackgroundImage/>
                <FlatList
                    data={this.state.data}
                    renderItem={({ item }) => (
                        <TouchableOpacity >
                            <ListItem
                                roundAvatar
                                title={this.toTitleCase(item.first) + " " + this.toTitleCase(item.last)}
                                titleStyle={{ fontWeight: 'normal', fontSize: 17, color: 'white' }}
                                subtitle={item.email}
                                subtitleStyle={{ fontWeight: 'normal' ,fontSize: 17, color: '#a79f9f' }}
                                avatar={{ uri: item.thumbnail }}
                                //badge={{ value: 3, textStyle: { color: 'orange' }, containerStyle: { marginTop: -20 } }}
                                containerStyle={{ borderBottomWidth: 0 }}
                                rightIcon={<Icon name="chevron-right" size={20} color="white" />}
                                onPress={() => this.chatWindow(item.email,item.thumbnail)}/>
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
        height: 3,
        width: '86%',
        backgroundColor: 'black',
        marginLeft: '14%'
    }
});
