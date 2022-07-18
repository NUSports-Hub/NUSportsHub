import { View, Text, StyleSheet, StatusBar } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import ActivityBox from "../../components/activityBox";
import { useNavigation } from "@react-navigation/native";
export default SelectActivityScreen = (props) => {
    const accessToken = props.route.params.params.accessToken;
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>Select your activity</Text>
            <View style={styles.activityRow}>
                <TouchableOpacity
                    onPress={() =>
                        navigation.navigate("SelectTimeScreenReboks", {
                            iconName: "table-tennis",
                            activityName: "Table Tennis",
                            accessToken: accessToken,
                        })
                    }
                >
                    <ActivityBox
                        iconName="table-tennis"
                        activityName="Table Tennis"
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() =>
                        navigation.navigate("SelectTimeScreenReboks", {
                            iconName: "volleyball",
                            activityName: "Volleyball",
                            accessToken: accessToken,
                        })
                    }
                >
                    <ActivityBox
                        iconName="volleyball"
                        activityName="Volleyball"
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() =>
                        navigation.navigate("SelectTimeScreenReboks", {
                            iconName: "basketball",
                            activityName: "Basketball",
                            accessToken: accessToken,
                        })
                    }
                >
                    <ActivityBox
                        iconName="basketball"
                        activityName="Basketball"
                    />
                </TouchableOpacity>
            </View>
            <View style={styles.activityRow}>
                <TouchableOpacity
                    onPress={() =>
                        navigation.navigate("SelectTimeScreenReboks", {
                            iconName: "badminton",
                            activityName: "Badminton",
                            accessToken: accessToken,
                        })
                    }
                >
                    <ActivityBox
                        iconName="badminton"
                        activityName="Badminton"
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() =>
                        navigation.navigate("SelectTimeScreenReboks", {
                            iconName: "tennis",
                            activityName: "Squash",
                            accessToken: accessToken,
                        })
                    }
                >
                    <ActivityBox iconName="tennis" activityName="Squash" />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() =>
                        navigation.navigate("SelectTimeScreenReboks", {
                            iconName: "tennis-ball",
                            activityName: "Tennis",
                            accessToken: accessToken,
                        })
                    }
                >
                    <ActivityBox iconName="tennis-ball" activityName="Tennis" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    activityRow: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        marginBottom: 15,
    },
    header: {
        backgroundColor: "white",
        flex: 1,
    },
    headerText: {
        fontFamily: "Montserrat-ExtraBold",
        fontSize: 20,
        padding: 20,
    },
});
