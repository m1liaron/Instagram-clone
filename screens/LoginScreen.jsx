import React from 'react';
import {View, Text, StyleSheet} from 'react-native'
import AntDesign from "react-native-vector-icons/AntDesign";
import LoginForm from "../components/login/LoginForm";
import { SafeAreaView } from 'react-native-safe-area-context';

const LoginScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.logoContainer}>
                <AntDesign name='instagram' size={90}/>
            </View>
            <LoginForm/>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container:{
        flex:1
    },
    logoContainer:{
        alignItems:'center',
        marginTop:60
    }
})

export default LoginScreen;
