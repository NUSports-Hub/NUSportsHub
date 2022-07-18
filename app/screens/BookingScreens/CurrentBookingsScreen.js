import { useEffect, useState } from "react";
import { supabase } from "../../../supabase";
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    TextInput,
    FlatList,
    Dimensions,
    TouchableOpacity,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MainUserBooking from "../../components/mainBooking";
import { useFocusEffect } from "@react-navigation/native";
import * as React from "react";
import { Overlay } from "@rneui/themed";
const { width, height } = Dimensions.get("window");
export default CurrentBookingsScreen = () => {
    const [loading, setLoading] = useState(false);
    const [userBookings, setUserBookings] = useState([]);
    const [visible, setVisible] = useState(false);
    const toggleOverlay = () => {
        setVisible(!visible);
    };
    useFocusEffect(
        React.useCallback(() => {
            getBookings();
            console.log("Getting bookings...");
        }, [])
    );
    const emptyComponent = () => {
        return (
            <View style={styles.emptyComponent}>
                <Text style={styles.emptyComponentText}>
                    You have no upcoming bookings.
                </Text>
            </View>
        );
    };
    const bookingDivider = () => {
        return (
            <View
                style={{
                    alignSelf: "center",
                    height: 1,
                    width: "100%",
                    backgroundColor: "black",
                }}
            />
        );
    };
    const renderBooking = ({ item }) => {
        const eventStart = new Date(item.start_time);
        const eventEnd = new Date(item.end_time);
        const deleteEvent = async () => {
            console.log("deleting event");
            const { data, error } = await supabase
                .from("bookings")
                .delete()
                .eq("title", item.title)
                .eq("start_time", item.start_time)
                .eq("end_time", item.end_time);

            console.log(data);
            getBookings();
        };
        if (item.type == "non-reboks") {
            return (
                <View>
                    <TouchableOpacity onPress={toggleOverlay}>
                        <MainUserBooking
                            date={eventStart.toLocaleDateString()}
                            title={item.title}
                            descriptionTime={
                                eventStart.toLocaleTimeString() +
                                " " +
                                eventEnd.toLocaleTimeString()
                            }
                            descriptionLocation={item.location}
                            start_time={item.start_time}
                            end_time={item.end_time}
                        />
                    </TouchableOpacity>
                    <Overlay
                        isVisible={visible}
                        onBackdropPress={toggleOverlay}
                    >
                        <View style={styles.container}>
                            <Text style={styles.eventHeaderText}>
                                {item.title}
                            </Text>
                            <View style={styles.eventMainDetailsContainer}>
                                <View style={styles.eventDetailsWrapper}>
                                    <MaterialCommunityIcons
                                        name="calendar"
                                        color={"#0C3370"}
                                        size={20}
                                    />
                                    <Text style={styles.eventDetailsText}>
                                        {item.start_time}
                                    </Text>
                                </View>
                                <View style={styles.eventDetailsWrapper}>
                                    <MaterialCommunityIcons
                                        name="clock"
                                        color={"#0C3370"}
                                        size={20}
                                    />
                                    <Text style={styles.eventDetailsText}>
                                        {eventStart.toLocaleTimeString() +
                                            " - " +
                                            eventEnd.toLocaleTimeString()}
                                    </Text>
                                </View>
                                <View style={styles.eventDetailsWrapper}>
                                    <MaterialCommunityIcons
                                        name="map-marker"
                                        color={"#0C3370"}
                                        size={20}
                                    />
                                    <Text style={styles.eventDetailsText}>
                                        {item.location}
                                    </Text>
                                </View>
                            </View>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={() => {
                                    console.log("deleting event");
                                    deleteEvent();
                                    toggleOverlay();
                                }}
                            >
                                <Text style={styles.buttonText}>
                                    Delete event from calendar
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </Overlay>
                </View>
            );
        } else {
            return (
                <View>
                    <TouchableOpacity onPress={toggleOverlay}>
                        <MainUserBooking
                            start_time={item.date}
                            title={item.title}
                            descriptionTime={item.start_time}
                        />
                    </TouchableOpacity>
                    <Overlay
                        isVisible={visible}
                        onBackdropPress={toggleOverlay}
                    >
                        <View style={styles.container}>
                            <Text style={styles.eventHeaderText}>
                                {item.title}
                            </Text>
                            <View style={styles.eventMainDetailsContainer}>
                                <View style={styles.eventDetailsWrapper}>
                                    <MaterialCommunityIcons
                                        name="calendar"
                                        color={"#0C3370"}
                                        size={20}
                                    />
                                    <Text style={styles.eventDetailsText}>
                                        {item.date}
                                    </Text>
                                </View>
                                <View style={styles.eventDetailsWrapper}>
                                    <MaterialCommunityIcons
                                        name="clock"
                                        color={"#0C3370"}
                                        size={20}
                                    />
                                    <Text style={styles.eventDetailsText}>
                                        {item.start_time}
                                    </Text>
                                </View>
                                <View style={styles.eventDetailsWrapper}>
                                    <MaterialCommunityIcons
                                        name="map-marker"
                                        color={"#0C3370"}
                                        size={20}
                                    />
                                    <Text style={styles.eventDetailsText}>
                                        {item.location == null
                                            ? "Not available"
                                            : item.location}
                                    </Text>
                                </View>
                            </View>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={() => {
                                    console.log("deleting event");
                                    deleteEvent();
                                    toggleOverlay();
                                }}
                            >
                                <Text style={styles.buttonText}>
                                    Delete event from calendar
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </Overlay>
                </View>
            );
        }
    };

    async function getBookings() {
        try {
            setLoading(true);
            const user = supabase.auth.user();
            console.log(user.id);
            let { data, error, status } = await supabase
                .from("bookings")
                .select(`title,start_time,end_time,date,location,type`)
                .eq("user_id", user.id);

            if (data) {
                console.log(data);
                console.log("Getting Data");
                setUserBookings(data);
            } else {
                console.log("hello");
            }
            if (error && status !== 406) {
                throw error;
            }
        } catch (error) {
            alert(error.message);
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        console.log("Getting Data");
        getBookings();
    }, []);
    return (
        <View>
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchBar}
                    placeholder="Search Bookings"
                    placeholderTextColor={"black"}
                />
                <TouchableOpacity
                    onPress={() => {
                        console.log(userBookings);
                    }}
                >
                    <MaterialCommunityIcons
                        name="magnify"
                        color={"#FF6D03"}
                        size={25}
                    />
                </TouchableOpacity>
            </View>
            <View style={styles.topNavigationBar}>
                <Text style={styles.topNavigationBarText}>Upcoming</Text>
            </View>
            <View style={styles.topHeader}>
                <Text style={styles.topHeaderText}>Date / Time</Text>
                <Text style={styles.topHeaderText}>Title</Text>
            </View>
            <View style={styles.bookingContainer}>
                <FlatList
                    data={userBookings}
                    renderItem={renderBooking}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={emptyComponent}
                    ItemSeparatorComponent={bookingDivider}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    searchContainer: {
        flexDirection: "row",
        padding: 15,
        justifyContent: "space-around",
    },
    searchBar: {
        width: "80%",
        backgroundColor: "#D9D9D9",
        borderRadius: 15,
        textAlign: "center",
        fontFamily: "Montserrat-SemiBold",
    },
    topHeader: {
        marginTop: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 30,
    },
    topHeaderText: {
        fontFamily: "Montserrat-SemiBold",
    },
    topNavigationBar: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginHorizontal: 15,
        alignItems: "center",
    },
    topNavigationBarText: {
        fontFamily: "Montserrat-Bold",
        fontSize: 20,
        paddingHorizontal: 10,
    },
    bookingContainer: {
        alignSelf: "center",
        borderRadius: 10,
        height: 0.65 * height,
        width: 0.9 * width,
        marginTop: 20,
        backgroundColor: "#c3c4c7",
    },
    emptyComponent: {
        paddingTop: 0.3 * height,
        alignItems: "center",
        justifyContent: "center",
    },
    emptyComponentText: {
        fontFamily: "Montserrat-Medium",
        color: "black",
    },
    container: {
        alignItems: "center",
        padding: 20,
        width: 0.8 * width,
        height: 0.4 * height,
    },
    eventHeaderText: {
        fontFamily: "Montserrat-Bold",
        fontSize: 20,
        marginBottom: 15,
    },
    eventMainDetailsContainer: {
        width: "90%",
        backgroundColor: "#E2DFDF",
        borderRadius: 5,
        padding: 10,
    },
    eventDetailsWrapper: {
        flexDirection: "row",
        padding: 5,
    },
    eventDetailsText: {
        fontFamily: "Montserrat-SemiBold",
        paddingLeft: 5,
    },
    buttonText: {
        fontFamily: "Montserrat-SemiBold",
        color: "white",
    },
    button: {
        borderRadius: 5,
        padding: 15,
        marginVertical: 20,
        backgroundColor: "#0C3370",
    },
});
