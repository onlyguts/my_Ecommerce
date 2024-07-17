import logo from './../logo.svg';
import './../App.css';
import { useNavigate } from "react-router-dom";

function App() {

  fetch('https://localhost:8000/boitier')
  .then(response => console.log(response))
  .then(data => console.log(data))
  .catch(error => console.error(error));

  const navigate = useNavigate();

  const handleClick = () => {
      navigate("/admin");
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <button onClick={handleClick} type="button" >Admin</button>
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