import { TextInput } from "react-native-gesture-handler";
import {
    View,
    Text,
    Image,
    StyleSheet,
    Button,
    Dimensions,
} from "react-native";
import { TouchableOpacity, KeyboardAvoidingView } from "react-native";
import { supabase } from "../../../supabase";
import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import "react-native-url-polyfill/auto";
import ProfileScreen from "./ProfileScreen";

const { width, height } = Dimensions.get("window");
export default EditProfileScreen = () => {
    const navigation = useNavigation();
    const [loading, setLoading] = useState(true);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [nusid, setNusid] = useState("");
    const [bio, setBio] = useState("");
    async function getProfile() {
        try {
            setLoading(true);
            const user = supabase.auth.user();

            let { data, error, status } = await supabase
                .from("profiles")
                .select(`username,email,nusid,bio`)
                .eq("user_id", user.id)
                .single();

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
            alert(error.message);
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        getProfile();
    }, []);

    const updateProfile = async () => {
        try {
            const user = supabase.auth.user();
            if (!user) throw new Error("No user on the session!");

            const updates = {
                user_id: user.id,
                username,
                email,
                nusid,
                bio,
                //updated_at: new Date(),
            };

            let { error } = await supabase
                .from("profiles")
                .update(updates, {
                    returning: "minimal", // Don't return the value after inserting
                })
                .eq("user_id", user.id);

            if (error) {
                throw error;
            }
        } catch (error) {
            alert(error.message);
        } finally {
        }
    };
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
            keyboardVerticalOffset={100}
        >
            <View style={styles.inner}>
                <View style={styles.userDetailsContainer}>
                    <Text>Username:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Name"
                        value={username}
                        onChangeText={(text) => setUsername(text)}
                    />
                    <Text>NUS ID:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="NUS ID"
                        value={nusid}
                        onChangeText={(text) => setNusid(text)}
                    />
                    <Text>Email:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                    />
                    <Text>Biography:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Bio"
                        value={bio}
                        onChangeText={(text) => setBio(text)}
                    />
                </View>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        updateProfile({ username, nusid, email, bio });
                        // how to make the update refelcted in profile screen in real time
                        navigation.navigate("ProfileScreen");
                    }}
                >
                    <Text style={styles.buttonText}>Save Changes</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        flex: 1,
    },
    userDetailsContainer: {
        backgroundColor: "#E2DFDF",
        borderRadius: 15,
        padding: 30,
        width: 0.8 * width,
    },
    userDetailsText: {
        fontFamily: "Montserrat-SemiBold",
        padding: 5,
    },
    button: {
        padding: 10,
        borderRadius: 5,
        backgroundColor: "#0C3370",
        width: "60%",
    },
    buttonText: {
        fontFamily: "Montserrat-Bold",
        textAlign: "center",
        color: "white",
    },
    input: {
        fontFamily: "Montserrat-Bold",
    },
    inner: {
        flex: 1,
        justifyContent: "space-around",
        alignItems: "center",
    },
});
