import React, { useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

import ColorSwatch from '../components/ColorSwatch';
import IconButton from '../components/IconButton';
import useStatusBar from '../hooks/useStatusBar';

export default function App({navigation}) {
	const [value, setValue] = useState('Hello');
	const [qrColor, setQrColor] = useState('#000');
	useStatusBar('dark-content');
	
	const onChangeQrColor = (c) => {
		setQrColor(c);
    };

	return (
		<View style={styles.container}>
			<IconButton
                style={{ position: "absolute", zIndex: 1, top: 45, left: 10 }}
                iconName="chevron-left"
                color="#000"
                size={40}
                onPress={() => navigation.navigate("ScanScreen")}
            />
			<View style={styles.generatedContent}>
				<QRCode 
					value={value.length >0 ? value :':('}
					color={qrColor}
				/>
				<TextInput
					onChangeText={text => setValue(text)}
					value={value}
				/>
			</View>

			<View style={styles.row} >
				<ColorSwatch color='#CCD5FF' changeColor={onChangeQrColor}/>
				<ColorSwatch color='#BAD1CD' changeColor={onChangeQrColor}/>
				<ColorSwatch color='#F2D1C9' changeColor={onChangeQrColor}/>
				<ColorSwatch color='#E086D3' changeColor={onChangeQrColor}/>
				<ColorSwatch color='#8332AC' changeColor={onChangeQrColor}/>
				<ColorSwatch color='#462749' changeColor={onChangeQrColor}/>
			</View>
			<View style={styles.row} >
				<ColorSwatch color='#3CDBD3' changeColor={onChangeQrColor}/>
				<ColorSwatch color='#23C9FF' changeColor={onChangeQrColor}/>
				<ColorSwatch color='#7CC6FE' changeColor={onChangeQrColor}/>
				<ColorSwatch color='#CCD5FF' changeColor={onChangeQrColor}/>
				<ColorSwatch color='#E7BBE3' changeColor={onChangeQrColor}/>
				<ColorSwatch color='#E7BBE3' changeColor={onChangeQrColor}/>
			</View>
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
	generatedContent: {
		marginBottom:100,
		alignItems: 'center',
	},
	row: {
		// flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-around',
	}
});