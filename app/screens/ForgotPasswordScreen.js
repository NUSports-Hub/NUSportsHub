import React from "react";
import { supabase } from "../../supabase";
import { useState, useEffect } from "react";
import "react-native-url-polyfill/auto";
import {
    TouchableOpacity,
    Text,
    KeyboardAvoidingView,
    StyleSheet,
    TextInput,
    View,
    Alert,
} from "react-native";
//import { useNavigation } from "@react-navigation/native";
import * as RootNavigation from "/Users/admin/Desktop/Orbital Dev4/NUSportsHub/app/screens/RootNavigation.js";

export default ForgotPasswordScreen = ({ hash }) => {
    const [password, setPassword] = useState(null);
    const [confirmPassword, setConfirmPassword] = useState(null);
    //const navigation = useNavigation();
    const [errorMessage, setErrorMessage] = useState("");
    //const [type, setType] = useState(null)

    //const [url, setUrl] = useState(null)
    //const [hash, setHash] = useState(null)

    //useEffect(() => {
    //setUrl(Linking.addEventListener('url'))
    //setHash(url.substring(url.indexOf('#')))
    //}, [])

    async function ChangePassword() {
        try {
            if (!hash) {
                RootNavigation.navigate("Home")
                Alert.alert("Please generate another reset email")
            }
            else if (hash) {
                const accessToken = hash.split("=")[1].split("&")[0]

                const { error } = await supabase.auth.api.updateUser(accessToken, {
                    password: password,
                });
                if (error) {
                    console.log(error);
                    setErrorMessage("");
                    setErrorMessage("New password is not identical")
                }
                else if (!error) {
                    RootNavigation.navigate("Home")
                    Alert.alert("Password Updated")
                }
            }

        } catch (error) {
            console.log(error)
        }
    }

    // async function ChangePassword() {
    //     const { user, error } = await supabase.auth.update({ password: password })
    // };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder="Enter New Password"
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                    style={styles.input}
                    secureTextEntry
                />
                <TextInput
                    placeholder="Confirm New Password"
                    value={confirmPassword}
                    onChangeText={(text) => setConfirmPassword(text)}
                    style={styles.input}
                    secureTextEntry
                />
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    onPress={() => {
                        if (password === confirmPassword) {
                            ChangePassword()
                        }
                    }}
                >
                    <Text style={styles.buttonText}>Change Password</Text>
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
        backgroundColor: "#0C3370",
    },
    inputContainer: {
        width: "80%",
    },
    input: {
        fontFamily: "Montserrat-Bold",
        backgroundColor: "white",
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 30,
        marginTop: 5,
    },
    buttonContainer: {
        backgroundColor: "white",
        width: "80%",
        padding: 10,
        borderRadius: 15,
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
        fontFamily: "Montserrat-Bold",
        color: "black",

        fontSize: 16,
    },

    forgotpwContainer: {
        color: "00FFFFFF",
    },

    forgotpwText: {
        color: "white",
        textDecorationLine: "underline",
    },
    errorText: {
        fontFamily: "Montserrat-SemiBold",
        color: "red",
        marginTop: 10,
        paddingHorizontal: 40,
    },
});
