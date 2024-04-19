import React, {useState, useEffect} from "react"
import { useSelector, useDispatch } from "react-redux";
import styles from "../../css/default.module.css"

export default function Selector(props){
      



      const {selectElements, handleSubReddit, handleSearch, currentState, searchTerm } = props




    if (selectElements.length === 0) {
        return <div>No subredits Available</div>
    }else{
        return(
            <div className={styles.selector}>

              <label >View Reddit: </label>
              <select onChange={handleSubReddit}  value={currentState} >
                <option value="popular">Popular</option>
                { selectElements[0].map( (subreddit, index) => <option key={index} value={subreddit}> {subreddit} </option> )} 
              </select>
              <label >Search: </label>
              <input type="text" id="input" name="lname"  onChange={handleSearch} value={searchTerm}/>

            </div>
        )
    }
}