// This is our Redux store 

// combining the reducers as its not good practise 
// to push multiple reducers to store 
//instead combine them as single reducer  then push 
import {combineReducers} from "redux"
import userAuthReducer from "./userAuthReducer"
import projectReducer from "./projectReducer";
import searchReducer from "./searchReducer";


const myReducer = combineReducers({
user:  userAuthReducer,
project: projectReducer,
searchTerm:  searchReducer,
});
export default myReducer