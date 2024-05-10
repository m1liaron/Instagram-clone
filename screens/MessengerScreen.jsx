import React from 'react';
import {Text, StyleSheet, FlatList, Pressable, Image, View, TextInput} from 'react-native'
import {getAuth} from "firebase/auth";
import {useNavigation} from "@react-navigation/native";
import BackArrow from "../components/BackArrow";
import {useGetUserGroups} from "../hooks/useGetUserGroups";
import {SafeAreaView} from "react-native-safe-area-context";
import Entypo from "react-native-vector-icons/Entypo";

const MessengerScreen = () => {
    const auth = getAuth();
    const user = auth.currentUser;
    const userGroups = useGetUserGroups(user.email);

    const navigation = useNavigation();

    return (
        <SafeAreaView style={{flex:1, backgroundColor:'#000'}}>
            <View>
                <BackArrow/>
                <View>
                    <Text style={{color:'#fff'}}>{user.name}</Text>
                </View>
            </View>

            <View style={styles.searchContainer}>
                <Entypo name="magnifying-glass" size={20} color="#fff" style={{marginHorizontal:8}}/>
                <TextInput
                    placeholder='Шукати'
                    placeholderTextColor="gray"
                />
            </View>

            <View>
                <Text style={{color:'#fff'}}>Повідомлення</Text>
            </View>
            <FlatList
                data={userGroups}
                renderItem={({item}) => (
                    <Pressable
                        key={item.id}
                        onPress={() => navigation.navigate('Message', {groupId: item.id, userEmail: item.user_email})}
                        style={styles.userContainer}
                    >
                        <Image source={item.user_picture} style={styles.userPicture} />
                        <Text style={{fontSize:30, color:'#fff'}}>{item.user}</Text>
                    </Pressable>
                )
            }
            contentContainerStyle={styles.listContainer}/>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    userContainer:{
        flexDirection:'row',
        alignItems:'center'
    },
    userPicture: {
        width:50,
        height:50,
        borderRadius:50,
        marginRight:5
    },
    listContainer:{
        marginHorizontal:20
    },
    searchContainer:{
        padding:5,
        borderRadius:5,
        backgroundColor:'#2e2e2e',
        flexDirection:'row',
        alignItems:'center',
        margin:15,
    }
})

export default MessengerScreen;
