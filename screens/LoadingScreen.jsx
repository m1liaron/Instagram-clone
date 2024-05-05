import {Image, SafeAreaView, View, StyleSheet} from "react-native";

const LoadingScreen = () => {

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.logoContainer}>
            <Image
                source='../../assets/Instagram_logo.png'
                style={styles.logo}
            />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000",
        justifyContent: "center",
        alignItems: "center",
    },
    logoContainer: {
        justifyContent: "center",
        alignItems: "center",
    },
    logo: {
        width: 100,
        height: 100,
    },
});
export default LoadingScreen;
