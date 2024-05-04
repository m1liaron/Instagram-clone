import React from 'react';
import {View, Text, StyleSheet, SafeAreaView} from 'react-native'
import AddNewPost from "../components/newPost/AddNewPost";

const NewPostScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
            <AddNewPost/>
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
