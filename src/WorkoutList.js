import { useState } from 'react';
import { Link } from 'react-router-dom';

const WorkoutList = ({ workouts }) => {

    const [workoutsTemp, setWorkoutsTemp] = useState(workouts);

    const handleDeleteWorkout = (id) => {
        if (window.confirm('Do you want to delete this workout?')){
            fetch(`https://my-json-server.typicode.com/Stelfy/bulk-up-fake-server/workouts/${id}`, {
                method: 'DELETE',
                headers: {'Content-Type': 'application/json'},
                body: null,
            })
            .then( () => {
                setWorkoutsTemp(workouts.filter(wo => wo.id !== id));
            });
        }
    }

    
    return (
        <div className="workout-list">
            { workoutsTemp.map(wo => (
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