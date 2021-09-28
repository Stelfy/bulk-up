import { useEffect } from "react";
import { auth } from "./firebase";

const Dropdown = ({listItems, toggleDropdown}) => {

    const handleLogout = () => {
        auth.signOut();
    }

    const handleUnfocus = () => {
        toggleDropdown();   //passed function that closes the dropdown
    }

    useEffect(() => {
        document.getElementById("dropdown-list").focus();   //sets the list to focused on load
    }, []);

    return (
        <ul tabIndex="1" id="dropdown-list" className="dropdown-list"  onBlur={handleUnfocus} >
            <li onClick={()=>handleLogout()}>Logout</li>
            { listItems && listItems.map((item, index) => <li key={index}>{item}</li>) }
        </ul>
    );
}
 
export default Dropdown;