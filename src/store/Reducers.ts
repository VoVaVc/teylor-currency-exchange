import { IStore } from './StoreTypes';
import { AnyAction } from 'redux';

export const initialState: IStore = {
  currencies: [],
};

export const reducer = (state = initialState, action: AnyAction): IStore => {
  switch (action.type) {
    default:
        return state;
  }
};
