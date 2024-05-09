import React, {useState} from 'react';
import {View, Text, StyleSheet, Pressable, Image} from 'react-native'
import Entypo from 'react-native-vector-icons/Entypo';
import FormikPostUpLoader from "./FormikPostUploader";
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system'

const AddNewPost = ({ navigation}) => {
    const [image, setImage] = useState(null);

    return (
        <View style={styles.container}>
            <Header navigation={navigation}/>
            <LoadImage image={image} setImage={setImage}/>
            <FormikPostUpLoader navigation={navigation} image={image}/>
        </View>
    );
};

const Header = ({ navigation }) => {
    return (
        <View style={styles.headerContainer}>
            <Pressable onPress={() => navigation.goBack()}>
                <Entypo name="cross" color="#fff" size={30}/>
            </Pressable>
            <Text style={styles.headerText}>Новий допис</Text>
            <Text style={styles.headerText}>Далі</Text>
        </View>
    )
}

export const LoadImage = ({image, setImage}) => {
    const [uploading, setUploading] = useState(false);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            uploadMedia()
            setImage(result.assets[0].uri);
        }
        console.log(result)
    };

    const uploadMedia = async () => {
        setUploading(true);

        try {
            const {uri} = await FileSystem.getInfoAsync(image);
            const blob  = await new Promise((resolve, reject) => {
                const xhr = new XMLHttpRequest();
                xhr.onload = () => {
                    resolve(xhr.response)
                }
                xhr.onerror = (e) => {
                    reject(new TypeError('Network request failed'))
                }
                xhr.responseType = 'blob';
                xhr.open('GET', uri, true);
                xhr.send(null)
            })

            await ref.put(blob);
            setUploading(false);
            setImage(null)
        } catch (error){
            console.log(error)
        }
    }

    return (
        <View style={styles.container}>
            <Pressable onPress={pickImage}>
                <Text style={styles.headerText}>Pick an image from camera roll</Text>
            </Pressable>
            {image && (
                <View>
                    <Image source={{ uri: image }} style={styles.image} />
                </View>
            )}
        </View>
    );
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
    },
    image: {
        width: 200,
        height: 200,
        marginBottom: 20,
    },
})

export default AddNewPost;
