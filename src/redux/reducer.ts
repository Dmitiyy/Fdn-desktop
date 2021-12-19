import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

interface IDefaultPayload {
  data: any;
  ini: string;
}

interface IState {
  signUpBlock: Boolean;
  activeNavBtn: number;
};

const initialState = {
  signUpBlock: true,
  activeNavBtn: 0
} as IState;

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setDataDefault(state: any, action: PayloadAction<IDefaultPayload>) {
      state[action.payload.ini] = action.payload.data;
    }
  }
})

export const nestApi = createApi({
  reducerPath: 'nestApi',
  baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:3001/'}),
  endpoints: (builder) => ({
    getText: builder.query({
      query: () => 'users'
    })
  })
})
export const {useGetTextQuery}: any = nestApi;

export const {setDataDefault} = userSlice.actions;
export default userSlice.reducer;