import { useEffect } from "react";

const SearchBar = ({list, updateList}) => {

    useEffect(() => {
        updateList(list);
    }, [list, updateList]);

    const handleInputChange = (e) => {
        let uri = `http://localhost:8000/workouts`;
        const term = e.target.value;
    
        if (term){
            uri += `?q=${term.trim()}`;
        }
        fetch(uri)
        .then(res => {
            return res.json();
        })
        .then(data => {
            updateList(data);
        });  
    }

    return (
        <form className="search-bar">
            <input type="text" className="search-input" placeholder="Search Workout" 
            onChange={ (e) => handleInputChange(e)}
            />
        </form>
    );
}
 
export default SearchBar;