import { Text, StyleSheet, View, Dimensions } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
export default FacilityCapacity = (props) => {
    return (
        <View style={styles.container}>
            <Text style={styles.nameText}>{props.name}</Text>
            <MaterialCommunityIcons
                name="weight-lifter"
                color={"white"}
                size={50}
            />
            <Text style={styles.capacityText}>{props.capacity}</Text>
        </View>
    );
};
const { width } = Dimensions.get("window");
const styles = StyleSheet.create({
    nameText: {
        fontFamily: "Montserrat-Bold",
        color: "white",
        padding: 5,
        fontSize: 13,
        textAlign: "center",
    },
    capacityText: {
        fontFamily: "Montserrat-Bold",
        color: "white",
        padding: 5,
        fontSize: 20,
    },
    container: {
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
        height: "100%",
        width: width * 0.45,
    },
});
