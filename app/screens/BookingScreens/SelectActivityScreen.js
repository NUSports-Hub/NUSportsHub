import { View, Text, StyleSheet, StatusBar } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import ActivityBox from "../../components/activityBox";
import { useNavigation } from "@react-navigation/native";
export default SelectActivityScreen = () => {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>Select your activity</Text>
            <View style={styles.activityRow}>
                <TouchableOpacity
                    onPress={() =>
                        navigation.navigate("SelectTimeScreen", {
                            iconName: "table-tennis",
                            activityName: "Table Tennis",
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
                        navigation.navigate("SelectTimeScreen", {
                            iconName: "volleyball",
                            activityName: "Volleyball",
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
                        navigation.navigate("SelectTimeScreen", {
                            iconName: "basketball",
                            activityName: "Basketball",
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
                        navigation.navigate("SelectTimeScreen", {
                            iconName: "badminton",
                            activityName: "Badminton",
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
                        navigation.navigate("SelectTimeScreen", {
                            iconName: "tennis",
                            activityName: "Squash",
                        })
                    }
                >
                    <ActivityBox iconName="tennis" activityName="Squash" />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() =>
                        navigation.navigate("SelectTimeScreen", {
                            iconName: "tennis-ball",
                            activityName: "Tennis",
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
