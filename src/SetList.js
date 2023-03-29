import { useEffect, useRef, useState } from "react";
import { doc, updateDoc } from "@firebase/firestore";
import { db } from "./firebase";

const SetList = ({ exercises, exercise, exerciseIndex, workoutID }) => {
  const [error, setError] = useState("");
  const [repCounts, setRepCounts] = useState(exercise.reps);
  const [weights, setWeights] = useState(exercise.weights);
  const isMounted = useRef(false);

  const dataPatch = (data) => {
    console.log("patching..");
    //changes the specified field of a document without overwriting it all (similar to 'PATCH')
    updateDoc(doc(db, "workouts", workoutID), {
      exercises: data,
    })
      .then(() => {
        setRepCounts(data[exerciseIndex].reps);
        setWeights(data[exerciseIndex].weights);
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  const exSetPatch = () => {
    const newExercises = JSON.parse(JSON.stringify(exercises));
    newExercises[exerciseIndex].reps = newRepCounts;
    newExercises[exerciseIndex].weights = newWeights;
    dataPatch(newExercises);
  };

  let newRepCounts = repCounts;
  let newWeights = weights;

  useEffect(() => {
    if (isMounted.current) {
      const setChange = setTimeout(() => {
        exSetPatch();
      }, 1000);

      return () => clearTimeout(setChange);
    } else {
      isMounted.current = true;
    }
  }, [repCounts, weights]);

  const handleModifyRepCount = (repIndex, diff) => {
    newRepCounts = repCounts.map((rep, index) => {
      if (index === repIndex) return (parseFloat(rep) + diff).toString();
      return rep;
    });
    setRepCounts(newRepCounts);
  };

  const handleModifyWeight = (weightIndex, diff) => {
    newWeights = weights.map((weight, index) => {
      if (index === weightIndex) return (parseFloat(weight) + diff).toString();
      return weight;
    });
    setWeights(newWeights);
  };

  return (
    <div className="sets">
      {error && <div className="error">{error}</div>}
      {repCounts.map((rep, index) => {
        return (
          <div className="set" key={index}>
            <div className="rep-buttons">
              <button
                type="button"
                id="addRep"
                onClick={() => handleModifyRepCount(index, 1)}
              >
                +
              </button>
              <button
                type="button"
                id="removeRep"
                onClick={() => handleModifyRepCount(index, -1)}
              >
                -
              </button>
            </div>
            <div className="set-details">
              {rep} X {weights[index]} Kg
            </div>
            <div className="weight-buttons">
              <button
                type="button"
                id="addWeight"
                onClick={() => handleModifyWeight(index, 1.25)}
              >
                +
              </button>
              <button
                type="button"
                id="removeWeight"
                onClick={() => handleModifyWeight(index, -1.25)}
              >
                -
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SetList;
