import { API_URL } from '../config';
import { CurrencyHistoryResponce, CurrencyResponce } from './IApi';
import moment, { Moment } from 'moment';

const format = 'YYYY-MM-DD';

export const getCurrency = async (currencyCode: string = 'EUR'): Promise<CurrencyResponce> => {
  const res = await fetch(`${API_URL}/latest?base=${currencyCode}`);
  const json = await res.json();

  // add current currency to fit the list
  json.rates[currencyCode] = 1;
  return json;
}

export const getCurrencyHistory = async (
    compareCurrencyCode,
    currencyCode: string = 'EUR',
    startDate: Moment = moment(),
    endDate: Moment = moment().subtract(1, 'month')
  ): Promise<CurrencyHistoryResponce> => {
    let parsedStartDate: string = startDate.format(format);
    let parsedEndDate: string = endDate.format(format);

    if (moment(startDate).isAfter(endDate)) {
      let swap = parsedEndDate;
      parsedEndDate = parsedStartDate;
      parsedStartDate = swap;
    }

    const res = await fetch(
      `${API_URL}/history?base=${currencyCode}&symbols=${compareCurrencyCode}&start_at=${parsedStartDate}&end_at=${parsedEndDate}`
    );

    const json = await res.json();
    return json;
}
