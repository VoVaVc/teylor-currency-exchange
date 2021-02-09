export const getFavorites = (): string[] => {
  const fav = localStorage.getItem('favorites')
  return fav ? fav.split(',') : [];
}

export const setFavorites = (favorites: string[]) => {
  localStorage.setItem('favorites', favorites.join(','));
}
