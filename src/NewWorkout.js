import { useState } from "react";
import { useHistory } from "react-router";

const NewWorkout = ({modifiedWorkout}) => {

    let initialExercises = [{name: "", reps: [''], weight: ['']}];
    let initialTitle = '';

    if (modifiedWorkout){
        initialExercises = [...modifiedWorkout.exercises];
        initialTitle = modifiedWorkout.title;
    }
    
    const [exercises, setExercises] = useState(initialExercises); 
    const [title, setTitle] = useState(initialTitle);

    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState(null);

    const history = useHistory();

    const handleTitle = (e) => {
        setTitle(e.target.value);
    }

    const handleInputChangeEx = (e, i) => {
        const list = [...exercises];
        const {name, value} = e.target;
        list[i][name] = value;
        setExercises(list);
    }

    const handleDeleteEx = (index) => {
        const list = [...exercises];
        list.splice(index, 1);
        setExercises(list);
    }

    const handleDeleteSet = (indexEx, indexSet) => {
        const list = [...exercises];
        list[indexEx].reps.splice(indexSet, 1);
        list[indexEx].weight.splice(indexSet, 1);
        setExercises(list);
    }

    const handleAddEx = () => {
        setExercises(exercises.concat([{name: "", reps: [''], weight: ['']}]));
    }

    const handleInputChangeSet = (e, index, indexSet) => {
        const list = [...exercises];
        const {name, value} = e.target;
        list[index][name][indexSet] = value;
        setExercises(list);
    }

    const handleAddSet = (index) => {
        const list = [...exercises];
        list[index].reps.push('');
        list[index].weight.push('');
        setExercises(list);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        setIsPending(true);

        const workout = { title, exercises };

        fetch('http://localhost:8000/workouts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(workout),
        })
        .then( (res) => {
            if (!res.ok) {
                throw new Error('Server unresponsive')
            }
            else {
                setIsPending(false);
                setError(null);
                history.push('/');
            }
        })
        .catch( err => {
            setError(err.message);
            setIsPending(false);
        });
    }

    const handleModify = (e) => {
        e.preventDefault();

        setIsPending(true);

        fetch(`http://localhost:8000/workouts/${modifiedWorkout.id}`, {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(
                {
                    title,
                    exercises
                }
            ),
        })
        .then((res) => {
            if (!res.ok) {
                throw new Error('Server unresponsive')
            }
            else {
                setIsPending(false);
                setError(null);
                history.push('/');
            }
        })
        .catch( err => {
            setError(err.message);
            setIsPending(false);
        });
    }

    return (
        <div className="new-workout">
            <form
                onSubmit = {(e) => handleSubmit(e)}
            >
                <label>Workout Name</label>
                <input type="text" 
                    value = { title }
                    onChange = { (e) => handleTitle(e)}
                    required
                />
                { exercises.map((exercise, index) => {
                    return (
                        <div className="exercise" key={ index }>
                        <div className="add-exercise">
                            <label>Exercise</label>
                            <input type="text" 
                                name = 'name'
                                value = {exercise.name}
                                onChange = {(e) => handleInputChangeEx(e, index)}
                                required
                            /><br />
                            { exercises[index].reps.map((rep, indexSet) => {
                                return (
                                    <div className="set" key={ indexSet }>
                                    <label>Reps</label>
                                    <input type="number" 
                                        name = 'reps'
                                        value = {rep}
                                        onChange = {(e) => handleInputChangeSet(e, index, indexSet)}
                                        required
                                    />
                                    <label>Weight</label>
                                    <input type="number" 
                                        name = 'weight'
                                        value = {exercise.weight[indexSet]}
                                        onChange = {(e) => handleInputChangeSet(e, index, indexSet)}
                                        required
                                    />
                                    { exercises[index].reps.length !== 1 && 
                                        <button 
                                            id="delete-set"
                                            onClick={ () => handleDeleteSet(index, indexSet) }
                                        >x</button> }
                                        <br />
                                    </div>
                                );
                            })}
                            <button type="button" onClick = {() => handleAddSet(index)}>Add Set</button>
                        </div>
                        { exercises.length !== 1 && 
                            <button type="button" className="remove-ex" onClick = {() => handleDeleteEx(index)}>Remove Exercise</button>}
                    </div>    
                    )
                }) }
                <button type="button" id="add-exercise-button" onClick = {() => handleAddEx()}>Add Exercise</button><br />
                { !isPending && !modifiedWorkout && <button type="submit" id="submit-button">Add Workout</button> }
                { !isPending && modifiedWorkout && <button type="button" id="modify-button"
                    onClick={(e) => handleModify(e)}
                    >Save Workout</button> }
                { isPending && <button type="button" id="submit-button">Adding...</button> }
                { error && <div className="error-post">{ error }<p>Try Again!</p></div> }
            </form>
        </div>
    );
}
 
export default NewWorkout;