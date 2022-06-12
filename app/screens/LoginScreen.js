import React from "react";
import {
    Image,
    TouchableOpacity,
    Text,
    KeyboardAvoidingView,
    StyleSheet,
    TextInput,
    View,
    Alert,
} from "react-native";
import { useState } from "react";
import logo from "../../assets/Logo.png";
import { useNavigation } from "@react-navigation/native";
import { supabase } from "../../supabase";
import * as Animatable from "react-native-animatable";
export default LoginScreen = () => {
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    async function signInWithEmail() {
        // setLoading(true);
        const { user, error } = await supabase.auth.signIn({
            email: email,
            password: password,
        });
        if (error) {
            console.log(error.message);
            setErrorMessage("");
            setErrorMessage("Invalid Login Credentials");
        }
        // setLoading(false);
    }

    async function signUpWithEmail() {
        // setLoading(true);
        const { user, error } = await supabase.auth.signUp({
            email: email,
            password: password,
        });

        if (error) {
            console.log(error.message);
            if (error.message.includes("registered")) {
                setErrorMessage("");
                setErrorMessage("Email is already registered");
            } else if (error.message.includes("requires a valid password")) {
                setErrorMessage("");
                setErrorMessage("Please enter a valid password");
            } else if (error.message.includes("8 characters")) {
                setErrorMessage("");
                setErrorMessage("Password should be at least 8 characters");
            }
        } else {
            setErrorMessage("");
            setSuccessMessage(
                "Your registration is complete. \nAn email containing activation instructions has been sent to " +
                    email
            );
        }

        // setLoading(false);
    }
    return (
        <KeyboardAvoidingView style={styles.container} behavior="padding">
            <View style={styles.image}>
                <Image
                    style={{ resizeMode: "contain", height: 200, width: 300 }}
                    source={logo}
                />
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder="exxxxxxxx@u.nus.edu"
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
            <View style={styles.forgotpwContainer}>
                <TouchableOpacity onPress={() => {}} style={styles.password}>
                    <Text style={styles.forgotpwText}>Forgot Password?</Text>
                </TouchableOpacity>
            </View>
            <View>
                {errorMessage ? (
                    <Animatable.Text animation="shake" style={styles.errorText}>
                        {errorMessage}
                    </Animatable.Text>
                ) : null}
                {successMessage ? (
                    <Animatable.Text
                        animation="fadeIn"
                        style={[styles.errorText, { color: "green" }]}
                    >
                        {successMessage}
                    </Animatable.Text>
                ) : null}
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    onPress={() => {
                        // if (email.includes("u.nus.edu")) {
                        //     signInWithEmail();
                        // } else {
                        //     setErrorMessage("");
                        //     setErrorMessage("Please input a valid NUS email");
                        // }
                        signInWithEmail();
                    }}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={signUpWithEmail}
                    style={[styles.button, styles.buttonOutline]}
                >
                    <Text style={styles.buttonOutlineTextunderline}>
                        Register
                    </Text>
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
