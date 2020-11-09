import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, Alert, TouchableOpacity } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default function ScanQr({ navigation }) {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);

    useEffect(() => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        Alert.alert('Title', `Bar code with type ${type} and data ${data} has been scanned!`, [
            {
                text: 'Scan again',
                onPress: () => setScanned(false)
            },
            {
                text: 'Remember me',
                onPress: () => {
                    // setScanned(false);
                    navigation.navigate("GenerateScreen", { type: type, data: data });
                }
            }
        ]);
    };

    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <>
            <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                style={StyleSheet.absoluteFillObject}
            />
            <TouchableOpacity 
                style={styles.historyNav}
                onPress={() => navigation.navigate("HistoryScreen")}
            >
                <Text style={styles.historyText}>History</Text>
            </TouchableOpacity>
        </>
    );
}

const styles = StyleSheet.create({
    historyNav: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        bottom: 25
    },
    historyText: {
        color: '#fff',
        fontSize: 20
    }
});