import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

export default function ViewOqHistory({ navigation, data }) {
    return (
        <View style={styles.container}>
			<QRCode 
                value={data.length > 0 ? data : 'QR'}
                size={150}
			 />
            <View style={styles.textWrapper}>
                <Text style={styles.text}>{data}</Text>
            </View>
		</View>
    )
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
    },
    textWrapper: {
        width: '80%',
    },
    text: {
        marginTop: 20,
        fontSize: 20,
        alignSelf: 'center',
        textAlign: 'center'
    }
});
