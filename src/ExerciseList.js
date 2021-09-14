import SetList from "./SetList";

const ExerciseList = ({ exercises, workoutIndex }) => {
    return (
        <div className="exercise">
            {exercises.map( (ex, index) => {
                return (
                    <div key={index}>
                        <h3>{ ex.name }</h3>
                        <div className="set">
                            <SetList exercises = { exercises } sets={ ex } exerciseIndex={ index } workoutIndex={ workoutIndex } />
                        </div>
                    </div>
                )
            })}
        </div>
    );
}
 
export default ExerciseList;