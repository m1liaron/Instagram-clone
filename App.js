import {NavigationContainer} from "@react-navigation/native";
import AuthNavigation from "./components/AuthNavigation";

export default function App() {
  return (
    <NavigationContainer>
        <AuthNavigation/>
    </NavigationContainer>
  );
}