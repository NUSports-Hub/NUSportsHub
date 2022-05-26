import React from "react";
import {
    Image,
    TouchableOpacity,
    Text,
    KeyboardAvoidingView,
    StyleSheet,
    TextInput,
    View,
} from "react-native";
import { useState } from "react";
import logo from "../../assets/Logo.png";
import { useNavigation } from "@react-navigation/native";

const LoginScreen = () => {
    const [NUSid, setNUSid] = useState("");
    const [password, setPassword] = useState("");

    const navigation = useNavigation();

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
                    placeholder="NUSID"
                    value={NUSid}
                    onChangeText={(text) => setNUSid(text)}
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

            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    onPress={() => navigation.navigate("HomeScreen")}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => {}}
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

export default LoginScreen;

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
        width: "60%",
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
});
