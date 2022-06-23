import { useState } from "react";
import { Text, StyleSheet, View, Dimensions } from "react-native";

export default MainUserBooking = (props) => {
    return (
        <View style={styles.bookingContainer}>
            <View style={styles.bookingDateTimeWrapper}>
                <Text style={styles.bookingText}>{props.date}</Text>
                <Text style={[styles.bookingText, { color: "#6b6b6b" }]}>
                    {props.descriptionTime}
                </Text>
            </View>
            <View style={styles.bookingTitle}>
                <Text style={styles.bookingText}>{props.title}</Text>
            </View>
            <View style={styles.bookingLocation}>
                <Text style={styles.bookingText}>
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
        justifyContent: "center",
        height: 0.11 * height,
    },
    bookingDateTimeWrapper: {
        flex: 0.33,
        alignItems: "center",
    },
    bookingTitle: {
        flex: 0.33,
        alignItems: "center",
    },
    bookingLocation: {
        flex: 0.33,
        alignItems: "center",
    },
    bookingText: {
        fontFamily: "Montserrat-SemiBold",
    },
});
