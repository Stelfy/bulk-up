import { getDocs, query, collection, where } from "firebase/firestore";
import { useContext } from "react";
import { db } from "./firebase";
import { UserContext } from "./UserContext";

const SearchBar = ({setWorkouts, updateWorkoutList}) => {

    const currentUser = useContext(UserContext);

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    const handleInputChange = (e) => {
        // use search queries to list all workouts with exercise name as value, using <= and >= operators to match the start of the value 
        getDocs(query(collection(db, "workouts"), where("uid", "==", currentUser.uid), where("title", ">=", e.target.value ), where("title", "<=", e.target.value+'\uf8ff')))    
            .then((querySnapshot) => {
                const workoutsTemp=[];

                querySnapshot.forEach((workout) => {
                    workoutsTemp.push({...workout.data(), id: workout.id});
                })

                setWorkouts(workoutsTemp);
                workoutsTemp.length = 0;

                if (!e.target.value)            //if the value searched is empty, dont use query                 
                    updateWorkoutList();
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