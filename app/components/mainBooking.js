import { useState } from "react";
import { Text, StyleSheet, View, Dimensions, ScrollView } from "react-native";
import { TouchableOpacity } from "react-native";
import { Overlay } from "@rneui/themed";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { supabase } from "../../supabase";

export default MainUserBooking = (props) => {
    return (
        <View>
            <View style={styles.bookingContainer}>
                <View style={styles.bookingDateTimeWrapper}>
                    <Text style={styles.bookingText}>
                        {props.start_time.slice(0, 15)}
                    </Text>
                    <Text style={[styles.bookingText, { color: "#6b6b6b" }]}>
                        {props.descriptionTime}
                    </Text>
                </View>
                <View style={styles.bookingTitle}>
                    <Text style={styles.bookingText}>{props.title}</Text>
                </View>
            </View>
        </View>
    );
};

const { height, width } = Dimensions.get("window");

const styles = StyleSheet.create({
    bookingContainer: {
        flexDirection: "row",
        padding: 5,
        alignItems: "center",
        justifyContent: "center",
        height: 0.11 * height,
    },
    bookingDateTimeWrapper: {
        flex: 0.4,
        alignItems: "center",

        paddingHorizontal: 10,
    },
    bookingTitle: {
        paddingHorizontal: 10,
        flex: 0.6,
        alignItems: "center",
    },
    bookingText: {
        fontFamily: "Montserrat-SemiBold",
        fontSize: 13,
    },
});
