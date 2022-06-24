import { createStackNavigator } from "@react-navigation/stack";
import { TouchableOpacity, Button, View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import LoginScreen from "./LoginScreen";
import ForgotPasswordScreen from "./ProfileScreens/ForgotPasswordScreen";
const Stack = createStackNavigator();

export default LoginNavigator = () => {
    const navigation = useNavigation();
    return (
        <Stack.Navigator>
            <Stack.Screen
                options={{ headerShown: false }}
                name="LoginScreen"
                component={LoginScreen}
            />
            <Stack.Screen
                options={{ headerShown: false }}
                name="ForgotPasswordScreen"
                component={ForgotPasswordScreen}
            />
        </Stack.Navigator>
    );
};
