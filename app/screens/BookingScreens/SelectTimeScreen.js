import {
    Text,
    StyleSheet,
    View,
    Button,
    Dimensions,
    FlatList,
} from "react-native";
import { useEffect, useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { TouchableOpacity } from "react-native";
import BookingTiming from "../../components/bookingTiming";
import {
    FetchLoginTreeckle,
    accessToken,
} from "../../components/fetchLoginTreeckle";
const { width, height } = Dimensions.get("window");
FetchLoginTreeckle();
export default SelectTimeScreen = (props) => {
    const bookingTemplate = [
        // {
        //     time: "0000",
        //     title: "",
        //     bookerName: "",
        //     bookerEmail: "",
        // },
        // {
        //     time: "0030",
        //     title: "",
        //     bookerName: "",
        //     bookerEmail: "",
        // },
        // {
        //     time: "0100",
        //     title: "",
        //     bookerName: "",
        //     bookerEmail: "",
        // },
        // {
        //     time: "0130",
        //     title: "",
        //     bookerName: "",
        //     bookerEmail: "",
        // },
        // {
        //     time: "0200",
        //     title: "",
        //     bookerName: "",
        //     bookerEmail: "",
        // },
        // {
        //     time: "0230",
        //     title: "",
        //     bookerName: "",
        //     bookerEmail: "",
        // },
        // {
        //     time: "0300",
        //     title: "",
        //     bookerName: "",
        //     bookerEmail: "",
        // },
        // {
        //     time: "0330",
        //     title: "",
        //     bookerName: "",
        //     bookerEmail: "",
        // },
        // {
        //     time: "0400",
        //     title: "",
        //     bookerName: "",
        //     bookerEmail: "",
        // },
        // {
        //     time: "0430",
        //     title: "",
        //     bookerName: "",
        //     bookerEmail: "",
        // },
        // {
        //     time: "0500",
        //     title: "",
        //     bookerName: "",
        //     bookerEmail: "",
        // },
        // {
        //     time: "0530",
        //     title: "",
        //     bookerName: "",
        //     bookerEmail: "",
        // },
        // {
        //     time: "0600",
        //     title: "",
        //     bookerName: "",
        //     bookerEmail: "",
        // },
        // {
        //     time: "0630",
        //     title: "",
        //     bookerName: "",
        //     bookerEmail: "",
        // },
        {
            time: "0700",
            title: "",
            bookerName: "",
            bookerEmail: "",
        },
        {
            time: "0730",
            title: "",
            bookerName: "",
            bookerEmail: "",
        },
        {
            time: "0800",
            title: "",
            bookerName: "",
            bookerEmail: "",
        },
        {
            time: "0830",
            title: "",
            bookerName: "",
            bookerEmail: "",
        },
        {
            time: "0900",
            title: "",
            bookerName: "",
            bookerEmail: "",
        },
        {
            time: "0930",
            title: "",
            bookerName: "",
            bookerEmail: "",
        },
        {
            time: "1000",
            title: "",
            bookerName: "",
            bookerEmail: "",
        },
        {
            time: "1030",
            title: "",
            bookerName: "",
            bookerEmail: "",
        },
        {
            time: "1100",
            title: "",
            bookerName: "",
            bookerEmail: "",
        },
        {
            time: "1130",
            title: "",
            bookerName: "",
            bookerEmail: "",
        },
        {
            time: "1200",
            title: "",
            bookerName: "",
            bookerEmail: "",
        },
        {
            time: "1230",
            title: "",
            bookerName: "",
            bookerEmail: "",
        },
        {
            time: "1300",
            title: "",
            bookerName: "",
            bookerEmail: "",
        },
        {
            time: "1330",
            title: "",
            bookerName: "",
            bookerEmail: "",
        },
        {
            time: "1400",
            title: "",
            bookerName: "",
            bookerEmail: "",
        },
        {
            time: "1430",
            title: "",
            bookerName: "",
            bookerEmail: "",
        },
        {
            time: "1500",
            title: "",
            bookerName: "",
            bookerEmail: "",
        },
        {
            time: "1530",
            title: "",
            bookerName: "",
            bookerEmail: "",
        },
        {
            time: "1600",
            title: "",
            bookerName: "",
            bookerEmail: "",
        },
        {
            time: "1630",
            title: "",
            bookerName: "",
            bookerEmail: "",
        },
        {
            time: "1700",
            title: "",
            bookerName: "",
            bookerEmail: "",
        },
        {
            time: "1730",
            title: "",
            bookerName: "",
            bookerEmail: "",
        },
        {
            time: "1800",
            title: "",
            bookerName: "",
            bookerEmail: "",
        },
        {
            time: "1830",
            title: "",
            bookerName: "",
            bookerEmail: "",
        },
        {
            time: "1900",
            title: "",
            bookerName: "",
            bookerEmail: "",
        },
        {
            time: "1930",
            title: "",
            bookerName: "",
            bookerEmail: "",
        },
        {
            time: "2000",
            title: "",
            bookerName: "",
            bookerEmail: "",
        },
        {
            time: "2030",
            title: "",
            bookerName: "",
            bookerEmail: "",
        },
        {
            time: "2100",
            title: "",
            bookerName: "",
            bookerEmail: "",
        },
        {
            time: "2130",
            title: "",
            bookerName: "",
            bookerEmail: "",
        },
        {
            time: "2200",
            title: "",
            bookerName: "",
            bookerEmail: "",
        },
        {
            time: "2230",
            title: "",
            bookerName: "",
            bookerEmail: "",
        },
        {
            time: "2300",
            title: "",
            bookerName: "",
            bookerEmail: "",
        },
        {
            time: "2330",
            title: "",
            bookerName: "",
            bookerEmail: "",
        },
    ];
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState("date");
    const [show, setShow] = useState(false);
    const [bookingData, setBookingData] = useState([]);
    const [selectedTiming, setSelectedTiming] = useState([]);
    const [doneLoading, setDoneLoading] = useState(false);

    const fetchBookingTimings = async (date) => {
        const startTime = date.getTime();
        const endTime = startTime + 86400000;
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + accessToken);

        var requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow",
        };
        const fetchURL =
            "https://treeckle.com/api/bookings/?end_date_time=" +
            endTime +
            "&start_date_time=" +
            startTime +
            "&statuses=APPROVED,PENDING&venue_id=12";

        await fetch(fetchURL, requestOptions)
            .then((response) => {
                return response.json();
            })
            .then((result) => {
                console.log(result);
                if (result.length !== 0) {
                    result.forEach((booking) => {
                        const title = booking.title;
                        const bookingStartTimeEpoch = booking.startDateTime;
                        const bookingEndTimeEpoch = booking.endDateTime;
                        const bookerName = booking.booker.name;

                        var bookingStartTime = new Date(0);
                        bookingStartTime.setUTCMilliseconds(
                            bookingStartTimeEpoch
                        );
                        var bookingEndTime = new Date(0);
                        bookingEndTime.setUTCMilliseconds(bookingEndTimeEpoch);
                        const bookingTimeLocalStart =
                            String(bookingStartTime.getHours()) +
                            String(bookingStartTime.getMinutes()).padStart(
                                2,
                                "0"
                            );
                        const bookingTimeLocalEnd =
                            String(bookingEndTime.getHours()) +
                            String(bookingEndTime.getMinutes()).padStart(
                                2,
                                "0"
                            );
                        console.log(bookingTimeLocalStart);
                        bookingTemplate.forEach((item, index) => {
                            const testArray = [...bookingTemplate];
                            // if (item.time == bookingTimeLocalStart) {
                            //     console.log("timing matched");
                            //     console.log(title);
                            //     testArray[index].title = title;
                            // }
                            if (
                                item.time >= parseInt(bookingTimeLocalStart) &&
                                item.time <= parseInt(bookingTimeLocalEnd)
                            ) {
                                testArray[index].title = title;
                            }
                            setBookingData(testArray);
                        });
                        setDoneLoading(true);
                    });
                } else {
                    setBookingData(bookingTemplate);
                    setDoneLoading(true);
                }
            })
            .catch((error) => console.log("error", error));
    };

    useEffect(() => {
        setDoneLoading(false);
        console.log(doneLoading);
        setSelectedTiming([]);
        date.setHours(0, 0, 0, 0);
        console.log("Getting data from Treeckle for " + date);
        fetchBookingTimings(date);
    }, [date]);

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
        console.log(selectedDate);
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
    const renderBooking = ({ item }) => {
        return (
            <BookingTiming
                disabled={item.title != "" ? true : false}
                onPress={() => {
                    // var userSelectedTimings = ["0700", "0730"];
                    if (selectedTiming.includes(item.time)) {
                        setSelectedTiming(
                            selectedTiming.filter(
                                (object) => object !== item.time
                            )
                        );
                        console.log(selectedTiming);
                    } else {
                        setSelectedTiming((selectedTiming) => [
                            ...selectedTiming,
                            item.time,
                        ]);
                        console.log(selectedTiming);
                    }

                    console.log(selectedTiming);
                }}
                backgroundColor={
                    selectedTiming.includes(item.time) ? "green" : "#D9D9D9"
                }
                time={item.time}
                title={item.title}
                bookerName={item.bookerName}
                bookerEmail={item.bookerEmail}
            />
        );
    };
    return (
        <View>
            <View>
                <TouchableOpacity
                    onPress={() => {
                        console.log(bookingData);
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
                <Text style={styles.headerText}>Select a date:</Text>
            </View>
            <View style={styles.selectedDateContainer}>
                <TouchableOpacity
                    style={styles.editDateTouchable}
                    onPress={() => {
                        showDatepicker();
                    }}
                >
                    <Text style={styles.dateText}>
                        {date.getDate()} {monthNames[date.getMonth()]}{" "}
                        {date.getFullYear()}
                    </Text>
                    <MaterialCommunityIcons
                        name={"calendar-edit"}
                        color={"#0C3370"}
                        size={30}
                    />
                </TouchableOpacity>
            </View>
            <View>
                {show && (
                    <DateTimePicker
                        minimumDate={new Date()}
                        value={date}
                        mode={mode}
                        is24Hour={true}
                        onChange={onChange}
                    />
                )}
            </View>
            <View style={styles.bookingTimingContainer}>
                {doneLoading ? (
                    <FlatList
                        extraData={bookingTemplate}
                        ItemSeparatorComponent={bookingDivider}
                        data={bookingData}
                        renderItem={renderBooking}
                        showsVerticalScrollIndicator={false}
                    />
                ) : (
                    <Text style={styles.loadingText}>Getting data...</Text>
                )}
            </View>
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
    },
    selectedDateContainer: {
        flexDirection: "row",
        justifyContent: "center",
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
    bookingTimingContainer: {
        padding: 10,
        marginTop: 20,
        backgroundColor: "#D9D9D9",
        width: 0.9 * width,
        alignSelf: "center",
        borderRadius: 5,
        height: 0.45 * height,
    },
    loadingText: {
        fontFamily: "Montserrat-Bold",
        fontSize: 15,
        alignSelf: "center",
        marginTop: 0.2 * height,
    },
});
