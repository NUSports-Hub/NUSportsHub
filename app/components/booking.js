import { useState } from "react";
import { Text, StyleSheet, View, Dimensions } from "react-native";

export default UserBooking = (props) => {
    return (
        <View style={styles.bookingContainer}>
            <View style={styles.bookingDateWrapper}>
                <Text style={styles.bookingDateDay}>{props.dateDay}</Text>
                <Text style={styles.bookingDateMonth}>{props.dateMonth}</Text>
            </View>
            <View style={styles.bookingDetailsWrapper}>
                <Text style={styles.bookingTitle}>{props.title}</Text>
                <Text style={styles.bookingDescription}>
                    {props.descriptionTime}
                </Text>
                <Text style={styles.bookingDescription}>
                    {props.descriptionLocation}
                </Text>
            </View>
        </View>
    );
};

const { height } = Dimensions.get("window");

const styles = StyleSheet.create({
    bookingContainer: {
        flexDirection: "row",
        padding: 5,
        alignItems: "center",
        height: 0.11 * height,
    },
    bookingDateWrapper: {
        justifyContent: "center",
        alignItems: "center",
        margin: 10,
    },
    bookingDetailsWrapper: {
        margin: 5,
        justifyContent: "center",
    },
    bookingDateDay: {
        fontFamily: "Montserrat-Bold",
        fontSize: 20,
        color: "white",
    },
    bookingDateMonth: {
        fontFamily: "Montserrat-Bold",
        fontSize: 15,
        color: "white",
    },
    bookingTitle: {
        fontFamily: "Montserrat-SemiBold",
        fontSize: 18,
        color: "white",
    },
    bookingDescription: {
        fontFamily: "Montserrat-Medium",
        fontSize: 12,
        color: "#BBBBBB",
    },
});
