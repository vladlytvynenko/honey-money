import React, {useEffect} from 'react';
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Platform,
  Linking,
} from 'react-native';

import main from '../../img/main.jpg';

const Main = ({navigation}) => {
  const navigate = url => {
    console.log(1, url);
    const route = url.replace(/.*?:\/\//g, '');
    const routeName = route.split('/')[0];

    if (routeName === 'reset_password') {
      navigate('ResetPassword');
    }
  };
  const handleOpenURL = e => {
    navigate(e.url);
  };
  useEffect(() => {
    if (Platform.OS === 'android') {
      Linking.getInitialURL().then(url => {
        if (url) navigate(url);
      });
    } else {
      Linking.addEventListener('url', handleOpenURL);
    }
    return () => {
      Linking.removeEventListener('url', handleOpenURL);
    };
  }, []);
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#121212" barStyle="light-content" />
      <ImageBackground source={main} style={styles.image}>
        <View style={styles.fields}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('SignIn')}>
            <Text style={styles.buttonText}>Sign In</Text>
          </TouchableOpacity>
          <Text
            style={styles.registerText}
            onPress={() => navigation.navigate('SignUp')}>
            Register
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
    width: '100%',
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  button: {
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    height: 72,
    backgroundColor: '#FF4F4F',
    borderRadius: 30,
  },
  buttonText: {
    color: '#fff',
    fontFamily: 'Montserrat',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 30,
    lineHeight: 37,
  },
  registerText: {
    fontFamily: 'Montserrat',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 18,
    lineHeight: 22,
    textDecorationLine: 'underline',
    color: '#fff',
    marginVertical: 10,
  },
  fields: {
    marginTop: '40%',
    height: '50%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Main;
