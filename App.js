import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import 'react-native-gesture-handler';
import { StyleSheet, View } from 'react-native';
import GenerateQr from './screens/GenerateQr';
import ScanQr from './screens/ScanQr';
import HistoryList from './screens/HistoryList';
import ViewQrHistory from './screens/ViewQrHistory';
import Register from './screens/Register';
import Login from './screens/Login';
import ForgotPassword from './screens/ForgotPassword';
import Welcome from './screens/Welcome'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Lato_400Regular, useFonts } from '@expo-google-fonts/lato';
import { AppLoading } from 'expo';


import Providers from './navigation';

const WelcomeScreen = ({ navigation }) => <Welcome navigation={navigation} />
const ScanScreen = ({ navigation }) => <ScanQr navigation={navigation} />
const GenerateScreen = ({ route }) => <GenerateQr scannedData={route.params}  />
const HistoryScreen = ({ navigation }) => <HistoryList navigation={navigation} />
const ViewQrHistoryScreen = ({ navigation, route }) => <ViewQrHistory navigation={navigation} data={route.params.data} />
const RegisterScreen = ({ navigation }) => <Register navigation={navigation} />
const LoginScreen = ({ navigation }) => <Login navigation={navigation} />
const ForgotPasswordScreen = ({ navigation }) => <ForgotPassword navigation={navigation} />
const AppStack = createStackNavigator();
// const AuthStack = createStackNavigator();

export default function App() {
	const [fontsLoaded] = useFonts({
		Lato_400Regular
	});

	if (!fontsLoaded) {
		return <AppLoading />;
	}
	
	// const [user, setUser] = useState(null);

	return (

		 <Providers />

		// <NavigationContainer>
		// 	<AppStack.Navigator >
		// 		<AppStack.Screen name="WelcomeScreen" component={WelcomeScreen} options={{headerShown: false}}/>
		// 		<AppStack.Screen name="LoginScreen" component={LoginScreen} options={{headerShown: false}}/>
		// 		<AppStack.Screen name="RegisterScreen" component={RegisterScreen} options={{headerShown: false}}/>
		// 		<AppStack.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen} options={{headerShown: false}}/>
		// 		<AppStack.Screen name="ScanScreen" component={ScanScreen} options={{headerShown: false}}/>
		// 		<AppStack.Screen name="GenerateScreen" options={{headerShown: false}}>
		// 			{props => <GenerateScreen {...props} />}
		// 		</AppStack.Screen>
		// 		<AppStack.Screen name="HistoryScreen" options={{headerShown: false}}>
		// 			{props => <HistoryScreen {...props} />}
		// 		</AppStack.Screen>
		// 		<AppStack.Screen name="ViewQrHistoryScreen" options={{headerShown: false}}>
		// 			{props => <ViewQrHistoryScreen {...props} />}
		// 		</AppStack.Screen>
		// 	</AppStack.Navigator >
		// 	{/* <StatusBar style='light'/> */}
		// </NavigationContainer>
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




{/* // 	<NavigationContainer>
// 	{ user ?
// 	<AppStack.Navigator >
// 		<AppStack.Screen name="WelcomeScreen" component={WelcomeScreen} options={{headerShown: false}}/>
// 		<AppStack.Screen name="LoginScreen" component={LoginScreen} options={{headerShown: false}}/>
// 		<AppStack.Screen name="RegisterScreen" component={RegisterScreen} options={{headerShown: false}}/>
// 		<AppStack.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen} options={{headerShown: false}}/>
// 		<AppStack.Screen name="ScanScreen" component={ScanScreen} options={{headerShown: false}}/>
// 		<AppStack.Screen name="GenerateScreen" options={{headerShown: false}}>
// 			{props => <GenerateScreen {...props} />}
// 		</AppStack.Screen>
// 		<AppStack.Screen name="HistoryScreen" options={{headerShown: false}}>
// 			{props => <HistoryScreen {...props} />}
// 		</AppStack.Screen>
// 		<AppStack.Screen name="ViewQrHistoryScreen" options={{headerShown: false}}>
// 			{props => <ViewQrHistoryScreen {...props} />}
// 		</AppStack.Screen>
// 	</AppStack.Navigator >
// 	:
// 	<AuthStack.Navigator >
// 		<AuthStack.Screen name="WelcomeScreen" component={WelcomeScreen} options={{headerShown: false}}/>
// 		<AuthStack.Screen name="LoginScreen" component={LoginScreen} options={{headerShown: false}}/>
// 		<AuthStack.Screen name="RegisterScreen" component={RegisterScreen} options={{headerShown: false}}/>
// 		<AuthStack.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen} options={{headerShown: false}}/>
// 		<AuthStack.Screen name="ScanScreen" component={ScanScreen} options={{headerShown: false}}/>
// 		<AuthStack.Screen name="GenerateScreen" options={{headerShown: false}}>
// 			{props => <GenerateScreen {...props} />}
// 		</AuthStack.Screen>
// 		<AuthStack.Screen name="HistoryScreen" options={{headerShown: false}}>
// 			{props => <HistoryScreen {...props} />}
// 		</AuthStack.Screen>
// 		<AuthStack.Screen name="ViewQrHistoryScreen" options={{headerShown: false}}>
// 			{props => <ViewQrHistoryScreen {...props} />}
// 		</AuthStack.Screen>
// 	</AuthStack.Navigator>
// 	}
// 	{/* <StatusBar style='light'/>
//	</NavigationContainer> */}
