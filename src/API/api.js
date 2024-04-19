//import {createAsyncThunk} from "@reduxjs/toolkit"

const originURL = "https://www.reddit.com/";

const getPopular = "r/popular/";
const getPopularJson = "r/popular.json";

const searchKey =""; //“cake recipes”
const search = `search?q=${searchKey}`; //https://www.reddit.com/search?q=cake%20recipes
const searchJson = `search.json?q=${searchKey}`; //https://www.reddit.com/search?q=cake%20recipes

export const API_ROOT = 'https://www.reddit.com/subreddits.json';


