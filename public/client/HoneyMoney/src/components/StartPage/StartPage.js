import React, {useEffect, Fragment} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {useDispatch, useSelector} from 'react-redux';
import {View, ActivityIndicator} from 'react-native';

import Main from '../Main/Main.component';
import LogIn from '../LogIn/LogIn.components';
import SignUp from '../SignUp/SignUp.component';
import ForgotPassword from '../ForgotPassword/ForgotPassword.component';
import ResetPassword from '../ForgotPassword/ResetPassword.component';
import Home from '../Home/Home';
import BackScreen from '../BackScreen/BackScreen';
import BudgetScreen from '../BudgetScreen/BudgetScreen';
import HistoryScreen from '../HistoryScreen/HistoryScreen';
import Profile from '../Profile/Profile';
import {byToken} from '../../actions/auth';

const Stack = createStackNavigator();

const StartPage = () => {
  const isAuth = useSelector(state => state.auth.auth);
  const isFetch = useSelector(state => state.auth.fetch);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(byToken());
  }, [dispatch, isAuth, isFetch]);
  return (
    <Fragment>
      {!isFetch && isAuth ? (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'black',
            flex: 1,
          }}>
          <ActivityIndicator size="large" color="#70E19D" />
        </View>
      ) : (
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}>
            {isAuth ? (
              <>
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="BackScreen" component={BackScreen} />
                <Stack.Screen name="Profile" component={Profile} />
                <Stack.Screen name="BudgetScreen" component={BudgetScreen} />
                <Stack.Screen name="HistoryScreen" component={HistoryScreen} />
              </>
            ) : (
              <>
                <Stack.Screen name="Main" component={Main} />
                <Stack.Screen name="SignIn" component={LogIn} />
                <Stack.Screen name="SignUp" component={SignUp} />
                <Stack.Screen
                  name="ForgotPassword"
                  component={ForgotPassword}
                />
                <Stack.Screen name="ResetPassword" component={ResetPassword} />
              </>
            )}
          </Stack.Navigator>
        </NavigationContainer>
      )}
    </Fragment>
  );
};
export default StartPage;
