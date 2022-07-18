import React from "react";
import { supabase } from "../../../supabase";
import { useState, useEffect } from "react";
import "react-native-url-polyfill/auto";
import {
    TouchableOpacity,
    Text,
    KeyboardAvoidingView,
    StyleSheet,
    TextInput,
    View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Alert } from "react-native";
import * as Animatable from "react-native-animatable";
import TreeckleLoginScreen from "./TreeckleLoginScreen";

const getUsername = async (email) => {
    var userEmail;
    var myHeaders = new Headers();
    myHeaders.append("authority", "treeckle.com");
    myHeaders.append("accept", "application/json, text/plain, */*");
    myHeaders.append("accept-language", "en-GB,en-US;q=0.9,en;q=0.8");
    myHeaders.append("content-type", "application/json");
    myHeaders.append("cookie", "G_ENABLED_IDPS=google");
    myHeaders.append("origin", "https://treeckle.com");
    myHeaders.append("referer", "https://treeckle.com/");
    myHeaders.append(
        "sec-ch-ua",
        '".Not/A)Brand";v="99", "Google Chrome";v="103", "Chromium";v="103"'
    );
    myHeaders.append("sec-ch-ua-mobile", "?0");
    myHeaders.append("sec-ch-ua-platform", '"Windows"');
    myHeaders.append("sec-fetch-dest", "empty");
    myHeaders.append("sec-fetch-mode", "cors");
    myHeaders.append("sec-fetch-site", "same-origin");
    myHeaders.append(
        "user-agent",
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36"
    );

    var raw = JSON.stringify({
        email: email,
    });

    var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
    };

    await fetch("https://treeckle.com/api/gateway/check", requestOptions)
        .then((response) => response.text())
        .then((result) => {
            const resultJson = JSON.parse(result);
            try {
                if (resultJson["name"]) {
                    console.log(resultJson);
                    userEmail = resultJson["name"];
                }
            } catch (err) {
                console.log(err);
            }
        })
        .catch((error) => console.log("error", error));

    return userEmail;
};

export default verificationScreen = () => {
    const [errorMessage, setErrorMessage] = useState("");
    const [email, setEmail] = useState(null);
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const navigation = useNavigation();

    const user = supabase.auth.user();
    return (
        <KeyboardAvoidingView style={styles.container} behavior="padding">
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder="Email"
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                    style={styles.input}
                />
            </View>
            <View>
                {errorMessage ? (
                    <Animatable.Text animation="shake" style={styles.errorText}>
                        {errorMessage}
                    </Animatable.Text>
                ) : null}
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    onPress={async () => {
                        const treeckleUsername = await getUsername(email);
                        if (treeckleUsername) {
                            console.log(treeckleUsername);
                            navigation.navigate("TreeckleLoginScreen", {
                                params: {
                                    username: treeckleUsername,
                                    email: email,
                                },
                            });
                        } else {
                            setErrorMessage("");
                            setErrorMessage("User does not exists.");
                        }
                    }}
                    style={[styles.button]}
                >
                    <Text style={styles.buttonText}>Verify Email</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
    },
    inputContainer: {
        width: "80%",
    },
    input: {
        backgroundColor: "#D9D9D9",
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 30,
        marginTop: 5,
        fontFamily: "Montserrat-Regular",
    },
    button: {
        backgroundColor: "#0C3370",
        width: "80%",
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
    },

    buttonContainer: {
        width: "80%",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 40,
    },

    buttonOutline: {
        backgroundColor: "white",
        marginTop: 5,
        borderColor: "white",
        borderWidth: 2,
    },
    buttonText: {
        color: "white",
        fontWeight: "700",
        fontSize: 16,
    },
    buttonOutlineText: {
        color: "black",
        fontWeight: "700",
        fontSize: 16,
    },
    errorText: {
        fontFamily: "Montserrat-SemiBold",
        color: "red",
        marginTop: 10,
        paddingHorizontal: 40,
    },
});
