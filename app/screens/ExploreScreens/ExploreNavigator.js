import { createStackNavigator } from "@react-navigation/stack";
import ExploreMainScreen from "./ExploreMainScreen";
import EventDetailScreen from "./EventDetailScreen";
const Stack = createStackNavigator();

export default ExploreNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                options={{
                    headerShown: true,
                    headerLeft: null,
                    headerStyle: {
                        backgroundColor: "#0C3370",
                    },
                    headerTitle: "Explore",
                    headerTitleStyle: {
                        fontFamily: "Montserrat-Bold",
                    },
                    headerTintColor: "white",
                    headerTitleAlign: "center",
                }}
                name="ExploreMainScreen"
                component={ExploreMainScreen}
            />
            <Stack.Screen
                options={{
                    headerShown: true,
                    headerStyle: {
                        backgroundColor: "#0C3370",
                    },
                    headerTitle: "Explore",
                    headerTitleStyle: {
                        fontFamily: "Montserrat-Bold",
                    },
                    headerTintColor: "white",
                    headerTitleAlign: "center",
                }}
                name="EventDetailScreen"
                component={EventDetailScreen}
            />
        </Stack.Navigator>
    );
};
