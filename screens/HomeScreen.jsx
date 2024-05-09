import React from 'react';
import {StyleSheet} from 'react-native'
import Header from "../components/home/Header";
import Stories from "../components/home/Stories";
import PostList from "../components/home/PostList";
import { SafeAreaView } from 'react-native-safe-area-context';
import {BottomSheetComponent} from "../components/home/Post";

const HomeScreen = ({navigation}) => {
    return (
        <SafeAreaView style={styles.container}>
            <Header navigation={navigation}/>
            <Stories/>
            <PostList/>
            {/*<BottomSheetComponent/>*/}
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
