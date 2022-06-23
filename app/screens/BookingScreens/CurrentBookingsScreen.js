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
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MainUserBooking from "../../components/mainBooking";
const { width, height } = Dimensions.get("window");
export default CurrentBookingsScreen = () => {
    const [loading, setLoading] = useState(false);
    const [userBookings, setUserBookings] = useState([]);
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
        return (
            <MainUserBooking
                date={item.date}
                dateMonth={item.date.substr(5, 2)}
                title={item.title}
                descriptionTime={
                    item.start_time.substr(0, 5) +
                    " " +
                    item.end_time.substr(0, 5)
                }
                descriptionLocation={item.location}
            />
        );
    };
    async function getBookings() {
        try {
            setLoading(true);
            const user = supabase.auth.user();
            console.log(user.id);
            let { data, error, status } = await supabase
                .from("bookings")
                .select(`title,start_time,end_time,date,location`)
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
                <Text style={styles.topHeaderText}>Location</Text>
            </View>
            <View style={styles.bookingContainer}>
                <FlatList
                    data={userBookings}
                    renderItem={renderBooking}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={emptyComponent}
                    ItemSeparatorComponent={bookingDivider}
                    ListFooterComponent={bookingDivider}
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
});
