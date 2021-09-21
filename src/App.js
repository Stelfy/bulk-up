import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./Navbar";
import Home from "./Home";
import NewWorkout from "./NewWorkout";
import Details from "./Details";
import Login from "./Login";
import { useState } from "react";
import { onAuthStateChanged } from "@firebase/auth";
import { auth } from "./firebase";
import { UserContext } from "./UserContext";

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null); //state for current user

  //whenever a user signs in or out it runs the function
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setCurrentUser(user); //sets current user on login / signup
      setIsLoggedIn(true);
    }
    else {
      setIsLoggedIn(false);
    }
  })

  if(!isLoggedIn){
    //loads the login page if the user isn't logged in
    return <Login />
  }

  return (
    <Router>
      <UserContext.Provider value={currentUser}>
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
      </UserContext.Provider>
    </Router>
    
  );
}

export default App;
