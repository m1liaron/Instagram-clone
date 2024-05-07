import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TextInput, Image} from 'react-native'
import {SafeAreaView} from "react-native-safe-area-context";
import Entypo from "react-native-vector-icons/Entypo";
import {collectionGroup, onSnapshot} from "firebase/firestore";
import {db} from "../firebase";

const SearchScreen = () => {
    const [search, setSearch] = useState('');
    const [users, setUsers] = useState([]);

    useEffect(() => {
        onSnapshot(collectionGroup(db, 'users'), snapshot => {
            const newUsers = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setUsers(newUsers);
        });

    }, []); // Run effect only once on component

    console.log(users)
    return (
        <SafeAreaView style={{flex:1, backgroundColor:'#000'}}>
            <Header search={search} setSearch={setSearch}/>

            {search ? (
                <SearchingContent />
            ) : (
                <View style={{flexDirection:'row', flexWrap:'wrap'}}>
                    <Image
                        source="https://i.natgeofe.com/k/8b2a41f8-e02a-4f10-bc29-797adc1cffd9/american-beaver-7-kids_4x3.jpg"
                        style={{width:100, height:100}}
                    />
                    <Image
                        source="https://i.natgeofe.com/k/8b2a41f8-e02a-4f10-bc29-797adc1cffd9/american-beaver-7-kids_4x3.jpg"
                        style={{width:100, height:100}}
                    />
                    <Image
                        source="https://i.natgeofe.com/k/8b2a41f8-e02a-4f10-bc29-797adc1cffd9/american-beaver-7-kids_4x3.jpg"
                        style={{width:100, height:100}}
                    />
                    <Image
                        source="https://i.natgeofe.com/k/8b2a41f8-e02a-4f10-bc29-797adc1cffd9/american-beaver-7-kids_4x3.jpg"
                        style={{width:100, height:100}}
                    />
                </View>
            )}
        </SafeAreaView>
    );
};

const Header =  ({search, setSearch}) => {
    return (
        <View>
            <View style={styles.searchContainer}>
                <Entypo name="magnifying-glass" size={20} color="#fff" style={{marginHorizontal:8}}/>
                <TextInput
                    value={search}
                    onChangeText={setSearch}
                    placeholder='Шукати'
                    placeholderTextColor="gray"
                />
            </View>
        </View>
    )
}

const SearchingContent = () => {

    return (
        <View style={{marginHorizontal: 50}}>
            <Image
                source="https://i.natgeofe.com/k/8b2a41f8-e02a-4f10-bc29-797adc1cffd9/american-beaver-7-kids_4x3.jpg"
                style={{width:50, height:50}}
            />
            <Text style={{color:'#fff'}}>Beaver</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    searchContainer:{
        padding:5,
        borderRadius:5,
        backgroundColor:'#2e2e2e',
        flexDirection:'row',
        alignItems:'center',
        margin:15,
    }
})

export default SearchScreen;
