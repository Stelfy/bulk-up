import { auth } from "./firebase";

const Dropdown = ({listItems}) => {

    const handleLogout = () => {
        auth.signOut();
    }

    return (
        <ul className="dropdown-list">
            <li onClick={()=>handleLogout()}>Logout</li>
            { listItems && listItems.map((item, index) => <li key={index}>{item}</li>) }
        </ul>
    );
}
 
export default Dropdown;