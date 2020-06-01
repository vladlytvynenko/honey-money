import React, {useEffect} from 'react';
import 'react-native-gesture-handler';
import {View} from 'react-native';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import axiosMiddleware from 'redux-axios-middleware';
import axios from 'axios';
import {composeWithDevTools} from 'redux-devtools-extension';

import rootreducer from './src/reducers/rootreducer';
import StartPage from './src/components/StartPage/StartPage';
import PushNotificationManager from './src/common/PushNotificationsManager';
import {Provider} from 'react-redux';

const client = axios.create({
  responseType: 'json',
});

const store = createStore(
  rootreducer,
  composeWithDevTools(applyMiddleware(axiosMiddleware(client), thunk)),
);

const App = () => {
  return (
    <Provider store={store}>
      <PushNotificationManager>
        <View style={{flex: 1}}>
          <StartPage />
        </View>
      </PushNotificationManager>
    </Provider>
  );
};

export default App;
