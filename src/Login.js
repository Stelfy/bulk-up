import { auth } from "./firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "@firebase/auth";
import { useState } from "react";

const Login = () => {

    const [error, setError] = useState();
    const [password, setPassword] = useState();
    const [email, setEmail] = useState();

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        //signs in the user if exists, or gives an error
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
        })
        .catch((err) => {
            setError('User not found.\nTry signing up.');
        })
    }

    const handleSignup = () => {

        //sign up and sign in the user
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
        })
        .catch((err) => {
            setError(err.message);
        })
    }

    return (
        <div className="login">
            <h1 className="login-title">Login</h1>
            <form className="login-form" onSubmit={(e) => {handleSubmit(e)}}>
                <div className="email">
                    <label htmlFor="email-input" className="email-label">Email</label>
                    <input type="email" name="emailInput" className="email-input" onChange={(e) => handleEmailChange(e)}/>
                </div>
                <div className="password">
                    <label htmlFor="password-input" className="password-label">Password</label>
                    <input type="text" name="passwordInput" className="password-input" onChange={(e) => handlePasswordChange(e)}/>
                </div>
                <div className="buttons">
                    <button className="login-button">Login</button>
                    <button className="signup-button" type="button" onClick={() => handleSignup()}>Signup</button>
                </div>
            </form>
            { error && <h2 className="error-message">{ error }</h2>}
        </div>
    );
}
 
export default Login;
