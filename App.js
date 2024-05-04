import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Register from "./screens/Register";
import HomeScreen from "./screens/HomeScreen";

const Stack = createNativeStackNavigator()
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Landing">
          <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false}}/>
        <Stack.Screen name="Register" component={Register} options={{ headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}