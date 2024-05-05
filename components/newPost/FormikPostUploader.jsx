import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image, TextInput, Pressable} from 'react-native'
import {object, string} from "yup";
import {Formik, ErrorMessage} from "formik";
import validUrl from "valid-url";
import {getAuth} from "firebase/auth";
import {app, db,} from "../../firebase";
import {collection, addDoc, onSnapshot, query, where, limit, serverTimestamp} from 'firebase/firestore'

const PLACEHOLDER_IMG = 'https://cdn.pixabay.com/photo/2016/06/10/16/23/beaver-1448389_960_720.jpg';

const uploadPostSchema = object().shape({
    imageUrl: string().url().required('A URL is required'),
    caption: string().max(2200, 'Caption has reached the character limit'),
})

const FormikPostUpLoader = ({ navigation }) => {
    const [thumbnailUrl, setThumbnailUrl] = useState(PLACEHOLDER_IMG);
    const [currentLoggedInUser, setCurrentLoggedInUser] = useState(null);

    const getUserName = () => {
        const auth = getAuth(app);
        const user =  auth.currentUser;

        const q = query(collection(db, 'users'), where('owner_uid', '==', user.uid), limit(1));

        const unsubscribe = onSnapshot(q, snapshot => {
            snapshot.forEach(doc => {
                setCurrentLoggedInUser({
                    username: doc.data().username,
                    profilePicture: doc.data().profile_picture
                });
            });
        });

        return unsubscribe;
    };

    useEffect(() => {
        getUserName();
    }, [])

    const uploadPostToFirebase = (imageUrl, caption) => {
        console.log('Share post')
        const auth = getAuth(app);
        const user =  auth.currentUser;
        const unsubscribe = addDoc(collection(db, 'users', user.email, 'posts'), {
            imageUrl,
            user: currentLoggedInUser.username,
            profile_picture: currentLoggedInUser.profilePicture,
            owner_uid: user.uid,
            owner_email: user.email,
            caption,
            createdAt: serverTimestamp(),
            likes_by_users: [],
            comments: []
        }).then(() => navigation.goBack()).catch((error) => {
            console.log(error)
        })

        return unsubscribe;
    }

    return (
        <Formik
            initialValues={{ caption: '', imageUrl: '' }}
            onSubmit={(values) => uploadPostToFirebase(values.imageUrl, values.caption)}
            validationSchema={uploadPostSchema}
            validateOnMount={true}
            validateOnChange={true}
        >
            {({ handleBlur, handleChange, handleSubmit, values, errors, isValid }) => (
                <>
                    <View
                        style={{
                            margin: 20,
                            justifyContent: 'space-between',
                            flexDirection: 'row'
                        }}
                    >
                        <Image
                            source={{ uri: validUrl.isUri(thumbnailUrl) ? thumbnailUrl : PLACEHOLDER_IMG }}
                            style={{ width: 100, height: 100 }}
                        />

                        <View style={{ flex: 1, marginLeft: 12 }}>
                            <TextInput
                                style={{ color: 'white', fontSize: 20 }}
                                placeholder="Write caption"
                                placeholderTextColor='gray'
                                multiline={true}
                                onChangeText={handleChange('caption')}
                                onBlur={handleBlur('caption')}
                                value={values.caption}
                            />
                        </View>
                    </View>
                    <TextInput
                        style={{ color: 'white', fontSize: 18 }}
                        placeholder="Enter Image url"
                        placeholderTextColor='gray'
                        onChangeText={handleChange('imageUrl')}
                        onChange={(e) => setThumbnailUrl(e.nativeEvent.text)}
                        onBlur={handleBlur('imageUrl')}
                        value={values.imageUrl}
                    />
                    {errors.imageUrl && (
                        <Text style={{ fontSize: 10, color: 'red' }}>
                            {errors.imageUrl}
                        </Text>
                    )}

                    <Pressable
                        onPress={handleSubmit}
                        disabled={!isValid}
                    >
                        <Text style={{ color: '#fff' }}>Share</Text>
                    </Pressable>
                </>
            )}
        </Formik>
    );
};
export default FormikPostUpLoader;
