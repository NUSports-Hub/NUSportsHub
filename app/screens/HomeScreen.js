import { useState, useEffect } from "react";
import * as React from "react";
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
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { v4 as uuidv4 } from "uuid";
import "react-native-get-random-values";
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
    const [userFavourites, setUserFavourites] = useState([]);
    useFocusEffect(
        React.useCallback(() => {
            getFavourites();
            getBookings();
        }, [])
    );
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
                console.log("No data found");
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
    async function getFavourites() {
        try {
            const user = supabase.auth.user();
            console.log(user.id);
            let { data, error, status } = await supabase
                .from("favourites")
                .select(`iconName,favouriteName`)
                .eq("user_id", user.id);

            if (data) {
                console.log(data);
                console.log("Getting Data");
                setUserFavourites(data);
            } else {
                console.log("No data found");
            }
            if (error && status !== 406) {
                throw error;
            }
        } catch (error) {
            alert(error.message);
        }
    }
    useEffect(() => {
        getBookings();
        getFavourites();
    }, []);
    const renderBooking = ({ item }) => {
        const eventStart = new Date(item.start_time);
        const eventEnd = new Date(item.end_time);
        return (
            <UserBooking
                dateDay={eventStart.getDate()}
                dateMonth={monthConverter[eventStart.getMonth()]}
                title={item.title}
                descriptionTime={
                    eventStart.toLocaleTimeString() +
                    " - " +
                    eventEnd.toLocaleTimeString()
                }
                descriptionLocation={item.location}
            />
        );
    };

    const renderCapacity = ({ item }) => (
        <FacilityCapacity name={item.name} capacity={item.capacity} />
    );
    const renderFavourites = ({ item }) => {
        const user = supabase.auth.user();
        const deleteFavourite = async () => {
            console.log("deleting favourite");
            const { data, error } = await supabase
                .from("favourites")
                .delete()
                .eq("iconName", item.iconName);
            console.log(data);
            getFavourites();
        };
        return (
            <View style={styles.favouriteContainer}>
                <UserFavourites
                    iconName={item.iconName}
                    favouriteName={item.favouriteName}
                />
                <TouchableOpacity
                    style={styles.icon2}
                    onPress={() => {
                        deleteFavourite();
                    }}
                >
                    <MaterialCommunityIcons
                        name={"trash-can-outline"}
                        color={"white"}
                        size={20}
                    />
                </TouchableOpacity>
            </View>
        );
    };

    const emptyComponent = () => {
        return (
            <View style={styles.emptyComponent}>
                <Text style={styles.emptyComponentText}>
                    You have no upcoming events.
                </Text>
            </View>
        );
    };

    const emptyComponentFavourites = () => {
        return (
            <View style={styles.emptyComponent}>
                <Text style={styles.emptyComponentText}>
                    You do not have any favourites!
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
                        Your upcoming events
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
                </View>
                <TouchableOpacity onPress={onRefresh}>
                    <MaterialCommunityIcons
                        style={{ paddingLeft: 10 }}
                        name="refresh"
                        color={"black"}
                        size={20}
                    />
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
                    data={userFavourites}
                    renderItem={renderFavourites}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={emptyComponentFavourites}
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
    favouriteContainer: {
        flexDirection: "row",
    },
    icon2: {
        alignItems: "center",
        justifyContent: "center",
        marginRight: 10,
    },
});
