import React from 'react';
import {View, Text, StyleSheet} from 'react-native'
import AntDesign from "react-native-vector-icons/AntDesign";
import SignupForm from "../components/signup/SignupForm";
import { SafeAreaView } from 'react-native-safe-area-context';

const SignupScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.logoContainer}>
                <AntDesign name='instagram' size={90}/>
            </View>
            <SignupForm/>
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

export default SignupScreen;
