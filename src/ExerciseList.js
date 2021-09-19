import SetList from "./SetList";

const ExerciseList = ({ exercises, workoutID }) => {
    
    return (
        <div className="exercise">
            {exercises.map( (ex, index) => {
                return (
                    <div key={index}>
                        <h3>{ ex.name }</h3>
                        <div className="set">
                            <SetList exercises = { exercises } sets={ ex } exerciseIndex={ index } workoutID={ workoutID } />
                        </div>
                    </div>
                )
            })}
        </div>
    );
}
 
export default ExerciseList;