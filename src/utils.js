import dayjs from 'dayjs';

// Функция из интернета по генерации случайного числа из диапазона
// Источник - https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_random
const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const humanizeFilmRuntime = (runtimeDate) => dayjs(runtimeDate).format('H[h] m[m]');
const humanizeFilmReleaseDate = (releaseDate) => dayjs(releaseDate).format('D MMMM YYYY');
const humanizeFilmCommentDate = (commentDate) => dayjs(commentDate).format('YYYY/MM/DD HH:MM');

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

const isEscapeKey = (evt) => (
  evt.key === 'Escape'
);

export { getRandomInteger, getRandomDate, humanizeFilmRuntime, humanizeFilmReleaseDate, humanizeFilmCommentDate, listToMap, isEscapeKey };
