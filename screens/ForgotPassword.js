import React, { useState } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View, StyleSheet, Dimensions } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { firebase, passwordReset } from '../firebase/firebase'
import WaveTop from '../assets/waveTopAlt.svg'
import WaveBottomL from '../assets/waveBottomLeft.svg'
import WaveBottomR from '../assets/waveBottomRight.svg'
import ForgotPass from '../assets/forgotPass.svg'
import useStatusBar from '../hooks/useStatusBar';
import IconButton from "../components/IconButton";

const SCREEN_HEIGHT = Dimensions.get('screen').height;

export default function ForgotPassword({navigation}) {
    const [email, setEmail] = useState('')

    const onSendEmailPress = () => {
        passwordReset(email)
        .then((response) => {
            console.log("success:")
            console.log(response)
            navigation.navigate('WelcomeScreen')
        })
        .catch(error => {
            alert(error)
        })
        navigation.navigate('WelcomeScreen')
    }

    useStatusBar('light-content');

    return (
        <View style={styles.container}>
        <WaveTop style={{ position: 'absolute'}}/>
        <WaveBottomL style={{ position: 'absolute', bottom : 0}}/>
        <WaveBottomR style={{ position: 'absolute', bottom : 0, right: 0}}/>
        <IconButton
                style={{ position: "absolute", zIndex: 1, top: 45, left: 10 }}
                iconName="chevron-left"
                color="#fff"
                size={40}
                onPress={() => navigation.goBack()}
            /> 
            <KeyboardAwareScrollView
                style={{ flex: 1, width: '100%'}}
                keyboardShouldPersistTaps="always">
                <View style={styles.componentsContainer}>
                    <View>
                        <Text style={styles.titleSmall}>Forgot your password?</Text>
                        <ForgotPass style={{margin: 30}}/>
                        <TextInput
                            style={styles.input}
                            placeholder='Enter your email address here'
                            placeholderTextColor="#9A9A9D"
                            onChangeText={(text) => setEmail(text)}
                            value={email}
                            underlineColorAndroid="transparent"
                            autoCapitalize="none"
                        />
    
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => onSendEmailPress()}>
                            <Text style={styles.buttonTitle}>Send recovery email</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAwareScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
		flex: 1,
		backgroundColor: '#9A9A9D',
	},
	componentsContainer: {
		flex:1,
		flexDirection: 'column', 
		justifyContent: 'center',
        height: SCREEN_HEIGHT
	},
    title: {
		fontFamily: 'Lato_400Regular',
		color: 'white',
		fontWeight: '400',
		fontSize: 38,
        alignSelf: 'center',
        margin: 30
    },
    titleSmall: {
		fontFamily: 'Lato_400Regular',
		color: 'white',
		fontWeight: '400',
		fontSize: 30,
        alignSelf: 'center',
        margin: 30
    },
    input: {
        height: 48,
        borderRadius: 23,
        overflow: 'hidden',
        backgroundColor: 'white',
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 39,
        marginRight: 39,
        paddingLeft: 16
    },
    button: {
        backgroundColor: '#E0E0E5',
        marginLeft: 39,
        marginRight: 39,
        marginTop: 20,
        height: 48,
        borderRadius: 23,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
    buttonTitle: {
        color: '#000000',
        fontSize: 18,
		fontFamily: 'Lato_400Regular'
    },
    footerView: {
        alignItems: 'center',
        marginTop: 60,
    },
    footerText: {
        fontSize: 17,
        color: '#D6D3D3'
    },
    footerLink: {
        color: 'white',
        fontWeight: '600',
		fontSize: 23,
		padding: 35
    }
})