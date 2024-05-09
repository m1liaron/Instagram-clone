import React from 'react';
import {View, Text, StyleSheet, TextInput, Image} from 'react-native'
import {SafeAreaView} from "react-native-safe-area-context";

const StoryScreen = () => {
    return (
        <SafeAreaView style={{flex:1, backgroundColor:'#000'}}>
            <View></View>
            <View>
                <Image
                />
            </View>
            <View>
                <TextInput placeholder="Напишіть повідомлення"/>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    img:{
        height:'100%',
        width:'100%'
    }
})

export default StoryScreen;
