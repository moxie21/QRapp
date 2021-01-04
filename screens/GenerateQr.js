import React, { useContext, useState, useEffect } from "react";
import { StyleSheet, TextInput, View, Text, TouchableOpacity, SafeAreaView, FlatList } from "react-native";
import { Chip } from 'react-native-paper';
import QRCode from "react-native-qrcode-svg";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import useStatusBar from '../hooks/useStatusBar';
import IconButton from "../components/IconButton";
import { firebase, firestore } from '../firebase/firebase';
import { AuthUserContext } from '../navigation/AuthUserProvider';


const Item = ({ item, selectTag }) => (
    <Chip
        icon="information"
        onPress={() => selectTag(item)}
        style={{ margin: 5 , backgroundColor: item.color}}
    >
        {item.title}
    </Chip>
);

export default function GenerateQr({ navigation, scannedData }) {
	const [value, setValue] = useState(scannedData.data);
	const [selectedTags, setSelectedTags] = useState([]);
	const [searchValue, setSearchValue] = useState('');
    const [tags, setTags] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const { user, setUser } = useContext(AuthUserContext);
    const userRef = firestore.collection('users').doc(user.uid);

    useStatusBar('dark-content');

	useEffect(() => {
        return userRef.collection('tags').onSnapshot(tagsSnapshot => {
            const tagsList = [];
            tagsSnapshot.forEach(tagsDoc => {
                const { count, title, color } = tagsDoc.data();
                const id = tagsDoc.id;
                tagsList.push({
                    id,
                    count,
                    title,
                    color
                });
            });

            setTags(tagsList);
            setFilteredData(tagsList);
        });
	}, [])

	const createTag = (title) => {
        async function addTag(title) {
            const count = 0;
            const color = '#e5e5e5';
            const tag = await userRef.collection('tags').add({ count, title, color });
            const doc = await tag.get();
            const newTag = { id: doc.id, ...doc.data() }

            setSelectedTags([
                ...selectedTags,
                newTag
            ]);
            onChangeText(searchValue);
        }

        addTag(title);
	}

    const onChangeText = (text) => {
        setSearchValue(text);
        const newData = tags.filter(s => s.title.includes(text) && !selectedTags.find(t => t.id === s.id));
        setFilteredData(newData);
    };

	const selectTag = ({ id, title, color }) => {
		const foundTag = selectedTags.find(el => el.id === id);
        const selectedTagIndex = filteredData.findIndex(el => el.id === id);

		if (foundTag) {
            let newData = selectedTags;
			newData = newData.filter(el => el.id !== id);
            
            let newTags = filteredData;
            newTags.push(foundTag);

            setFilteredData(newTags)
            setSelectedTags(newData)
		}
		else {
            setSelectedTags([
                ...selectedTags,
                { id, title, color }
            ])
            setFilteredData([
                ...filteredData.slice(0, selectedTagIndex),
                ...filteredData.slice(selectedTagIndex + 1)
            ])
		}
    }

    const onSave = () => {
		async function createScan(content, tags) {
            const scan = await userRef.collection('scans').add({ content, tags, timestamp: null })
            scan.update({ timestamp: firebase.firestore.FieldValue.serverTimestamp() });
        }
        createScan(value, selectedTags);
        console.log(user.uid);
        navigation.navigate('ScanScreen');
	}

    const renderItem = ({ item }) => <Item {...{ item, selectTag }} />

    return (
        <>
            <IconButton
                style={{ position: "absolute", zIndex: 1, top: 45, right: 30 }}
                iconName="close"
                color="#ff4b75"
                size={40}
                onPress={() => navigation.navigate("ScanScreen")}
            />
            <KeyboardAwareScrollView 
                style={styles.container} 
                contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}
            >
                <SafeAreaView style={{ flex: 1, width: '100%', alignItems: 'center' }}>
                    <View style={styles.qrWrapper}>
                        <QRCode value={value.length > 0 ? value : "QR"} size={150} />
                    </View>

                    <Text style={{ fontSize: 25, padding: 20 }}>
                        {value}
                    </Text>

                    <Text style={{ fontSize: 25, marginHorizontal: 20, marginVertical: 10, alignSelf: 'flex-start' }}>
                        Tags:
                    </Text>

                    <SafeAreaView style={styles.tagsWrapper}>
                        <FlatList
                            data={selectedTags}
                            renderItem={renderItem}
                            keyExtractor={(item) => item.id}
                            contentContainerStyle={{ alignSelf: 'flex-start' }}
                            numColumns={25}
                            columnWrapperStyle={{ flexWrap: 'wrap', flex: 1, marginTop: 5 }}
                            showsVerticalScrollIndicator={false}
                            showsHorizontalScrollIndicator={false}
                        />
                    </SafeAreaView>

                    <TextInput
                        onChangeText={text => onChangeText(text)}
                        value={searchValue}
                        placeholder={'Search tag...'}
                        style={styles.textInput}
                    />

                    <SafeAreaView style={styles.tagsWrapper}>
                        {filteredData.length === 0 && searchValue
                            ? <View style={{ alignItems: 'center' }}>
                                <Chip
                                    onPress={() => createTag(searchValue)}
                                    icon="information"
                                    style={{ margin: 5 }}
                                >
                                    Add new
                                </Chip>
                            </View>
                            : <FlatList
                                data={filteredData}
                                renderItem={renderItem}
                                keyExtractor={(item) => item.id}
                                contentContainerStyle={{ alignSelf: 'flex-start' }}
                                numColumns={25}
                                columnWrapperStyle={{ flexWrap: 'wrap', flex: 1, marginTop: 5 }}
                                showsVerticalScrollIndicator={false}
                                showsHorizontalScrollIndicator={false}
                            />
                        }

                        {/* <TouchableOpacity style={styles.item} onPress={createTag}>
                            <Text style={styles.title}>
                                Create
                            </Text>
                        </TouchableOpacity> */}
                    </SafeAreaView>

                    <Text
                        onPress={onSave}
                        style={styles.footerLink}
                    >
                        Save Scan
                    </Text>
                </SafeAreaView>
            </KeyboardAwareScrollView>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F2F2F2",
        paddingTop: 100
    },
    tagsWrapper: {
        flex: 1,
        width: '90%'
    },
    qrWrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '80%',
        backgroundColor: '#fff',
        padding: 35,
        elevation: 1,
        borderRadius: 25
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
        width: '90%',
        height: 50,
        backgroundColor: '#fff',
        borderRadius: 50,
        paddingHorizontal: 20,
        marginVertical: 20
    },    
    footerLink: {
        color: "#00e38c",
        fontWeight: "600",
        fontSize: 23,
        padding: 35,
    },
});
