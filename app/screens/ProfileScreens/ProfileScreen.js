import { View, Text, Image, StyleSheet, Button, } from "react-native";
import { TouchableOpacity } from "react-native";
import { supabase } from "../../../supabase";
import { useState, useEffect, } from "react";
import { useNavigation } from "@react-navigation/native";
import 'react-native-url-polyfill/auto';
import PasswordResetScreen from "./PasswordResetScreen";
import userProfile from "../../../assets/userProfile.png"


export default ProfileScreen = ({ session }) => {
    const navigation = useNavigation()
    const [loading, setLoading] = useState(false)
    const [username, setUsername] = useState(null)
    const [email, setEmail] = useState(null)
    const [nusid, setNusid] = useState(null)
    const [bio, setBio] = useState(null)
    const user = supabase.auth.user()

    useEffect(() => {
        if (supabase.auth.session()) getProfile();
    }, [session]);

    async function getProfile() {
        try {
            setLoading(true);
            const user = supabase.auth.user();

            let { data, error, status } = await supabase
                .from('profiles')
                .select(`username,email,nusid,bio`)
                .eq('id', user.id)
                .single()

            if (data) {
                setUsername(data.username);
                setEmail(data.email);
                setNusid(data.nusid);
                setBio(data.bio);
            }
            if (error && status !== 406) {
                throw error;
            }

        } catch (error) {
            alert(error.message)
        } finally {
            setLoading(false)
        }
    }

    async function signOut() {
        const { error } = await supabase.auth.signOut();
    }
    return (
        <View style={styles.container}>
            <Image
                style={styles.userDisplayPicture}
                source={userProfile}
            />
            <TouchableOpacity
                onPress={() => { }}
            >
                <Text style={styles.userDisplayPictureText}>
                    Edit Profile Picture
                </Text>
            </TouchableOpacity>
            <View style={styles.userDetailsContainer}>
                <Text style={styles.userDetailsText}>Name: {username}</Text>
                <Text style={styles.userDetailsText}>NUSID: {nusid}</Text>
                <Text style={styles.userDetailsText}>
                    Email: {email}
                </Text>
                <Text style={styles.userDetailsText}>Bio: {bio}</Text>
            </View>
            <TouchableOpacity
                onPress={() => navigation.navigate("EditProfileScreen")}
            >
                <Text style={styles.userDetailsText}>
                    Edit profile details
                </Text>
            </TouchableOpacity>
            <View style={styles.bottomNavigationContainer}>
                <TouchableOpacity
                    onPress={() => navigation.navigate("VScreen")}
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
};

const styles = StyleSheet.create({
    container: { alignItems: "center" },
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
        marginVertical: 10,
        padding: 15,
    },
    userDetailsText: {
        fontFamily: "Montserrat-SemiBold",
        padding: 5,
    },
    bottomNavigationContainer: {
        marginTop: "40%",
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
