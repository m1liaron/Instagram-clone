import {NavigationContainer} from "@react-navigation/native";
import {MainNavigator} from "./components/Navigator";

export default function App() {
  return (
    <NavigationContainer>
        <MainNavigator/>
    </NavigationContainer>
  );
}