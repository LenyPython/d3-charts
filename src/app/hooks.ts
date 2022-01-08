import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import {PriceData} from '../types';
import type { RootState, AppDispatch } from './store';
import {useState} from 'react'

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

//price data hook
export const usePriceData = (data: PriceData[]) => useState<PriceData[]>(data)

export type priceDataValue = ReturnType<typeof usePriceData>[0]
export type priceDataSet = ReturnType<typeof usePriceData>[1]
