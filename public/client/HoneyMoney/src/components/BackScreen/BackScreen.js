import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import {useDispatch} from 'react-redux';

import {logout} from '../../actions/auth';

const BackScreen = ({navigation}) => {
  const dispatch = useDispatch();
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.navbar} onPress={() => navigation.pop()}>
        <View style={styles.menu} />
        <View style={styles.menu} />
        <View style={styles.menu} />
      </TouchableOpacity>
      <View style={styles.textContainer}>
        <Text style={styles.text} onPress={() => navigation.navigate('Home')}>
          Головна
        </Text>
        <Text
          style={styles.text}
          onPress={() => navigation.navigate('Profile')}>
          Особистий кабінет
        </Text>
        <Text
          style={styles.text}
          onPress={() => navigation.navigate('HistoryScreen')}>
          Історія витрат
        </Text>
        <TouchableOpacity onPress={() => dispatch(logout())}>
          <Text style={styles.exitText}>
            Вихід
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  navbar: {
    flex: 1,
    backgroundColor: '#000',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: '#E5E5E5',
    borderBottomWidth: 2,
  },
  menu: {
    width: 35,
    height: 5,
    backgroundColor: '#C4C4C4',
    marginVertical: 4,
  },
  textContainer: {
    flex: 8,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#333',
  },
  text: {
    fontFamily: 'Montserrat',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 25,
    marginVertical: 20,
    color: '#fff',
  },
  exitText: {
    fontFamily: 'Montserrat',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 25,
    marginVertical: 20,
    color: '#fff',
    backgroundColor: '#FF4F4F',
    borderRadius: 5,
    paddingHorizontal: 7,
    paddingVertical: 2,
  },
});

export default BackScreen;
