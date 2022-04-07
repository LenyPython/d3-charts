import createAction from '../../utils/actionCreator'
import { INSTRUMENTS_ACTIONS } from './types'

export const downloadChartData = createAction<string>(INSTRUMENTS_ACTIONS.downloadChartData)
