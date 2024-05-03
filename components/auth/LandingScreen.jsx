import {View, Text, Button} from "react-native";

export default function LandingScreen({ navigation }) {
    return (
        <View style={{flex: 1, justifyContent:'center'}}>
            <Button title="Register"
            onPress={() => navigation.navigate("Register")}/>
        </View>
    )
}