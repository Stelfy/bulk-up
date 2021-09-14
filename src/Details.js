import { useParams } from "react-router-dom";
import useFetch from "./useFetch";
import ExerciseList from "./ExerciseList";
import { useState } from "react";
import NewWorkout from "./NewWorkout";

const Details = () => {
    const { id } = useParams();
    const { data:workout, isPending, error } = useFetch(`http://localhost:8000/workouts/${id}`)

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
                        <ExerciseList exercises={workout.exercises} workoutIndex={workout.id} />
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