import './App.css';
import { translate } from 'react-i18nify';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>{ translate('hello') }</p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
