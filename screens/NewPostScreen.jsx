import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native'
import AddNewPost from "../components/newPost/AddNewPost";
import { SafeAreaView } from 'react-native-safe-area-context';
import AddNewStory from "../components/newStory/AddNewStory";
import Entypo from "react-native-vector-icons/Entypo";

const NewPostScreen = ({navigation}) => {
    return (
        <SafeAreaView style={styles.container}>
            <Pressable onPress={() => navigation.goBack()}>
                <Entypo name="cross" color="#fff" size={30}/>
            </Pressable>
            {/*<AddNewPost navigation={navigation}/>*/}
            <AddNewStory />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container:{
        backgroundColor:'black',
        flex:1,
    }
})

export default NewPostScreen;
