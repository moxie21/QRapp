import React, { useContext, useState, useEffect } from "react";
import { StyleSheet, TextInput, View, Text, TouchableOpacity, SafeAreaView, FlatList } from "react-native";
import QRCode from "react-native-qrcode-svg";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import useStatusBar from '../hooks/useStatusBar';
import { firebase, firestore } from '../firebase/firebase';
import { AuthUserContext } from '../navigation/AuthUserProvider';

const DATA = [
	{
		id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
		title: "School",
	},
	{
		id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
		title: "Movies",
	},
	{
		id: "58694a0f-3da1-471f-bd96-145571e29d72",
		title: "Music",
	},
];

const Item = ({ item, addTag }) => (
    <TouchableOpacity style={styles.item} onPress={() => addTag(item)}>
        <Text style={styles.title}>{item.title}</Text>
    </TouchableOpacity>
);

export default function GenerateQr({ navigation, scannedData }) {
	const [value, setValue] = useState(scannedData.data);
	const [selectedTags, setSelectedTags] = useState([]);
	const [searchValue, setSearchValue] = useState('');
    const [tags, setTags] = useState([]);
    const { user, setUser } = useContext(AuthUserContext);
    useStatusBar('dark-content');

	useEffect(() => {
		console.log('useEffect')
        setTags(DATA);
        //TODO: fetch tags from Firebase
	}, [tags, selectedTags])

	const createTag = () => {
		// TODO: send search value to Firebase
		console.log(tags)
		setTags([...tags, { id: 'sth', title: searchValue }]);
	}

	const addTag = ({ id, title }) => {
		let newData = selectedTags;
		const foundTag = selectedTags.find(el => el.id === id);

		if (foundTag) {
			newData = newData.filter(el => el.id !== id);
		}
		else {
			newData.push({ id, title });
		}

		console.log(newData);
		setSelectedTags(newData);
    }
    
    const scansRef = firestore.collection('users').doc(user.uid);

    const onSave = () => {
		async function createScan(content, tags) {
            await scansRef.collection('scans').add({
                content,
                tags,
                timestamp: null
            }).then(scan => {
            scan.update({
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            })
        })}
        createScan(value, selectedTags);
        console.log(user.uid);
        navigation.navigate('ScanScreen');
	}

    const renderItem = ({ item }) => <Item {...{ item, addTag }} />;

    return (
        <KeyboardAwareScrollView 
            style={styles.container} 
            contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}
        >
            <QRCode value={value.length > 0 ? value : "QR"} />
            <TextInput onChangeText={(text) => setValue(text)} value={value} />

			<TextInput
                onChangeText={text => setSearchValue(text)}
                value={searchValue}
                style={styles.textInput}
            />

            <SafeAreaView style={styles.container}>
                <FlatList
                    data={tags}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                />
				<TouchableOpacity style={styles.item} onPress={createTag}>
					<Text style={styles.title}>Create</Text>
				</TouchableOpacity>
            </SafeAreaView>

			<SafeAreaView style={styles.container}>
                <FlatList
                    data={selectedTags}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                />
            </SafeAreaView>
            <Text
                onPress={onSave}
                style={styles.footerLink}
            >
                Save Scan
            </Text>
        </KeyboardAwareScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F2F2F2",
        // alignItems: "center",
        // justifyContent: "flex-end",
    },
    item: {
        backgroundColor: "#f9c2ff",
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 20,
	},
	textInput: {
        width: '80%',
        height: 40,
        backgroundColor: '#fff',
        borderRadius: 50,
        paddingHorizontal: 20,
        marginVertical: 20
    },    
    footerLink: {
        color: "white",
        fontWeight: "600",
        fontSize: 23,
        padding: 35,
    },
});
