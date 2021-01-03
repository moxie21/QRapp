import React, { useState } from 'react';
import 'react-native-gesture-handler';
import { StyleSheet, View } from 'react-native';

import { Lato_400Regular, useFonts } from '@expo-google-fonts/lato';
import { AppLoading } from 'expo';

import Providers from './navigation';


export default function App() {
	const [fontsLoaded] = useFonts({
		Lato_400Regular
	});

	if (!fontsLoaded) {
		return <AppLoading />;
	}

	return (

		 <Providers />

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
