import { View, Text, StyleSheet, StatusBar } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
export default BookingsMainScreen = () => {
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
            <View
                style={[styles.bookingWrapper, { backgroundColor: "#0C3370" }]}
            >
                <TouchableOpacity
                    onPress={() => navigation.navigate("SelectActivityScreen")}
                >
                    <Text style={styles.buttonText}>Make a new booking</Text>
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
        borderRadius: 20,
        justifyContent: "center",
        marginHorizontal: 30,
        flex: 0.5,
        marginVertical: 30,
        elevation: 10,
        shadowColor: "black",
    },
    buttonText: {
        fontFamily: "Montserrat-ExtraBold",
        color: "white",
        fontSize: 40,
        padding: 20,
    },
});
