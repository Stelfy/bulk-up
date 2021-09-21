import { useParams } from "react-router-dom";
import ExerciseList from "./ExerciseList";
import { useEffect, useState } from "react";
import NewWorkout from "./NewWorkout";
import { onSnapshot, doc } from "@firebase/firestore";
import { db } from "./firebase";

const Details = () => {
    const { id } = useParams();
    
    const [workout, setWorkout] = useState();
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        setIsPending(true);
        // add workout with id 
        const unsub = onSnapshot(doc(db, "workouts", id), (workoutQuery) => {
            setWorkout({...workoutQuery.data(), id: workoutQuery.id});
            setIsPending(false);
        }, 
        error => {
            setError(error);    // returns an error for onSnapshot
        })
        return unsub;
    }, [id])

    const [isModifying, setIsModifying] = useState(false);

    const modifyWorkout = () => {
        setIsModifying(true);
    }

    return (
        <div className="workout-details">
            { isPending && <div className="loading">Loading...</div> }
            { error && <div className="error-message">{ error }</div> }
            { workout && !isModifying &&
                <div className="workout">
                    <h2 className="title">{ workout.title }</h2>
                    <div className="exercise">
                        <ExerciseList exercises={workout.exercises} workoutID={workout.id} />
                    </div>
                    <button className="modify-workout" onClick={() => modifyWorkout()}>Modify</button>
                </div> }
            { isModifying && 
                <NewWorkout modifiedWorkout={workout}/>
                }
            
        </div>
    );
}
 
export default Details;