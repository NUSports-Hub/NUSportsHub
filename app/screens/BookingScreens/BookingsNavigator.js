import { createStackNavigator } from "@react-navigation/stack";
import BookingsMainScreen from "./BookingsMainScreen";
import SelectActivityScreen from "./SelectActivityScreen";
import SelectTimeScreen from "./SelectTimeScreen";
import CurrentBookingsScreen from "./CurrentBookingsScreen";
const Stack = createStackNavigator();

export default BookingsNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                options={{ headerShown: false }}
                name="BookingsMainScreen"
                component={BookingsMainScreen}
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
                    headerTitle: "My Bookings",
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
