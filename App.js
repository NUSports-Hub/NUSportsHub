import * as React from "react";
import { Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as SplashScreen from "expo-splash-screen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useState, useEffect } from "react";
import * as Font from "expo-font";
import HomeScreen from "./app/screens/HomeScreen.js";
import LoginScreen from "./app/screens/LoginScreen.js";
import MainScreen from "./app/screens/BookingScreens/MainScreen.js";
import { FetchCapacityCall } from "./app/components/fetchCapacity.js";
import BookingsNavigator from "./app/screens/BookingScreens/BookingsNavigator.js";

function ExploreScreen() {
    return (
        <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
            <Text>Explore!</Text>
        </View>
    );
}

function ProfileScreen() {
    return (
        <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
            <Text>Profile!</Text>
        </View>
    );
}

function Home() {
    return (
        <Tab.Navigator
            initialRouteName="Home"
            screenOptions={{
                headerShown: false,
                tabBarStyle: { backgroundColor: "#0C3370" },
                tabBarActiveTintColor: "black",
                tabBarInactiveTintColor: "white",
                tabBarLabelStyle: {
                    fontFamily: "Montserrat-Bold",
                    fontSize: 13,
                },
            }}
        >
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarIcon: ({ focused, color, size }) => (
                        <MaterialCommunityIcons
                            name="home"
                            color={color}
                            size={25}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="Explore"
                component={ExploreScreen}
                options={{
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons
                            name="earth"
                            color={color}
                            size={25}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="Bookings"
                component={BookingsNavigator}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons
                            name="book"
                            color={color}
                            size={25}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons
                            name="account"
                            color={color}
                            size={25}
                        />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function App() {
    const [appIsReady, setAppIsReady] = useState(false);
    useEffect(() => {
        async function prepare() {
            try {
                // Keep the splash screen visible while we fetch resources
                await SplashScreen.preventAutoHideAsync();
                // Pre-load fonts, make any API calls you need to do here
                await Font.loadAsync({
                    "Montserrat-Bold": require("./assets/fonts/Montserrat-Bold.ttf"),
                    "Montserrat-Medium": require("./assets/fonts/Montserrat-Bold.ttf"),
                    "Montserrat-SemiBold": require("./assets/fonts/Montserrat-SemiBold.ttf"),
                    "Montserrat-ExtraBold": require("./assets/fonts/Montserrat-ExtraBold.ttf"),
                });
                await FetchCapacityCall();
            } catch (e) {
                console.warn(e);
            } finally {
                // Tell the application to render
                setAppIsReady(true);
                await SplashScreen.hideAsync();
            }
        }

        prepare();
    }, []);

    if (!appIsReady) {
        return null;
    }

    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    options={{ headerShown: false }}
                    name="Login"
                    component={LoginScreen}
                />
                <Stack.Screen
                    options={{ headerShown: false }}
                    name="HomeScreen"
                    component={Home}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default App;
