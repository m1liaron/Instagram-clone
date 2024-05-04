import React from 'react';
import {View, Text, StyleSheet, SafeAreaView} from 'react-native'
import Header from "../components/home/Header";
import Stories from "../components/home/Stories";
import PostList from "../components/home/PostList";

const HomeScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
            <Header/>
            <Stories/>
            <PostList/>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#000',
        flex: 1
    }
})

export default HomeScreen;
