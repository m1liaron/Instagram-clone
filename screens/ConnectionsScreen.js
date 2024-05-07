import React, {useState} from 'react';
import {View, Text, StyleSheet, Pressable, FlatList, Image} from 'react-native'
import BackArrow from "../components/BackArrow";
import {SafeAreaView} from "react-native-safe-area-context";
import {useGetUserById} from "../hooks/useGetUserById";

const ConnectionsScreen = ({route}) => {
    const {userEmail, state} = route.params;
    const [currentState, setCurrentState] = useState(state);

    const user = useGetUserById(userEmail);
    return (
        <SafeAreaView style={{flex:1, backgroundColor:'#000'}}>
                {user && (
                    <View>
                        <Header user={user}/>
                        <FolAndFollowing user={user} setCurrentState={setCurrentState}/>
                        <List data={user[currentState]}/>
                    </View>
                )}
        </SafeAreaView>
    );
};

const Header = ({user}) => {
    return (
        <View style={styles.headerContainer}>
            <BackArrow/>
            <Text style={styles.headerText}>{user.username}</Text>
        </View>
    )
}

const FolAndFollowing = ({user, setCurrentState}) => {
    return (
        <View style={styles.flex}>
            <Pressable style={styles.connection} onPress={() => setCurrentState('followers_users')}>
                <Text style={styles.headerText}>Читачі: </Text>
                <Text style={styles.headerText}>{user.followers_users.length}</Text>
            </Pressable>
            <Pressable style={styles.connection} onPress={() => setCurrentState('following_users')}>
                <Text style={styles.headerText}>Стежать: </Text>
                <Text style={styles.headerText}>{user.following_users.length}</Text>
            </Pressable>
        </View>
    )
}

const List = ({data}) => {
    return (
        <FlatList data={data} renderItem={({item}) => (
            <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center'}} key={item.id}>
                <Image source={item.profile_picture} style={styles.image} />
                <Text style={styles.headerText}>{item.username}</Text>
            </View>
        )}
        />
    )
}

const styles = StyleSheet.create({
    headerContainer:{
        flexDirection:'row',
        alignItems:'center',
    },
    flex:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center'
    },
    headerText:{
        color:'#fff'
    },
    connection:{
        flexDirection:'row',
        justifyContent:'center',
        borderBottomColor:'#fff',
        borderBottomWidth:2,
        marginHorizontal: 5
    },
    image:{
        width:50,
        height:50,
        borderRadius:50
    }
})

export default ConnectionsScreen;
