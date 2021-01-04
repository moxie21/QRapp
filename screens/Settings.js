import React, { useEffect, useState, useContext } from 'react';
import { View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import useStatusBar from '../hooks/useStatusBar';
import { firestore, logout } from '../firebase/firebase';
import IconButton from "../components/IconButton";
import { AuthUserContext } from '../navigation/AuthUserProvider';

export default function Settings({navigation}) {
    const [tags, setTags] = useState([]);
    const { user, setUser } = useContext(AuthUserContext);
    const userRef = firestore.collection('users').doc(user.uid);
  	useStatusBar('dark-content');

  	// useEffect(() => {
	// 	return userRef.collection('tags').onSnapshot(tagsSnapshot => {
	// 		const tagsList = [];
	// 		tagsSnapshot.forEach(tagsDoc => {
	// 			const { count, title, color } = tagsDoc.data();
	// 			const id = tagsDoc.id;
	// 			tagsList.push({
	// 				id,
	// 				count,
	// 				title,
	// 				color
	// 			});
	// 		});
	// 		setTags(tagsList);
	// 	});
	// }, [])

	async function handleLogOut() {
		try {
			await logout();
		}
		catch (error) {
			console.log(error);
		}
	}

	return (
		<View style={styles.container}>
			<IconButton
				style={{ position: "absolute", zIndex: 1, top: 45, left: 10 }}
				iconName="chevron-left"
				color="#2F2F31"
				size={40}
				onPress={() => navigation.goBack()}
			/>
			<KeyboardAwareScrollView
				style={{ flex: 1, width: "100%" }}
				keyboardShouldPersistTaps="always"
			>
				<TouchableOpacity
					style={styles.button}
					onPress={handleLogOut}
				>
					<Text style={styles.buttonTitle}>Log Out</Text>
				</TouchableOpacity>
			</KeyboardAwareScrollView>
		</View>
	);
	}

const styles = StyleSheet.create({
  	container: {
    	flex: 1
  	},
	button: {
		backgroundColor: "#000",
		marginLeft: 120,
		marginRight: 120,
		marginTop: 100,
		height: 48,
		borderRadius: 23,
		alignItems: "center",
		justifyContent: "center",
	},
	buttonTitle: {
        color: "#fff",
        fontSize: 21,
        fontFamily: "Lato_400Regular",
    },
});
