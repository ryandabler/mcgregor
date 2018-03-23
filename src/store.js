import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { gardenReducer } from "./reducer";

export default createStore(
    gardenReducer,
    applyMiddleware(thunk)
);