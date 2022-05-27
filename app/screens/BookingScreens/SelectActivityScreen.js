import { View, Text, StyleSheet, StatusBar } from "react-native";
import ActivityBox from "../../components/activityBox";
export default SelectActivityScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>Select your activity</Text>
            <View style={styles.activityRow}>
                <ActivityBox
                    iconName="table-tennis"
                    activityName="Table Tennis"
                />
                <ActivityBox iconName="volleyball" activityName="Volleyball" />
                <ActivityBox iconName="basketball" activityName="Basketball" />
            </View>
            <View style={styles.activityRow}>
                <ActivityBox iconName="badminton" activityName="Badminton" />
                <ActivityBox iconName="tennis" activityName="Squash" />
                <ActivityBox iconName="tennis-ball" activityName="Tennis" />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {},
    activityRow: { flexDirection: "row", justifyContent: "space-evenly" },
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
