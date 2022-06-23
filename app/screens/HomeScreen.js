import { useState, useEffect } from "react";
import { supabase } from "../../supabase";
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    ScrollView,
    StatusBar,
    Dimensions,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { TouchableOpacity } from "react-native";
import AddItem from "../components/addItem";
import UserBooking from "../components/booking";
import { FlatList } from "react-native";
import { capacityList } from "../components/fetchCapacity";
import FacilityCapacity from "../components/capacity";
import { FetchCapacityCall } from "../components/fetchCapacity.js";
import UserFavourites from "../components/favourites";
import { useNavigation } from "@react-navigation/native";
const { width, height } = Dimensions.get("window");
const userFavouritesData = [
    {
        iconName: "table-tennis",
        favouriteName: "Table Tennis",
    },
    {
        iconName: "badminton",
        favouriteName: "Badminton",
    },
    {
        iconName: "volleyball",
        favouriteName: "Volleyball",
    },
];
const monthConverter = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
];
export default HomeScreen = () => {
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);
    const [userBookings, setUserBookings] = useState([]);
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
    const renderBooking = ({ item }) => (
        <UserBooking
            dateDay={item.date.substr(8, 2)}
            dateMonth={monthConverter[parseInt(item.date.substr(5, 2)) - 1]}
            title={item.title}
            descriptionTime={
                item.start_time.substr(0, 8) +
                " - " +
                item.end_time.substr(0, 8)
            }
            descriptionLocation={item.location}
        />
    );

    const renderCapacity = ({ item }) => (
        <FacilityCapacity name={item.name} capacity={item.capacity} />
    );
    const renderFavourites = ({ item }) => (
        <UserFavourites
            iconName={item.iconName}
            favouriteName={item.favouriteName}
        />
    );

    const emptyComponent = () => {
        return (
            <View style={styles.emptyComponent}>
                <Text style={styles.emptyComponentText}>
                    You have no upcoming events.
                </Text>
            </View>
        );
    };

    const capacityDivider = () => {
        return (
            <View
                style={{
                    alignSelf: "center",
                    height: "90%",
                    width: 1,
                    backgroundColor: "#607D8B",
                }}
            />
        );
    };

    const bookingDivider = () => {
        return (
            <View
                style={{
                    alignSelf: "center",
                    height: 1,
                    width: "90%",
                    backgroundColor: "#607D8B",
                }}
            />
        );
    };

    const [refreshing, setRefreshing] = useState(false);
    const onRefresh = async () => {
        //set isRefreshing to true
        setRefreshing(true);
        await FetchCapacityCall();
        console.log(capacityList);
        setRefreshing(false);
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.componentHeader}>
                <View style={styles.componentHeaderLabel}>
                    <Text style={styles.componentText}>
                        Your upcoming bookings
                    </Text>
                    <MaterialCommunityIcons
                        name="calendar"
                        color={"black"}
                        size={20}
                    />
                </View>
                <TouchableOpacity
                    onPress={() =>
                        navigation.navigate("Bookings", {
                            screen: "CurrentBookingsScreen",
                        })
                    }
                >
                    <AddItem />
                </TouchableOpacity>
            </View>
            <SafeAreaView style={styles.wrapper}>
                <FlatList
                    ItemSeparatorComponent={bookingDivider}
                    data={userBookings}
                    renderItem={renderBooking}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={emptyComponent}
                />
            </SafeAreaView>
            <View style={styles.componentHeader}>
                <View style={styles.componentHeaderLabel}>
                    <Text style={styles.componentText}>
                        Facility capacities
                    </Text>
                    <MaterialCommunityIcons
                        name="account-group"
                        color={"black"}
                        size={20}
                    />
                    <TouchableOpacity onPress={onRefresh}>
                        <MaterialCommunityIcons
                            style={{ paddingLeft: 10 }}
                            name="refresh"
                            color={"black"}
                            size={20}
                        />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity>
                    <AddItem />
                </TouchableOpacity>
            </View>
            <SafeAreaView style={styles.wrapper}>
                <View style={styles.flatListFacilityCapacities}>
                    <FlatList
                        ItemSeparatorComponent={capacityDivider}
                        horizontal={true}
                        data={capacityList}
                        renderItem={renderCapacity}
                        showsHorizontalScrollIndicator={false}
                        refreshing={refreshing}
                    />
                </View>
            </SafeAreaView>
            <View style={styles.componentHeader}>
                <View style={styles.componentHeaderLabel}>
                    <Text style={styles.componentText}>Your favourites</Text>
                    <MaterialCommunityIcons
                        name="heart-multiple"
                        color={"black"}
                        size={20}
                    />
                </View>
                <AddItem />
            </View>
            <View style={styles.wrapper}>
                <FlatList
                    ItemSeparatorComponent={bookingDivider}
                    data={userFavouritesData}
                    renderItem={renderFavourites}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={emptyComponent}
                />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    componentHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingTop: 20,
        paddingBottom: 20,
        paddingLeft: 20,
        paddingRight: 20,
    },
    wrapper: {
        backgroundColor: "#0C3370",
        borderRadius: 10,
        alignSelf: "center",
        justifyContent: "center",
        width: "90%",
        flex: 0.32,
    },
    componentText: {
        fontFamily: "Montserrat-Medium",
        fontSize: 16,
        paddingRight: 5,
    },
    componentHeaderLabel: {
        flexDirection: "row",
    },
    emptyComponent: {
        paddingTop: 0.1 * height,
        alignItems: "center",
        justifyContent: "center",
    },
    emptyComponentText: {
        fontFamily: "Montserrat-Medium",
        color: "white",
    },
});
