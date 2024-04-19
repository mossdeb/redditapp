import React, {useState, useEffect} from "react";
import stylesGlobal from "../../css/default.module.css"

import { useSelector, useDispatch } from "react-redux";

import { allPosts, getAll, searchTerm, addaPost, deletePost, loadPostsAPI, isLoading, hasError, setCategoryAction, setSearchTermAction, loadSubRedditPostsAPI, searchPostsAPI} from "../../store/allpostsSlice.js"
import { getSubredditsList, getGetSubreddits, allSubReddits }  from "../../store/subredditsSlice.js";

import Card from "../../components/postCard/postCard.js";
import Selector from "../../components/selector/selectorComp.js";
import ListComp from "../../components/postsList/postListComp.js"



export default function PostsList(){

    const [subRedditSelect, setSubredditSelect] = useState("popular");
    const [searchTerm, setSearchTerm] = useState("");

    const posts = useSelector(allPosts);
    const dispatch = useDispatch();
    //console.log(posts);
    const [num, setNum] = useState(1);

 
    //:: WAY 1: Importing directly from slice the loading and error states 
    //const { isLoading } = useSelector((state) => state.reditPosts);
    //const { hasError } = useSelector((state) => state.reditPosts);


    //:: WAY 2: Importing from slice the loading and error states (most appropriate)
    const loadingState = useSelector(isLoading);
    const error = useSelector(hasError);


    //:: initialize the API to fetch the data
    useEffect(() => {
        //const teste = subRedditSelect;
        dispatch(loadPostsAPI());
        dispatch(getSubredditsList());
      
      // dispatch(setCategoryAction(subRedditSelect));
      // dispatch(setSearchTermAction(searchTerm));
    },[dispatch]);

    


    useEffect(() => {
       dispatch(loadSubRedditPostsAPI(subRedditSelect));
      }, [subRedditSelect]); 

      useEffect(() => {
      
        //dispatch(setSearchTermAction(searchTerm));
        dispatch(setSearchTermAction(searchTerm));
        dispatch( searchPostsAPI(searchTerm) );
        console.log(posts);
       }, [searchTerm]); 


    //Define Images List
    const subRedditsToUse = useSelector(allSubReddits);

      
    const handleSubReddit =(event)=>{
      event.preventDefault();
      const selectedSubreddit = event.target.value;
      setSubredditSelect(selectedSubreddit);
      dispatch(setCategoryAction(selectedSubreddit));
      dispatch(loadSubRedditPostsAPI(selectedSubreddit));
  }



    const handleSearch =(event)=>{
      event.preventDefault();
      const searchQuery = event.target.value;
      setSearchTerm(searchQuery);
      dispatch(setSearchTermAction(searchQuery));
      dispatch(searchPostsAPI(searchQuery));
      // You can remove this line as well, for the same reason as above
      // dispatch(searchPostsAPI(searchTerm));
  }


   
return(


<div className={stylesGlobal.container}>
      

       <Selector selectElements={subRedditsToUse} currentState = {subRedditSelect} handleSubReddit={handleSubReddit} handleSearch={handleSearch} searchTerm={searchTerm}/>
      
        {    <ListComp posts={posts} loadingState={loadingState} error={error}/>      }
      { /*Object.values(posts.redditPosts[0]).map(post => (
         <Card data={post} />

      ))  */} 
   
      <div>
      
  

      </div> 

</div>



);
//}
}