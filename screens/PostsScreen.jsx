import React, {useEffect, useRef} from 'react';
import { Text, StyleSheet, FlatList, Pressable} from 'react-native'
import Post from "../components/home/Post";
import AntDesign from "react-native-vector-icons/AntDesign";
import {SafeAreaView} from "react-native-safe-area-context";
import {useNavigation} from "@react-navigation/native";
import {useGetUserPosts} from "../hooks/useGetUserPosts";

const ITEM_HEIGHT = 682;

const PostsScreen = ({route}) => {
    const flatListRef = useRef(null);

    const {userEmail, selectedPostId} = route.params;
    const userPosts = useGetUserPosts(userEmail)

    const navigation = useNavigation()

    useEffect(() => {
        const scrollToPost = async () => {
            if (selectedPostId && flatListRef.current) {
                // Find the index of the selected post
                const index = await userPosts?.findIndex((post) => post.id === selectedPostId);
                // Scroll to the selected post
                if (index !== undefined && index !== -1) {
                    flatListRef.current.scrollToIndex({ index: index, animated: false });
                }
            }
        }
        scrollToPost()
    }, [selectedPostId, userPosts]);


    return (
        <SafeAreaView style={{flex:1, backgroundColor:'#000'}}>
            <Pressable onPress={() => navigation.goBack()}>
                <AntDesign name="arrowleft" size={30} color="#fff" />
            </Pressable>
            <Text>Дописи</Text>
            <FlatList
                data={userPosts}
                ref={flatListRef}
                renderItem={({ item }) => (
                    <Post post={item}/>
                )}
                getItemLayout={(data, index) => (
                    { length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index }
                )}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({})

export default PostsScreen;
