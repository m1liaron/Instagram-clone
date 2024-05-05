import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import HomeScreen from "../screens/HomeScreen";
import SearchScreen from "../screens/SearchScreen";
import NewPostScreen from "../screens/NewPostScreen";
import StoreScreen from "../screens/StoreScreen";
import ProfileScreen from "../screens/ProfileScreen";
import LoginScreen from "../screens/LoginScreen";
import SignupScreen from "../screens/SignupScreen";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import AuthNavigation from "./AuthNavigation";
import LoadingScreen from "../screens/LoadingScreen";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator()

const Navigator = () => (
    <Tab.Navigator
        screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
                let iconName;

                if (route.name === 'Home') {
                    iconName = focused ? 'home' : 'home-outline';
                } else if (route.name === 'Search') {
                    iconName = focused ? 'search' : 'search-outline';
                } else if (route.name === 'Post') {
                    iconName = focused ? 'videocam' : 'videocam-outline';
                } else if (route.name === 'Store') {
                    iconName = focused ? 'storefront' : 'storefront-outline';
                } else if (route.name === 'Profile') {
                    iconName = focused ? 'person' : 'person-outline';
                }

                return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarShowLabel: false,
            tabBarActiveTintColor: '#ffffff',
            tabBarInactiveTintColor: '#fff',
            //Tab bar styles can be added here
            tabBarStyle:{
                backgroundColor:'#000',
            },
            tabBarLabelStyle:{
                paddingBottom:1
            },
            headerShown: false
        })}
    >
        <Tab.Screen name="Home" component={HomeScreen}/>
        <Tab.Screen name="Search" component={SearchScreen}/>
        <Tab.Screen name="Post" component={NewPostScreen} options={{ tabBarStyle: { display: 'none' } }}/>
        <Tab.Screen name="Store" component={StoreScreen}/>
        <Tab.Screen name="Profile" component={ProfileScreen}/>
    </Tab.Navigator>
);

export const MainNavigator = () => (
    <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
            headerShown: false
        }}

    >
        <Stack.Screen name="Home" component={AuthNavigation} />
    </Stack.Navigator>
)


export const SignedOutStack = () => (
    <Stack.Navigator
        initialRouteName="Login"
    >
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Signup" component={SignupScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
)
export default Navigator;
