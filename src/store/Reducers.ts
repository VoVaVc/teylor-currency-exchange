import { IStore, EActions } from './StoreTypes';
import { AnyAction } from 'redux';

export const initialState: IStore = {
  currencies: [],
};

export const reducer = (state = initialState, action: AnyAction): IStore => {
  switch (action.type) {
    case EActions.SET_CURRENCIES_LIST:
      return {
        ...state,
        currencies: action.payload,
      }
    default:
        return state;
  }
};
