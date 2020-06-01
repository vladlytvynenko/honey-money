import React, {useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';

import {delete_budget_line} from '../../actions/budget';

const HistoryScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const {categories, results} = useSelector(state => state.budget);
  useEffect(() => {}, [results, categories]);
  return (
    <View style={styles.container}>
      <View style={styles.navbar}>
        <Text style={styles.navText} onPress={() => navigation.pop()}>
          Go back
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('BackScreen')}>
          <View style={styles.menu} />
          <View style={styles.menu} />
          <View style={styles.menu} />
        </TouchableOpacity>
      </View>
      <View style={styles.historyContainer}>
        <Text
          style={{
            fontFamily: 'Montserrat',
            fontStyle: 'normal',
            fontWeight: 'normal',
            fontSize: 25,
            marginVertical: 20,
            color: '#fff',
          }}>
          History
        </Text>
        <FlatList
          data={results}
          renderItem={({item}) => (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
              key={item.id}>
              <Text
                style={{
                  fontFamily: 'Montserrat',
                  fontStyle: 'normal',
                  fontWeight: 'normal',
                  fontSize: 18,
                  marginVertical: 10,
                  color: '#fff',
                  marginHorizontal: 10,
                }}>
                {
                  categories.find(
                    el => Number(el.value) === Number(item.category),
                  ).label
                  //   item.category
                }
              </Text>
              <Text
                style={{
                  fontFamily: 'Montserrat',
                  fontStyle: 'normal',
                  fontWeight: 'normal',
                  fontSize: 18,
                  marginVertical: 10,
                  color: '#fff',
                  marginHorizontal: 10,
                }}>
                {item.value}₴
              </Text>
              <Text
                style={styles.exitText}
                onPress={() => dispatch(delete_budget_line(item.id))}>
                Del
              </Text>
            </View>
          )}
          keyExtractor={item => item.id}
        />
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
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: 25,
    },
  menu: {
    width: 35,
    height: 5,
    backgroundColor: '#C4C4C4',
    marginVertical: 4,
  },
  historyContainer: {
    flex: 8,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#333',
  },
  exitText: {
    fontFamily: 'Montserrat',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 18,
    marginVertical: 20,
    color: '#fff',
    backgroundColor: '#FF4F4F',
    borderRadius: 5,
    paddingHorizontal: 7,
    paddingVertical: 2,
  },
    navText: {
        fontFamily: 'Montserrat',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: 20,
        color: '#fff',
    },
});

export default HistoryScreen;
