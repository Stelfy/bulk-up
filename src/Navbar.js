import { Link } from 'react-router-dom';
import { auth } from './firebase';

const Navbar = () => {

    const handleLogout = () => {
        // logs user out 
        auth.signOut();
    }

    return (
        <nav className="navbar">
            <Link className="title" to="/"><h1>Bulk up</h1></Link>  
            <div className="nav-links">
                <button className="logout" onClick={() => handleLogout()}>Logout</button>
                <Link className="new-workout-link" to="/new-workout">New Workout</Link>
            </div>
        </nav>
    );
}
 
export default Navbar;