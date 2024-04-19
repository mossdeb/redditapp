import { configureStore } from "@reduxjs/toolkit"


// reducers
//import { allPostsSlice } from "./allpostsSlice.js"; //importing like this dont work with the "export default"
import allPostsSlice from "./allpostsSlice.js"; //this version works with the export default
import commentsSlice from "./commentsSlice.js";
import subredditsSlice from "./subredditsSlice.js";

const store = configureStore({
    reducer:{
        //reditPosts: allPostsSlice.reducer, //This method works if the import of a export default is not done properly
        reditPosts: allPostsSlice,  //this version works with the export default
        comments: commentsSlice,
        subreddits: subredditsSlice,
    }
})
  
export default store;