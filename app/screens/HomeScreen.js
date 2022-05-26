import { useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    ScrollView,
    StatusBar,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { TouchableOpacity } from "react-native";
import AddItem from "../components/addItem";
import UserEvent from "../components/event";
import { FlatList } from "react-native";
import { gymCapacityList } from "../components/fetchCapacity";
import FacilityCapacity from "../components/capacity";
import { FetchCapacityCall } from "../components/fetchCapacity.js";
import UserFavourites from "../components/favourites";
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
const upcomingEventData = [
    {
        dateDay: "15",
        dateMonth: "May",
        title: "Table Tennis",
        descriptionTime: "0900 - 1100",
        descriptionLocation: "Kent Ridge MPSH",
    },
    {
        dateDay: "22",
        dateMonth: "May",
        title: "Badminton",
        descriptionTime: "0700 - 0900",
        descriptionLocation: "University Town Gym",
    },
    {
        dateDay: "28",
        dateMonth: "May",
        title: "Table Tennis",
        descriptionTime: "0900 - 1100",
        descriptionLocation: "Kent Ridge MPSH",
    },
    {
        dateDay: "28",
        dateMonth: "May",
        title: "Table Tennis",
        descriptionTime: "0900 - 1100",
        descriptionLocation: "Kent Ridge MPSH",
    },
    {
        dateDay: "28",
        dateMonth: "May",
        title: "Table Tennis",
        descriptionTime: "0900 - 1100",
        descriptionLocation: "Kent Ridge MPSH",
    },
];

export default function HomeScreen() {
    const test = () => {
        alert("hello");
    };
    const renderEvent = ({ item }) => (
        <UserEvent
            dateDay={item.dateDay}
            dateMonth={item.dateMonth}
            title={item.title}
            descriptionTime={item.descriptionTime}
            descriptionLocation={item.descriptionLocation}
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
                    width: 1,
                    backgroundColor: "#607D8B",
                }}
            />
        );
    };

    const eventDivider = () => {
        return (
            <View
                style={{
                    height: 1,
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
        console.log(gymCapacityList);
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
                <TouchableOpacity onPress={test}>
                    <AddItem />
                </TouchableOpacity>
            </View>
            <SafeAreaView style={styles.wrapper}>
                <FlatList
                    ItemSeparatorComponent={eventDivider}
                    data={upcomingEventData}
                    renderItem={renderEvent}
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
                        data={gymCapacityList}
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
                    ItemSeparatorComponent={eventDivider}
                    data={userFavouritesData}
                    renderItem={renderFavourites}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={emptyComponent}
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: StatusBar.currentHeight,
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
        borderWidth: 3,
        borderColor: "red",
    },
    emptyComponentText: {
        fontFamily: "Montserrat-Medium",
        color: "white",
    },
});
