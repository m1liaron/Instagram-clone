import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ScrollView, Image, FlatList} from 'react-native'
import {collectionGroup, onSnapshot} from "firebase/firestore";
import {db} from "../../firebase";

const STORIES = [
    { name: 'Alex', imageSource: 'https://t4.ftcdn.net/jpg/02/14/74/61/360_F_214746128_31JkeaP6rU0NzzzdFC4khGkmqc8noe6h.jpg' },
    { name: 'Max Beaver Beavrochenko', imageSource: 'https://t4.ftcdn.net/jpg/02/14/74/61/360_F_214746128_31JkeaP6rU0NzzzdFC4khGkmqc8noe6h.jpg' },
    { name: 'Beaver', imageSource: 'https://t4.ftcdn.net/jpg/02/14/74/61/360_F_214746128_31JkeaP6rU0NzzzdFC4khGkmqc8noe6h.jpg' }
];


const Stories = () => {
    const [stories, setStories] = useState([]);
    useEffect(() => {
        onSnapshot(collectionGroup(db, 'stories'), snapshot => {
            const newPosts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setStories(newPosts);
        });

    }, []); // Run effect only once on component
    return (
        <View style={{marginBottom: 13, marginHorizontal: 20}}>
                <FlatList
                    data={stories}
                    renderItem={({ item }) => (
                        <View style={styles.story}>
                            <View style={styles.storyBorder}>
                                <Image
                                    source={item.imageUrl}
                                    style={styles.storyImage}
                                />
                            </View>
                            <Text style={styles.text}>{item.user.length > 11 ? item.user.slice(0, 6).toLowerCase() + '...' : item.user}</Text>
                        </View>
                    )}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                />
        </View>
    );
};

const styles = StyleSheet.create({
    text:{
        color: '#fff'
    },
    storyImage:{
        width: 70,
        height: 70,
        borderRadius: 50,
        borderWidth: 3,
        borderColor: '#000'
    },
    storyBorder:{
        width: 75,
        height: 76,
        borderRadius: 50,
        borderWidth: 3,
        borderColor: '#ff8501'
    },
    story:{
        alignItems:'center',
        marginRight:10
    },
    listStyle:{
        alignItems:'center',
        flexDirection:'row',
        justifyContent:'center'
    }
})

export default Stories;
