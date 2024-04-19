import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import {data_example} from "../data_example.js"

//////***********//////////////// 

import { useSelector, useDispatch } from "react-redux";



//import {createAsyncThunk} from "@reduxjs/toolkit"

const hostURL = "https://www.reddit.com/";
const pathString = "r/";
const keytring = "popular";
const finalPathString = ".json";
const search = `search?q=`;
const searchJson = `search.json?q=`; 


const getPopular = "popular/";
const getPopularJson = "popular";
const searchKey =""; //“cake recipes”

//const searchJson = `search.json?q=${searchKey}`; //https://www.reddit.com/search?q=cake%20recipes

export const API_ROOT = 'https://www.reddit.com/subreddits.json';


///GET ALL POSTS Middleware
//////***********//////////////// 
//////***********//////////////// 
//////***********//////////////// 
//////***********//////////////// 
export const loadPostsAPI = createAsyncThunk("reditPosts/loadPostsAPI", async()=>{
    
   //console.log(`SET CATEGORY ${keytringkat}`);
    //console.log(`SET CATEGORY ${ createURL() }`);
     //const getPostsURL = `${hostURL}${pathString}${getPopularJson}${finalPathString}`;
     const getPostsURL = `${hostURL}${pathString}${keytring}${finalPathString}`;
     //const getPostsURL = `${hostURL}${pathString}${keytringkat}${finalPathString}`;
 

    try {
        const response = await fetch(getPostsURL);

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const json = await response.json();
        return json;

    } catch (error){
        console.error('Error fetching data:', error);
        throw error;
    }
 });


///GET ALL POSTS Middleware
//////***********//////////////// 
//////***********//////////////// 
//////***********//////////////// 
//////***********//////////////// 


export const loadSubRedditPostsAPI = createAsyncThunk("reditPosts/loadSubRedditsPostsAPI", async(keyString)=>{
    
    const subRedditCategory = keyString;

    const getPostsURL = `${hostURL}${pathString}${subRedditCategory}${finalPathString}`;

    try {
        const response = await fetch(getPostsURL);

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const json = await response.json();
        return json;

    } catch (error){
        console.error('Error fetching data:', error);
        throw error;
    }
 });



//////***********//////////////// 
//////***********//////////////// 
//////***********//////////////// 
//////***********//////////////// 
export const searchPostsAPI = createAsyncThunk("reditPosts/searchPostsAPI", async(keyString)=>{
    
    const subRedditCategory = keyString;
 
    //const getPostsURL = `${hostURL}${search}${keyString}`;
    const getPostsURL = `${hostURL}${searchJson}${keyString}`

    try {
        const response = await fetch(getPostsURL);

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const json = await response.json();
        return json;

    } catch (error){
        console.error('Error fetching data:', error);
        throw error;
    }
 });



//////***********//////////////// 
//////***********//////////////// 
//////***********//////////////// 
//////***********//////////////// 
const initialState = {
    
        //   "XX":{title:"My first title post",
        //   desc:"My descrition"},
          redditPosts: [],
          isLoading: false,
          hasError: false,
          category:"popular",
          searchTerm:"", 
};


const options = {
    name:"reditPosts",
    initialState: initialState,
    reducers:{
        setPopularPosts: (state, action)=>{
            state.redditPosts.push(action.payload)
            //return state;
           },
        setCategoryAction: (state, action)=>{
            state.category = action.payload;
            //return state;
        },
        setSearchTermAction: (state, action)=>{
            state.searchTerm = action.payload;
            //return state;
        },
   
    },

    extraReducers:(builder) => {
        builder.addCase(
            loadPostsAPI.pending,(state)=>{
                state.isLoading = true;
                state.hasError = false;
                console.log("--- LOADING POSTS ---");

        })
        .addCase(
            loadPostsAPI.fulfilled,(state, action)=>{
                state.isLoading = false;
                state.hasError = false;
                //state.redditPosts.push(action.payload);
                //state.redditPosts = state.redditPosts.concat(action.payload);

                const filter =  action.payload.data.children.map((subreddit) => subreddit.data)
                state.redditPosts.push(filter);

                console.log("--- SUCCESS POSTS ---");

        })
        .addCase(
            loadPostsAPI.rejected,(state)=>{
                state.isLoading = false;
                state.hasError = true;
                console.log("---> ERROR ON POSTS <---");

        })


   
        .addCase(
            loadSubRedditPostsAPI.pending,(state)=>{
                state.isLoading = true;
                state.hasError = false;
                console.log("--- LOADING POSTS ---");

        })
        .addCase(
            loadSubRedditPostsAPI.fulfilled,(state, action)=>{
                state.isLoading = false;
                state.hasError = false;
                //state.redditPosts.push(action.payload);
                //state.redditPosts = state.redditPosts.concat(action.payload);
                state.redditPosts =[];
                const filter =  action.payload.data.children.map((subreddit) => subreddit.data)
                state.redditPosts.push(filter);
          
               //state.redditPosts = filter;
                console.log("--- SUCCESS POSTS ---");

        })
        .addCase(
            loadSubRedditPostsAPI.rejected,(state)=>{
                state.isLoading = false;
                state.hasError = true;
                console.log("---> ERROR ON POSTS <---");

        })

        .addCase(
            searchPostsAPI.pending,(state)=>{
                state.isLoading = true;
                state.hasError = false;
                console.log("--- LOADING POSTS ---");

        })
        .addCase(
            searchPostsAPI.fulfilled,(state, action)=>{
                state.isLoading = false;
                state.hasError = false;
                //state.redditPosts.push(action.payload);
                //state.redditPosts = state.redditPosts.concat(action.payload);
                state.redditPosts =[];
                const filter =  action.payload.data.children.map((subreddit) => subreddit.data)
                state.redditPosts.push(filter);
          
               //state.redditPosts = filter;
                console.log("--- SUCCESS POSTS ---");

        })
        .addCase(
            searchPostsAPI.rejected,(state)=>{
                state.isLoading = false;
                state.hasError = true;
                console.log("---> ERROR ON POSTS <---");

        })


    }

    
}



//1 create slice
export const allPostsSlice = createSlice(options);

//2 export action creators
export const {setPopularPosts, getAll, setCategoryAction, setSearchTermAction, searchTermAction, addaPost, deletePost} = allPostsSlice.actions;

//3 export slice reducer
export default allPostsSlice.reducer;

//
export const allPosts = (state) => state.reditPosts;
//export const allPosts2 = (state) => state.allPostsSlice;

//Export loading state var
export const isLoading = (state) => state.reditPosts.isLoading;

//Export loading state var
//export const { hasError} = (state) => state.reditPosts;
export const hasError = (state) => state.reditPosts.hasError;


export const keyCategory= (state) => state.reditPosts.category;
//export const allPosts2 = (state) => state.allPostsSlice;