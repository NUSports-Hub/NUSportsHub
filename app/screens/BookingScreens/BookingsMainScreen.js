import { View, Text, StyleSheet, StatusBar, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
export default BookingsMainScreen = () => {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={[styles.bookingWrapper, { backgroundColor: "#FF6D03" }]}
                onPress={() => navigation.navigate("CurrentBookingsScreen")}
            >
                <Text style={styles.buttonText}>Check current bookings</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.bookingWrapper, { backgroundColor: "#0C3370" }]}
                onPress={() => navigation.navigate("SelectActivityScreen")}
            >
                <Text style={styles.buttonText}>Make a new booking</Text>
            </TouchableOpacity>
        </View>
    );
};
const { width, height } = Dimensions.get("window");
const styles = StyleSheet.create({
    container: {
        flex: 1,

        paddingTop: StatusBar.currentHeight,
    },
    bookingWrapper: {
        height: 0.38 * height,
        borderRadius: 20,
        justifyContent: "center",
        marginHorizontal: 30,
        marginVertical: 30,
        elevation: 10,
        shadowColor: "black",
        backgroundColor: "black",
    },
    buttonText: {
        fontFamily: "Montserrat-ExtraBold",
        color: "white",
        fontSize: 40,
        padding: 20,
    },
});
