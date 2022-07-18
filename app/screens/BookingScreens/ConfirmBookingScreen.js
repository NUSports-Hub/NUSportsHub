import {
    Text,
    StyleSheet,
    View,
    Button,
    Dimensions,
    FlatList,
    Alert,
} from "react-native";
import { supabase } from "../../../supabase";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { TouchableOpacity } from "react-native";
import BookingTiming from "../../components/bookingTiming";
import { v4 as uuidv4 } from "uuid";
import "react-native-get-random-values";
import * as cheerio from "cheerio";
import { prop, val } from "cheerio/lib/api/attributes";
const { width, height } = Dimensions.get("window");
export default ConfirmBookingScreen = (props) => {
    const user = supabase.auth.user();
    const addBooking = async (time, activity, date) => {
        console.log("Adding event");
        console.log(time);
        console.log(activity);
        console.log(date);
        const { data, error } = await supabase.from("bookings").insert([
            {
                booking_id: String(uuidv4()),
                user_id: user.id,
                title: activity,
                date: String(date),
                start_time: time,
                type: "reboks",
            },
        ]);
    };
    const navigation = useNavigation();
    const bookingTemplate = [
        {
            time: "09:00",
            disabled: false,
        },
        {
            time: "10:00",
            disabled: false,
        },
        {
            time: "11:00",
            disabled: false,
        },
        {
            time: "12:00",
            disabled: false,
        },
        {
            time: "13:00",
            disabled: false,
        },
        {
            time: "14:00",
            disabled: false,
        },
        {
            time: "15:00",
            disabled: false,
        },
        {
            time: "16:00",
            disabled: false,
        },
        {
            time: "17:00",
            disabled: false,
        },
        {
            time: "18:00",
            disabled: false,
        },
        {
            time: "19:00",
            disabled: false,
        },
        {
            time: "20:00",
            disabled: false,
        },
    ];
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState("date");
    const [show, setShow] = useState(false);
    const [bookingData, setBookingData] = useState([]);
    const [selectedTiming, setSelectedTiming] = useState([]);
    const [doneLoading, setDoneLoading] = useState(false);

    useEffect(() => {
        setDoneLoading(false);
        setSelectedTiming([]);
        console.log(String(props.route.params.timeslots));
    }, []);

    const bookingDivider = () => {
        return (
            <View
                style={{
                    alignSelf: "center",
                    height: 1,
                    width: "100%",
                    backgroundColor: "#607D8B",
                }}
            />
        );
    };

    const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];
    const onChange = (event, selectedDate) => {
        console.log(event);
        console.log("selected date: " + selectedDate);
        const currentDate = selectedDate;
        setShow(false);
        setDate(currentDate);
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode("date");
    };

    return (
        <View>
            <View>
                <TouchableOpacity
                    onPress={() => {
                        console.log(selectedTiming);
                    }}
                >
                    <Text style={styles.headerText}>Activity Selected:</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.activityBox}>
                <ActivityBox
                    iconName={props.route.params.iconName}
                    activityName={props.route.params.activityName}
                />
            </View>
            <View>
                <Text style={styles.headerText}>Date Selected:</Text>
            </View>
            <View style={styles.selectedDateContainer}>
                <Text style={styles.selectedDateText}>
                    {String(props.route.params.date)}
                </Text>
            </View>
            <View>
                <Text style={styles.headerText}>Selected Timeslots:</Text>
            </View>
            <View style={styles.selectedTimeslotsContainer}>
                <Text style={styles.selectedTimeslotsText}>
                    {String(props.route.params.timeslots)}
                </Text>
            </View>
            <TouchableOpacity
                style={styles.continueButton}
                onPress={() => {
                    addBooking(
                        props.route.params.timeslots,
                        props.route.params.activityName,
                        props.route.params.date
                    );
                    alert("Booking has been added to your calendar.");
                    navigation.navigate("CurrentBookingsScreen");
                }}
            >
                <Text style={styles.continueButtonText}>Confirm Booking</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    headerText: {
        fontFamily: "Montserrat-ExtraBold",
        fontSize: 20,
        marginLeft: 15,
        marginVertical: 10,
    },
    activityBox: {
        marginLeft: 15,
        flexDirection: "row",
    },

    materialIcon: {
        marginLeft: 15,
    },
    editDateTouchable: {
        flexDirection: "row",
        backgroundColor: "#D9D9D9",
        borderRadius: 5,
        width: 0.9 * width,
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
    },
    dateText: {
        paddingHorizontal: 10,
        fontFamily: "Montserrat-Bold",
        fontSize: 18,
        color: "#0C3370",
        textAlign: "center",
    },
    selectedDateContainer: {
        marginVertical: 10,
        alignItems: "center",
        alignSelf: "center",
        width: 0.9 * width,
        backgroundColor: "#D9D9D9",
        borderRadius: 5,
        fontFamily: "Montserrat-SemiBold",
        fontSize: 18,
    },
    selectedDateText: {
        padding: 20,
        backgroundColor: "#D9D9D9",
        borderRadius: 5,
        fontFamily: "Montserrat-SemiBold",
        fontSize: 18,
    },
    selectedTimeslotsText: {
        padding: 20,
        borderRadius: 5,
        fontFamily: "Montserrat-SemiBold",
        fontSize: 18,
    },
    selectedTimeslotsContainer: {
        marginVertical: 10,
        alignItems: "center",
        alignSelf: "center",
        width: 0.9 * width,
        backgroundColor: "#D9D9D9",
        borderRadius: 5,
        fontFamily: "Montserrat-SemiBold",
        fontSize: 18,
    },
    loadingText: {
        fontFamily: "Montserrat-Bold",
        fontSize: 15,
        alignSelf: "center",
        marginTop: 0.2 * height,
    },
    continueButton: {
        alignItems: "center",
        alignSelf: "center",
        marginTop: 10,
        padding: 10,
        borderRadius: 10,
        backgroundColor: "#0C3370",
        width: 0.9 * width,
    },
    continueButtonText: {
        fontFamily: "Montserrat-Bold",
        color: "white",
    },
    addFavouriteButton: {
        backgroundColor: "#FF6D03",
        alignItems: "center",
        alignSelf: "center",
        justifyContent: "center",
        padding: 15,
        marginTop: 10,
        borderRadius: 10,
        width: 0.9 * width,
    },
    addFavouriteButtonText: {
        fontFamily: "Montserrat-Bold",
        color: "white",
        fontSize: 12,
    },
});
