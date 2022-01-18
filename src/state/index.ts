import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { RESET_APP_STATE } from "./types/app";

// Reducers
import AccountReducer from "./reducers/account";
import UserReducer from "./reducers/user";

// Combine Reducers
const appReducer = combineReducers({
  account: AccountReducer,
  user: UserReducer
});

// Root Reducer
const rootReducer = (state: object, action: any) => {
  if(action.type === RESET_APP_STATE) return appReducer(undefined, action);
  else return appReducer(state as any, action);
};

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION__: Function
  }
}

//--store--
export const store = createStore(
  rootReducer as any,
  compose(
      applyMiddleware(thunk),
      window.__REDUX_DEVTOOLS_EXTENSION__
          ? window.__REDUX_DEVTOOLS_EXTENSION__({
              trace: true,
              traceLimit: 25
          })
          : (f: Function): Function => f
  )
);