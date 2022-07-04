import { STREAM_ANSWERS } from '../../commands'
import { RawPriceData } from '../../types'

export interface MinuteCandleResponse {
  command: STREAM_ANSWERS.getCandleResponse
  data: RawPriceData
}
