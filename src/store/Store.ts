import { createStore } from 'redux';
import { initialState, reducer } from './Reducers';

const store = createStore(reducer, initialState);

export default store;
