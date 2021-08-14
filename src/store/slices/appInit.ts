import {createSlice} from '@reduxjs/toolkit';

import {AppThunk} from "@/store";

interface AppInitState {
  isInitialized: boolean,
}

const initialState: AppInitState = {
  isInitialized: false
};

const slice = createSlice({
  name: 'appInit',
  initialState,
  reducers: {
    init(state) {
      return {
        ...state, isInitialized: true
      }
    },
    uninit(state) {
      return {
        ...state, isInitialized: false
      }

    },
  },
});

export const {reducer} = slice;

export const init = (): AppThunk => dispatch => dispatch(slice.actions.init());

//export const uninit = (): AppThunk => dispatch => dispatch(slice.actions.uninit());

//export default slice;
