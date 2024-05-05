import React from 'react';
import {View, Text, StyleSheet} from 'react-native'
import AddNewPost from "../components/newPost/AddNewPost";
import { SafeAreaView } from 'react-native-safe-area-context';

const NewPostScreen = ({navigation}) => {
    return (
        <SafeAreaView style={styles.container}>
            <AddNewPost navigation={navigation}/>
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
