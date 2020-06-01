import React, {useEffect, useState} from 'react';
import {
  View,
  ImageBackground,
  StyleSheet,
  Text,
  StatusBar,
  TouchableOpacity,
  Modal,
} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import {useSelector, useDispatch} from 'react-redux';
import {get_budget, get_budget_lines, get_categories} from '../../actions/budget';

import image from '../../img/home.png';
import Chart from './Chart';

const Home = ({navigation}) => {
  const dispatch = useDispatch();
  const {
    first_name,
    last_name,
    family: {uuid: family_uuid},
  } = useSelector(state => state.auth.user);
  const [showModal, setShowModal] = useState(false);
  const {
    createBudget,
    budget: {full_difference, expense_categories},
  } = useSelector(state => state.budget);
  useEffect(() => {
    dispatch(get_budget());
    dispatch(get_categories());
    dispatch(get_budget_lines());
  }, [dispatch, createBudget]);
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="black" />
      {family_uuid ? (
        <ImageBackground source={image} style={styles.image}>
          <View style={styles.navbar}>
            <Text
              style={styles.menuText}
              onPress={() =>
                navigation.navigate('Profile')
              }>{`${first_name} ${last_name}`}</Text>
            <TouchableOpacity onPress={() => navigation.navigate('BackScreen')}>
              <View style={styles.menu} />
              <View style={styles.menu} />
              <View style={styles.menu} />
            </TouchableOpacity>
          </View>
          <View style={styles.main}>
            <Modal animationType="slide" transparent={true} visible={showModal}>
              <View style={styles.modalContainer}>
                <View style={styles.modalView}>
                  <TouchableOpacity
                    style={{
                      alignItems: 'center',
                      justifyContent: 'flex-end',
                      flexDirection: 'row',
                    }}
                    onPress={() => setShowModal(false)}>
                    <Text
                      style={{
                        fontFamily: 'Montserrat',
                        fontStyle: 'normal',
                        fontWeight: 'normal',
                        fontSize: 16,
                        color: '#fff',
                        paddingVertical: 10,
                      }}>
                      Close
                    </Text>
                  </TouchableOpacity>
                  {/*<View style={styles.QRcode}>*/}
                  <QRCode
                    value={family_uuid}
                    size={200}
                    color="white"
                    backgroundColor="transparent"
                    // logoMargin={2}
                  />
                  {/*</View>*/}
                </View>
              </View>
            </Modal>
            <View>
              <Text
                style={{
                  fontFamily: 'Montserrat',
                  fontStyle: 'normal',
                  fontWeight: 'bold',
                  fontSize: 18,
                  color: '#fff',
                  paddingHorizontal: 30,
                  paddingTop: 10,
                }}>
                OUTCOME
              </Text>
            </View>
            <Chart expense_categories={expense_categories} />
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                paddingTop: 20,
              }}>
              <Text
                style={{
                  fontFamily: 'Montserrat',
                  fontStyle: 'normal',
                  fontWeight: 'bold',
                  fontSize: 24,
                  color: '#fff',
                  paddingHorizontal: 30,
                  paddingVertical: 10,
                  borderWidth: 1,
                  borderRadius: 10,
                  borderColor: '#fff',
                }}>
                {full_difference}₴
              </Text>
            </View>
          </View>
          <View style={styles.qrcodewrapper}>
            <View style={styles.button_group}>
              <TouchableOpacity
                style={styles.plus_but}
                onPress={() =>
                  navigation.navigate('BudgetScreen', {isIncome: true})
                }>
                <Text style={styles.button_text}>+</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.div_but}
                onPress={() =>
                  navigation.navigate('BudgetScreen', {isIncome: false})
                }>
                <Text style={styles.button_text}>-</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={styles.QRcode}
              onPress={() => setShowModal(true)}>
              <QRCode
                value={family_uuid}
                size={50}
                color="white"
                backgroundColor="transparent"
                logoMargin={2}
              />
            </TouchableOpacity>
          </View>
        </ImageBackground>
      ) : (
        <View>
          <Text>wait</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    paddingBottom: 5,
  },
  menuText: {
    fontFamily: 'Montserrat',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 18,
    color: '#fff',
  },
  menu: {
    width: 35,
    height: 5,
    backgroundColor: '#C4C4C4',
    marginVertical: 4,
  },
  qrcodewrapper: {
    flex: 2,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 3,
  },
  QRcode: {
    padding: 5,
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 5,
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
  main: {
    flex: 4,
    borderBottomColor: '#E5E5E5',
    borderTopColor: '#E5E5E5',
    borderWidth: 2,
    width: '100%',
    justifyContent: 'center',
    // alignItems: 'center',
  },
  plus_but: {
    flex: 0.25,
    backgroundColor: '#64D390',
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  div_but: {
    flex: 0.25,
    backgroundColor: '#FF4F4F',
    marginHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  button_group: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: 30,
    marginVertical: 20,
  },
  button_text: {
    color: '#fff',
    fontSize: 60,
    fontWeight: 'bold',
  },
  modalView: {
    // margin: 20,
    backgroundColor: 'black',
    borderRadius: 20,
    padding: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
});

export default Home;
