import React, { useState } from 'react';
import { StyleSheet, TextInput, View, TouchableOpacity, Alert, SafeAreaView} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Clipboard from 'expo-clipboard';
import { MaterialIcons } from "@expo/vector-icons";

import ColorSwatch from '../components/ColorSwatch';
import IconButton from '../components/IconButton';
import useStatusBar from '../hooks/useStatusBar';

export default function App({navigation}) {
	const [value, setValue] = useState('');
	const [qrColor, setQrColor] = useState('#000');
	useStatusBar('dark-content');
	
	const onChangeQrColor = (c) => {
		setQrColor(c);
	};

	const copyToClipboard = () => {
        Clipboard.setString(value);
        Alert.alert("Coppied to clipboard");
	};
	
	const onShare = async () => {
        try {
            const supported = await Linking.canOpenURL(value);
            let result;
            if(!supported){
                result = await Share.share({
                    message: value
                });
                console.log("mesaj")
            } else {
                result = await Share.share({
                    url: data.content
                });
                console.log('url')
            }
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            alert(error.message);
        }
    };

    const openWithBrowser = async () => {
        try {
            await Linking.openURL(value);
        }
        catch (err) {
            alert('This link is not formatted correctly');
            console.log(err);
        }
    }

	return (
		<>
			<IconButton
                style={{ position: "absolute", zIndex: 1, top: 45, left: 10 }}
                iconName="chevron-left"
                color="#000"
                size={40}
                onPress={() => navigation.navigate("ScanScreen")}
            />
			<KeyboardAwareScrollView
                style={{
					flex:1, 
					backgroundColor: '#f2f2f2',
					paddingTop: 100,}}
                contentContainerStyle={{
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
				<TouchableOpacity style={styles.qrWrapper} onPress={copyToClipboard}>
					<QRCode 
						value={value.length >0 ? value :':('}
						color={qrColor}
						size={150}
					/>
				</TouchableOpacity>
				<View style={styles.textWrapper}>
					<TextInput
						style={styles.text}
						onChangeText={text => setValue(text)}
						value={value}
						placeholder='Type here...'
						autoCapitalize='none'
					/>
                </View>

				<View style={styles.row} >
					<ColorSwatch color='#CCD5FF' changeColor={onChangeQrColor}/>
					<ColorSwatch color='#BAD1CD' changeColor={onChangeQrColor}/>
					<ColorSwatch color='#F2D1C9' changeColor={onChangeQrColor}/>
					<ColorSwatch color='#E086D3' changeColor={onChangeQrColor}/>
					<ColorSwatch color='#8332AC' changeColor={onChangeQrColor}/>
				</View>
				<View style={[styles.row,{marginBottom: 30}]} >
					<ColorSwatch color='#3CDBD3' changeColor={onChangeQrColor}/>
					<ColorSwatch color='#23C9FF' changeColor={onChangeQrColor}/>
					<ColorSwatch color='#7CC6FE' changeColor={onChangeQrColor}/>
					<ColorSwatch color='#CCD5FF' changeColor={onChangeQrColor}/>
					<ColorSwatch color='#E7BBE3' changeColor={onChangeQrColor}/>
				</View>

                    <SafeAreaView style={styles.iconButtonsWrapper}>
                        <TouchableOpacity
                            onPress={openWithBrowser}
                            style={[
                                styles.iconButton,
                                {
                                    borderTopLeftRadius: 20,
                                    borderBottomLeftRadius: 20,
                                },
                            ]}
                        >
                            <MaterialIcons
                                name="open-in-browser"
                                size={28}
                                color="black"
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={onShare}
                            style={[
                                styles.iconButton,
                                {
                                    borderLeftWidth: 1,
                                    borderLeftColor: "#d3d3d3",
                                    borderRightWidth: 1,
                                    borderRightColor: "#d3d3d3",
                                },
                            ]}
                        >
                            <MaterialIcons
                                name="share"
                                size={28}
                                color="black"
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={copyToClipboard}
                            style={[
                                styles.iconButton,
                                {
                                    borderTopRightRadius: 20,
                                    borderBottomRightRadius: 20,
                                },
                            ]}
                        >
                            <MaterialIcons name="content-copy" size={28} color="black" />
                        </TouchableOpacity>
                    </SafeAreaView>
			</KeyboardAwareScrollView>
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#f2f2f2',
		alignItems: 'center',
		justifyContent: 'center',
	},
	qrWrapper: {
        justifyContent: "center",
        alignItems: "center",
        width: "80%",
        backgroundColor: "#fff",
        padding: 35,
        elevation: 1,
        borderRadius: 25,
    },
	generatedContent: {
		marginBottom:100,
		alignItems: 'center',
	},
	row: {
		// flex: 1,
        width: "80%",
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	iconButtonsWrapper: {
        flex: 1,
		flexDirection: "row",
    },
    iconButton: {
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 20,
        paddingHorizontal: 30,
	},
	text: {
        fontSize: 23,
		padding: 7,
		color: '#000',
	},
	textWrapper: {
		width: '80%',
		backgroundColor: '#fff', 
		borderRadius: 50,
		paddingHorizontal: 20,
		marginVertical: 20
    },
});