export interface CurrencyResponce {
  base: string;
  date: string;
  rates: {
    [key: string]: number;
  }
}


export interface CurrencyHistoryResponce {
  base: string;
  start_at: string;
  end_at: string;
  rates: {
    [date: string]: {
      [currency: string]: number;
    };
  }
}
