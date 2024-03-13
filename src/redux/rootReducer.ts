import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./authDuck";

const rootReducer = combineReducers({
  auth: authReducer,
});

export default rootReducer;
