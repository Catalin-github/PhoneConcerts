import { combineReducers } from "redux";
import userReducer from "./Authentication/userReducer";
import LangReducer from "./Language/LangReducer";

const rootReducer = combineReducers({
  users: userReducer,
  locale: LangReducer,
});

export default rootReducer;
