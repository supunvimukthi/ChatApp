import React from 'react';
import BackgroundImage from '../components/backgroundImage'
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Image,
    TouchableOpacity,
    FlatList,
    AsyncStorage
} from 'react-native';


export interface Props {
    name: string;
}

export interface state {
    data: string[],
    message: String,
    sender: String,
    receiver: String,
    user: String
}
export default class Chat extends React.Component {

    constructor(props: Props) {
        super(props);
        this.state = {
            data: [],
            message: '',
            sender: '',
            receiver: '',
            user: ''
        };
    }

    componentDidMount() {
        this.makeRemoteRequest(); //load older messages onMount
    }
   
    makeRemoteRequest = async () => {

        this.setState({  //Setting up state variables to retrieve messages from API
            sender: await AsyncStorage.getItem('user'),
            receiver: await AsyncStorage.getItem('receiver'),
        });

        const url = 'http://10.101.4.36:3000/messages/receive';
        this.setState({
            loading: true
        });

        fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                sender: await AsyncStorage.getItem('user'),
                receiver: await AsyncStorage.getItem('receiver'),
            })
        })
            .then(res => res.json())
            .then(res => {
                this.setState({
                    message: {},
                    data: [...res.data],
                });
            })
            .done();
    };

    checkTime = (i: any) => { //adding '0' to the front of minutes <10
        if (i < 10) {
            i = "0" + i;
        }
        return i;
    }

    sendMessage = async () => {  //send messages by calling the send API with sender & receiver id

        var date = new Date();
        var h = date.getHours();
        var m: any = date.getMinutes();
        m = this.checkTime(m);    //retieving current date and time

        fetch('http://10.101.4.36:3000/messages/send', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message: this.state.message,
                sender: await AsyncStorage.getItem('user'),
                receiver: await AsyncStorage.getItem('receiver'),
                time: h + ":" + m,
                date: date
            })
        })
            .then((response) => response.json())
            .then((res) => {
                //alert(res.message);
            
            })
            .done();
            this.clear();
            this.makeRemoteRequest();
            this.render();
    }

    renderChat = ({ item }: any) => {  //render sent and received messages seperately 
        if (this.state.sender === item.sender) {
            return (
                <View style={styles.textContainer}><Text style={styles.chat}>{item.message}  - {item.time}</Text></View>
            );
        } else {
            return(
                <View style={styles.textContainer1}><Text style={styles.chat}>{item.message}  - {item.time}</Text></View>
            );
        }
    }
    clear = () => {
        this.textInputRef.clear();
      }

    render() {
        return (
            <View style={styles.container}>
                <BackgroundImage />
                <FlatList
                    data={this.state.data}
                    renderItem={({ item }) => this.renderChat({ item })} //render chat messages according to time stamp
                    keyExtractor={item => item.sender}
                    
                />
                <View style={styles.chatContainer}>
                    <TextInput 
                        ref={ref => this.textInputRef = ref}
                        autoCorrect={false} 
                        underlineColorAndroid='transparent' 
                        placeholder="Your Message" 
                        style={styles.input}
                        
                        onChangeText={(text) => this.setState({ message: text })} />
                    <TouchableOpacity
                        style={styles.buttonContainer}
                        onPress={this.sendMessage}
                    >   
                        <Text 
                            style={styles.buttonText}
                        >Send</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    input: {
        flexBasis: '80%',
        color: 'white',
        fontWeight: '300',
        fontSize: 15,
        height: 40,
        width: 250,
        textAlign: 'center',
        borderColor: 'black',
        borderWidth: 0,
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderRadius: 10
    },
    chatContainer: {
        flexDirection: 'row',
        marginBottom: 20,
        justifyContent: 'space-between',
        paddingHorizontal: 12,
        alignItems: 'center'
    },
    buttonContainer: {
        flexBasis: '18%',
        alignItems: 'center',
        backgroundColor: '#2980b9',
        paddingHorizontal: 10,
        height: 40,
        borderRadius: 10,
        justifyContent: 'center',
    },
    buttonText: {
        textAlign: 'center',
        color: 'white',
        fontWeight: '300',
    },
    chat: {
        backgroundColor: '#c0fff4',
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 10,
        fontWeight: 'bold',
        color: 'black',
    },
    textContainer: {
        alignSelf: 'flex-start',
        marginBottom: 10,
    },
    textContainer1: {
        alignSelf: 'flex-end',
        marginBottom: 10,
    }
});
