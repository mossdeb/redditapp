import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

 
const subRedditsURL = "https://www.reddit.com/subreddits.json"


export const getSubredditsList = createAsyncThunk("subreddits/getSubredditsList", async()=>{
   console.log(subRedditsURL);

   try{
       const response = await fetch(subRedditsURL);

       if (!response.ok) {
           throw new Error('Network response was not ok (getting getSubredditsList)');
       }  
 

       const json = await response.json();
       //return  json.data.children.map((subreddit) => subreddit.data.display_name);
       return json;
   }
   catch(error){

       console.error('Error fetching getSubredditsList data:', error);
       throw error;
   }

});

//////***********//////////////// 

const initialState = {
    
   subreddits: [],
   isLoading2: false,
   hasError2: false,
};


const options ={
      name:"subreddits",
      initialState: initialState,
      reducers:{
      
         getGetSubreddits: (state)=>{

               return state.subreddits.subreddits;
         }

      },
      extraReducers:(builder)=>{
          builder.addCase(
            getSubredditsList.pending,(state)=>{
                  state.isLoading2 = true;
                  state.hasError2 = false;
                  console.log("--- LOADING REDDITS ---");

         })
         .addCase(
            getSubredditsList.fulfilled,(state, action)=>{
                  state.isLoading2 = false;
                  state.hasError2 = false;

                  //const filter =  json.data.children.map((subreddit) => subreddit.data);

                 //
                 const filter =  action.payload.data.children.map((subreddit) => subreddit.data.display_name);
                  state.subreddits.push(filter);
                 
                 // state.subredditsList.push(action.payload);

                  
                  console.log("--- SUCCESS REDDITS ---");

         })
         .addCase(
            getSubredditsList.rejected,(state)=>{
                  state.isLoading2 = false;
                  state.hasError2 = true;
                  console.log("---> ERROR ON REDDITS <---");

         })
  




      }
}




//create Slice
export const subredditsSlice = createSlice(options);


// export Actions
export const {getGetSubreddits} = subredditsSlice.actions;

//export reducer
export default subredditsSlice.reducer;


export const allSubReddits = (state) => state.subreddits.subreddits;
//export const allPosts2 = (state) => state.allPostsSlice;