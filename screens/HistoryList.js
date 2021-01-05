import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, TextInput, Modal, TouchableOpacity, SafeAreaView, FlatList } from 'react-native';
import { Chip } from 'react-native-paper';
import QRCode from 'react-native-qrcode-svg';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import useStatusBar from '../hooks/useStatusBar';
import IconButton from "../components/IconButton";
import { firebase, firestore } from '../firebase/firebase';
import { AuthUserContext } from '../navigation/AuthUserProvider';

const Item = ({ item, selectTag, selectedTags }) => {
    const [selected, setSelected] = useState(false);

    useEffect(() => setSelected(selectedTags.findIndex(t => t === item.id) != -1), [])

    return (
        <Chip
            icon="tag"
            onPress={() => {
                selectTag(item.id)
                setSelected(!selected)
            }}
            style={{ margin: 5}}
            selected={selected}
            selectedColor={item.color}
        >
            {item.title}
        </Chip>
    )
};

export default function HistoryList({ navigation }) {
    const [filteredData, setFilteredData] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [loading, setLoading] = useState(true);
    const [scans, setScans] = useState([]);
    const [tags, setTags] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedTags, setSelectedTags] = useState([]);
    const { user, setUser } = useContext(AuthUserContext);
    const userRef = firestore.collection('users').doc(user.uid);

    useStatusBar('dark-content');

    useEffect(() => {
        return userRef.onSnapshot(doc => {
            userRef.collection('scans').onSnapshot(scansSnapshot => {
                const scansList = [];
                scansSnapshot.forEach(scansDoc => {
                    const { content, tags, timestamp } = scansDoc.data();
                    scansList.push({
                        id: scansDoc.id,
                        content,
                        tags,
                        timestamp
                    });
                });
                setScans(scansList);
                setFilteredData(scansList);
            });

            userRef.collection('tags').onSnapshot(tagsSnapshot => {
                const tagsList = [];
                tagsSnapshot.forEach(tagsDoc => {
                    const { count, title, color } = tagsDoc.data();
                    tagsList.push({
                        id: tagsDoc.id,
                        count,
                        title,
                        color
                    });
                });
                setTags(tagsList);
            });

            if (loading) {
                setLoading(false);
            }
        });
    }, []);

    useEffect(() => {
        console.log('FILTER...')
        filterData();
    }, [searchValue])

    const onChangeText = (text) => {
        setSearchValue(text);
        // const newData = scans.filter(s => s.content.includes(text));
        // setFilteredData(newData);
    };

    const selectTag = (id) => {
        const index = selectedTags.findIndex(i => i === id);

        if (index === -1) {
            setSelectedTags([...selectedTags, id])
        }
        else {
            setSelectedTags([
                ...selectedTags.splice(0, index),
                ...selectedTags.splice(index + 1)
            ])
        }
    }

    const filterData = () => {
        if (selectedTags.length > 0) {
            setFilteredData(scans.filter(s => s.tags.findIndex(t => selectedTags.findIndex(st => st === t.id) !== -1) !== -1).filter(s => searchValue.length > 0 ? s.content.includes(searchValue) : true));
        }
        else {
            setFilteredData(scans.filter(s => searchValue.length > 0 ? s.content.includes(searchValue) : true));
            // onChangeText('');
        }
        setModalVisible(false);
    }
    
    const renderItem = ({ item }) => <Item {...{ item, selectTag, selectedTags }} />

    return (
        <View style={styles.container}>
            <IconButton
                iconName="chevron-up"
                color="#2F2F31"
                size={40}
                onPress={() => navigation.goBack()}
            />
            <Text style={{ fontSize: 30, marginHorizontal: 20, alignSelf: 'flex-start' }}>
                History
            </Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TextInput
                    onChangeText={text => onChangeText(text)}
                    value={searchValue}
                    style={styles.textInput}
                    clearButtonMode='while-editing'
                    placeholder='Search...'
                />
                <IconButton
                    iconName="filter-variant"
                    color="#2F2F31"
                    size={35}
                    style={{ padding: 10 }}
                    onPress={() => setModalVisible(true)}
                />
            </View>
            <KeyboardAwareScrollView
                style={styles.scrollView}
                contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}
            >
                {filteredData.map((scan, key) => (
                    <TouchableOpacity
                        style={styles.row}
                        onPress={() => navigation.navigate('ViewQrHistoryScreen', { data: scan })}
                        key={key}
                    >
                        <View style={{ flexDirection: 'row', alignItems: 'center', width: '95%' }}>
                            <QRCode size={50} value={scan.content} />
                            <View style={styles.textWrapper}>
                                <Text style={styles.rowText} key={scan.id}>{scan.content}</Text>
                            </View>
                        </View>
                        
                        <View style={{ justifyContent: 'center', alignItems: 'center', width: '5%' }}>
                            {tags.filter(t => scan.tags.findIndex(st => st.id === t.id) != -1).map((tag, key) => (
                                <View
                                    style={{
                                        width: 8,
                                        height: 8,
                                        borderRadius: 8 / 2,
                                        margin:2,
                                        backgroundColor: tag.color,
                                    }}
                                    key={key}
                                />
                            ))}
                        </View>
                        
                    </TouchableOpacity>
                ))}
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
                    <SafeAreaView style={styles.tagsWrapper}>
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

                        <TouchableOpacity>
                            <Text
                                style={{ alignSelf: 'center', fontSize: 20 }}
                                onPress={filterData}
                            >
                                Search
                            </Text>
                        </TouchableOpacity>
                    </SafeAreaView>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F2F2F2',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 40
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    modalView: {
        width: '100%',
        height: '50%',
        margin: 20,
        backgroundColor: "white",
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
    openButton: {
        backgroundColor: "#F194FF",
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
    textInput: {
        width: '80%',
        height: 40,
        backgroundColor: '#fff',
        borderRadius: 50,
        paddingHorizontal: 20,
        marginVertical: 20
    },
    scrollView: {
        flex: 1,
        width: '100%',
    },
    row: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        width: '90%',
        height: 100,
        paddingHorizontal: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        marginVertical: 10,
    },
    textWrapper: {
        marginRight: 20
    },
    rowText: {
        color: '#9A9A9A',
        fontSize: 15,
        marginLeft: 20,
        marginRight: 20,
        paddingRight: 10
    },
});
