import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ModalProvider } from './context/Modal';
import { HeroProvider } from './context/HeroContext'
import { AbilProvider } from './context/AbilContext'
import configureStore from './store';
import App from './App';
import './index.css';

const store = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <HeroProvider>
    <AbilProvider>
      <Provider store={store}>
        <ModalProvider>
          <App />
        </ModalProvider>
      </Provider>
    </AbilProvider>
    </HeroProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// TODO
// Changes for React 18

// import ReactDOM from 'react-dom/client';

// ReactDOM.render() replaced by
// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(<App />);
