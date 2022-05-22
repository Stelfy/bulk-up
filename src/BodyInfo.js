import { useState, useEffect } from "react";
import UpTrendIcon from "./svgs/UpTrendIcon";
import DownTrendIcon from "./svgs/DownTrendIcon";

const BodyInfo = ({bodypart, addSize}) => {

  const [size, setSize] = useState("");
  const [isWeight, setIsWeight] = useState(false);

  const handleInputChange = (event) => {
    setSize(event.target.value);
  }

  const resetValue = () => {
    setSize("");
  }

  // on load or when bodypart.name changes, if weight is selected, sets kg labels and not cm
  useEffect(() => {
    if (bodypart.id === 'weight') setIsWeight(true);
    else setIsWeight(false);
  }, [bodypart.id]);

  return ( 
    <div className="body-info">
      <h3 className="bodypart-name">{ bodypart.name }</h3>
      <div className="size-values">
        <div className="current-size">SIZE: <span className="current-size-value">{ bodypart.currentSize || <i>_</i> }{ (isWeight) ? ' kg' : ' cm' }</span></div>
        <div className="last-size">LAST SIZE: { bodypart.lastSize || <i>_</i> }{ (isWeight) ? ' kg' : ' cm' }</div>
      </div>
      { 
        (bodypart.growth || bodypart.growth === 0) &&
        isFinite(bodypart.growth) &&
        <div className="size-growth">{ (bodypart.growth > 0) ? <UpTrendIcon /> : <DownTrendIcon /> }{ bodypart.growth.toFixed(1)+'%' }</div> 
      }
      <div className="new-size-value">
        <form onSubmit={(e) => {addSize(size, bodypart.id, e); resetValue()}}>
          <input className="size-input" name="size-input" type="number" value={size} placeholder="New Value" onChange={(e) => handleInputChange(e)}/>
          <label className="cm-tag" htmlFor="size-input">{ (isWeight) ? 'kg' : 'cm' }</label>
          <button className="add-size-button">add</button>
        </form>
      </div> 
    </div>
   );
}
 
export default BodyInfo;