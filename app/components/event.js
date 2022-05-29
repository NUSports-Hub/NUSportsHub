import { Text, StyleSheet, View, Dimensions, Image } from "react-native";
import placeholderImage from "../../assets/placeholderImage.jpg";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
export default UserEvent = (props) => {
    const navigation = useNavigation();
    return (
        <TouchableOpacity
            onPress={() => navigation.navigate("EventDetailScreen")}
        >
            <View style={[styles.eventWrapper, styles.elevation]}>
                <Image source={placeholderImage} style={styles.image} />
                <Text style={styles.eventName}>{props.name}</Text>
                <Text style={styles.eventDate}>{props.date}</Text>
            </View>
        </TouchableOpacity>
    );
};

const { width, height } = Dimensions.get("window");
const styles = StyleSheet.create({
    eventWrapper: {
        width: 0.43 * width,
        height: 0.33 * height,
        marginVertical: 15,
        marginHorizontal: 10,
        padding: 15,
        borderRadius: 5,
        backgroundColor: "#EEEEEE",
    },
    image: {
        height: 50,
        width: 0.3 * width,
    },
    eventName: {
        fontFamily: "Montserrat-Bold",
        fontSize: 15,
        paddingTop: 10,
    },
    eventDate: {
        fontFamily: "Montserrat-Regular",
        paddingTop: 10,
        color: "#FF6D03",
    },
    elevation: {
        elevation: 5,
        shadowColor: "black",
    },
});
