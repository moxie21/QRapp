import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import useStatusBar from '../hooks/useStatusBar';
import IconButton from "../components/IconButton";
import { firebase, firestore } from '../firebase/firebase';
import { AuthUserContext } from '../navigation/AuthUserProvider';


export default function HistoryList({ navigation }) {
    const [filteredData, setFilteredData] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [ loading, setLoading ] = useState(true);
    const [ scans, setScans ] = useState([]);
    const [tags, setTags] = useState([]);
    const { user, setUser } = useContext(AuthUserContext);

    useStatusBar('dark-content');

    const onChangeText = (text) => {
        setSearchValue(text);
        const newData = scans.filter(s => s.content.startsWith(text));
        setFilteredData(newData);
    };

    const userRef = firestore.collection('users').doc(user.uid);

    useEffect(() => {
        return userRef.onSnapshot(doc => {
            userRef.collection('scans').onSnapshot( scansSnapshot => {
                const scansList = [];
                scansSnapshot.forEach(scansDoc => {
                    const { content, tags, timestamp } = scansDoc.data();
                    scansList.push({
                        id: doc.id,
                        content,
                        tags,
                        timestamp
                    });
                });
                setScans(scansList);
                setFilteredData(scansList);
            });
        
            userRef.collection('tags').onSnapshot( tagsSnapshot => {
                const tagsList = [];
                tagsSnapshot.forEach(tagsDoc => {
                    const { count, title, color } = tagsDoc.data();
                    tagsList.push({
                        id: doc.id,
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
    /* console.log('scans:')
    console.log(scans);
    console.log('tags:')
    console.log(tags); */
    return (
        <View style={styles.container}>
            <IconButton
                iconName="chevron-up"
                color="#2F2F31"
                size={40}
                onPress={() => navigation.goBack()}
            />
            <TextInput
                onChangeText={text => onChangeText(text)}
                value={searchValue}
                style={styles.textInput}
            />
            <KeyboardAwareScrollView 
                style={styles.scrollView} 
                contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}
            >
                {console.log(filteredData)}
                {filteredData.map( (val, key) => (
                    <TouchableOpacity
                        style={styles.row}
                        onPress={() => console.log(navigation.navigate('ViewQrHistoryScreen', { data: val.content }))}
                        key={key}
                    >
                        <QRCode size={50} value={val.content} />
                        <View style={styles.textWrapper}>
                            <Text style={styles.rowText} key={val.id}>{val.content}</Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </KeyboardAwareScrollView>
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
        marginRight: 20
    },
});
