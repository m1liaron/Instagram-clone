import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import FormikPostUpLoader from "./FormikPostUploader";

const AddNewPost = () => {
    return (
        <View style={styles.container}>
            <Header/>
            <FormikPostUpLoader/>
        </View>
    );
};

const Header = () => {
    const navigation = useNavigation();
    return (
        <View style={styles.headerContainer}>
            <Pressable onPress={() => navigation.goBack()}>
                <MaterialIcons name="arrow-back-ios" color="#fff" size={30}/>
            </Pressable>
            <Text style={styles.headerText}>New post</Text>
            <Text></Text>
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
        marginHorizontal:10
    },
    headerContainer:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    headerText:{
        color:'#fff',
        fontWeight: '700',
        fontSize:20,
        marginLeft: 27.5
    }
})

export default AddNewPost;
