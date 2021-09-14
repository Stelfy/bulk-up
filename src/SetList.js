import { useState } from 'react';

const SetList = ({ exercises, sets, exerciseIndex, workoutIndex }) => {

    const [error, setError] = useState('');
    const [exSets, setExSets] = useState(sets.reps);

    const dataPatch = (data) => {
        fetch(`https://my-json-server.typicode.com/Stelfy/bulk-up-fake-server/workouts/${ workoutIndex }`, {
           method: 'PATCH',
           headers: {'Content-Type': 'application/json'},
           body: JSON.stringify({
                exercises: data,
           })
       })
       .then( (res) => {
           if (!res.ok){
               throw new Error('Server unresponsive');
           }
           setExSets([...data[exerciseIndex].reps]);
       })
       .catch(err => {
            setError(err.message);
       })
    }

    const handleAddRep = (repIndex) => {
        const newExercises = [...exercises];
        const updatedRep = (parseInt(newExercises[exerciseIndex].reps[repIndex])+1).toString();
        newExercises[exerciseIndex].reps[repIndex] = updatedRep;
        dataPatch(newExercises);
    }

    const handleRemoveRep = (repIndex) => {
        const newExercises = [...exercises];
        const updatedRep = (parseInt(newExercises[exerciseIndex].reps[repIndex])-1).toString();
        newExercises[exerciseIndex].reps[repIndex] = updatedRep;
        dataPatch(newExercises);
    }

    const handleAddWeight = (weightIndex) => {
        const newExercises = [...exercises];
        const updatedRep = (parseFloat(newExercises[exerciseIndex].weight[weightIndex]) + 1.25 ).toString();
        newExercises[exerciseIndex].weight[weightIndex] = updatedRep;
        dataPatch(newExercises);
    }

    const handleRemoveWeight = (weightIndex) => {
        const newExercises = [...exercises];
        const updatedRep = (parseFloat(newExercises[exerciseIndex].weight[weightIndex]) - 1.25 ).toString();
        newExercises[exerciseIndex].weight[weightIndex] = updatedRep;
        dataPatch(newExercises);
    }


    return (
        <div className="sets">
            { error && <div className="error">{ error }</div>}
            {exSets.map((rep, index) => {
                return (
                    <div className="set" key={ index }>
                        <div className="rep-buttons">
                            <button type='button' id="addRep" onClick={() => handleAddRep(index)}>+</button>
                            <button type='button' id="removeRep" onClick={() => handleRemoveRep(index)}>-</button> 
                        </div>
                        { rep }  X  { sets.weight[index] } Kg
                        <div className="weight-buttons">
                            <button type='button' id="addWeight" onClick={() => handleAddWeight(index)}>+</button>
                            <button type='button' id="removeWeight" onClick={() => handleRemoveWeight(index)}>-</button>
                        </div>
                    </div>
                );       
            })}
        </div>
    );
}
 
export default SetList;