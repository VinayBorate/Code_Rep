//  createa store object from redux store 
import { createStore } from "redux";
import myReducer from "./reducers";

const Store = createStore(myReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
export default Store;

//https://github.com/reduxjs/redux-devtools/tree/main/extension#installation

