import { configureStore } from '@reduxjs/toolkit';
import rootReducer from "./reducers";


export default function configureAppStore(preloadedState) {
  const store = configureStore({
    reducer: rootReducer,
    preloadedState
  });

  return store;
}