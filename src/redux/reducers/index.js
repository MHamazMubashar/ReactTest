// redux/reducers/index.js

import { combineReducers } from "redux";
import contactsReducer from "./contactsReducer";

const rootReducer = combineReducers({
  contactsReducer: contactsReducer,
  // Add more reducers here if needed
});

export default rootReducer;
