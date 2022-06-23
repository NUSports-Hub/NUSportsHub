import {
    View,
    Text,
    Image,
    StyleSheet,
    Button,
    Dimensions,
} from "react-native";
import { TouchableOpacity } from "react-native";
import { supabase } from "../../../supabase";
import { useState, useEffect } from "react";
import * as React from "react";
import { useNavigation } from "@react-navigation/native";
import "react-native-url-polyfill/auto";
import PasswordResetScreen from "./PasswordResetScreen";
import { useFocusEffect } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
const { width, height } = Dimensions.get("window");
export default ProfileScreen = () => {
    useFocusEffect(
        React.useCallback(() => {
            getProfile();
            console.log("Getting profile...");
        }, [])
    );

    const navigation = useNavigation();

    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState(null);
    const [email, setEmail] = useState(null);
    const [nusid, setNusid] = useState(null);
    const [bio, setBio] = useState(null);
    const [avatar, setAvatar] = useState(null);
    var word = "";
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.cancelled) {
            console.log("returned image uri" + result.uri);
            setAvatar(result.uri);
            word = result.uri;
            const { data, error } = await supabase
                .from("profiles")
                .update({ avatar_url: word })
                .eq("id", user.id);
            console.log("done");
        }
    };
    // useEffect(() => {
    //     console.log("hello");
    // }, [avatar]);
    // useEffect(() => {
    //     getProfile();
    // }, []);
    const user = supabase.auth.user();

    async function getProfile() {
        try {
            setLoading(true);
            const user = supabase.auth.user();

            let { data, error, status } = await supabase
                .from("profiles")
                .select(`username,email,nusid,bio,avatar_url`)
                .eq("id", user.id)
                .single();

            if (data) {
                setUsername(data.username);
                setEmail(data.email);
                setNusid(data.nusid);
                setBio(data.bio);
                setAvatar(data.avatar_url);
            } else {
                console.log("hello");
                await supabase.from("profiles").insert([
                    {
                        id: user.id,
                    },
                ]);
            }
            if (error && status !== 406) {
                throw error;
            }
        } catch (error) {
            alert(error.message);
        } finally {
            setLoading(false);
        }
    }

    async function signOut() {
        const { error } = await supabase.auth.signOut();
    }

    if (!loading) {
        return (
            <View style={styles.container}>
                <View>
                    {avatar ? (
                        <Image source={{ uri: avatar }} style={styles.avatar} />
                    ) : (
                        <Image
                            source={require("../../../assets/userProfile.png")}
                            style={styles.avatar}
                        />
                    )}
                </View>
                <TouchableOpacity onPress={pickImage}>
                    <Text style={styles.userDisplayPictureText}>
                        Edit Profile Picture
                    </Text>
                </TouchableOpacity>
                <View style={styles.userDetailsContainer}>
                    <Text style={styles.userDetailsText}>Name: {username}</Text>
                    <Text style={styles.userDetailsText}>NUS ID: {nusid}</Text>
                    <Text style={styles.userDetailsText}>Email: {email}</Text>
                    <Text style={styles.userDetailsText}>Bio: {bio}</Text>
                </View>
                <TouchableOpacity
                    onPress={() => navigation.navigate("EditProfileScreen")}
                >
                    <Text style={styles.userDisplayPictureText}>
                        Edit profile details
                    </Text>
                </TouchableOpacity>
                <View style={styles.bottomNavigationContainer}>
                    <TouchableOpacity
                        onPress={() =>
                            navigation.navigate("PasswordResetScreen")
                        }
                        style={[styles.button, { backgroundColor: "#0C3370" }]}
                    >
                        <Text style={[styles.buttonText, { color: "white" }]}>
                            Change Password
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.button, { backgroundColor: "#FF6D03" }]}
                        onPress={signOut}
                    >
                        <Text style={styles.buttonText}>Sign Out</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    } else {
        return null;
    }
};

const styles = StyleSheet.create({
    avatar: {
        height: 150,
        width: 150,
        marginVertical: 25,
        borderRadius: 100,
    },
    container: {
        alignItems: "center",
        flex: 1,
    },
    userDisplayPicture: {
        margin: 20,
        width: 124,
        height: 119,
        borderRadius: 100,
        borderWidth: 1,
        borderColor: "black",
    },
    userDisplayPictureText: {
        fontFamily: "Montserrat-ExtraBold",
        fontSize: 10,
    },
    userDetailsContainer: {
        backgroundColor: "#E2DFDF",
        borderRadius: 15,
        marginVertical: 25,
        padding: 15,
        width: 0.8 * width,
    },
    userDetailsText: {
        fontFamily: "Montserrat-SemiBold",
        padding: 5,
    },
    bottomNavigationContainer: {
        position: "absolute",
        bottom: 10,
        width: "60%",
    },
    button: {
        padding: 10,
        marginVertical: 5,
        borderRadius: 5,
    },
    buttonText: {
        fontFamily: "Montserrat-Bold",
        textAlign: "center",
    },
});
