import { View, Text, StyleSheet, StatusBar, TextInput } from "react-native";
import {
    getFocusedRouteNameFromRoute,
    useNavigation,
} from "@react-navigation/native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import UserEvent from "../../components/event";
import { SafeAreaView } from "react-native-safe-area-context";

const eventsData = [
    {
        name: "TeamNUS Badminton Open 2022",
        date: "Mon, Jun 30, 2022",
    },
    {
        name: "TeamNUS Badminton Open 2022",
        date: "Mon, Jun 30, 2022",
    },
    {
        name: "TeamNUS Badminton Open 2022",
        date: "Mon, Jun 30, 2022",
    },
    {
        name: "TeamNUS Badminton Open 2022",
        date: "Mon, Jun 30, 2022",
    },
    {
        name: "TeamNUS Badminton Open 2022",
        date: "Mon, Jun 30, 2022",
    },
    {
        name: "TeamNUS Badminton Open 2022",
        date: "Mon, Jun 30, 2022",
    },
    {
        name: "TeamNUS Badminton Open 2022",
        date: "Mon, Jun 30, 2022",
    },
    {
        name: "TeamNUS Badminton Open 2022",
        date: "Mon, Jun 30, 2022",
    },
];

const renderEvent = ({ item }) => (
    <UserEvent name={item.name} date={item.date} />
);

export default ExploreMainScreen = () => {
    return (
        <View>
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchBar}
                    placeholder="Search Events"
                    placeholderTextColor={"black"}
                />
                <TouchableOpacity>
                    <MaterialCommunityIcons
                        name="magnify"
                        color={"#FF6D03"}
                        size={25}
                    />
                </TouchableOpacity>
                <TouchableOpacity>
                    <MaterialCommunityIcons
                        name="filter"
                        color={"#FF6D03"}
                        size={25}
                    />
                </TouchableOpacity>
            </View>

            <Text style={styles.upcomingEventsHeaderText}>Upcoming Events</Text>
            <View style={styles.eventsContainer}>
                <FlatList
                    data={eventsData}
                    renderItem={renderEvent}
                    numColumns={2}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    searchContainer: {
        flexDirection: "row",
        padding: 15,
        justifyContent: "space-between",
    },
    searchBar: {
        width: "80%",
        backgroundColor: "#D9D9D9",
        borderRadius: 15,
        textAlign: "center",
        fontFamily: "Montserrat-SemiBold",
    },
    upcomingEventsHeaderText: {
        fontFamily: "Montserrat-ExtraBold",
        fontSize: 20,
        paddingLeft: 15,
    },
    eventsContainer: {
        justifyContent: "center",
        alignItems: "center",
    },
});
