import { createStore } from "redux";
import rootReducer from "./reducer";
import initialState from "./initialState";

export default createStore(rootReducer, initialState);
