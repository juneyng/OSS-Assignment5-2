import it from './it.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={it} className="it-logo" alt="logo" />
        <p>
          React를 배워봅시다! 아래 링크를 클릭해주세요!
        </p>
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
