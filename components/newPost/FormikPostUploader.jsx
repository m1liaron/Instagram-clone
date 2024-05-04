import React, {useState} from 'react';
import {View, Text, StyleSheet, Image, TextInput, Pressable} from 'react-native'
import {object, string} from "yup";
import {Formik, ErrorMessage} from "formik";

const PLACEHOLDER_IMG = 'https://cdn.pixabay.com/photo/2016/06/10/16/23/beaver-1448389_960_720.jpg';

const uploadPostSchema = object().shape({
    imageUrl: string().url().required('A URL is required'),
    caption: string().max(2200, 'Caption has reached the character limit'),
})

const FormikPostUpLoader = () => {
    const [thubmnailUrl, setThubmnailUrl] = useState(PLACEHOLDER_IMG);

    return (
        <Formik
            initialValues={{caption: '', imageUrl: ''}}
            onSubmit={(value) => console.log(value)}
            validationSchema={uploadPostSchema}
            validateOnMount={true}
            validateOnChange={true}
        >
            {({handleBlur, handleChange, handleSubmit, values, errors, isValid}) => (
                <>
                <View
                    style={{
                        margin: 20,
                        justifyContent:'space-between',
                        flexDirection: 'row'
                    }}
                >
                    <Image
                        source={{uri: thubmnailUrl}}
                        style={{width: 100, height:100}}
                    />

                   <View style={{flex:1, marginLeft: 12}}>
                       <TextInput
                           style={{color:'white', fontSize: 20}}
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
                        style={{color:'white', fontSize: 18}}
                        placeholder="Enter Image url"
                        placeholderTextColor='gray'
                        onChangeText={handleChange('imageUrl')}
                        onChange={(e) => setThubmnailUrl(e.nativeEvent.text)}
                        onBlur={handleBlur('imageUrl')}
                        value={values.imageUrl}
                    />
                    {errors.imageUrl && (
                        <Text style={{fontSize:10, color:'red'}}>
                            {errors.imageUrl}
                        </Text>
                    )}

                    <Pressable
                        onPress={handleSubmit}
                        disabled={!isValid}>
                        <Text style={{color:'#fff'}}>Share</Text>
                    </Pressable>
                </>
            )}
        </Formik>
    );
};

const styles = StyleSheet.create({
    text:{

    }
})

export default FormikPostUpLoader;
