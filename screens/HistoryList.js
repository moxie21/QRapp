import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity } from 'react-native';
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

export default function HistoryList({ navigation }) {
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
                contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}
            >
                {filteredData.map(val => (
                    <TouchableOpacity
                        style={styles.row}
                        onPress={() => console.log(navigation.navigate('ViewQrHistoryScreen', { data: val.name }))}
                    >
                        <QRCode size={50} value={val.name} />
                        <View style={styles.textWrapper}>
                            <Text style={styles.rowText} key={val.id}>{val.name}</Text>
                        </View>
                    </TouchableOpacity>
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
