import React, { useState, useContext, useEffect } from "react";
import {
    StyleSheet,
    View,
    Text,
    SafeAreaView,
    FlatList,
    Share,
    TouchableOpacity,
    Linking
} from "react-native";
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
    const [tags, setTags] = useState([]);
    const { user, setUser } = useContext(AuthUserContext);
    const userRef = firestore.collection("users").doc(user.uid);

    useStatusBar("dark-content");

    useEffect(() => {
        return userRef.collection("tags").onSnapshot((tagsSnapshot) => {
            const tagsList = [];
            tagsSnapshot.forEach((tagsDoc) => {
                const { count, title, color } = tagsDoc.data();
                const id = tagsDoc.id;
                tagsList.push({
                    id,
                    count,
                    title,
                    color,
                });
            });

            setTags(tagsList);
        });
    }, []);

    const renderItem = ({ item }) => <Item {...{ item }} />;

    const onShare = async () => {
        try {
            const result = await Share.share({
                message: data
            });
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
                    <View style={styles.qrWrapper}>
                        <QRCode
                            value={data.length > 0 ? data : "QR"}
                            size={150}
                        />
                    </View>
                    <View style={styles.textWrapper}>
                        <Text style={styles.text}>{data}</Text>
                    </View>

                    <SafeAreaView style={styles.iconButtonsWrapper}>
                        <TouchableOpacity
                            onPress={async () => {
                                await Linking.openURL('https://www.google.com');
                            }}
                            style={[
                                styles.iconButton,
                                {
                                    borderTopLeftRadius: 20,
                                    borderBottomLeftRadius: 20,
                                },
                            ]}
                        >
                            <MaterialIcons
                                name="content-copy"
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
                                color="#00008B"
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => alert("c")}
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
                            data={tags}
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
