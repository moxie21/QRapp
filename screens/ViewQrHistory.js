import React, { useState, useContext, useEffect } from "react";
import {
    StyleSheet,
    View,
    Text,
    SafeAreaView,
    FlatList,
    Share,
    TouchableOpacity,
    Linking,
    Alert
} from "react-native";
import Clipboard from 'expo-clipboard';
import QRCode from "react-native-qrcode-svg";
import { Chip } from "react-native-paper";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { MaterialIcons } from "@expo/vector-icons";
import useStatusBar from "../hooks/useStatusBar";
import IconButton from "../components/IconButton";
import { firebase, firestore } from "../firebase/firebase";
import { AuthUserContext } from "../navigation/AuthUserProvider";

const Item = ({ item }) => (
    <Chip icon="information" style={{ margin: 5, backgroundColor: item.color }}>
        {item.title}
    </Chip>
);

export default function ViewOqHistory({ navigation, data }) {
    const { user, setUser } = useContext(AuthUserContext);
    const [tags, setTags] = useState([]);
    const userRef = firestore.collection("users").doc(user.uid);

    useStatusBar("dark-content");

    useEffect(() => {
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
    })

    const renderItem = ({ item }) => <Item {...{ item }} />;

    const onShare = async () => {
        try {
            const supported = await Linking.canOpenURL(data.content);
            let result;
            if(!supported){
                result = await Share.share({
                    message: data.content
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
            await Linking.openURL(data.content);
        }
        catch (err) {
            alert('This link is not formatted correctly');
            console.log(err);
        }
    }

    const copyToClipboard = () => {
        Clipboard.setString(data.content);
        Alert.alert("Coppied to clipboard");
    }

    const onDelete = () => {
        Alert.alert(
            'Do you want to delete this scan?',
            '',
            [
              {
                text: "Cancel",
                // onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
              },
              { text: "OK", 
                onPress: () => { 
                    userRef.collection("scans").doc(data.id).delete().then(() => {
                        console.log("Document successfully deleted!");
                        navigation.navigate("HistoryScreen");
                    }).catch(error => {
                        console.error("Error removing document: ", error);
                    });
                } 
              }
            ],
            { cancelable: false }
          );
    }

    return (
        <>
            <IconButton
                style={{ position: "absolute", zIndex: 1, top: 45, left: 10 }}
                iconName="chevron-left"
                color="#000"
                size={40}
                onPress={() => navigation.goBack()}
            />
            <KeyboardAwareScrollView
                style={styles.container}
                contentContainerStyle={{
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <SafeAreaView
                    style={{ flex: 1, width: "100%", alignItems: "center" }}
                >
                    <TouchableOpacity style={styles.qrWrapper} onPress={copyToClipboard}>
                        <QRCode
                            value={data.length > 0 ? data : "QR"}
                            size={150}
                        />
                    </TouchableOpacity>
                    <View style={styles.textWrapper}>
                        <Text style={styles.text}>{data.content}</Text>
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
                            onPress={onDelete}
                            style={[
                                styles.iconButton,
                                {
                                    borderTopRightRadius: 20,
                                    borderBottomRightRadius: 20,
                                },
                            ]}
                        >
                            <MaterialIcons name="close" size={28} color="red" />
                        </TouchableOpacity>
                    </SafeAreaView>

                    <SafeAreaView style={styles.tagsWrapper}>
                        <Text
                            style={{
                                fontSize: 18,
                                marginVertical: 10,
                                alignSelf: "flex-start",
                            }}
                        >
                            Tags:
                        </Text>
                        <FlatList
                            data={tags.filter(t => data.tags.findIndex(st => st.id === t.id) != -1)}
                            renderItem={renderItem}
                            keyExtractor={(item) => item.id}
                            contentContainerStyle={{ alignSelf: "flex-start" }}
                            numColumns={25}
                            columnWrapperStyle={{
                                flexWrap: "wrap",
                                flex: 1,
                                marginTop: 5,
                            }}
                            showsVerticalScrollIndicator={false}
                            showsHorizontalScrollIndicator={false}
                        />
                    </SafeAreaView>
                </SafeAreaView>
            </KeyboardAwareScrollView>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F2F2F2",
        paddingTop: 100,
    },
    tagsWrapper: {
        flex: 1,
        width: "80%",
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
    item: {
        backgroundColor: "#f9c2ff",
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    text: {
        fontSize: 25,
        padding: 20,
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
});