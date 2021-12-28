import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface IDefaultPayload {
  data: any;
  ini: string;
}

interface IState {
  signUpBlock: Boolean;
  activeNavBtn: number;
  certainConference: any;
};

const initialState = {
  signUpBlock: true,
  activeNavBtn: 0,
  certainConference: {}
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

export const {setDataDefault} = userSlice.actions;
export default userSlice.reducer;