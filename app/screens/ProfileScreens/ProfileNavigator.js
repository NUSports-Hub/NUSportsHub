import { createStackNavigator } from "@react-navigation/stack";
import ProfileScreen from "./ProfileScreen";
import EditProfileScreen from "./EditProfileScreen";
import PasswordResetScreen from "./PasswordResetScreen";
import { supabase } from "../../../supabase";
import "react-native-url-polyfill/auto";
const Stack = createStackNavigator();

export default ProfileNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                options={{
                    headerShown: true,
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
                }}
                name="ProfileScreen"
                component={ProfileScreen}
            />
            <Stack.Screen
                options={{
                    headerShown: true,
                    headerStyle: {
                        backgroundColor: "#0C3370",
                    },
                    headerTitle: "Edit Profile",
                    headerTitleStyle: {
                        fontFamily: "Montserrat-Bold",
                    },
                    headerTintColor: "white",
                    headerTitleAlign: "center",
                }}
                name="EditProfileScreen"
                component={EditProfileScreen}
            />
            <Stack.Screen
                options={{
                    headerShown: true,
                    headerStyle: {
                        backgroundColor: "#0C3370",
                    },
                    headerTitle: "Change Password",
                    headerTitleStyle: {
                        fontFamily: "Montserrat-Bold",
                    },
                    headerTintColor: "white",
                    headerTitleAlign: "center",
                }}
                name="PasswordResetScreen"
                component={PasswordResetScreen}
            />
        </Stack.Navigator>
    );
};
