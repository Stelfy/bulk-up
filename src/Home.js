import WorkoutList from "./WorkoutList";
import SearchBar from "./SearchBar";
import { useContext, useEffect, useState } from "react";
import { db } from "./firebase";
import { collection, getDocs, query, where } from "firebase/firestore"
import { UserContext } from "./UserContext";

const Home = () => {

    //initialise workout list and other with useState
    const [workouts, setWorkouts] = useState(null);
    const [workoutsFiltered, setWorkoutsFiltered] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState(null);

    const currentUser = useContext(UserContext);

    //get all documents from "workouts" collection in firebase with corresponding uid
    const updateWorkoutList = () => {
        setIsPending(true);
        const workoutsTemp = [];

        //gets all docs in collection "workouts"
        getDocs(query(collection(db, "workouts"), where("uid", "==", currentUser.uid)))
            .then(querySnapshot => {
                querySnapshot.forEach(workout => {
                    workoutsTemp.push({...workout.data(), id: workout.id});
                });

                setWorkouts(workoutsTemp);
                setWorkoutsFiltered(workoutsTemp);
                setIsPending(false);
            })
            .catch(err => {
                setError(err.message);
                setIsPending(false);
            })
     }

    //update the workout list on load
    useEffect(() => {
        updateWorkoutList();
        // eslint-disable-next-line
    }, [])
    
    return (
        <div className="home">
            { workouts && <SearchBar workouts={workouts} setWorkoutsFiltered={setWorkoutsFiltered}/> }
            <h2 className="title">All workouts</h2>
            { isPending && <div className="loading">Loading...</div> }
            { error && <div className="error-message">{ error }</div> }
            { workoutsFiltered && <WorkoutList workouts={workoutsFiltered} updateWorkoutList={updateWorkoutList}/> }
        </div>
    );
}
 
export default Home;