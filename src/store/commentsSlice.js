import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"



const getCommentsURLV2 = "https://www.reddit.com/r/wholesomememes/comments/1c5ehtw/tony_reminds_us_all_to_stay_humble/.json";


export const loadComments = createAsyncThunk("comments/loadComments", async(getCommentsURL)=>{
        //console.log("COMMENTS--API--CALL");
       
        //const getCommentsURL = getCommentsURLV2;
       // const getCommentsURL =  "www.reddit.com/r/mildlyinfuriating/comments/1c4wfbl/my_school_thinks_this_fills_up_hungry_high/.json"
        //console.log(getCommentsURLV2);
        try{
            const response = await fetch(getCommentsURL);

            if (!response.ok) {
                throw new Error('Network response was not ok (getting comments)');
            }
    
            const json = await response.json();
            return json;
        }
        catch(error){

            console.error('Error fetching comments data:', error);
            throw error;
        }

});





const initialState = {
    
    comments: [],
    isLoading: false,
    hasError: false
};



const options ={
    name:"comments",
    initialState:initialState,
    reducers:{
        getCommentsOLD: (state, action) =>{
          
            //state.comments.push(action.payload);
            //const getCommentsURL = action.payload;
            //console.log(getCommentsURL);
            //console.log("reducer is working")
            //console.log(state.comments);
            return state;
       },
    },
    extraReducers:(builder) => {
        builder.addCase(
            loadComments.pending,(state)=>{
                state.isLoading = true;
                state.hasError = false;
                state.comments = [];
                console.log("--- LOADING COMMENTS ---");

        })
        .addCase(
            loadComments.fulfilled,(state, action)=>{
                state.isLoading = false;
                state.hasError = false;

                state.comments = action.payload;
                console.log("-- Loading complete Comments --");

        })
        .addCase(
            loadComments.rejected,(state)=>{
                state.isLoading = false;
                state.hasError = true;
                console.log("---> ERROR ON COMMENTS <---");

        })
    }
}




//create Slice
export const commentsSlice = createSlice(options);

// export Actions
export const {getCommentsOLD} = commentsSlice.actions;

//export reducer
export default commentsSlice.reducer;

//Get all comments from the post
export const commentPost = (state) => state.comments.comments;

//Export loading state var
export const isLoading = (state) => state.comments.isLoading;

//Export loading state var
export const hasError = (state) => state.comments.hasError;