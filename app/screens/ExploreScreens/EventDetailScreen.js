import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    Image,
    Dimensions,
    ScrollView,
} from "react-native";
import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import placeholderImage from "../../../assets/placeholderImage.jpg";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import RenderHtml from "react-native-render-html";
import { supabase } from "../../../supabase";
import { v4 as uuidv4 } from "uuid";
import "react-native-get-random-values";
import * as Animatable from "react-native-animatable";

export default EventDetailScreen = (props) => {
    const [message, setMessage] = useState("");
    const user = supabase.auth.user();
    const addEvent = async (eventDetail) => {
        console.log("adding event");
        console.log(eventDetail);
        const { data, error } = await supabase.from("bookings").insert([
            {
                booking_id: String(uuidv4()),
                user_id: user.id,
                title: eventDetail.name,
                start_time: eventDetail.startsOnNotFormatted,
                end_time: eventDetail.endsOnNotFormatted,
                location: eventDetail.location,
            },
        ]);

        // console.log(data);
    };
    const eventDetail = props.route.params;
    const eventStartDate = new Date(eventDetail.startsOnNotFormatted);
    const eventEndDate = new Date(eventDetail.endsOnNotFormatted);
    const source = {
        html: eventDetail.description,
    };
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.eventHeaderText}>{eventDetail.name}</Text>
            <Image
                source={{
                    uri:
                        "https://se-images.campuslabs.com/clink/images/" +
                        eventDetail.imageUrl +
                        "?preset=med-w",
                }}
                style={styles.image}
            ></Image>
            <View style={styles.eventMainDetailsContainer}>
                <View style={styles.eventDetailsWrapper}>
                    <MaterialCommunityIcons
                        name="calendar"
                        color={"#0C3370"}
                        size={20}
                    />
                    <Text style={styles.eventDetailsText}>
                        {eventStartDate.toDateString()}
                    </Text>
                </View>
                <View style={styles.eventDetailsWrapper}>
                    <MaterialCommunityIcons
                        name="clock"
                        color={"#0C3370"}
                        size={20}
                    />
                    <Text style={styles.eventDetailsText}>
                        {eventStartDate.toLocaleTimeString() +
                            " - " +
                            eventEndDate.toLocaleTimeString()}
                    </Text>
                </View>
                <View style={styles.eventDetailsWrapper}>
                    <MaterialCommunityIcons
                        name="map-marker"
                        color={"#0C3370"}
                        size={20}
                    />
                    <Text style={styles.eventDetailsText}>
                        {eventDetail.location}
                    </Text>
                </View>
                <View style={styles.eventDetailsWrapper}>
                    <MaterialCommunityIcons
                        name="account"
                        color={"#0C3370"}
                        size={20}
                    />
                    <Text style={styles.eventDetailsText}>
                        {eventDetail.organizationName}
                    </Text>
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
                <RenderHtml contentWidth={width} source={source} />
                {/* <Text style={styles.eventDetailsText}>
                    {eventDetail.description}
                </Text> */}
            </View>
            <View>
                {message ? (
                    <Animatable.Text
                        animation="shake"
                        style={styles.messageText}
                    >
                        {message}
                    </Animatable.Text>
                ) : null}
            </View>
            <View style={styles.bottomContainer}>
                {/* <TouchableOpacity
                    style={[styles.button, { backgroundColor: "#FF6D03" }]}
                >
                    <Text style={styles.buttonText}>Register Now</Text>
                </TouchableOpacity> */}

                <TouchableOpacity
                    onPress={() => {
                        addEvent(eventDetail);
                        setMessage("Successfully added to events calendar!");
                    }}
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
const { height, width } = Dimensions.get("window");
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
        justifyContent: "center",
        width: "85%",
    },
    buttonText: {
        fontFamily: "Montserrat-SemiBold",
    },
    button: {
        borderRadius: 5,
        padding: 15,
        marginVertical: 20,
    },
    messageText: {
        fontFamily: "Montserrat-SemiBold",
        color: "green",
        marginTop: 10,
        paddingHorizontal: 40,
    },
});
