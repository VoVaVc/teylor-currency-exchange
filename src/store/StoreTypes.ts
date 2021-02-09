export enum EActions {
  SET_CURRENCIES_LIST = 'SET_CURRENCIES_LIST',
  SET_AMOUNT = 'SET_AMOUNT',
  SET_FAVORITE = 'SET_FAVORITE',
  REMOVE_FAVORITE = 'REMOVE_FAVORITE',
}

export interface IStore {
  currencies: string[];
  amount: number;
  favorites: string[];
}
