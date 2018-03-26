import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { gardenReducer } from "./reducer";

const store = createStore(
    gardenReducer,
    applyMiddleware(thunk)
);

export default store;