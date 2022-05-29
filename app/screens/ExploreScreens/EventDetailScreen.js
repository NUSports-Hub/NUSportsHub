import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    Image,
    Dimensions,
    ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import placeholderImage from "../../../assets/placeholderImage.jpg";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
export default EventDetailScreen = () => {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.eventHeaderText}>
                TeamNUS Table Tennis Trials 2022
            </Text>
            <Image source={placeholderImage} style={styles.image}></Image>
            <View style={styles.eventMainDetailsContainer}>
                <View style={styles.eventDetailsWrapper}>
                    <MaterialCommunityIcons
                        name="calendar"
                        color={"#0C3370"}
                        size={20}
                    />
                    <Text style={styles.eventDetailsText}>10 August 2022</Text>
                </View>
                <View style={styles.eventDetailsWrapper}>
                    <MaterialCommunityIcons
                        name="clock"
                        color={"#0C3370"}
                        size={20}
                    />
                    <Text style={styles.eventDetailsText}>10 August 2022</Text>
                </View>
                <View style={styles.eventDetailsWrapper}>
                    <MaterialCommunityIcons
                        name="map-marker"
                        color={"#0C3370"}
                        size={20}
                    />
                    <Text style={styles.eventDetailsText}>10 August 2022</Text>
                </View>
                <View style={styles.eventDetailsWrapper}>
                    <MaterialCommunityIcons
                        name="account"
                        color={"#0C3370"}
                        size={20}
                    />
                    <Text style={styles.eventDetailsText}>10 August 2022</Text>
                </View>
            </View>
            <View style={styles.eventSecondaryDetailsContainer}>
                <Text
                    style={[
                        styles.eventHeaderText,
                        { paddingBottom: 5, paddingLeft: 5 },
                    ]}
                >
                    Event Details:
                </Text>
                <Text style={styles.eventDetailsText}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Aenean rhoncus justo vel ullamcorper tincidunt. Morbi
                    molestie velit non arcu tempor iaculis. Aenean faucibus
                    neque sed arcu bibendum imperdiet. Orci varius natoque
                    penatibus et magnis dis parturient montes, nascetur
                    ridiculus mus. Fusce vel mollis nulla. Pellentesque faucibus
                    lectus at mi euismod, ut consectetur massa dapibus. Aliquam
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </Text>
            </View>
            <View style={styles.bottomContainer}>
                <TouchableOpacity
                    style={[styles.button, { backgroundColor: "#FF6D03" }]}
                >
                    <Text style={styles.buttonText}>Register Now</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.button, { backgroundColor: "#0C3370" }]}
                >
                    <Text style={[styles.buttonText, { color: "white" }]}>
                        Add to calendar
                    </Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};
const { height } = Dimensions.get("window");
const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        padding: 10,
    },
    eventHeaderText: {
        fontFamily: "Montserrat-Bold",
        fontSize: 20,
    },
    image: {
        marginVertical: 10,
        width: "90%",
        height: 0.25 * height,
        borderRadius: 10,
    },
    eventMainDetailsContainer: {
        width: "90%",
        backgroundColor: "#E2DFDF",
        borderRadius: 5,
        padding: 10,
    },
    eventDetailsWrapper: {
        flexDirection: "row",
        padding: 3,
    },
    eventDetailsText: {
        fontFamily: "Montserrat-SemiBold",
        paddingLeft: 5,
    },
    eventSecondaryDetailsContainer: {
        width: "90%",
        marginVertical: 10,
        backgroundColor: "#E2DFDF",
        padding: 10,
    },
    bottomContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "85%",
    },
    buttonText: {
        fontFamily: "Montserrat-SemiBold",
    },
    button: {
        borderRadius: 5,
        padding: 15,
    },
});
