import { Text, StyleSheet, View, Button } from "react-native";
import { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export default SelectTimeScreen = (props) => {
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState("date");
    const [show, setShow] = useState(false);
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
        console.log(selectedDate);
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

    const showTimepicker = () => {
        showMode("time");
    };

    return (
        <View>
            <View>
                <Text style={styles.headerText}>Activity Selected:</Text>
            </View>
            <View style={styles.activityBox}>
                <ActivityBox
                    iconName={props.route.params.iconName}
                    activityName={props.route.params.activityName}
                />
            </View>
            <View>
                <Text style={styles.headerText}>Select a date:</Text>
            </View>
            <View style={styles.selectedDateContainer}>
                <View style={styles.materialIcon}>
                    <MaterialCommunityIcons
                        name={"calendar"}
                        color={"#0C3370"}
                        size={50}
                    />
                </View>
                <Text style={styles.dateText}>
                    {date.getDate()} {monthNames[date.getMonth()]}{" "}
                    {date.getFullYear()}
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    headerText: {
        fontFamily: "Montserrat-ExtraBold",
        fontSize: 20,
        padding: 20,
    },
    activityBox: {
        marginLeft: 15,
    },
    selectedDateContainer: {
        flexDirection: "row",
    },
    materialIcon: {
        marginLeft: 15,
    },
    dateText: {
        fontFamily: "Montserrat-Bold",
        fontSize: 20,
        color: "#0C3370",
        marginHorizontal: 5,
        marginVertical: 10,
    },
});
