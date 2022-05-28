import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import BodyInfo from "./BodyInfo";
import { DefaultBodyparts } from "./DefaultBodyparts";
import { db } from "./firebase";
import BodyIcon from "./svgs/BodyIcon";
import ScaleIcon from "./svgs/ScaleIcon";
import { UserContext } from "./UserContext";

const Biometrics = () => {

  const [bodypart, setBodypart] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const [bodyparts, setBodyparts] = useState(null);

  const currentUser = useContext(UserContext);

  const dateObj = new Date();
  const offset = dateObj.getTimezoneOffset();
  const currentDate = new Date(dateObj.getTime() - (offset*60*1000)).toISOString().split('T')[0];

  //updates bodyparts from db 
  const updateBodyparts = async () => {
    setIsPending(true);

    getDoc(doc(db, "biometrics", currentUser.uid))
      .then(async (data) => {
        // if there is no document saved, create one with the user id as document id
        if (data.data() === undefined){
          await setDoc(doc(db, "biometrics", currentUser.uid), {bodyparts: DefaultBodyparts});
          // once the new document is added, call update function again
          updateBodyparts();
          return;
        }
        setBodyparts(data.data().bodyparts);
        setIsPending(false);
      })
      .catch(err => {
        setError(err.message);
        setIsPending(false);
      })
      return;
  }

  //returns bodypart obj from bodyparts with specified id
  const getBodypart = (id) => {
    if (isPending) return;
    let newBodypart = null;
    bodyparts.forEach(bp => {
      if (bp.id === id){
        newBodypart = bp;
        return;
      };
    });
    if (newBodypart) setBodypart(newBodypart);
    else {
      window.alert('Error: No Item Found');
      setError('no item found');
    };
  }

  //modifies current size value of a specified bodypart
  const addSize = (newSize, id, event) => {
    event.preventDefault();
    const newBodyparts = bodyparts.map(bp => {
      if (bp.id === id){
        bp.lastSize = bp.currentSize;
        bp.currentSize = newSize;
        const newHistory = [...bp.sizeHistory, {size: newSize, date: currentDate}];
        bp.sizeHistory = newHistory;
        const diff = bp.currentSize - bp.lastSize;
        bp.growth = (diff / bp.lastSize) * 100;
      };
      return bp;
    })
    
    updateDoc(doc(db, "biometrics", currentUser.uid), {
      bodyparts: newBodyparts
    }).then(() => {
      updateBodyparts();
      getBodypart(id);
    }).catch(err => {
      setError(err.message);
    })
  }

  useEffect(() => {
    updateBodyparts();
    // eslint-disable-next-line
  }, []);

  return ( 
    <div className="biometrics-div">
      <div className="bodypart-selector">
        <div className="body-weight">
          <button className="select-weight" onClick={() => getBodypart('weight')}><ScaleIcon /></button>
        </div>
        <div className="body-svg">
          <BodyIcon getBodypart={getBodypart} />
        </div>
      </div>
      { !bodypart && !isPending && !error && <div>select a bodypart</div>}
      { bodypart && <BodyInfo bodypart={bodypart} addSize={addSize} getBodypart={getBodypart} /> }
    </div>
   );
}
 
export default Biometrics;