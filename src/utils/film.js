import dayjs from 'dayjs';

const humanizeFilmRuntime = (runtimeDate) => dayjs(runtimeDate).format('H[h] m[m]');
const humanizeFilmReleaseDate = (releaseDate) => dayjs(releaseDate).format('D MMMM YYYY');
const humanizeFilmCommentDate = (commentDate) => dayjs(commentDate).format('YYYY/MM/DD HH:MM');

export { humanizeFilmRuntime, humanizeFilmReleaseDate, humanizeFilmCommentDate };
