import { Link } from 'react-router-dom';
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "./firebase";

const WorkoutList = ({ workouts, updateWorkoutList }) => {

    const handleDeleteWorkout = (id) => {
        if (window.confirm('Do you want to delete this workout?')){
            //deleting workout doc using id (note: it won't delete any subcollections)
            deleteDoc(doc(db, "workouts", id))
            .then(() => {
                //calls function passed from Home.js to update the list of workouts
                updateWorkoutList();
            });
        }
    }

    return (
        <div className="workout-list">
            { workouts.map(wo => (
                <section className="workout" key={ wo.id }>
                    <Link id="workout-link" to = {`/workout-details/${wo.id}`}>
                        <h2 className="name">{ wo.title }</h2>
                    </Link> 
                    <button className="delete-workout" onClick = { () => handleDeleteWorkout(wo.id) }>Delete</button>
                </section>       
            ))}
        </div>
    );

}
 
export default WorkoutList;