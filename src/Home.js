import WorkoutList from "./WorkoutList";
import useFetch from "./useFetch";
import SearchBar from "./SearchBar";
import { useCallback, useState } from "react";

const Home = () => {
    const { data: workouts, isPending, error} = useFetch('http://localhost:8000/workouts');

    const [list, setList] = useState(workouts);

    const updateList = useCallback(newWorkouts => {
        setList(null);
        setList(newWorkouts);
    }, []);

    return (
        <div className="home">
            {workouts && <SearchBar list={workouts} updateList={updateList}/>}
            <h2 className="title">All workouts</h2>
            { isPending && <div className="loading">Loading...</div> }
            { error && <div className="error-message">{ error }</div> }
            { list && <WorkoutList workouts={list} />}
        </div>
    );
}
 
export default Home;