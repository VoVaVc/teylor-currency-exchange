import { AnyAction } from 'redux';
import { EActions } from './StoreTypes'

export function setCurrencies(state: string[]): AnyAction {
  return {
    payload: state,
    type: EActions.SET_CURRENCIES_LIST,
  };
}
