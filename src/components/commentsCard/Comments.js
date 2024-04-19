
import React, {useState, useEffect} from "react"
import CommentsStyles from "../../css/commentsList.module.css"
import {isLoading, hasError} from "../../store/commentsSlice.js"
import { useSelector, useDispatch } from "react-redux";
import Loading from "../loading/loadingComp.js";

export default function Comments(props){
const {postHolderComments} = props;
console.log(postHolderComments[0]);

//const select = useSelector();

const loading = useSelector(isLoading);
const error = useSelector(hasError);
console.log(loading);

if(loading){
   return(
    <Loading/>
)
}

if(error){
    return(
     <p>Error</p>
 )
}


    return (
        <div className={CommentsStyles.wraper}>


    {postHolderComments.map(  ( comment, index )=>(   
     <div key={index} className ={CommentsStyles.container}> 
            <h5>{comment.data.author}</h5>
            <p>{comment.data.body}</p>
      </div>
    
))   
    }
  
    </div>)
}