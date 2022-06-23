import { createStackNavigator } from "@react-navigation/stack";
import BookingsMainScreen from "./BookingsMainScreen";
import SelectActivityScreen from "./SelectActivityScreen";
import SelectTimeScreen from "./SelectTimeScreen";
const Stack = createStackNavigator();

export default BookingsNavigator = () => {
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
        </Stack.Navigator>
    );
};
