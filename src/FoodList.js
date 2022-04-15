import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { db } from "./firebase";
import NewFoodItem from "./NewFoodItem";
import { UserContext } from "./UserContext";

const FoodList = ({updateCal}) => {

  const currentUser = useContext(UserContext);

  const [food, setFood] = useState([]);
  const [error, setError] = useState(null);
  const [isAddingItem, setIsAddingItem] = useState(false);
  const [addItemChar, setAddItemChar] = useState('+');

  // get user food list from db
  const getFoodArr = () => {
    getDoc(doc(db, "calories", currentUser.uid))
      .then(data => {
        const foodArr = data.data().foodArr;
        if (foodArr)
          setFood(foodArr);
      })
      .catch(err => {
        setError(err.message);
      })
  }

  // updates foodArr in db with new array
  const patchFoodArr = (newFoodArr) => {
    updateDoc(doc(db, "calories", currentUser.uid), {
      foodArr: newFoodArr,
    })
    .then(() => {
      setFood(newFoodArr);
    })
    .catch(err => {
      setError(err.message);
    })
  }

  // adds a food item to foodArr and updates db
  const addFoodItem = (newItem) => {
    const newFoodArr = [...food, newItem];
    patchFoodArr(newFoodArr);
  }

  //deletes food item with given index from foodArr and updates db
  const delFoodItem = (index) => {
    const newFoodArr = [...food];
    newFoodArr.splice(index, 1);
    patchFoodArr(newFoodArr);
  }

  // shows or hides the add food item form
  const toggleNewFood = () => {
    const newChar = (isAddingItem) ? '+' : '-'; 
    setAddItemChar(newChar);
    setIsAddingItem(!isAddingItem);
  }

  // initialises food to foodArr
  useEffect(() => {
    getFoodArr();
    //eslint-disable-next-line
  }, []);
  
  return (
    <div className="food-list">
      { error && <div className="error-message">{ error }</div>}
      { food && food.map((item, index) => {
        return (
          <div key={index} className="food-item">
            <div onClick={() => updateCal(item.cal)}>
              <h3 className="food-item-name">{item.name}</h3>
              <p  className="food-item-cals">Calories: {item.cal}</p>
            </div>
            <button className="delete-food" onClick={() => delFoodItem(index)}>x</button>
          </div>
        );
      })}
      { isAddingItem && <NewFoodItem addFoodItem={addFoodItem} toggleNewFood={toggleNewFood}/> }
      <button className="toggle-new-food-button" onClick={toggleNewFood}>{addItemChar}</button>
    </div>
  );
}
 
export default FoodList;