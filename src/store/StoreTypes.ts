export enum EActions {
  SET_CURRENCIES_LIST = 'SET_CURRENCIES_LIST',
}

export interface IStore {
  currencies: string[];
}
