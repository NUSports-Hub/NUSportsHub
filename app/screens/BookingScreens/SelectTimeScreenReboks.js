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
import { val } from "cheerio/lib/api/attributes";
const { width, height } = Dimensions.get("window");
export default SelectTimeScreen = (props) => {
    const navigation = useNavigation();
    const accessToken = props.route.params.accessToken;
    const user = supabase.auth.user();
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
    const addToFavourites = async () => {
        var favouriteExists = false;
        let { data: favourites, error } = await supabase
            .from("favourites")
            .select(`iconName`)
            .eq("user_id", user.id);
        if (favourites) {
            favourites.forEach((favourite) => {
                if (favourite.iconName == props.route.params.iconName) {
                    console.log("Already exist");
                    favouriteExists = true;
                }
            });
            if (favouriteExists == false) {
                console.log("Adding favourite");
                const { data } = await supabase.from("favourites").insert([
                    {
                        favourite_id: String(uuidv4()),
                        user_id: user.id,
                        iconName: props.route.params.iconName,
                        favouriteName: props.route.params.activityName,
                    },
                ]);
                Alert.alert("Added activity to your favourites.");
            } else {
                Alert.alert("Activity is already in your favourites.");
            }
        }
    };
    const fetchBookingTimings = async (date) => {
        const startTime = date.getTime();
        const endTime = startTime + 86400000;
        console.log("accessToken:" + accessToken);
        var myHeaders = new Headers();
        myHeaders.append(
            "Accept",
            "application/json, text/javascript, */*; q=0.01"
        );
        myHeaders.append("Accept-Language", "en-GB,en;q=0.9");
        myHeaders.append("Connection", "keep-alive");
        myHeaders.append("Cookie", "nuspw=" + accessToken);
        myHeaders.append("Sec-Fetch-Dest", "empty");
        myHeaders.append("Sec-Fetch-Mode", "cors");
        myHeaders.append("Sec-Fetch-Site", "same-origin");
        myHeaders.append(
            "User-Agent",
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36"
        );
        myHeaders.append("X-Requested-With", "XMLHttpRequest");
        myHeaders.append(
            "sec-ch-ua",
            '".Not/A)Brand";v="99", "Google Chrome";v="103", "Chromium";v="103"'
        );
        myHeaders.append("sec-ch-ua-mobile", "?0");
        myHeaders.append("sec-ch-ua-platform", '"Windows"');

        var requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow",
        };

        // fetch(
        //     "https://reboks.nus.edu.sg/nus_public_web/public//facilities/ajax/getTimeslots?activity_id=57&venue_id=13&date=2022-07-19&time_from=1658073600",
        //     requestOptions
        // )
        //     .then((response) => response.text())
        //     .then((result) => {
        //         var list = [];
        //         const data = JSON.parse(result);
        //         const $ = cheerio.load(data);
        //         var bookingSlots = $('div[class="row timeslot-grid"]')
        //             .find("div")
        //             .each(function (index, element) {
        //                 // console.log($(element));
        //                 console.log(index);
        //                 var bookingData = $(element);
        //                 var value = bookingData
        //                     .children()
        //                     .attr("value")
        //                     .split(";");
        //                 var bookingUnit = value[0];
        //                 var slotAvailability = bookingData
        //                     .children()
        //                     .attr("disabled");
        //                 var startTime = value[3];
        //                 var endTime = value[4];
        //             });
        //     })
        //     .catch((error) => console.log("error", error));
        setBookingData(bookingTemplate);
        setDoneLoading(true);
        console.log("set");
        // await fetch(fetchURL, requestOptions)
        //     .then((response) => {
        //         return response.json();
        //     })
        //     .then((result) => {
        //         if (result.code == "token_not_valid") {
        //             alert(
        //                 "Your session has timed out. Please login to Treeckle again!"
        //             );
        //             navigation.navigate("TreeckleVerificationScreen");
        //         }
        //         if (result.length !== 0) {
        //             result.forEach((booking) => {
        //                 const title = booking.title;
        //                 const bookingStartTimeEpoch = booking.startDateTime;
        //                 const bookingEndTimeEpoch = booking.endDateTime;
        //                 const bookerName = booking.booker.name;

        //                 var bookingStartTime = new Date(0);
        //                 bookingStartTime.setUTCMilliseconds(
        //                     bookingStartTimeEpoch
        //                 );
        //                 var bookingEndTime = new Date(0);
        //                 bookingEndTime.setUTCMilliseconds(bookingEndTimeEpoch);
        //                 const bookingTimeLocalStart =
        //                     String(bookingStartTime.getHours()) +
        //                     String(bookingStartTime.getMinutes()).padStart(
        //                         2,
        //                         "0"
        //                     );
        //                 const bookingTimeLocalEnd =
        //                     String(bookingEndTime.getHours()) +
        //                     String(bookingEndTime.getMinutes()).padStart(
        //                         2,
        //                         "0"
        //                     );
        //                 console.log(bookingTimeLocalStart);
        //                 const testArray = [...bookingTemplate];
        //                 bookingTemplate.forEach((item, index) => {
        //                     // if (item.time == bookingTimeLocalStart) {
        //                     //     console.log("timing matched");
        //                     //     console.log(title);
        //                     //     testArray[index].title = title;
        //                     // }
        //                     if (
        //                         item.time >= parseInt(bookingTimeLocalStart) &&
        //                         item.time <= parseInt(bookingTimeLocalEnd)
        //                     ) {
        //                         testArray[index].title = title;
        //                     }
        //                     setBookingData(testArray);
        //                 });
        //                 setDoneLoading(true);
        //             });
        //         } else {
        //             setBookingData(bookingTemplate);
        //             setDoneLoading(true);
        //         }
        //     })
        //     .catch((error) => console.log("error", error));
    };

    useEffect(() => {
        setDoneLoading(false);
        setSelectedTiming([]);
        date.setHours(0, 0, 0, 0);
        console.log("Getting data from Treeckle for " + date);
        const fetch = async () => {
            fetchBookingTimings(date);
        };
        fetch();
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
    const renderBooking = ({ item }) => {
        return (
            <BookingTiming
                disabled={item.disabled == true ? true : false}
                onPress={() => {
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
                // title={item.title}
                // bookerName={item.bookerName}
                // bookerEmail={item.bookerEmail}
            />
        );
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
                <TouchableOpacity
                    style={styles.addFavouriteButton}
                    onPress={() => {
                        addToFavourites();
                    }}
                >
                    <Text style={styles.addFavouriteButtonText}>
                        Add to favourites
                    </Text>
                </TouchableOpacity>
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
                        ItemSeparatorComponent={bookingDivider}
                        data={bookingData}
                        renderItem={renderBooking}
                        showsVerticalScrollIndicator={false}
                    />
                ) : (
                    <Text style={styles.loadingText}>Getting data...</Text>
                )}
            </View>
            <TouchableOpacity
                style={styles.continueButton}
                onPress={() => {
                    navigation.navigate("ConfirmBookingScreen", {
                        iconName: props.route.params.iconName,
                        activityName: props.route.params.activityName,
                        date: date.toDateString(),
                        timeslots: selectedTiming,
                    });
                }}
            >
                <Text style={styles.continueButtonText}>Continue</Text>
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
        height: 0.375 * height,
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
