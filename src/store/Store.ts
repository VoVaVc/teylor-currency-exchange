import { createStore } from 'redux';
import { initialState, reducer } from './Reducers';
import { getFavorites, setFavorites } from './LocalStorage';

const storeSetup = () => {
  initialState.favorites = getFavorites();
  return initialState;
}

const store = createStore(reducer, storeSetup());

// attach local storage for favorites
store.subscribe(() => {
  setFavorites(store.getState().favorites)
})

export default store;
