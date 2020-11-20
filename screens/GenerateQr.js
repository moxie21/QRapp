import React, { useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

export default function GenerateQr({ scannedData }) {
    const [value, setValue] = useState(scannedData.data);

	return (
		<View style={styles.container}>
			<QRCode 
				value={value.length > 0 ? value : 'QR'}
			 />
			<TextInput
				onChangeText={text => setValue(text)}
				value={value}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
