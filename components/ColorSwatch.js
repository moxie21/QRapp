import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';

export default function ColorSwatch({ color, changeColor }) {
	return (
		<TouchableOpacity style={{...styles.box, backgroundColor: color}} onPress={() => changeColor(color)}/>
	);
}
const styles = StyleSheet.create({
    box: {
        flex: 1,
        height: 50,
        width: 50,
        margin: 5,
        borderWidth: 3,
        borderRadius: 7,
        borderColor: '#e4e9f2',
        backgroundColor: '#fff',
        // shadowColor: 'grey',
        // shadowOffset: {width:3,height: 3},
        // shadowOpacity: 1,
        // shadowRadius: 6,
    }
});