const ALERT_SHOW_TIME = 5000;

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

const isCtrlEnterKey = (evt) => (
  evt.ctrlKey && evt.key === 'Enter'
);

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';
  alertContainer.textContent = message;
  document.body.append(alertContainer);
  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

export { getRandomInteger, getRandomDate, listToMap, mapValuesToList, isEscapeKey, isCtrlEnterKey, showAlert };
