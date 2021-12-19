import { configureStore } from '@reduxjs/toolkit';
import useReducer, { nestApi } from './reducer';
import { useSelector, TypedUseSelectorHook } from "react-redux";

const store = configureStore({
  reducer: {
    user: useReducer, 
    [nestApi.reducerPath]: nestApi.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(nestApi.middleware),
  devTools: true
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;