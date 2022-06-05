import { humanizeFilmRuntime } from '../utils/film.js';
import { getRandomInteger, getRandomDate } from '../utils/common.js';
import { faker } from '@faker-js/faker';
import { generateRandomComments } from './comment';

const posterByTitle = new Map([
  ['Made for each other', 'made-for-each-other.png'],
  ['Popeye meets sinbad', 'popeye-meets-sinbad.png'],
  ['Sagebrush trail', 'sagebrush-trail.jpg'],
  ['Santa claus conquers the martians', 'santa-claus-conquers-the-martians.jpg'],
  ['The dance of life', 'the-dance-of-life.jpg'],
  ['The great flamarion', 'the-great-flamarion.jpg'],
  ['The man with the golden arm', 'the-man-with-the-golden-arm.jpg']
]);

const genreList = [
  'Action',
  'Adventure',
  'Comedy',
  'Crime',
  'Mystery',
  'Fantasy',
  'Historical',
  'Horror',
  'Fiction',
  'Thriller',
  'Western'
];

const ageRestrictionList = [
  '0+',
  '3+',
  '18+',
  'NaN+'
];

const countryList = [
  'Argentina',
  'Brazil',
  'Canada',
  'China',
  'Iceland',
  'Mexico',
  'United Kingdom',
  'USA'
];

const peopleList = [
  'Anthony Mann',
  'Anne Wigton',
  'Heinz Herald',
  'Richard Weil',
  'Erich von Stroheim',
  'Mary Beth Hughes',
  'Dan Duryea',
  'John Wayne'
];

const getRandomName = () => {
  const keys = Array.from(posterByTitle.keys());
  return keys[getRandomInteger(0, keys.length - 1)];
};

const getRandomDescription = () => (
  Array.from({ length: getRandomInteger(1, 5) }, faker.lorem.sentence).join(' ')
);

const getRandomPeopleList = () => {
  const people = [];
  for (let i = 0; i < getRandomInteger(1, 3); i++) {
    people.push(peopleList[getRandomInteger(0, peopleList.length - 1)]);
  }
  return people;
};

const getRandomRuntime = () => {
  const date = new Date();
  date.setHours(getRandomInteger(1, 3), getRandomInteger(0, 59));
  return humanizeFilmRuntime(date);
};

const getRandomGenres = () => {
  const genres = [];
  for (let i = 0; i < 3; i++) {
    genres.push(genreList[getRandomInteger(0, genreList.length - 1)]);
  }
  return genres;
};

export const generateFilm = (id) => {
  const filmTitle = getRandomName();
  return (
    {
      id: id,
      title: filmTitle,
      originalTitle: filmTitle,
      poster: posterByTitle.get(filmTitle),
      rating: `${getRandomInteger(1, 9)}.${getRandomInteger(1, 9)}`,
      releaseDate: getRandomDate(1940, 2022),
      runtime: getRandomRuntime(),
      genres: new Set(getRandomGenres()),
      description: getRandomDescription(),
      director: peopleList[getRandomInteger(0, peopleList.length - 1)],
      writers: new Set(getRandomPeopleList()),
      actors: new Set(getRandomPeopleList()),
      country: countryList[getRandomInteger(0, countryList.length - 1)],
      ageRestriction: ageRestrictionList[getRandomInteger(0, ageRestrictionList.length -1)],
      userDetails: {
        watchlist: Boolean(getRandomInteger(0, 1)),
        alreadyWatched: Boolean(getRandomInteger(0, 1)),
        watchingDate: getRandomDate(1941, 2022),
        favorite: Boolean(getRandomInteger(0, 1))
      },
      comments: generateRandomComments(getRandomInteger(0, 10), id)
    }
  );
};
