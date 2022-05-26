import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
export default UserFavourites = (props) => {
    return (
        <View style={styles.container}>
            <MaterialCommunityIcons
                name={props.iconName}
                color={"white"}
                size={35}
            />
            <Text style={styles.favouriteName}>{props.favouriteName}</Text>
            <TouchableOpacity>
                <Text style={styles.bookButtonText}>Book Now</Text>
            </TouchableOpacity>
        </View>
    );
};

const { height } = Dimensions.get("window");
const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 10,
        height: 0.11 * height,
    },
    favouriteName: {
        fontFamily: "Montserrat-Bold",
        color: "white",
        fontSize: 18,
    },
    bookButtonText: {
        borderRadius: 20,
        padding: 10,
        color: "white",
        fontSize: 13,
        fontFamily: "Montserrat-SemiBold",
        backgroundColor: "#FF6D03",
    },
});
