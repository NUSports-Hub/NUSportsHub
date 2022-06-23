import {
    Text,
    StyleSheet,
    View,
    Dimensions,
    TouchableOpacity,
} from "react-native";

export default BookingTiming = (props) => {
    const backgroundColor = props.backgroundColor;
    return (
        <TouchableOpacity onPress={props.onPress} disabled={props.disabled}>
            <View
                style={[styles.container, { backgroundColor: backgroundColor }]}
            >
                <Text style={styles.bookingTiming}>{props.time}</Text>
                <Text style={styles.bookingTitle}>{props.title}</Text>
            </View>
        </TouchableOpacity>
    );
};

const { height, width } = Dimensions.get("window");

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        padding: 10,
        alignItems: "center",
        height: 0.08 * height,
        borderRadius: 5,
        marginVertical: 5,
    },
    bookingTiming: {
        fontFamily: "Montserrat-Bold",
        fontSize: 15,
        color: "black",
        paddingLeft: 5,
        width: 0.15 * width,
    },
    bookingTitle: {
        fontFamily: "Montserrat-Bold",
        fontSize: 15,
        paddingLeft: 5,
        color: "#0C3370",
        width: 0.7 * width,
    },
});
