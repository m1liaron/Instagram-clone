import React from 'react';
import {StyleSheet, Pressable} from 'react-native'
import AntDesign from "react-native-vector-icons/AntDesign";
import {useNavigation} from "@react-navigation/native";

const BackArrow = () => {
    const navigation = useNavigation();
    return (
        <Pressable onPress={() => navigation.goBack()}>
            <AntDesign name="arrowleft" size={30} color="#fff" />
        </Pressable>
    );
};

export default BackArrow;
