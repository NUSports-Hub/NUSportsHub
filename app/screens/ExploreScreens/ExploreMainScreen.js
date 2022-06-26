import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    TextInput,
    Dimensions,
} from "react-native";
import { useState, useEffect } from "react";
import {
    getFocusedRouteNameFromRoute,
    useNavigation,
} from "@react-navigation/native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import UserEvent from "../../components/event";
import {
    FetchNusyncEvent,
    eventList,
} from "../../components/fetchNusyncEvents";

const renderEvent = ({ item }) => {
    const formatStartDate = new Date(Date.parse(item.startsOn));
    const formatEndDate = new Date(Date.parse(item.endsOn));
    var imagePath = item.imagePath;
    if (imagePath == null) {
        imagePath = item.organizationProfilePicture;
    }
    return (
        <UserEvent
            name={item.name}
            startsOnNotFormatted={String(formatStartDate)}
            endsOnNotFormatted={String(formatEndDate)}
            startsOn={formatStartDate.toUTCString()}
            endsOn={formatEndDate.toUTCString()}
            imageUrl={imagePath}
            location={item.location}
            description={item.description}
            organizationName={item.organizationName}
        />
    );
};
const { width, height } = Dimensions.get("window");
export default ExploreMainScreen = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const loadEvents = async () => {
            await FetchNusyncEvent();
            setData(eventList);
            setLoading(true);
        };
        loadEvents();
        console.log(data);
    }, []);
    return (
        <View>
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchBar}
                    placeholder="Search Events"
                    placeholderTextColor={"black"}
                />
                <TouchableOpacity
                    onPress={() => {
                        setData(eventList.slice(1, 3));
                    }}
                >
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
                {loading ? (
                    <FlatList
                        extraData={data}
                        data={data}
                        renderItem={renderEvent}
                        numColumns={2}
                        showsVerticalScrollIndicator={false}
                    />
                ) : (
                    <View style={styles.loading}>
                        <Text style={styles.loadingText}>
                            Loading events...
                        </Text>
                    </View>
                )}
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
        height: 0.75 * height,
    },
    loading: {
        alignItems: "center",
        justifyContent: "center",
    },
    loadingText: {
        fontFamily: "Montserrat-ExtraBold",
    },
});
