import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { setTranslations, setLocale } from 'react-i18nify';
import en from './locale/en';

import App from './App';
import store from './store/Store';

import './index.css';

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
