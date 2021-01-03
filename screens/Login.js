import React, { useState } from "react";
import {
    Image,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    StyleSheet,
    Dimensions,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { firebase, loginWithEmail } from "../firebase/firebase";
import WaveTop from "../assets/waveTop.svg";
import WaveBottomL from "../assets/waveBottomLeft.svg";
import WaveBottomR from "../assets/waveBottomRight.svg";
import useStatusBar from "../hooks/useStatusBar";
import IconButton from "../components/IconButton";

const SCREEN_HEIGHT = Dimensions.get("screen").height;

export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onRegisterPress = () => {
        navigation.navigate("RegisterScreen");
    };

    const onForgotPasswordPress = () => {
        navigation.navigate("ForgotPasswordScreen");
    };

    const onLoginPress = () => {
        loginWithEmail(email, password)
            .then((response) => {
                const uid = response.user.uid;
                const usersRef = firebase.firestore().collection("users");
                usersRef
                    .doc(uid)
                    .get()
                    .then((firestoreDocument) => {
                        if (!firestoreDocument.exists) {
                            alert("User does not exist anymore.");
                            return;
                        }
                        const user = firestoreDocument.data();
                        console.log('\x1b[33m%s\x1b[0m: ', "Userul logat este:");
                        console.log('\x1b[33m%s\x1b[0m: ', user);
                        // navigation.navigate("ScanScreen");
                    })
                    .catch((error) => {
                        alert(`catch 1: ${error}`);
                    });
            })
            .catch((error) => {
                alert(error);
            });
    };

    useStatusBar("light-content");

    return (
        <View style={styles.container}>
            <WaveTop style={{ position: "absolute" }} />
            <WaveBottomL style={{ position: "absolute", bottom: 0 }} />
            <WaveBottomR
                style={{ position: "absolute", bottom: 0, right: 0 }}
            />
            <IconButton
                style={{ position: "absolute", zIndex: 1, top: 45, left: 10 }}
                iconName="chevron-left"
                color="#fff"
                size={40}
                onPress={() => navigation.goBack()}
            />
            <KeyboardAwareScrollView
                style={{ flex: 1, width: "100%" }}
                keyboardShouldPersistTaps="always"
            >
                <View style={styles.componentsContainer}>
                    <View>
                        <Text style={styles.title}>Log In</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="E-mail"
                            placeholderTextColor="#aaaaaa"
                            onChangeText={(text) => setEmail(text)}
                            value={email}
                            underlineColorAndroid="transparent"
                            autoCapitalize="none"
                        />
                        <TextInput
                            style={styles.input}
                            placeholderTextColor="#aaaaaa"
                            secureTextEntry
                            placeholder="Password"
                            onChangeText={(text) => setPassword(text)}
                            value={password}
                            underlineColorAndroid="transparent"
                            autoCapitalize="none"
                        />
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => onLoginPress()}
                        >
                            <Text style={styles.buttonTitle}>Log in</Text>
                        </TouchableOpacity>
                        <View style={styles.footerView}>
                            <Text
                                onPress={onForgotPasswordPress}
                                style={styles.footerText}
                            >
                                Forgot password?
                            </Text>
                            <Text
                                onPress={onRegisterPress}
                                style={styles.footerLink}
                            >
                                Register Here
                            </Text>
                        </View>
                    </View>
                </View>
            </KeyboardAwareScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#2F2F31",
    },
    componentsContainer: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        height: SCREEN_HEIGHT,
    },
    title: {
        fontFamily: "Lato_400Regular",
        color: "white",
        fontWeight: "400",
        fontSize: 38,
        alignSelf: "center",
        margin: 30,
    },
    input: {
        height: 48,
        borderRadius: 23,
        overflow: "hidden",
        backgroundColor: "white",
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 39,
        marginRight: 39,
        paddingLeft: 16,
    },
    button: {
        backgroundColor: "#E0E0E5",
        marginLeft: 39,
        marginRight: 39,
        marginTop: 20,
        height: 48,
        borderRadius: 23,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 60,
    },
    buttonTitle: {
        color: "#000000",
        fontSize: 21,
        fontFamily: "Lato_400Regular",
    },
    footerView: {
        alignItems: "center",
        marginTop: 60,
    },
    footerText: {
        fontSize: 17,
        color: "#D6D3D3",
    },
    footerLink: {
        color: "white",
        fontWeight: "600",
        fontSize: 23,
        padding: 35,
    },
});
