import { Effect, put, delay, call, take } from "redux-saga/effects";
import { GetChartDataCommands } from "../commands/commands";
import { addChartDataTab } from "../slices/Indexes";
import { PriceData, SmallChartsData } from "../types/PriceDataTypes";
import { PriceDataResponse } from "../types/RequestResponseTypes";
import { send } from "../utils/websocket";
import { saveChartData } from "./actions";
import { WS } from "./APISaga";
import { WSACTIONS } from "./types";

export default function* getChartDataWorker(action: Effect<WSACTIONS, string>) {
  const symbol = action.payload;
  //get array of charts requests
  const requests = GetChartDataCommands(symbol);
  let InstrumentData: SmallChartsData = {
    Min15: [] as PriceData[],
    Hour1: [] as PriceData[],
    Hour4: [] as PriceData[],
    Day: [] as PriceData[],
    Month: [] as PriceData[],
  };
  if (WS !== null) {
    for (let request of requests) {
      //get chart period from request
      const period = request.arguments.info.period;
      yield call(send, WS, request);
      //await for ws answer
      const { payload } = yield take(WSACTIONS.saveChartData);
      const prices = payload;
      switch (period) {
        case 15:
          InstrumentData.Min15 = prices;
          break;
        case 60:
          InstrumentData.Hour1 = prices;
          break;
        case 240:
          InstrumentData.Hour4 = prices;
          break;
        case 1440:
          InstrumentData.Day = prices;
          break;
        case 10080:
          InstrumentData.Month = prices;
          break;
      }
      //delay making request to API
      yield delay(200);
    }
    yield put(
      addChartDataTab({
        symbol,
        data: InstrumentData,
      })
    );
  }
}
export function* saveChartDataWorker(returnData: PriceDataResponse) {
  const { digits, rateInfos } = returnData;
  const correct = Math.pow(10, digits);
  const data = rateInfos.map((item: PriceData) => ({
    close: (item.open + item.close) / correct,
    open: item.open / correct,
    high: (item.open + item.high) / correct,
    low: (item.open + item.low) / correct,
    ctm: item.ctm,
    ctmString: item.ctmString,
    vol: item.vol,
  }));
  yield put(saveChartData(data));
}
