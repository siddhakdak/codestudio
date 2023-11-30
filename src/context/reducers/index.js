import { combineReducers } from "redux";
import userAuthReducer from "./userAuthReducer";
import projectReduces from "./projectReduces";
import searchReducer from "./searchreducer";

const myReducer = combineReducers({
    user: userAuthReducer,
    projects: projectReduces,
    searchTerm: searchReducer
}) 

export default myReducer;