import React from 'react';
import { Image, StyleSheet } from 'react-native';

export interface Props {
    source: string;
}

export default class BackgroundImage extends React.Component {
    constructor(props: Props) {
        super(props);
    }

    render() {
        return (
            <Image source={this.props.source ? this.props.source : require('./fire.jpg')}
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