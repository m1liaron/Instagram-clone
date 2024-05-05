import React from 'react';
import {View, Text, StyleSheet, Image, Pressable} from 'react-native'
import AntDesign from "react-native-vector-icons/AntDesign";
import {app} from '../../firebase'
import { getAuth, signOut } from "firebase/auth";
const Header = ({navigation}) => {

    const onLogOut = () => {
        const auth = getAuth(app);
        signOut(auth).then(() => {
            console.log('You successfuly log out')
        }).catch((error) => {
            console.log(error.message)
        });
    }

    return (
        <View style={styles.container}>
            <Pressable onPress={onLogOut}>
                <Image
                    style={styles.logo}
                    source={require('../../assets/instagram-logo-white.png')}
                />
            </Pressable>
            <View style={styles.iconsContainer}>
                <Pressable onPress={() => navigation.navigate('Post')}>
                    <AntDesign name="plussquareo" style={styles.icon} size={30} />
                </Pressable>
                <Pressable>
                    <AntDesign name="hearto" style={styles.icon} size={30} />
                </Pressable>
                <Pressable>
                    <View style={styles.unreadBadge}>
                        <Text style={styles.unreadBadgeText}>11</Text>
                    </View>
                    <AntDesign name="message1" style={styles.icon} size={30} />
                </Pressable>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container:{
      justifyContent:'space-between',
      alignItems:'center',
      flexDirection:'row',
      marginHorizontal: 20
    },
    text: {
        color: 'white'
    },
    iconsContainer:{
        flexDirection:'row',
    },
    icon: {
        marginRight: 15,
        color: '#fff'
    },
    logo:{
        width: 100,
        height:100,
        resizeMode: 'contain'
    },
    unreadBadge:{
        backgroundColor: '#FF3250',
        position: 'absolute',
        left: 20,
        bottom: 18,
        width: 25,
        height: 18,
        borderRadius: 25,
        alignItems:'center',
        justifyContent: 'center',
        zIndex: 1,
    },
    unreadBadgeText:{
        color: '#fff',
        fontWeight: '600'
    }
})

export default Header;
