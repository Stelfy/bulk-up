import { useEffect } from "react";

const SearchBar = ({list, updateList}) => {

    useEffect(() => {
        updateList(list);
    }, [list, updateList]);

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    const handleInputChange = (e) => {
        let uri = `https://my-json-server.typicode.com/Stelfy/bulk-up-fake-server/workouts`;
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
        <form onSubmit={(e) => handleSubmit(e)} className="search-bar">
            <input type="text" className="search-input" placeholder="Search Workout" 
            onChange={ (e) => handleInputChange(e)}
            />
        </form>
    );
}
 
export default SearchBar;