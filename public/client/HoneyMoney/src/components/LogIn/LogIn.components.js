import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ImageBackground,
  TextInput,
} from 'react-native';
import {useDispatch} from 'react-redux';

import {sign_in_func} from '../../actions/auth';
import image from '../../img/login.jpg';
import {useValidatorLogIn} from '../../common/validator';

const LogIn = ({navigation}) => {
  const {
    email,
    password,
    isEmailValid,
    isPasswordValid,
    emailChanged,
    passwordChanged,
    validateEmail,
    validatePassword,
  } = useValidatorLogIn();
  const dispatch = useDispatch();
  const signIn = async () => {
    const r1 = await validateEmail();
    const r2 = await validatePassword();
    if (r1 && r2) {
      dispatch(
        sign_in_func({
          email,
          password,
        }),
      );
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={image} style={styles.image}>
        <View style={styles.fields}>
          <TextInput
            style={isEmailValid ? styles.field : styles.err_field}
            placeholder={'email'}
            placeholderTextColor={'#fff'}
            value={email}
            onChangeText={text => emailChanged(text)}
            onBlur={validateEmail}
          />
          {!isEmailValid && (
            <Text style={{color: '#FF4F4F'}}>Enter valid email.</Text>
          )}
          <TextInput
            style={isPasswordValid ? styles.field : styles.err_field}
            placeholder={'password'}
            secureTextEntry={true}
            placeholderTextColor={'#fff'}
            value={password}
            onChangeText={text => passwordChanged(text)}
            onBlur={validatePassword}
          />
          {!isPasswordValid && (
            <Text style={{color: '#FF4F4F'}}>Enter valid password</Text>
          )}
          <TouchableOpacity style={styles.button} onPress={() => signIn()}>
            <Text style={styles.buttonText}>Sign In</Text>
          </TouchableOpacity>
          <Text
            style={styles.forgotText}
            onPress={() => navigation.navigate('ForgotPassword')}>
            Forgot password?
          </Text>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  button: {
    width: 239,
    justifyContent: 'center',
    alignItems: 'center',
    height: 72,
    backgroundColor: '#FF4F4F',
    borderRadius: 30,
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontFamily: 'Montserrat',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 30,
    lineHeight: 37,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    flexDirection: 'column',
  },

  fields: {
    height: '50%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  field: {
    height: 40,
    width: 274,
    borderRadius: 10,
    backgroundColor: '#565656',
    fontFamily: 'Montserrat',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 18,
    lineHeight: 22,
    paddingLeft: 11,
    marginVertical: 10,
    color: '#fff',
  },
  forgotText: {
    fontFamily: 'Montserrat',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 18,
    lineHeight: 22,
    textDecorationLine: 'underline',
    color: '#fff',
  },
  err_field: {
    height: 40,
    width: '80%',
    borderRadius: 10,
    backgroundColor: '#565656',
    fontFamily: 'Montserrat',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 18,
    lineHeight: 22,
    paddingLeft: 11,
    marginVertical: 10,
    color: '#fff',
    borderColor: '#FF4F4F',
    borderWidth: 2,
  },
});

export default LogIn;
