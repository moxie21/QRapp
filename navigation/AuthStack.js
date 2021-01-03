import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';

import Register from '../screens/Register';
import Login from '../screens/Login';
import ForgotPassword from '../screens/ForgotPassword';
import Welcome from '../screens/Welcome'


const Stack = createStackNavigator();
const WelcomeScreen = ({ navigation }) => <Welcome navigation={navigation} />
const RegisterScreen = ({ navigation }) => <Register navigation={navigation} />
const LoginScreen = ({ navigation }) => <Login navigation={navigation} />
const ForgotPasswordScreen = ({ navigation }) => <ForgotPassword navigation={navigation} />


export default function AuthStack() {
  
  return (
			<Stack.Navigator >
				<Stack.Screen name="WelcomeScreen" component={WelcomeScreen} options={{headerShown: false}}/>
				<Stack.Screen name="LoginScreen" component={LoginScreen} options={{headerShown: false}}/>
				<Stack.Screen name="RegisterScreen" component={RegisterScreen} options={{headerShown: false}}/>
				<Stack.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen} options={{headerShown: false}}/>
			</Stack.Navigator >
	);
}
