import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

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

export default function HistoryList() {
    const intialData = HISTORY_LIST;
    const [filteredData, setFilteredData] = useState(HISTORY_LIST);
    const [searchValue, setSearchValue] = useState('');

    const onChangeText = (text) => {
        setSearchValue(text);
        const newData = intialData.filter(s => s.name.startsWith(text));
        setFilteredData(newData);
    };

    return (
        <View style={styles.container}>
            <TextInput
                onChangeText={text => onChangeText(text)}
                value={searchValue}
                style={styles.textInput}
            />

            <ScrollView 
                style={styles.scrollView} 
                contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center' }}
            >
                {filteredData.map(val => (
                    <View style={styles.row}>
                        <QRCode size={50} value={val.name} />
                        <Text style={styles.rowText} key={val.id}>{val.name}</Text>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F2F2F2',
        alignItems: 'center',
        justifyContent: 'center',
    },
    textInput: {
        width: '80%',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
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
        paddingHorizontal: 20,
        height: 100,
        backgroundColor: '#fff',
        borderRadius: 10,
        marginBottom: 15
    },
    rowText: {
        color: '#9A9A9A',
        fontSize: 15,
        paddingLeft: 20
    },
});
