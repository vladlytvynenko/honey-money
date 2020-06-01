import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Modal,
  ActivityIndicator,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import {useDispatch, useSelector} from 'react-redux';
import {Picker} from '@react-native-community/picker';

import {
  create_category,
  get_categories,
  post_create_budget_line,
} from '../../actions/budget';

const BudgetScreen = ({route, navigation}) => {
  const {isIncome} = route.params;
  const [showModal, setShowModal] = useState(false);
  const categories = useSelector(state => state.budget.categories);
  const status = useSelector(state => state.budget.categoriesStatus);
  const email = useSelector(state => state.auth.user.email);
  const [categorySelect, setCategorySelect] = useState(-1);
  const [categorySelectValid, setCategorySelectValid] = useState(true);
  const [category, setCategory] = useState({
    name: '',
    is_income_category: false,
    valid: true,
  });
  const [budget, setBudget] = useState({
    value: '',
    valid: true,
    note: '',
  });

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(get_categories());
  }, [dispatch]);
  const createBudgetLine = () => {
    if (budget.value !== '') {
      if (categorySelect === -1) {
        setCategorySelectValid(false);
      } else {
        dispatch(
          post_create_budget_line({
            creator: {
              email,
            },
            category: categorySelect,
            value: Number(budget.value),
            note: budget.note,
            is_income: isIncome,
            spending_limit_type: 4,
            category_data: {
              name: categories.find(el => el.value === categorySelect).label,
            },
          }),
        );
        setBudget({...budget, value: '', note: '', valid: true});
      }
    } else {
      setBudget({...budget, valid: false});
    }
  };
  const createCategoryFunc = () => {
    if (category.name) {
      dispatch(
        create_category({
          name: category.name,
          is_income_category: category.is_income_category,
        }),
      );
      setShowModal(false);
    } else {
      setCategory({...category, valid: false});
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
      {!status ? (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'black',
            flex: 8,
          }}>
          <ActivityIndicator size="large" color="#70E19D" />
        </View>
      ) : (
        <View style={styles.main}>
          <Modal animationType="slide" transparent={true} visible={showModal}>
            <View style={styles.modalContainer}>
              <View style={styles.modalView}>
                <TextInput
                  style={category.valid ? styles.field : styles.err_field}
                  placeholder={'Category name'}
                  placeholderTextColor={'#fff'}
                  value={category.name}
                  onChangeText={text =>
                    setCategory({...category, name: text, valid: true})
                  }
                />
                {!category.valid && (
                  <Text style={{color: '#FF4F4F'}}>Name is required.</Text>
                )}
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'row',
                    marginVertical: 15,
                  }}>
                  <Text
                    style={{
                      fontFamily: 'Montserrat',
                      fontStyle: 'normal',
                      fontWeight: 'bold',
                      fontSize: 18,
                      color: '#fff',
                    }}>
                    INCOME ?
                  </Text>
                  <CheckBox
                    disabled={false}
                    value={category.is_income_category}
                    onValueChange={() =>
                      setCategory({
                        ...category,
                        is_income_category: !category.is_income_category,
                      })
                    }
                  />
                </View>
                <View
                  style={{
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexDirection: 'row',
                  }}>
                  <TouchableOpacity
                    styly={{
                      backgroundColor: 'black',
                      borderRadius: 20,
                      padding: 10,
                      elevation: 2,
                    }}
                    onPress={() => createCategoryFunc()}>
                    <Text
                      style={{
                        fontFamily: 'Montserrat',
                        fontStyle: 'normal',
                        fontWeight: 'normal',
                        fontSize: 18,
                        color: '#fff',
                        marginHorizontal: 10,
                      }}>
                      Create
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    styly={{
                      backgroundColor: 'black',
                      borderRadius: 20,
                      padding: 10,
                      elevation: 2,
                    }}
                    onPress={() => setShowModal(false)}>
                    <Text
                      style={{
                        fontFamily: 'Montserrat',
                        fontStyle: 'normal',
                        fontWeight: 'normal',
                        fontSize: 18,
                        color: '#fff',
                        marginHorizontal: 10,
                      }}>
                      Cancel
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
          <View>
            <TextInput
              style={budget.valid ? styles.field : styles.err_field}
              placeholder={'Value'}
              placeholderTextColor={'#fff'}
              value={budget.value}
              onChangeText={text =>
                setBudget({...budget, value: text, valid: true})
              }
              keyboardType={'numeric'}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Picker
              selectedValue={categorySelect}
              style={
                categorySelectValid
                  ? {...styles.field, width: 224}
                  : {...styles.err_field, width: 224}
              }
              onValueChange={(itemValue, itemIndex) => {
                setCategorySelect(itemValue);
                setCategorySelectValid(true);
              }}>
              <Picker.Item key={'mainid'} label={'Select'} value={-1} />
              {categories.filter(el => el.is_income === isIncome).map((el, i) => (
                <Picker.Item key={i} label={el.label} value={el.value} />
              ))}
            </Picker>
            <TouchableOpacity
              onPress={() => setShowModal(true)}
              style={styles.add_new_category}>
              <Text style={styles.add_new_category_text}>+</Text>
            </TouchableOpacity>
          </View>
          <View>
            <TextInput
              style={styles.field}
              placeholder={'Note'}
              value={budget.note}
              onChangeText={text => setBudget({...budget, note: text})}
              placeholderTextColor={'#fff'}
              multiline={true}
            />
          </View>
          <View>
            <TouchableOpacity
              style={styles.send_button}
              onPress={() => createBudgetLine()}>
              <Text style={styles.menuText}>SEND</Text>
            </TouchableOpacity>
          </View>
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
    // paddingTop: 30,
  },
  menuText: {
    fontFamily: 'Montserrat',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 16,
    color: '#fff',
    marginVertical: 10,
    marginHorizontal: 15,
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
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
  modalView: {
    margin: 20,
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 35,
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
  add_new_category: {
    backgroundColor: '#565656',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
    marginLeft: 5,
  },
  add_new_category_text: {
    fontFamily: 'Montserrat',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 20,
    lineHeight: 22,
    color: '#fff',
  },
  send_button: {
    backgroundColor: '#70E19D',
    borderRadius: 10,
  },
});

export default BudgetScreen;
