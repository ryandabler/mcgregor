import { createStore } from "redux";
import { gardenReducer } from "./reducer";

export default createStore(gardenReducer);