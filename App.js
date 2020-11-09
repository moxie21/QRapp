import React from 'react';
import { StatusBar } from 'expo-status-bar';
import 'react-native-gesture-handler';
import { ClippingRectangle, StyleSheet, View } from 'react-native';
import GenerateQr from './screens/GenerateQr';
import ScanQr from './screens/ScanQr';
import HistoryList from './screens/HistoryList';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const ScanScreen = ({ navigation }) => <ScanQr navigation={navigation} />
const GenerateScreen = ({ route }) => <GenerateQr scannedData={route.params}  />
const HistoryScreen = () => <HistoryList />

const Stack = createStackNavigator();

export default function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen name="ScanScreen" component={ScanScreen} />
				<Stack.Screen name="GenerateScreen">
					{props => <GenerateScreen {...props} />}
				</Stack.Screen>
				<Stack.Screen name="HistoryScreen" component={HistoryScreen} />
			</Stack.Navigator>
		</NavigationContainer>
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
