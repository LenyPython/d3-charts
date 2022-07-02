import { TRADES_ACTIONS } from './../UserTradesStream/types'
import createAction from '../../utils/actionCreator'

export const ConnectCandleStream = createAction(TRADES_ACTIONS.connectCandleStream)
