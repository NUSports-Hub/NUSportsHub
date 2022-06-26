import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
export default UserFavourites = (props) => {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <MaterialCommunityIcons
                style={styles.icon}
                name={props.iconName}
                color={"white"}
                size={35}
            />
            <Text style={styles.favouriteName}>{props.favouriteName}</Text>
            <TouchableOpacity
                style={styles.bookButton}
                onPress={() => {
                    navigation.navigate("Bookings", {
                        screen: "SelectTimeScreen",
                        params: {
                            iconName: props.iconName,
                            activityName: props.favouriteName,
                        },
                    });
                }}
            >
                <Text style={styles.bookButtonText}>Book Now</Text>
            </TouchableOpacity>
        </View>
    );
};

const { height } = Dimensions.get("window");
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        height: 0.1 * height,
    },
    icon: {
        flex: 0.1,
    },
    favouriteName: {
        textAlign: "center",
        flex: 0.55,
        fontFamily: "Montserrat-Bold",
        color: "white",
        fontSize: 18,
    },
    bookButtonText: {
        padding: 7,
        color: "white",
        fontSize: 13,
        fontFamily: "Montserrat-SemiBold",
    },
    bookButton: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#FF6D03",
        borderRadius: 10,
        flex: 0.35,
        marginRight: 10,
    },
});
