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
import ErrorPage from "./ErrorPage";
import CalCounter from "./CalCounter";
import Biometrics from "./Biometrics";

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null); //state for current user
  const [isAuthenticating, setIsAuthenticating] = useState(true);  //state for is authenticating boolean

  //whenever a user signs in or out it runs the function
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setCurrentUser(user); //sets current user on login / signup
      setIsLoggedIn(true);
    }
    else {
      setIsLoggedIn(false);
    }
    setIsAuthenticating(false); //sets the is authenticating boolean 
  })

  if(!isLoggedIn && !isAuthenticating){
    //loads the login page if the user isn't logged in
    return <Login />
  }

  return (
    !isAuthenticating && (  // this is so the page loads only when the user is authenticated
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
            <Route path='/calories'>
              <CalCounter />
            </Route>
            <Route path='/biometrics'>
              <Biometrics />
            </Route>
            <Route path='*'>
              <ErrorPage />
            </Route>
          </Switch>
          </div>
        </div>
      </UserContext.Provider>
    </Router>
    )
  );
}

export default App;
