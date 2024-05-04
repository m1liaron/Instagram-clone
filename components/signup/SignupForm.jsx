import React from 'react';
import {View, Text, StyleSheet, TextInput, Pressable} from 'react-native'
import {useNavigation} from "@react-navigation/native";
import Validator from 'email-validator'
import {object, string} from "yup";
import {Formik} from "formik";

// todo: make red if not right
const SignUpForm = () => {
    const navigation = useNavigation();

    const LoginFormSchema = object().shape ({
        email: string().email().required( 'An email is required'),
        username: string().required().min(2, 'A username is required'),
        password: string()
            .required()
            .min(6, 'Your password has to have at least 8 characters')
    })
    return (
        <View style={styles.container}>
            <Formik
                initialValues={{email: '', username:'', password:''}}
                onSubmit={(values) => {
                    console.log(values)
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
                        <View
                            style={[
                                styles.inputContainer,
                                {
                                    borderColor: values.username.length < 1 || Validator.validate(values.email) ? "#ccc" : 'red'
                                }
                            ]}>
                            <TextInput
                                style={styles.input}
                                placeholder="Write username..."
                                autoCapitalize="none"
                                textContentType='username'
                                onChangeText={handleChange('username')}
                                onBlur={handleBlur('username')}
                                value={values.username}
                            />
                        </View>
                        <View
                            style={[
                                styles.inputContainer,
                                {
                                    borderColor: values.password.length < 1 || Validator.validate(values.email) ? "#ccc" : 'red'
                                }
                            ]}>

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
                        </View>
                        <Pressable
                            style={styles.submitButton(isValid)}
                            onPress={handleSubmit}
                            disabled={!isValid}
                        >
                            <Text style={{color:'#fff', textAlign:'center'}}>Log in</Text>
                        </Pressable>
                        <View style={{flexDirection:'row',justifyContent:'center', marginTop:20}}>
                            <Text >Already have an account? </Text>
                            <Pressable onPress={() => navigation.navigate('Login')}>
                                <Text style={styles.link}>Log in</Text>
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
        backgroundColor:'#f4f4f4',
        marginBottom:10,
        borderRadius:2,
    },
    link:{
        color:'#6bd2e7',
        marginBottom: 10
    }
})

export default SignUpForm;