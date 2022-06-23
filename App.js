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
import { FetchCapacityCall } from "./app/components/fetchCapacity.js";
import BookingsNavigator from "./app/screens/BookingScreens/BookingsNavigator.js";
import ExploreNavigator from "./app/screens/ExploreScreens/ExploreNavigator.js";
import ProfileNavigator from "./app/screens/ProfileScreens/ProfileNavigator.js";
import { supabase } from "./supabase.js";
import "react-native-url-polyfill/auto";

function ExploreScreen() {
    return (
        <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
            <Text>Explore!</Text>
        </View>
    );
}

function Home({ session }) {
    return (
        <Tab.Navigator
            initialRouteName="Home"
            screenOptions={{
                tabBarHideOnKeyboard: true,
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
                component={ExploreNavigator}
                options={{
                    headerShown: false,
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
                options={{
                    headerShown: false,
                    headerLeft: null,
                    headerStyle: {
                        backgroundColor: "#0C3370",
                    },
                    headerTitle: "Profile",
                    headerTitleStyle: {
                        fontFamily: "Montserrat-Bold",
                    },
                    headerTintColor: "white",
                    headerTitleAlign: "center",
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons
                            name="account"
                            color={color}
                            size={25}
                        />
                    ),
                }}
            >
                {(props) => <ProfileNavigator {...props} session={session} />}
            </Tab.Screen>
        </Tab.Navigator>
    );
}

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function App() {
    const [appIsReady, setAppIsReady] = useState(false);
    const [session, setSession] = useState(null);
    useEffect(() => {
        setSession(supabase.auth.session());

        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });
        async function prepare() {
            try {
                // Keep the splash screen visible while we fetch resources
                await SplashScreen.preventAutoHideAsync();
                // Pre-load fonts, make any API calls you need to do here
                await Font.loadAsync({
                    "Montserrat-Regular": require("./assets/fonts/Montserrat-Regular.ttf"),
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
                console.log("APP IS READY");
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
            {session ? <Home session={session} /> : <LoginScreen />}
        </NavigationContainer>
    );
}

export default App;
