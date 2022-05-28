import { useState } from "react";
import { Text, StyleSheet, View, Dimensions, Image } from "react-native";
import placeholderImage from "../../assets/placeholderImage.jpg";
export default UserEvent = (props) => {
    return (
        <View style={[styles.eventWrapper, styles.elevation]}>
            <Image source={placeholderImage} style={styles.image} />
            <Text style={styles.eventName}>{props.name}</Text>
            <Text style={styles.eventDate}>{props.date}</Text>
        </View>
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
    },
    elevation: {
        elevation: 5,
        shadowColor: "black",
    },
});
