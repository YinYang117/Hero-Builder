import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ModalProvider } from './context/Modal';
import { HeroProvider } from './context/SelectedHero'
import configureStore from './store';
import App from './App';
import './index.css';

const store = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <HeroProvider>
      <Provider store={store}>
        <ModalProvider>
          <App />
        </ModalProvider>
      </Provider>
    </HeroProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
