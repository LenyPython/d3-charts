import { Effect, put, call } from "redux-saga/effects";
import { setIndexes } from "../slices/Indexes";
import { instrumentCategory } from "../types/PriceDataTypes";
import { APIResponse } from "../types/RequestResponseTypes";
import { hashInstruments } from "../utils/websocket/hashInstruments";
import { saveChartDataWorker } from "./GetFullPeriodChartDataSaga";

export function* AccountDataDispatcher({
  payload,
}: Effect<string, APIResponse>) {
  const returnData = payload;

  if (Array.isArray(returnData))
    yield put(setIndexes(hashInstruments(returnData as instrumentCategory[])));
  else if (
    returnData.hasOwnProperty("digits") &&
    returnData.hasOwnProperty("rateInfos")
  )
    yield call(saveChartDataWorker, returnData);
}
