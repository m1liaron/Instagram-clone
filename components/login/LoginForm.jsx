import React from 'react';
import {View, Text, StyleSheet, TextInput, Pressable, Alert, Platform} from 'react-native'
import {useNavigation} from "@react-navigation/native";
import Validator from 'email-validator'
import {object, string} from "yup";
import {Formik} from "formik";
import {app} from "../../firebase";

import { getAuth, signInWithEmailAndPassword} from 'firebase/auth'

// todo: make red if not right
const LoginForm = () => {
    const navigation = useNavigation();

    const LoginFormSchema = object().shape ({
        email: string().email().required( 'An email is required'),
        password: string()
        .required()
        .min(6, 'Your password has to have at least 8 characters')
    })

    const onLogin = async (email, password) => {
        try {
            const auth = getAuth(app);
            await signInWithEmailAndPassword(auth, email, password)
            console.log('🔥 Fire base login successfully');
        } catch (error) {
            if(Platform.OS === 'web') {
                alert(error.message)
            } else {
                Alert.alert(
                    'Wooo..',
                    error.message + '\n\n'
                );
            }
        }
    }

    return (
        <View style={styles.container}>
            <Formik
                initialValues={{email: '', password:''}}
                onSubmit={(values) => {
                    console.log({values:{email, password}})
                    onLogin(values.email, values.password)
                }}
                validationSchema={LoginFormSchema}
                validateOnMount={true}
            >
                {({handleChange, handleBlur, handleSubmit, values, isValid}) => (
                    <>
                        <View
                            style={[
                            styles.inputContainer,
                            {
                                borderColor: values.email.length < 1 || Validator.validate(values.email) ? "#ccc" : 'red'
                            }
                        ]}>
                            <TextInput
                                style={styles.input}
                                autoCapitalize="none"
                                keyboardType="email-address"
                                placeholder="Phone number, username or email"
                                textContentType='emailAddress'
                                autoFocus={true}
                                onChangeText={handleChange('email')}
                                onBlur={handleBlur('email')}
                                value={values.email}
                            />
                        </View>
                        <View>
                            <TextInput
                                style={styles.input}
                                placeholder="Password"
                                type="password"
                                secureTextEntry={true}
                                autoFocus={true}
                                onChangeText={handleChange('password')}
                                onBlur={handleBlur('password')}
                                value={values.password}
                            />
                            <Pressable>
                                <Text style={{...styles.link, textAlign:'right'}}>Forgot Password?</Text>
                            </Pressable>
                        </View>
                        <Pressable
                            style={styles.submitButton(isValid)}
                            onPress={handleSubmit}
                            disabled={!isValid}
                        >
                            <Text style={{color:'#fff', textAlign:'center'}}>Log in</Text>
                        </Pressable>
                        <View style={{flexDirection:'row',justifyContent:'center', marginTop:20}}>
                            <Text >Don't have an account? </Text>
                            <Pressable onPress={() => navigation.navigate('Signup')}>
                                <Text style={styles.link}>Sign up</Text>
                            </Pressable>
                        </View>
                    </>
                )}
            </Formik>
        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        flex: 1,
        marginHorizontal: 10,
        marginTop:150
    },
    submitButton:(isValid) => ({
        backgroundColor:isValid ? '#0096F6' : '#9ACAF7',
        width:'100%',
        padding:10,
        borderRadius:5
    }),
    inputContainer:{
        justifyContent:'center'
    },
    input: {
        padding: 10,
        backgroundColor:'#dddddd',
        marginTop:10,
        borderRadius:5
    },
    link:{
        color:'#6bd2e7',
        marginBottom: 10
    }
})

export default LoginForm;
