import { View, Text, StyleSheet, StatusBar } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
export default MainScreen = () => {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <View
                style={[styles.bookingWrapper, { backgroundColor: "#FF6D03" }]}
            >
                <TouchableOpacity>
                    <Text style={styles.buttonText}>
                        Check current bookings
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={styles.bookingWrapper}>
                <TouchableOpacity
                    onPress={() => navigation.navigate("SelectActivityScreen")}
                >
                    <Text style={[styles.buttonText, { color: "black" }]}>
                        Make a new booking
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
    },
    bookingWrapper: {
        borderWidth: 5,
        borderRadius: 20,
        justifyContent: "center",
        marginHorizontal: 30,
        flex: 0.5,
        marginVertical: 30,
    },
    buttonText: {
        fontFamily: "Montserrat-ExtraBold",
        color: "white",
        fontSize: 40,
        padding: 20,
    },
});
