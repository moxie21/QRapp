import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import useStatusBar from '../hooks/useStatusBar';
import IconButton from "../components/IconButton";

const HISTORY_LIST = [
    {
        id: 1,
        name: 'Mar',
    },
    {
        id: 2,
        name: 'Cuvinte',
    },
    {
        id: 3,
        name: 'Casa',
    },
    {
        id: 4,
        name: 'Maramures',
    },
    {
        id: 5,
        name: 'Maria',
    },
    {
        id: 6,
        name: 'Harta',
    },
    {
        id: 7,
        name: 'https://www.npmjs.com/package/react-native-qrcode-svg',
    },
    {
        id: 8,
        name: 'https://www.npmjs.com/package/react-native-qrcode-svg',
    },
    {
        id: 9,
        name: 'https://www.npmjs.com/package/react-native-qrcode-svg',
    },
    {
        id: 10,
        name: 'https://www.npmjs.com/package/react-native-qrcode-svg',
    },
    {
        id: 11,
        name: 'https://www.npmjs.com/package/react-native-qrcode-svg',
    },
];

export default function HistoryList({ navigation }) {
    const intialData = HISTORY_LIST;
    const [filteredData, setFilteredData] = useState(HISTORY_LIST);
    const [searchValue, setSearchValue] = useState('');
    useStatusBar('dark-content');

    const onChangeText = (text) => {
        setSearchValue(text);
        const newData = intialData.filter(s => s.name.startsWith(text));
        setFilteredData(newData);
    };

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
                {filteredData.map( (val, key) => (
                    <TouchableOpacity
                        style={styles.row}
                        onPress={() => console.log(navigation.navigate('ViewQrHistoryScreen', { data: val.name }))}
                        key={key}
                    >
                        <QRCode size={50} value={val.name} />
                        <View style={styles.textWrapper}>
                            <Text style={styles.rowText} key={val.id}>{val.name}</Text>
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
