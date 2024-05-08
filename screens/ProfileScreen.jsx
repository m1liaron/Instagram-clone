import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Profile from "../components/profile/Profile";
import {Text, View, StyleSheet} from "react-native";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import Entypo from "react-native-vector-icons/Entypo";
import AntDesign from "react-native-vector-icons/AntDesign";
import Feather from "react-native-vector-icons/Feather";
import {useAuthentication} from "../hooks/useAuthentication";

const ProfileScreen = () => {
    const userData = useAuthentication() || []

    return (
        <SafeAreaView style={{flex:1, backgroundColor:'#000'}}>
            <View style={styles.header}>
                <View style={{flexDirection:'row', alignItems:'center'}}>
                    <Text style={styles.titleName}>{userData.username}</Text>
                    <SimpleLineIcons name="arrow-down" color="#fff" size={12}/>
                </View>
                <View style={styles.iconList}>
                    <Entypo name="email" size={30} style={styles.icon}/>
                    <AntDesign name="plussquareo" size={30} style={styles.icon}/>
                    <Feather name="menu" size={30} style={styles.icon}/>
                </View>
            </View>
            <Profile userData={userData}/>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#000',
        flex: 1
    },
    iconList:{
        alignItems:'center',
        flexDirection:'row'
    },
    icon:{
        color:'#fff',
        marginRight:30
    },
    header:{
        justifyContent:'space-between',
        alignItems:'center',
        flexDirection:'row',
        marginHorizontal:20,
        marginBottom:40
    },
    titleName:{
        fontSize:27,
        fontWeight:'500',
        color:'#fff',
        marginRight:7
    },
    text: {
        color: '#fff',
        fontSize: 18,
    },
})

export default ProfileScreen;
