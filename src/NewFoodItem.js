import { useState } from "react";

const NewFoodItem = ({addFoodItem, toggleNewFood}) => {

  const [newFoodItem, setNewFoodItem] = useState({name: null, cal: null});

  // calls function from FoodList.js to add the new food item and derenders the component with toggleNewFood()
  const handleSubmit = (e) => {
    e.preventDefault();

    addFoodItem(newFoodItem);
    toggleNewFood();
  }

  // on each input change from the two inputs the value of new item is updated
  const handleInputChange = (e) => {
    const item = newFoodItem;
    let {name, value} = e.target;
    if (name === 'cal') value = parseInt(value);
    item[name] = value;
    setNewFoodItem(item);
  }

  return (
    <div className="new-food-item">
      <form onSubmit={(e)=>handleSubmit(e)}>
        <div className="name-input-div">
          <input type="text" name="name" id="food-name" onChange={(e) => handleInputChange(e)} placeholder="Food Name" required/>
        </div>
        <div className="cal-input-div">
          <input type="number" name="cal" id="food-cal" onChange={(e) => handleInputChange(e)} placeholder="Food Calories" required/>
        </div>
        <button>Add Item</button>
      </form>
    </div>
  );
}
 
export default NewFoodItem;