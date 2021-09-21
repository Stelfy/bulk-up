import WorkoutList from "./WorkoutList";
import SearchBar from "./SearchBar";
import { useContext, useEffect, useState } from "react";
import { db } from "./firebase";
import { collection, onSnapshot, query, where } from "firebase/firestore"
import { UserContext } from "./UserContext";

const Home = () => {

    //initialise workout list and other with useState
    const [workouts, setWorkouts] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState(null);

    const currentUser = useContext(UserContext);

    //get all documents from "workouts" collection in firebase with corresponding uid
    const updateWorkoutList = () => {
        setIsPending(true);
        const workoutsTemp = [];

        //should update every time db changes, but being in a function negates that I think
        onSnapshot(query(collection(db, "workouts"), where("uid", "==", currentUser.uid)), (querySnapshot) => {
            querySnapshot.docs.forEach((workout) => {
                workoutsTemp.push({...workout.data(), id: workout.id});
            })

            setWorkouts(workoutsTemp);
            setIsPending(false);
            workoutsTemp.length = 0;    // clears the temp array to avoid weird errors
        },
        error => {
            setError(error);    // catches errors for onSnapshot
        });
    }

    //update the workout list on load
    useEffect(() => {
        updateWorkoutList();
        return function cleanup() {onSnapshot(collection(db, "workouts"))}; //does this work??
    }, [])

    
    return (
        <div className="home">
            {workouts && <SearchBar updateWorkoutList={updateWorkoutList} setWorkouts={setWorkouts}/>}
            <h2 className="title">All workouts</h2>
            { isPending && <div className="loading">Loading...</div> }
            { error && <div className="error-message">{ error }</div> }
            { workouts && <WorkoutList workouts={workouts} updateWorkoutList={updateWorkoutList}/>}
        </div>
    );
}
 
export default Home;