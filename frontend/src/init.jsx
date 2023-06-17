/* eslint-disable react/jsx-no-constructed-context-values */
import i18next from 'i18next';
import { configureStore } from '@reduxjs/toolkit';
import { io } from 'socket.io-client';
import { Provider } from 'react-redux';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { SocketContext } from './contexts/SocketProvider';
import App from './components/App';
import resources from './locales/index';
import reducer, { actions } from './slices/index';
import 'bootstrap/dist/css/bootstrap.min.css';

const init = async () => {
  const i18n = i18next.createInstance();
  await i18n
    .use(initReactI18next)
    .init({
      resources,
      lng: 'ru',
      fallbackLng: 'ru',
    });

  const store = configureStore({
    reducer,
  });
  const socket = io();

  const withConfirm = (...arg) => new Promise((resolve, reject) => {
    socket.timeout(3000).emit(...arg, (err, response) => {
      if (response?.status === 'ok') {
        resolve(response.data);
      }
      reject(err);
    });
  });

  const api = {
    sendMessage: (message) => withConfirm('newMessage', message),
    sendChannel: (channel) => withConfirm('newChannel', channel),
    renameChannel: (channel) => withConfirm('renameChannel', channel),
  };
  socket.on('newMessage', (payload) => {
    store.dispatch(actions.addMessage(payload));
  });
  socket.on('newChannel', (payload) => {
    store.dispatch(actions.addChannel(payload));
  });
  socket.on('renameChannel', (payload) => {
    store.dispatch(actions.updateChannel(payload));
  });

  return (
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <SocketContext.Provider value={{ api }}>
          <App />
        </SocketContext.Provider>
      </I18nextProvider>
    </Provider>
  );
};

export default init;
