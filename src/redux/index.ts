import { configureStore } from '@reduxjs/toolkit';
import useReducer from './reducer';
import { useSelector, TypedUseSelectorHook } from "react-redux";
import { registrationApi } from './registrationApi';
import { conferencesApi } from './conferencesApi';
import { userApi } from './userApi';

const store = configureStore({
  reducer: {
    user: useReducer, 
    [registrationApi.reducerPath]: registrationApi.reducer,
    [conferencesApi.reducerPath]: conferencesApi.reducer,
    [userApi.reducerPath]: userApi.reducer
  },
  middleware: (getDefaultMiddleware) => 
  getDefaultMiddleware().concat(
    registrationApi.middleware, conferencesApi.middleware, userApi.middleware
  ),
  devTools: true
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;