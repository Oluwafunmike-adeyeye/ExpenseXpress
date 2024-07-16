"use client";

import { RootState, AppDispatch } from './index'; 
import { ThunkAction } from 'redux-thunk'; 
import { Action } from 'redux'; 


export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;


export type AsyncAppDispatch = AppDispatch;
