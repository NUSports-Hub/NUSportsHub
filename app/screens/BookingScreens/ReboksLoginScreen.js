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
import * as cheerio from "cheerio";

export default loginScreen = () => {
    const [errorMessage, setErrorMessage] = useState("");
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const navigation = useNavigation();

    const user = supabase.auth.user();
    function encodeURIfix(str) {
        return encodeURIComponent(str).replace(/!/g, "%21");
    }

    const loginReboks = async (email, password, url) => {
        console.log(password);
        // var postData;
        let response2 = await fetch(url, {
            headers: {
                accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
                "accept-language": "en-GB,en;q=0.9",
                "cache-control": "max-age=0",
                "content-type": "application/x-www-form-urlencoded",
                "sec-ch-ua":
                    '".Not/A)Brand";v="99", "Google Chrome";v="103", "Chromium";v="103"',
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": '"Windows"',
                "sec-fetch-dest": "document",
                "sec-fetch-mode": "navigate",
                "sec-fetch-site": "same-origin",
                "sec-fetch-user": "?1",
                "upgrade-insecure-requests": "1",
            },
            body:
                "UserName=nusstu%5C" +
                email +
                "&Password=" +
                encodeURIfix(password) +
                "&AuthMethod=FormsAuthentication",
            method: "POST",
        })
            .then((response) => response.text())
            .then((result) => {
                const $ = cheerio.load(result);
                var postData = encodeURIComponent(
                    $("input[name=SAMLResponse]")["0"]["attribs"]["value"]
                );
                return postData;
            })
            .catch((error) => {
                setErrorMessage("");
                setErrorMessage("Incorrect login details.");
            });
        return response2;
    };

    const getToken = async (samlResponse) => {
        const RCTNetworking = require("react-native/Libraries/Network/RCTNetworking");
        RCTNetworking.clearCookies((result) => {
            console.log(result); //true if successfully cleared
        });
        var string = samlResponse;

        let token = await fetch(
            "https://reboks.nus.edu.sg/nus_saml_provider/public/saml/module.php/saml/sp/saml2-acs.php/reboks",
            {
                headers: {
                    accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
                    "accept-language": "en-GB,en;q=0.9",
                    "cache-control": "max-age=0",
                    "content-type": "application/x-www-form-urlencoded",
                    "sec-ch-ua":
                        '".Not/A)Brand";v="99", "Google Chrome";v="103", "Chromium";v="103"',
                    "sec-ch-ua-mobile": "?0",
                    "sec-ch-ua-platform": '"Windows"',
                    "sec-fetch-dest": "document",
                    "sec-fetch-mode": "navigate",
                    "sec-fetch-site": "same-site",
                    "upgrade-insecure-requests": "1",
                    credentials: "include",
                    cookie: "ab559aef44f44862595c982fb9e6464f",
                },
                body:
                    "SAMLResponse=" +
                    string +
                    "&RelayState=http%3A%2F%2Freboks.nus.edu.sg%2Fnus_saml_provider%2Fpublic%2Findex.php%2Fadfs%2Fauth",
                method: "POST",
            }
        )
            .then((response) => response.text())
            .then((result) => {
                const $ = cheerio.load(result);
                var token = $("input[name=token]")["0"]["attribs"]["value"];
                return token;
            });
        console.log(token);
        let test = await fetch(
            "https://reboks.nus.edu.sg/nus_public_web/public/",
            {
                headers: {
                    accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
                    "accept-language": "en-GB,en;q=0.9",
                    "sec-ch-ua":
                        '".Not/A)Brand";v="99", "Google Chrome";v="103", "Chromium";v="103"',
                    "sec-ch-ua-mobile": "?0",
                    "sec-ch-ua-platform": '"Windows"',
                    "sec-fetch-dest": "document",
                    "sec-fetch-mode": "navigate",
                    "sec-fetch-site": "none",
                    "sec-fetch-user": "?1",
                    "upgrade-insecure-requests": "1",
                },
                referrerPolicy: "strict-origin-when-cross-origin",
                body: null,
                method: "GET",
            }
        );
        var nuspw = test.headers["map"]["set-cookie"].slice(6, 38);
        let finalStep = await fetch(
            "https://reboks.nus.edu.sg/nus_public_web/public/auth/redirectAdfs",
            {
                headers: {
                    accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
                    "accept-language": "en-GB,en;q=0.9",
                    "cache-control": "max-age=0",
                    "content-type": "application/x-www-form-urlencoded",
                    "sec-ch-ua":
                        '".Not/A)Brand";v="99", "Google Chrome";v="103", "Chromium";v="103"',
                    "sec-ch-ua-mobile": "?0",
                    "sec-ch-ua-platform": '"Windows"',
                    "sec-fetch-dest": "document",
                    "sec-fetch-mode": "navigate",
                    "sec-fetch-site": "same-origin",
                    "upgrade-insecure-requests": "1",
                },
                body: "token=" + token,
                method: "POST",
            }
        );
        return nuspw;
    };

    const getUrl = async () => {
        let response1 = await fetch(
            "https://reboks.nus.edu.sg/nus_public_web/public/auth/requestAdfs",
            {
                headers: {
                    accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
                    "accept-language": "en-GB,en;q=0.9",
                    "sec-ch-ua":
                        '".Not/A)Brand";v="99", "Google Chrome";v="103", "Chromium";v="103"',
                    "sec-ch-ua-mobile": "?0",
                    "sec-ch-ua-platform": '"Windows"',
                    "sec-fetch-dest": "document",
                    "sec-fetch-mode": "navigate",
                    "sec-fetch-site": "same-origin",
                    "sec-fetch-user": "?1",
                    "upgrade-insecure-requests": "1",
                },
                body: null,
                method: "GET",
            }
        );
        return response1.url;
    };

    return (
        <KeyboardAvoidingView style={styles.container} behavior="padding">
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder="NUSNET ID e.g.E0123456"
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
                        const requestUrl = await getUrl();
                        const samlResponse = await loginReboks(
                            email,
                            password,
                            requestUrl
                        );
                        if (samlResponse != undefined) {
                            const token = await getToken(samlResponse);
                            console.log(token);
                            navigation.navigate("SelectActivityScreenReboks", {
                                params: { accessToken: token },
                            });
                        }
                    }}
                    style={[styles.button]}
                >
                    <Text style={styles.buttonText}>Login</Text>
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
