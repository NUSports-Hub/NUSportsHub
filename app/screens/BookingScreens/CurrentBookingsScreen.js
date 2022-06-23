import { View, Text, StyleSheet, StatusBar, TextInput } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
export default CurrentBookingsScreen = () => {
    const navigation = useNavigation();
    return (
        <View>
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchBar}
                    placeholder="Search Bookings"
                    placeholderTextColor={"black"}
                />
                <TouchableOpacity>
                    <MaterialCommunityIcons
                        name="magnify"
                        color={"#FF6D03"}
                        size={25}
                    />
                </TouchableOpacity>
            </View>
            <View style={styles.topNavigationBar}>
                <Text style={styles.topNavigationBarText}>Upcoming</Text>

                <TouchableOpacity>
                    <Text
                        style={[
                            styles.topNavigationBarText,
                            { fontSize: 15, color: "#0C3370" },
                        ]}
                    >
                        View all
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={styles.bookingContainer}></View>
        </View>
    );
};

const styles = StyleSheet.create({
    searchContainer: {
        flexDirection: "row",
        padding: 15,
        justifyContent: "space-around",
    },
    searchBar: {
        width: "80%",
        backgroundColor: "#D9D9D9",
        borderRadius: 15,
        textAlign: "center",
        fontFamily: "Montserrat-SemiBold",
    },
    topNavigationBar: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginHorizontal: 15,
        alignItems: "center",
    },
    topNavigationBarText: {
        fontFamily: "Montserrat-Bold",
        fontSize: 20,
        paddingHorizontal: 10,
    },
});
