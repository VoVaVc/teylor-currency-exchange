import { AnyAction } from 'redux';
import { EActions } from './StoreTypes'

export function setCurrencies(state: string[]): AnyAction {
  return {
    payload: state,
    type: EActions.SET_CURRENCIES_LIST,
  };
}


export function setAmount(state: number): AnyAction {
  return {
    payload: state,
    type: EActions.SET_AMOUNT,
  };
}


export function setFavorite(state: string): AnyAction {
  return {
    payload: state,
    type: EActions.SET_FAVORITE,
  };
}

export function removeFavorite(state: string): AnyAction {
  return {
    payload: state,
    type: EActions.REMOVE_FAVORITE,
  };
}
