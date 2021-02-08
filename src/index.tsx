import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { setTranslations, setLocale } from 'react-i18nify';

import App from './App';
import store from './store/Store';
import en from './locale/en';

import './index.css';

// setup translations
setTranslations({
  en,
});
setLocale('en');

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root') as HTMLElement,
);
