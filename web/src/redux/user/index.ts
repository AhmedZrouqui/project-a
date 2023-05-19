import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store';

// Define a type for the slice state
interface UserState {
  user: Object;
  loading: Boolean;
  error?: Object;
}

// Define the initial state using that type
const initialState: UserState = {
  user: {},
  loading: false,
};

export const UserSignIn = createAsyncThunk(
  'UserSignIn',
  async (data: Object, thunkAPI) => {
    try {
      console.log('lolo');
      return data;
    } catch (err) {
      thunkAPI.rejectWithValue({
        value: 'An error has occurred, please try again.',
      });
    }
  }
);

export const userState = createSlice({
  name: 'user',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(UserSignIn.fulfilled, (state, action) => {
      state.user = action.payload as Object;
    });
  },
});

// Other code such as selectors can use the imported `RootState` type
export const selectUser = (state: RootState) => state.user;

export default userState.reducer;
