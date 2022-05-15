// Функция из интернета по генерации случайного числа из диапазона
// Источник - https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_random
const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const getRandomDate = (minYear, maxYear) => {
  const date = new Date();
  date.setFullYear(getRandomInteger(minYear, maxYear));
  date.setMonth(getRandomInteger(0, 11));
  date.setDate(date.getDate() + getRandomInteger(0, 6));
  date.setHours(getRandomInteger(0, 23));
  return date;
};

const listToMap = (list, keyGetter) => {
  const map = new Map();
  list.forEach((item) => {
    map.set(keyGetter(item), item);
  });
  return map;
};

const mapValuesToList = (map) => (
  Array.from(map.values())
);

const isEscapeKey = (evt) => (
  evt.key === 'Escape'
);

const updateItem = (items, update) => {
  console.log('update watchlist', update.userDetails.watchlist);
  console.log('update alreadyWatched', update.userDetails.alreadyWatched);
  console.log('update favorite', update.userDetails.favorite);
  console.log('update watchlist', update.userDetails.watchlist);
  const index = items.findIndex((item) => item.id === update.id);
  if (index === -1) {
    console.log('-1');
    return items;
  }
  return [
    ...items.slice(0, index),
    update,
    ...items.slice(index + 1),
  ];
};

export { getRandomInteger, getRandomDate, listToMap, mapValuesToList, isEscapeKey, updateItem };