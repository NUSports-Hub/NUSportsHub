import { View, Text, Image, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import userProfile from "../../assets/userProfile.png";
export default ProfileScreen = () => {
    return (
        <View style={styles.container}>
            <Image
                style={styles.userDisplayPicture}
                source={userProfile}
            ></Image>
            <TouchableOpacity>
                <Text style={styles.userDisplayPictureText}>
                    Edit Profile Picture
                </Text>
            </TouchableOpacity>
            <View style={styles.userDetailsContainer}>
                <Text style={styles.userDetailsText}>Name: John AppleSeed</Text>
                <Text style={styles.userDetailsText}>NUS ID: E0123456</Text>
                <Text style={styles.userDetailsText}>
                    Email: E0123456@u.nus.edu
                </Text>
                <Text style={styles.userDetailsText}>Bio: I like Sports</Text>
            </View>
            <TouchableOpacity>
                <Text style={styles.userDisplayPictureText}>
                    Edit profile details
                </Text>
            </TouchableOpacity>
            <View style={styles.bottomNavigationContainer}>
                <TouchableOpacity
                    style={[styles.button, { backgroundColor: "#0C3370" }]}
                >
                    <Text style={[styles.buttonText, { color: "white" }]}>
                        Change Password
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.button, { backgroundColor: "#FF6D03" }]}
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
