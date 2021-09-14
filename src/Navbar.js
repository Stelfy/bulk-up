import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="navbar">
            <Link className="title" to="/"><h1>Bulk up</h1></Link>  
            <Link className="new-workout-link" to="/new-workout">New Workout</Link>
        </nav>
    );
}
 
export default Navbar;