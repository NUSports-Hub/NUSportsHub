import { TextInput } from "react-native-gesture-handler";
import { View, Text, Image, StyleSheet, Button, } from "react-native";
import { TouchableOpacity } from "react-native";
import { supabase } from "../../../supabase";
import { useState, useEffect, } from "react";
import { useNavigation } from "@react-navigation/native";
import 'react-native-url-polyfill/auto';
import ProfileScreen from "./ProfileScreen";


export default EditProfileScreen = () => {
    const navigation = useNavigation()
    const [loading, setLoading] = useState(true)
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [nusid, setNusid] = useState("")
    const [bio, setBio] = useState("")

    const updateProfile = async () => {
        try {
            setLoading(true)
            const user = supabase.auth.user()
            if (!user) throw new Error("No user on the session!");

            const updates = {
                id: user.id,
                username,
                email,
                nusid,
                bio,
                //updated_at: new Date(),
            }

            let { error } = await supabase.from('profiles').update(updates, {
                returning: 'minimal', // Don't return the value after inserting
            }).eq("id", user.id)

            if (error) {
                throw error
            }
        } catch (error) {
            alert(error.message)
        } finally {
            setLoading(false)
        }
    }
    return (
        <View style={styles.container}>
            <View style={styles.userDetailsContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Name"
                    value={username}
                    onChangeText={(text) => setUsername(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="NUSID"
                    value={nusid}
                    onChangeText={(text) => setNusid(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Bio"
                    value={bio}
                    onChangeText={(text) => setBio(text)}
                />
            </View>
            <Button
                title={"Save Changes"}
                color="#f194ff"
                onPress={() => {
                    updateProfile({ username, nusid, email, bio });
                    // how to make the update refelcted in profile screen in real time
                    navigation.navigate("ProfileScreen");

                }}
            >
            </Button>
            <View style={styles.bottomNavigationContainer}>
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
        marginVertical: 30,
        padding: 30,
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
