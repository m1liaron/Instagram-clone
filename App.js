import {NavigationContainer} from "@react-navigation/native";
import Navigator from "./components/Navigator";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import AuthNavigation from "./components/AuthNavigation";

const Stack = createNativeStackNavigator()

const MainNavigator = () => (
    <Stack.Navigator
        initialRouteName="Home"
    >
        <Stack.Screen name="Home" component={AuthNavigation} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Signup" component={SignupScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
)

export default function App() {
  return (
    <NavigationContainer>
        <MainNavigator />
    </NavigationContainer>
  );
}