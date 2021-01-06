import React, { useEffect, useState, useContext } from 'react';
import { View, FlatList, SafeAreaView, Modal, StyleSheet, TouchableOpacity, Text, Alert} from 'react-native';
import { Chip } from 'react-native-paper';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { MaterialIcons, AntDesign } from '@expo/vector-icons';
import useStatusBar from '../hooks/useStatusBar';
import { firebase, firestore, logout } from '../firebase/firebase';
import IconButton from "../components/IconButton";
import { AuthUserContext } from '../navigation/AuthUserProvider';
import { TextInput } from 'react-native-gesture-handler';
const emptyEdit = {
	id:'',
	title:'',
	color:'',
	count:''
}

const Item = ({ item, openEditView, userRef }) => {
	const deleteTag = () => {
		Alert.alert(
            'Do you want to delete this tag?',
            '',
            [
              {
                text: "Cancel",
                // onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
              },
              { text: "OK", 
                onPress: () => { 
                    userRef.collection("tags").doc(item.id).delete().then(() => {
						console.log("Tag successfully deleted!");
					}).catch( error => {
						console.error("Error removing tag: ", error);
					});
                } 
              }
            ],
            { cancelable: false }
          );
		
	}

    return (
        <Chip
            icon="tag"
			onClose={deleteTag}
			onPress={() => openEditView(item)}
            style={{ margin: 5 , backgroundColor: item.color}}
        >
            {item.title}
        </Chip>
    )
};

export default function Settings({navigation}) {
    const [tags, setTags] = useState([]);
	const [modalVisible, setModalVisible] = useState(false);
	const [editVisible, setEditVisible] = useState(false);
	const { user }= useContext(AuthUserContext);
	const [fullName, setFullName] = useState('');
	const [editedTag, setEditedTag] = useState(emptyEdit);

    const userRef = firestore.collection('users').doc(user.uid);
  	useStatusBar('dark-content');

  	useEffect(() => {
		userRef.get().then(doc => setFullName(doc.data().fullName));

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
		});
	}, [])

	async function handleLogOut() {
		try {
			await logout();
		}
		catch (error) {
			console.log(error);
		}
	}

	const onChangeTitle = title => {
		setEditedTag({
			...editedTag,
			title
		});
	};

	const isColor = strColor => {
		return /^#[0-9A-F]{6}$/i.test(strColor) || /^#[0-9A-F]{3}$/i.test(strColor) || /^#[0-9A-F]{4}$/i.test(strColor) || /^#[0-9A-F]{8}$/i.test(strColor)
	}
	
	const onChangeColor = color => {
		if (color.charAt(0) !== '#') {
			setEditedTag({
				...editedTag,
				color: "#"
			})
		}
		else {
			setEditedTag({
				...editedTag,
				color
			})
		}
	}

	const openEditView = (tag) => {
		setModalVisible(false);
		setEditVisible(true);
		setEditedTag(tag);
		console.log(editedTag.id)
	}

	const closeEditView = () => {
		const { id, title, color } = editedTag;
		if (isColor(color)) {
			if(editedTag.id) {
				userRef.collection("tags").doc(id).update({ title, color })
				.then(() => {
					console.log("Tag successfully updated!");
				}).catch( error => {
					console.error("Error updating tag: ", error);
				});
			}
			else {
			const count = 0;
            userRef.collection('tags').add({ count, title, color });
			}
			
			setModalVisible(true);
			setEditVisible(false);
			setEditedTag(emptyEdit);
		} 
		else {
			setEditedTag({
				...editedTag,
				color: "#"
			})
			alert('Please enter a valid color code (3, 4, 6 or 8 characters from 0 to F)');
		}	
	}

	const clearHistory = async () => {
		Alert.alert(
            'Are you shure you want to delete the scan history?',
            '',
            [
              {
                text: "Cancel",
                style: "cancel"
              },
              { text: "OK", 
                onPress: async () => { 
                    const scansRef = userRef.collection('scans');
					const query = scansRef.limit(10);
					const snapshot = await query.get();
					
					snapshot.docs.forEach((doc) => {
						doc.ref.delete();
					});
                } 
              }
            ],
            { cancelable: false }
          );
		
	}

	const renderItem = ({ item }) => <Item {...{ item, openEditView, userRef }} />

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
				style={{ flex: 1, width: "100%", }}
				keyboardShouldPersistTaps="always"
				contentContainerStyle={{
                    justifyContent: "center",
                    alignItems: "center",
                }}
			>
				<SafeAreaView style={styles.wrapper}>
					<Text style={styles.title}>
						Hello, {fullName}
					</Text>
					<TouchableOpacity
						style={styles.button}
						onPress={handleLogOut}
					>
						<Text style={styles.buttonTitle}>Log Out</Text>
					</TouchableOpacity>
				</SafeAreaView>

				<TouchableOpacity style={styles.elementsContainer} onPress={clearHistory}>
					<MaterialIcons name="history" size={35} color="black" />
					<Text style={styles.elements}>
						Clear history
					</Text>
				</TouchableOpacity>

				<TouchableOpacity style={styles.elementsContainer} onPress={() => setModalVisible(true)}>
					<AntDesign name="tagso" size={35} color="black" />
					<Text style={styles.elements}>
						Edit tags
					</Text>
				</TouchableOpacity>
			</KeyboardAwareScrollView>

			<Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
            >
                <View style={[styles.centeredView, { 
                    backgroundColor: '#0008',
                    flexDirection: 'row-reverse',
                    alignItems: 'flex-end',
                    marginBottom: -20
                }]}>
                    <View style={styles.modalView}>
                    <SafeAreaView>
                        <FlatList
                            data={tags}
                            renderItem={renderItem}
                            keyExtractor={(item) => item.id}
                            contentContainerStyle={{ alignSelf: 'flex-start' }}
                            numColumns={25}
                            columnWrapperStyle={{ flexWrap: 'wrap', flex: 1, marginTop: 5 }}
                            showsVerticalScrollIndicator={false}
                            showsHorizontalScrollIndicator={false}
                        />
						<Chip
							onPress={() => openEditView(emptyEdit)}
							icon="plus"
							style={{ margin: 20, width: 110, alignSelf: 'center', alignContent: 'center', backgroundColor: '#f8f8f8' }}
						>
							Add new
						</Chip>
						<TouchableOpacity>
                            <Text
                                style={{ alignSelf: 'center', fontSize: 20 }}
                                onPress={() => setModalVisible(false)}
                            >
                                Save
                            </Text>
                        </TouchableOpacity>
                    </SafeAreaView>
                    </View>
                </View>
            </Modal>

			<Modal
                animationType="slide"
                transparent={true}
                visible={editVisible}
            >
                <View style={styles.centeredView}>
                    <SafeAreaView style={styles.editView}>
                        <Text style={{alignSelf: 'center', fontSize: 20, marginBottom:10}}>
							Edit Tag
						</Text>

						<TextInput 
							onChangeText={text => onChangeTitle(text)}
							value={editedTag.title}
							style={styles.textInput}
							placeholder='Tag name...' 
						/>
						<TextInput 
							onChangeText={text => onChangeColor(text)}
							value={editedTag.color}
							style={[styles.textInput, {color: editedTag.color}]}
							placeholder='Color...'
						/>

						<TouchableOpacity>
                            <Text
                                style={{ alignSelf: 'center', fontSize: 20 , marginTop: 25}}
                                onPress={closeEditView}
                            >
                                Save
                            </Text>
                        </TouchableOpacity>
                    </SafeAreaView>
                </View>
            </Modal>
		</View>
	);
}

const styles = StyleSheet.create({
  	container: {
    	flex: 1,
		alignItems: "center",
		justifyContent: "center",
  	},
	centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
	},
	wrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '75%',
		backgroundColor: '#fff',
		marginTop: 50,
		marginBottom: 30,
        elevation: 1,
        borderRadius: 25
    },
    modalView: {
        width: '100%',
        height: '50%',
        margin: 20,
        backgroundColor: "#fff",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
	editView: {
		width: '80%',
		height: '30%',
		backgroundColor: "#fff",
        borderRadius: 20,
        padding: 35,
		alignItems: "center",
        justifyContent: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
	},
	button: {
		backgroundColor: "#000",
		marginTop: 30,
		height: 48,
		width: '40%',
		borderRadius: 25,
		alignItems: "center",
		justifyContent: "center",
		marginBottom: 25
	},
	buttonTitle: {
        color: "#fff",
        fontSize: 21,
        fontFamily: "Lato_400Regular",
	},
	title: {
		marginTop: 40,
        color: "#000",
        fontSize: 25,
        fontFamily: "Lato_400Regular",
    },
	elementsContainer: {
		flex: 1,
		flexDirection: 'row',
	 	alignItems: 'center',
		padding: 18,
	 	backgroundColor: '#fff',
		borderWidth: 1,
		borderColor: '#d3d3d3',
		width:'100%',
	},
	elements: {
		fontSize: 18,
		paddingHorizontal: 20
	},
	textInput: {
        width: '80%',
        height: 40,
        backgroundColor: '#fff',
		borderRadius: 50,
		paddingHorizontal: 20,
		marginVertical: 5,
        alignItems: "flex-start",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.1,
        shadowRadius: 5.84,
    },
});