// import React from 'react';
// import { StatusBar } from 'expo-status-bar';
// import 'react-native-gesture-handler';
// import { StyleSheet, View } from 'react-native';
// import GenerateQr from './screens/GenerateQr';
// import ScanQr from './screens/ScanQr';
// import HistoryList from './screens/HistoryList';
// import ViewQrHistory from './screens/ViewQrHistory';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';

// const ScanScreen = ({ navigation }) => <ScanQr navigation={navigation} />
// const GenerateScreen = ({ route }) => <GenerateQr scannedData={route.params}  />
// const HistoryScreen = ({ navigation }) => <HistoryList navigation={navigation} />
// const ViewQrHistoryScreen = ({ navigation, route }) => <ViewQrHistory navigation={navigation} data={route.params.data} />

// const Stack = createStackNavigator();

// export default function App() {
// 	return (
// 		<NavigationContainer>
// 			<Stack.Navigator>
// 				<Stack.Screen name="ScanScreen" component={ScanScreen} />
// 				<Stack.Screen name="GenerateScreen">
// 					{props => <GenerateScreen {...props} />}
// 				</Stack.Screen>
// 				<Stack.Screen name="HistoryScreen">
// 					{props => <HistoryScreen {...props} />}
// 				</Stack.Screen>
// 				<Stack.Screen name="ViewQrHistoryScreen">
// 					{props => <ViewQrHistoryScreen {...props} />}
// 				</Stack.Screen>
// 			</Stack.Navigator>
// 		</NavigationContainer>
// 	);
// }

// const styles = StyleSheet.create({
// 	container: {
// 		flex: 1,
// 		backgroundColor: '#fff',
// 		alignItems: 'center',
// 		justifyContent: 'center',
// 	},
// });

import React, { useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import ColorSwatch from './components/ColorSwatch';

export default function App() {
	const [value, setValue] = useState('Hello');
	const [qrColor, setQrColor] = useState('#000');

	const onChangeQrColor = (c) => {
		setQrColor(c);
    };

	return (
		<View style={styles.container}>
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
