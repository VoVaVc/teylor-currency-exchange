export enum EActions {
  SET_CURRENCIES = 'SET_CURRENCIES',
}

export interface IStore {
  currencies: string[];
}
