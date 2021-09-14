import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./Navbar";
import Home from "./Home";
import NewWorkout from "./NewWorkout";
import Details from "./Details";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="content">
        <Switch>
          <Route  exact path='/'>
            <Home />
          </Route>
          <Route path='/new-workout'>
            <NewWorkout />
          </Route>
          <Route path='/workout-details/:id'>
            <Details />
          </Route>
        </Switch>
        </div>
      </div>
    </Router>
    
  );
}

export default App;
