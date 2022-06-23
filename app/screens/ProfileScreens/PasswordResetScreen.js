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
import { Alert } from "react-native";

export default PasswordResetScreen = () => {
    const [errorMessage, setErrorMessage] = useState("")
    const [newPassword, setNewPassword] = useState(null)
    const [confirmPassword, setConfirmPassword] = useState(null)
    const navigation = useNavigation()

    const user = supabase.auth.user()

    async function ChangePassword() {
        const { user, error } = await supabase.auth.update({ password: newPassword })
        if (error) {
            console.log(error.message);
            setErrorMessage("");
            setErrorMessage("New password is not identical")
        }
        else {
            navigation.navigate("ProfileScreen")
            Alert.alert("Password successfully changed")
        }
    };

    return (
        <KeyboardAvoidingView style={styles.container} behavior="padding">
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder="Enter New Password"
                    value={newPassword}
                    onChangeText={(text) => setNewPassword(text)}
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
                        if (newPassword === confirmPassword) {
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

