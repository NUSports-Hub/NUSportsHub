import { Text, StyleSheet, View, Dimensions, Image } from "react-native";
import placeholderImage from "../../assets/placeholderImage.jpg";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
export default UserEvent = (props) => {
    const navigation = useNavigation();
    return (
        <TouchableOpacity
            onPress={() => navigation.navigate("EventDetailScreen", props)}
        >
            <View style={[styles.eventWrapper, styles.elevation]}>
                <View style={styles.headerContainer}>
                    <Image
                        source={{
                            uri:
                                "https://se-images.campuslabs.com/clink/images/" +
                                props.imageUrl +
                                "?preset=med-w",
                        }}
                        style={styles.image}
                    />
                    <Text style={styles.eventName}>{props.name}</Text>
                </View>
                <View style={styles.eventDateContainer}>
                    <Text style={[styles.eventDate, { color: "black" }]}>
                        Start:{" "}
                    </Text>
                    <Text style={styles.eventDate}>{props.startsOn}</Text>
                    <Text style={[styles.eventDate, { color: "black" }]}>
                        End:{" "}
                    </Text>
                    <Text style={styles.eventDate}>{props.endsOn}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const { width, height } = Dimensions.get("window");
const styles = StyleSheet.create({
    eventWrapper: {
        flex: 1,
        width: 0.43 * width,
        height: 0.33 * height,
        marginVertical: 15,
        marginHorizontal: 10,
        padding: 10,
        borderRadius: 5,
        backgroundColor: "#EEEEEE",
    },
    headerContainer: {
        flex: 0.65,
    },
    eventDateContainer: {
        flex: 0.35,
    },
    image: {
        borderRadius: 5,
        height: 0.1 * height,
        width: 0.38 * width,
    },
    eventName: {
        fontFamily: "Montserrat-Bold",
        fontSize: 13,
        paddingTop: 10,
    },
    eventDate: {
        fontFamily: "Montserrat-Regular",
        fontSize: 10,

        color: "#FF6D03",
    },

    elevation: {
        elevation: 5,
        shadowColor: "black",
    },
});
