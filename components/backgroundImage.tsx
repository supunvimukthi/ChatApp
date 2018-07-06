import React from 'react';
import { Image, StyleSheet } from 'react-native';


export default class BackgroundImage extends React.Component {

    render() {
        return (
            <Image source={require('../fire.jpg')}
                style={styles.backgroundImage}>
                {this.props.children}
            </Image>
        )
    }
}

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        resizeMode: 'stretch',
        position: 'absolute',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
    },
});