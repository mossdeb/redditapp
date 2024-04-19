import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import cardStyles from "../../css/cardStyles.module.css"
import fromUnixToDate from "../../utilities/convertTime";

import {getComments, loadComments, commentPost} from "../../store/commentsSlice.js";
import Comments from "../commentsCard/Comments.js";

export default function Card(props){
   
    
   const dispatch = useDispatch();
   const postData = props;

   const[ title, setTitle ]= useState(postData.data.title);
   const[ postIng, setpostIng ]= useState(postData.data.url);

   const[ autorName, setAutorName ]= useState(postData.data.author);
   const[ ups, setUps ]= useState(postData.data.ups);
   
   const[ creationDate, setcreationDate ]= useState(postData.data.created_utc);
   const[ thumbnail, setThumbnail ] = useState(postData.data.thumbnail);


   //To get the comments////
   const [ postID, setpostID ] = useState(postData.data.id);
   const [ permalink, setCommentsLink ] = useState(`https://www.reddit.com${postData.data.permalink}.json`);

   //toggle comments 
   const [comToggle, setComToggle] = useState("false");



  const postHolder = useSelector(commentPost);
  let postHolderComments = [];

  //console.log(postHolder[1]);
  if (postHolder.length > 0){
       // console.log(postHolder[1].data.children);
        postHolderComments = postHolder[1].data.children;
  }


  const handleClick = ()=>{
            dispatch(loadComments(permalink));
            setComToggle(!comToggle);
  }


    return(
        <div className={cardStyles.card}>
            <h2 className={cardStyles.postTitle} > { title }</h2>

            <div className={cardStyles.imageContainer}>
            
                    <div className={cardStyles.autorContainer}>

                        <div>
                            <img className={cardStyles.autorImg} src={thumbnail}/>
                        </div>

                        <div className={cardStyles.subContainer} >
                            <h4> {autorName} </h4>
                            <p> { fromUnixToDate(creationDate)}</p>
                            
                        </div>
                    </div>

                  
                    <img className={cardStyles.postImg} src={ postIng}/>

            </div>

            <div className={cardStyles.commentsContainer} >
         {   comToggle? <button onClick={handleClick}>View all comments</button> : <button onClick={handleClick}>Hide</button> }
                

                { 
                       comToggle? <p></p> : <Comments postHolderComments={postHolderComments} />
                            
                }

            </div>
            
        </div>
    );

};