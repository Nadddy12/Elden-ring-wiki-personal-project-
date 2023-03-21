import {combineReducers} from "redux";
import userSlice from "./slices/user/userSlice.js";

const rootReducer = combineReducers({
    user: userSlice,
});


export default rootReducer;