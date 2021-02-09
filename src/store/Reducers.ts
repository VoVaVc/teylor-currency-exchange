import { IStore, EActions } from './StoreTypes';
import { AnyAction } from 'redux';

export const initialState: IStore = {
  currencies: [],
  favorites: [],
  amount: 1,
};

export const reducer = (state = initialState, action: AnyAction): IStore => {
  switch (action.type) {
    case EActions.SET_CURRENCIES_LIST:
      return {
        ...state,
        currencies: action.payload,
      }

    case EActions.SET_AMOUNT:
      return {
        ...state,
        amount: action.payload,
      }

    case EActions.SET_FAVORITE:
      return {
        ...state,
        favorites: [...state.favorites, action.payload],
      }

    case EActions.REMOVE_FAVORITE:
      return {
        ...state,
        favorites: state.favorites.filter((item) => item !== action.payload)
      }

    default:
      return state;
  }
};
