import { AnyAction } from 'redux';
import { IStore } from './StoreTypes';

export function setMovies(state: IStore): AnyAction {
  return {
    payload: state,
    type: 'weee',
  };
}
