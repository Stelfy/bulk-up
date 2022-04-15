import { setDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { db } from "./firebase";
import FoodList from "./FoodList";
import { UserContext } from "./UserContext";

const CalCounter = () => {
  const [totCal, setTotCal] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  const currentUser = useContext(UserContext); 

  // fetches calorie data from db and updates
  const updateCals = () => {
    setIsPending(true);

    getDoc(doc(db, "calories", currentUser.uid))
      .then(data => {
        // if there is no document saved, create one with the user id as document id
        if (data.data() === undefined){
          setDoc(doc(db, "calories", currentUser.uid), {totCal: 0});
          // once the new document is added, call update function again
          updateCals();
          return;
        }
        const calInfo = data.data();
        setTotCal(calInfo.totCal);
        setIsPending(false);
      })
      .catch(err => {
        setError(err.message);
        setIsPending(false);
      })
  }

  // adds the caloric value of the clicked button to the total calories
  const updateCal = (value, {overwrite = false} = {}) => {
    let newTotCal = totCal + value;
    if (overwrite) newTotCal = value;
    // update value in database
    updateDoc(doc(db, "calories", currentUser.uid), {
      totCal: newTotCal
    }).then(() => {
      updateCals();
    }).catch(err => {
      setError(err.message);
    })
  }

  // sets the total calories to 0
  const resetCal = () => {
    updateCal(0, { overwrite: true });
  }

  useEffect(() => {
    updateCals();
    // eslint-disable-next-line
  }, [])

  return (
    <div className="CalCounter">
      <h2 className="title">Calorie Counter</h2>
      {/* { isPending && <div className="loading">Loading...</div> } */}
      { error && <div className="error-message">{ error }</div> }
      { (totCal || totCal === 0) && <div className="blue-border pad-marg med-text flex space-between"><span className="upper">tot cals:</span><span className="big-text">{totCal}</span></div> }
      { <FoodList updateCal={updateCal}/> }
      <button className="resetCal" onClick={resetCal}>Reset</button>
    </div>
  );
}
 
export default CalCounter;