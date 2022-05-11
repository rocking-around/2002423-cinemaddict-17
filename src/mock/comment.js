import { getRandomInteger, getRandomDate } from '../utils/common.js';
import { faker } from '@faker-js/faker';

const emojiList = [
  'smile',
  'sleeping',
  'puke',
  'angry'
];

const nameList = [
  'John Sierra',
  'Liam Smith',
  'Olivia Johnson',
  'Noah Williams',
  'Emma Brown',
  'Aaron Jones',
  'Oliver Garcia',
  'Ava Miller',
  'Elijah Davis',
  'Charlotte Rodriguez',
  'Emiliano Martinez'
];

const createRandomText = () => (
  faker.lorem.sentence()
);

const generateComment = (filmId) => ({
  text: createRandomText(),
  emoji: emojiList[getRandomInteger(0, emojiList.length - 1)],
  author: nameList[getRandomInteger(0, nameList.length - 1)],
  date: getRandomDate(2000, 2022),
  filmId: filmId
});

const genarateRandomComments = (count, filmId) => (
  Array.from({ length: count }, () => generateComment(filmId))
);

export { genarateRandomComments };
