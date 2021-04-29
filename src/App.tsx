import {BrowserRouter as Router, Switch, Route} from "react-router-dom"
import './App.css';
import Dashboard from "./Components/Dashboard/";
import LoginSignup from './Components/LoginPage/LoginSignup';


function App() {

  return (
    <Router>
      <Switch>
        <Route path="/login" component={LoginSignup}/>
        <Route path="/" component={Dashboard}/>
      </Switch>
    </Router>
  );
}

export default App;
