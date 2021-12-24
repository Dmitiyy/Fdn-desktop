import { configureStore } from '@reduxjs/toolkit';
import useReducer from './reducer';
import { useSelector, TypedUseSelectorHook } from "react-redux";
import { registrationApi } from './registrationApi';

const store = configureStore({
  reducer: {
    user: useReducer, 
    [registrationApi.reducerPath]: registrationApi.reducer
  },
  middleware: (getDefaultMiddleware) => 
  getDefaultMiddleware().concat(registrationApi.middleware),
  devTools: true
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;