import React, {useState, useEffect} from "react"
import { useSelector, useDispatch } from "react-redux";
import Card from "../../components/postCard/postCard.js";
import Loading from "../loading/loadingComp.js";


export default function ListComp(props){
      
    const {posts,loadingState, error } = props;


    //:: --- CHECK IF IS LOADING
    if (loadingState) {
    
        return (
            <div >
            <p>Is Loading </p>
            <Loading/>
            </div>
    )}

 //::--- CHECK IF GIVES A ERROR 
    if (error) {
            return (
                <div>
                <p>Ups.. Fail to load </p>
                </div>
     )}

     
 //:: --- IF LOADS SUCCESSFULLY 
 if (posts.redditPosts.length === 0) {
    return <div>No posts available</div>
  }else{


        return(
            <div>
           { Object.values(posts.redditPosts[0]).map(post => (
            <Card data={post}/>
   
         ))  }

            </div>
           )
 
}
}