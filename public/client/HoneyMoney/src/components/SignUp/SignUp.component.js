import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  TextInput,
} from 'react-native';
import {useDispatch} from 'react-redux';
import QRCode from './QRCode';

import {useValidatorRegister} from '../../common/validator';
import sign_up from '../../img/Sign.jpg';
import {sign_up_funk} from '../../actions/auth';

const SignUp = ({navigation}) => {
  const {
    email,
    password,
    password_confirm,
    firstName,
    lastName,
    isEmailValid,
    isPasswordValid,
    isPasswordConfirmValid,
    isFirstNameValid,
    isLastNameValid,
    emailChanged,
    passwordChanged,
    passwordConfirmChanged,
    lastNameChanged,
    firstNameChanged,
    validateEmail,
    validatePassword,
    validatePasswordConfirm,
    validateFirstName,
    validateLastName,
  } = useValidatorRegister();
  const [qrCode, setQrCode] = useState({
    show: false,
    qr_code: 'Family ID (optional)',
  });
  const dispatch = useDispatch();
  const signUp = async () => {
    let r1 = await validateLastName();
    let r2 = await validateFirstName();
    let r3 = await validateEmail();
    let r4 = await validatePassword();
    let r5 = await validatePasswordConfirm();
    if (r1 && r2 && r3 && r4 && r5) {
      dispatch(
        sign_up_funk(
          {
            email,
            password,
            first_name: firstName,
            last_name: lastName,
            family_uuid:
              qrCode.qr_code === 'Family ID (optional)' ? null : qrCode.qr_code,
          },
          navigation,
        ),
      );
    }
  };
  return (
    <View style={styles.container}>
      {qrCode.show ? (
        <QRCode setQr={setQrCode} />
      ) : (
        <ImageBackground source={sign_up} style={styles.image}>
          <View style={styles.fields}>
            <TextInput
              style={isFirstNameValid ? styles.field : styles.err_field}
              placeholder={'First name'}
              placeholderTextColor={'#fff'}
              value={firstName}
              onChangeText={text => firstNameChanged(text)}
              onBlur={validateFirstName}
            />
            {!isFirstNameValid && (
              <Text style={{color: '#FF4F4F'}}>
                Please enter valid first name
              </Text>
            )}
            <TextInput
              style={isLastNameValid ? styles.field : styles.err_field}
              placeholder={'Last name'}
              placeholderTextColor={'#fff'}
              value={lastName}
              onChangeText={text => lastNameChanged(text)}
              onBlur={validateLastName}
            />
            {!isLastNameValid && (
              <Text style={{color: '#FF4F4F'}}>
                Please enter valid last name
              </Text>
            )}
            <TextInput
              style={isEmailValid ? styles.field : styles.err_field}
              placeholder={'email'}
              placeholderTextColor={'#fff'}
              value={email}
              onChangeText={text => emailChanged(text)}
              autoCompleteType={'email'}
              onBlur={validateEmail}
            />
            {!isEmailValid && (
              <Text style={{color: '#FF4F4F'}}>Please enter valid email</Text>
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
              <Text style={{color: '#FF4F4F'}}>
                Please enter valid password
              </Text>
            )}
            <TextInput
              style={isPasswordConfirmValid ? styles.field : styles.err_field}
              placeholder={'confirm password'}
              secureTextEntry={true}
              placeholderTextColor={'#fff'}
              value={password_confirm}
              onChangeText={text => passwordConfirmChanged(text)}
              onBlur={validatePasswordConfirm}
            />
            {!isPasswordConfirmValid && (
              <Text style={{color: '#FF4F4F'}}>Passwords should be equal</Text>
            )}
            <TouchableOpacity
              style={styles.field}
              onPress={() => setQrCode({...qrCode, show: true})}>
              <Text style={styles.text_field}>{qrCode.qr_code}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => signUp()}>
              <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      )}
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
  text_field: {
    fontFamily: 'Montserrat',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 18,
    lineHeight: 22,
    paddingLeft: 11,
    marginVertical: 10,
    color: '#fff',
  },
});

export default SignUp;
