import { useState } from 'react';
import { Link } from 'react-router-dom';
import Dropdown from './Dropdown';
import { auth } from './firebase';



const Navbar = () => {

    const [isDown, setIsDown] = useState(false);

    const toggleDropdown = () => {
        setIsDown(!isDown);
    }
    
    const handleLogout = () => {
        // logs user out 
        auth.signOut();
    }

    const listItems = [<Link to="/new-workout" onClick={toggleDropdown}>New Workout</Link>];   //set list items

    return (
        <nav className="navbar">
            <div className="title-and-dropdown">
                <button className="dropdown"  onClick={() => toggleDropdown()}><img alt="dropdown" src="https://img.icons8.com/ios-glyphs/60/000000/drag-list-down.png"/></button>
                <Link className="title" to="/"><h1>Bulk up</h1></Link>
                { isDown && <Dropdown listItems={listItems} toggleDropdown={toggleDropdown}/> }
            </div>
            <div className="nav-links">
                <button className="logout" onClick={() => handleLogout()}>Logout</button>
                <Link className="new-workout-link" to="/new-workout">New Workout</Link>
            </div>
        </nav>
    );
}
 
export default Navbar;