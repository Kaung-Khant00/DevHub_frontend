import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import { thunk } from "redux-thunk";
import { userReducer } from "./user/userReducer";
import { postReducer } from "./post/postReducer";

const rootReducer = combineReducers({
  user: userReducer,
  post: postReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);
