import {PriceData} from "../../types"

let lastClose = Math.random() * 2 + 1
let month = Math.floor(Math.random() * 11) + 1
let year = Math.floor(Math.random() * 20) + 2000

export const createData = (num = 70): PriceData[]=>{
	let data = [] as PriceData[]
	for(let i = 1;i <= num; i++){
		let j = i % 31
		if(j === 0){
			month++
				if(month === 13) {
					year++
					month = 1
			}
			continue
		} 
		let upOrDown = Math.random() < 0.5 ? 1: -1	
		if(lastClose < 0.6) upOrDown = 1
		let close = lastClose + upOrDown * Math.random() * 0.2
		let rand = Math.random() * 0.02
		data.push({
			Date: `${j}/${month}/${year}`,
			Open: lastClose,
			Close: close,
			High: upOrDown > 0 ? close + rand: lastClose + rand,
			Low: upOrDown > 0 ? lastClose - rand: close - rand,
		})
		lastClose = data[data.length - 1].Close
	}
	return data
}