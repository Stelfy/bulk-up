import { getDocs, query, collection, where } from "firebase/firestore";
import db from "./firebase";

const SearchBar = ({setWorkouts, updateWorkoutList}) => {

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    const handleInputChange = (e) => {
        // use search queries to list all workouts with exercise name as value
        getDocs(query(collection(db, "workouts"), where("title", "==", e.target.value)))
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