import { useState } from "react";
import { Text, StyleSheet, View, Dimensions } from "react-native";

export default UserEvent = (props) => {
    return (
        <View style={styles.eventContainer}>
            <View style={styles.eventDateWrapper}>
                <Text style={styles.eventDateDay}>{props.dateDay}</Text>
                <Text style={styles.eventDateMonth}>{props.dateMonth}</Text>
            </View>
            <View style={styles.eventDetailsWrapper}>
                <Text style={styles.eventTitle}>{props.title}</Text>
                <Text style={styles.eventDescription}>
                    {props.descriptionTime}
                </Text>
                <Text style={styles.eventDescription}>
                    {props.descriptionLocation}
                </Text>
            </View>
        </View>
    );
};

const { height } = Dimensions.get("window");

const styles = StyleSheet.create({
    eventContainer: {
        flexDirection: "row",
        padding: 5,
        alignItems: "center",
        height: 0.11 * height,
    },
    eventDateWrapper: {
        justifyContent: "center",
        alignItems: "center",
        margin: 10,
    },
    eventDetailsWrapper: {
        margin: 5,
    },
    eventDateDay: {
        fontFamily: "Montserrat-Bold",
        fontSize: 20,
        color: "white",
    },
    eventDateMonth: {
        fontFamily: "Montserrat-Bold",
        fontSize: 15,
        color: "white",
    },
    eventTitle: {
        fontFamily: "Montserrat-SemiBold",
        fontSize: 18,
        color: "white",
    },
    eventDescription: {
        fontFamily: "Montserrat-Medium",
        fontSize: 12,
        color: "#BBBBBB",
    },
});
