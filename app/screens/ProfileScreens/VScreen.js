import React from "react"
import { supabase } from "../../../supabase"
import { useState, useEffect, } from "react";
import 'react-native-url-polyfill/auto';
import {
    TouchableOpacity,
    Text,
    KeyboardAvoidingView,
    StyleSheet,
    TextInput,
    View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import 'react-native-url-polyfill/auto';
import * as Animatable from "react-native-animatable";

export default VScreen = () => {
    const [errorMessage, setErrorMessage] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigation = useNavigation()

    async function CheckPassword() {
        const { user, error } = await supabase.auth.signIn({
            email: email,
            password: password
        })
        if (error) {
            console.log(error.message);
            setErrorMessage("");
            setErrorMessage("Please enter the correct email/ password");
        }
        else {
            navigation.navigate("PasswordResetScreen")
        }
    };

    return (
        <KeyboardAvoidingView style={styles.container} behavior="padding">
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder="Enter Email"
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                    style={styles.input}
                />
                <TextInput
                    placeholder="Password"
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                    style={styles.input}
                    secureTextEntry
                />
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    onPress={() => {
                        if (email.includes("gmail")) {
                            CheckPassword();
                        } else {
                            setErrorMessage("");
                            setErrorMessage("Please input a valid NUS email");
                        }
                    }}
                >
                    <Text style={styles.buttonText}>Change Password</Text>
                </TouchableOpacity>
            </View>
            <View>
                {errorMessage ? (
                    <Animatable.Text animation="shake" style={styles.errorText}>
                        {errorMessage}
                    </Animatable.Text>
                ) : null}
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "White",
    },
    inputContainer: {
        width: "80%",
    },
    input: {
        backgroundColor: "white",
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 30,
        marginTop: 5,
    },
    button: {
        backgroundColor: "#EEEEEE",
        width: "100%",
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
        color: "black",
        fontWeight: "700",
        fontSize: 16,
    },
    buttonOutlineText: {
        color: "black",
        fontWeight: "700",
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

