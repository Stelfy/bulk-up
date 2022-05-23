

const SearchBar = ({ workouts, setWorkoutsFiltered }) => {

    const handleSubmit = (e) => {
      e.preventDefault();
    }

    // recursive traversal of given array, returns true if str matches any string in the array
    const findStr = (val, str) => {
      if (typeof val == 'string'){
        if (val.toLowerCase().includes(str.toLowerCase())) return true;
        else return false;
      }
      if (Array.isArray(val)){
        for (const v of val){
          if (findStr(v, str)) return true;
        }
      }
      return false;
    }

    // checks if a string is part of any string in a workout obj
    const strInWorkout = (workout, str) => {
      const exercises = workout.exercises;
      if (workout.title.toLowerCase().includes(str.toLowerCase())) return true;
      for (const exercise of exercises){
        if (findStr(exercise, str)) return true;
      }
      return false;
    }

    // on every input change, we filter the workouts array and set it 
    const handleInputChange = (e) => {
      const string = e.target.value;

      if (string === "" || string === undefined || string === null){
        setWorkoutsFiltered(workouts);
        return;
      }; 
      const newWorkouts = workouts.filter(workout => {
        return strInWorkout(workout, string);
      });
      setWorkoutsFiltered(newWorkouts);
    }

    return (
        <form onSubmit={(e) => handleSubmit(e)} className="search-bar">
            <input type="text" className="search-input" placeholder="Search Workout" 
            onChange={ (e) => handleInputChange(e)}
            />
        </form>
    );
}
 
export default SearchBar;