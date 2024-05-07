import './App.css';
import SignIn from './components/SignIn';




function App() {
  return (
    <div className="App">
     <div>
      <div id="recaptcha-container"></div>
      <SignIn />
    </div>
    </div>
  );
}

export default App;
