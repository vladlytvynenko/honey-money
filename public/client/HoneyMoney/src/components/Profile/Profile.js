import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  TextInput,
  Modal,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';

import {put_Budget, get_budget_lines} from '../../actions/budget';

const Profile = ({navigation}) => {
  const dispatch = useDispatch();
  const {
    first_name,
    last_name,
    email,
    family: {members},
  } = useSelector(state => state.auth.user);
  const [selected, setSelected] = useState(-1);
  const {
    createBudget,
    categories,
    budget: {full_difference, spending_limit},
    results,
  } = useSelector(state => state.budget);
  const [limit, setLimit] = useState({value: '', valid: true});
  const [modal, setModal] = useState(false);
  useEffect(() => {
    dispatch(get_budget_lines());
  }, [createBudget, dispatch, selected]);

  const putBudget = () => {
    if (limit.value) {
      dispatch(
        put_Budget({
          spending_limit: Number(limit.value),
        }),
      );
      setLimit({value: '', valid: true});
      setModal(false);
    } else {
      setLimit({...limit, valid: false});
    }
  };

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
      <View style={styles.main}>
        <Modal animationType="slide" transparent={true} visible={modal}>
          <View style={styles.modalContainer}>
            <View style={styles.modalView}>
              <Text style={styles.menuText}>Set limit</Text>
              <TextInput
                style={limit.valid ? styles.field : styles.err_field}
                placeholder={'Limit'}
                placeholderTextColor={'#fff'}
                value={limit.value}
                onChangeText={text =>
                  setLimit({...limit, value: text, valid: true})
                }
                keyboardType={'numeric'}
              />
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <TouchableOpacity
                  style={{marginHorizontal: 5}}
                  onPress={() => putBudget()}>
                  <Text style={styles.menuText}>SET</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{marginHorizontal: 5}}
                  onPress={() => setModal(false)}>
                  <Text style={styles.menuText}>CLOSE</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
        <Text style={styles.menuText}>{`${first_name} ${last_name}`}</Text>
        <Text style={styles.menuText}>{email}</Text>
        {/*<TextInput*/}
        {/*  style={styles.textInputStyle}*/}
        {/*  placeholder="Email"*/}
        {/*  placeholderTextColor={'#fff'}*/}
        {/*/>*/}
        {/*<TextInput*/}
        {/*  style={styles.textInputStyle}*/}
        {/*  placeholder="Phone"*/}
        {/*  placeholderTextColor={'#fff'}*/}
        {/*/>*/}
        <View style={styles.budgetContainer}>
          <TouchableOpacity
            style={{justifyContent: 'center', alignItems: 'center'}}
            onPress={() => setModal(true)}>
            <Text style={styles.budgetTitle}>Ліміт на день:</Text>
            <View style={styles.budget}>
              <Text style={styles.budgetValues}>
                {spending_limit ? spending_limit : '0'}₴
              </Text>
              <Text style={styles.budgetSubTitle}>Натисніть, щоб змінити</Text>
            </View>
          </TouchableOpacity>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Text style={styles.budgetTitle}>Доступно:</Text>
            <View style={styles.budget}>
              <Text style={styles.budgetValues}>{full_difference}₴</Text>
            </View>
          </View>
        </View>
        <Text style={{...styles.menuText, marginVertical: 0}}>Моя сім'я</Text>
        <FlatList
          data={members
            .filter(el => el.email !== email)
            .map((el, i) => ({...el, id: i + 1}))}
          renderItem={({item}) => (
            <TouchableOpacity
              style={styles[`familyMemberCard${item.id % 2}`]}
              onPress={() =>
                Number(selected) === Number(item.id)
                  ? setSelected(-1)
                  : setSelected(item.id)
              }>
              <Text style={styles.familyMemberCardText}>
                {item.first_name} {item.last_name}
              </Text>
              {Number(selected) === Number(item.id) && (
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
                    In/Outcome
                  </Text>
                  <FlatList
                    data={results.filter(el => el.creator.email === item.email)}
                    renderItem={({item: a}) => (
                      <View
                        key={item.id + 'budget'}
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
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
                          {
                            categories.find(
                              el => Number(el.value) === Number(a.category),
                            ).label
                          }
                        </Text>
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
                          {a.value}₴
                        </Text>
                      </View>
                    )}
                    keyExtractor={a => item.id}
                  />
                </View>
              )}
            </TouchableOpacity>
          )}
          keyExtractor={item => item.email}
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
  navText: {
    fontFamily: 'Montserrat',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 20,
    color: '#fff',
  },
  main: {
    flex: 8,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    paddingVertical: 20,
    width: '100%',
  },
  menuText: {
    fontFamily: 'Montserrat',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 20,
    color: '#fff',
    marginVertical: 20,
  },
  textInputStyle: {
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
  budgetContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  budget: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    borderWidth: 1,
    borderRadius: 21,
    borderColor: '#fff',
    paddingHorizontal: 15,
    height: '37%',
    marginHorizontal: 10,
  },
  budgetTitle: {
    fontFamily: 'Montserrat',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 18,
    color: '#fff',
    marginBottom: 5,
  },
  budgetValues: {
    fontFamily: 'Montserrat',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 48,
    color: '#fff',
  },
  budgetSubTitle: {
    fontFamily: 'Montserrat',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 9,
    color: '#fff',
  },
  familyMemberCard0: {
    backgroundColor: '#70E19D',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginVertical: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  familyMemberCard1: {
    backgroundColor: '#CD70F9',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginVertical: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  familyMemberCardText: {
    fontFamily: 'Montserrat',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 20,
    color: '#FFFFFF',
    marginHorizontal: 30,
    marginVertical: 10,
  },
  err_field: {
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
    borderColor: '#FF4F4F',
    borderWidth: 2,
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
    // marginVertical: 10,
    color: '#fff',
  },
  modalView: {
    margin: 20,
    backgroundColor: '#F194FF',
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

export default Profile;
