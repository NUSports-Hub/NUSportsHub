import { Text, StyleSheet, View, Dimensions } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
export default ActivityBox = (props) => {
    return (
        <View style={styles.container}>
            <MaterialCommunityIcons
                name={props.iconName}
                color={"white"}
                size={50}
            />
            <Text style={styles.activityText}>{props.activityName}</Text>
        </View>
    );
};

const { width } = Dimensions.get("window");
const styles = StyleSheet.create({
    container: {
        backgroundColor: "#0C3370",
        borderRadius: 5,
        margin: 5,
        padding: 5,
        alignItems: "center",
        justifyContent: "center",
        width: 0.27 * width,
        elevation: 10,
    },
    activityText: {
        fontFamily: "Montserrat-Bold",
        color: "white",
        textAlign: "center",
        fontSize: 12,
    },
});
