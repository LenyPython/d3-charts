import createAction from '../../utils/actionCreator'
import { chartDataRequestPayload, INSTRUMENTS_ACTIONS } from './types'

export const downloadChartData = createAction<chartDataRequestPayload>(
  INSTRUMENTS_ACTIONS.downloadChartData,
)
