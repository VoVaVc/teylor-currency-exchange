export enum EActions {
  SET_CURRENCIES_LIST = 'SET_CURRENCIES_LIST',
  SET_AMOUNT = 'SET_AMOUNT',
}

export interface IStore {
  currencies: string[];
  amount: number;
}
