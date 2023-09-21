// redux/store.js

import { createStore } from "redux";
import rootReducer from "./reducers"; // You'll create this file later

const store = createStore(rootReducer);

export default store;
