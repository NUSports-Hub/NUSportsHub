import { View, Text, StyleSheet, StatusBar } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
export default EventDetailScreen = () => {
    const navigation = useNavigation();
    return (
        <View>
            <Text>Test</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
    },
    bookingWrapper: {
        borderWidth: 3,
        borderRadius: 20,
        justifyContent: "center",
        marginHorizontal: 30,
        flex: 0.5,
        marginVertical: 30,
    },
    buttonText: {
        fontFamily: "Montserrat-ExtraBold",
        color: "white",
        fontSize: 40,
        padding: 20,
    },
});
