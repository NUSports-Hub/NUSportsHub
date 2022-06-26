import { createStackNavigator } from "@react-navigation/stack";
import BookingsMainScreen from "./BookingsMainScreen";
import SelectActivityScreen from "./SelectActivityScreen";
import SelectTimeScreen from "./SelectTimeScreen";
import CurrentBookingsScreen from "./CurrentBookingsScreen";
import BookingsPlatformScreen from "./BookingsPlatformScreen";
import { TouchableOpacity, Button } from "react-native";
import { HeaderBackButton } from "@react-navigation/elements";
import { useNavigation } from "@react-navigation/native";
const Stack = createStackNavigator();

export default BookingsNavigator = () => {
    const navigation = useNavigation();
    return (
        <Stack.Navigator>
            <Stack.Screen
                options={{
                    headerShown: true,
                    headerStyle: {
                        backgroundColor: "#0C3370",
                    },
                    headerTitle: "Bookings",
                    headerTitleStyle: {
                        fontFamily: "Montserrat-Bold",
                    },
                    headerTintColor: "white",
                    headerTitleAlign: "center",
                }}
                name="BookingsMainScreen"
                component={BookingsMainScreen}
            />
            <Stack.Screen
                options={{
                    headerShown: true,
                    headerStyle: {
                        backgroundColor: "#0C3370",
                    },

                    headerTitle: "New Booking",
                    headerTitleStyle: {
                        fontFamily: "Montserrat-Bold",
                    },
                    headerTintColor: "white",
                    headerTitleAlign: "center",
                }}
                name="BookingsPlatformScreen"
                component={BookingsPlatformScreen}
            />
            <Stack.Screen
                options={{
                    headerShown: true,
                    headerStyle: {
                        backgroundColor: "#0C3370",
                    },

                    headerTitle: "New Booking",
                    headerTitleStyle: {
                        fontFamily: "Montserrat-Bold",
                    },
                    headerTintColor: "white",
                    headerTitleAlign: "center",
                }}
                name="SelectActivityScreen"
                component={SelectActivityScreen}
            />
            <Stack.Screen
                options={{
                    headerShown: true,
                    headerStyle: {
                        backgroundColor: "#0C3370",
                    },
                    headerTitle: "Bookings",
                    headerTitleStyle: {
                        fontFamily: "Montserrat-Bold",
                    },
                    headerTintColor: "white",
                    headerTitleAlign: "center",
                }}
                name="SelectTimeScreen"
                component={SelectTimeScreen}
            />

            <Stack.Screen
                options={{
                    headerShown: true,
                    headerStyle: {
                        backgroundColor: "#0C3370",
                    },
                    headerTitle: "My Events",
                    headerTitleStyle: {
                        fontFamily: "Montserrat-Bold",
                    },
                    headerTintColor: "white",
                    headerTitleAlign: "center",
                }}
                name="CurrentBookingsScreen"
                component={CurrentBookingsScreen}
            />
        </Stack.Navigator>
    );
};
