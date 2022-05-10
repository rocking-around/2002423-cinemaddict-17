import { filter } from '../utils/filter.js';

export const generateFilter = (films) => Object.entries(filter).map(
  ([filterName, filterMetadata]) => ({
    name: filterName,
    count: filterMetadata.getCount(films),
    url: filterMetadata.url
  }),
);
