import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, Alert, TouchableOpacity } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

import IconButton from '../components/IconButton';
import useStatusBar from '../hooks/useStatusBar';

export default function ScanQr({ navigation }) {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [camera, setCamera] = useState();

    useStatusBar('light-content');

    useEffect(() => {
        const confirmPermission = async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
            if (status === 'granted') {
                setScanned(false);
            }
        }

        confirmPermission();

        const unsubscribe = navigation.addListener('focus', () => {
			confirmPermission();
		});
	  
		return unsubscribe;
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
            <IconButton
                style={{ position: "absolute", zIndex: 1, top: 45, right: 30 }}
                iconName="cogs"
                color="#fff"
                size={40}
                onPress={() => navigation.navigate("SettingsScreen")}
            />
            <IconButton
                style={{ position: "absolute", zIndex: 1, bottom: 45, right: 30 }}
                iconName="qrcode-edit"
                color="#fff"
                size={40}
                onPress={() => navigation.navigate("CreateScreen")}
            />
            <IconButton
                style={{ position: "absolute", zIndex: 1, bottom: 45, left: 30 }}
                iconName="skull"
                color="#fff"
                size={40}
                onPress={() => navigation.navigate("GenerateScreen", { type: 'qr', data: 'fgjehn' })}//!!!!!!!!!!!!!
            />
            <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                style={StyleSheet.absoluteFillObject}
                ref={ref => setCamera(ref)}
            />
            <View style={styles.content}>
            <TouchableOpacity 
                style={styles.historyNav}
                onPress={() => {
                    setScanned(true);
                    navigation.navigate("HistoryScreen")
                }}
            >
                <Text style={styles.historyText}>History</Text>
            </TouchableOpacity>
            </View>
           
        </>
    );
}

const styles = StyleSheet.create({
    content:{
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    historyNav: {
        bottom: 30,
    },
    historyText: {
        color: '#fff',
        fontSize: 20,
        alignContent: 'center'
    }
});