import { get } from ".";
import type { Comment } from "./comments";
import { getComments } from "./comments";

export type Film = {
  id: string;
  title: string;
  original_title: string;
  original_title_romanised: string;
  image: string;
  movie_banner: string;
  description: string;
  director: string;
  producer: string;
  release_date: string;
  running_time: string;
  rt_score: string;
  people: string[];
  species: string[];
  locations: string[];
  vehicles: string[];
  url: string;
};

export type FilmCharacter = {
  id: string;
  name: string;
  gender?: string;
  age?: string;
  eye_color?: string;
  hair_color?: string;
  films: string[];
  species: string;
  url: string;
};

export type FilmData = Film & {
  characters?: FilmCharacter[];
  comments?: Comment[];
};

const BASE_URL = "https://ghibliapi.herokuapp.com";

export const getFilm = async (title?: string | null) => {
  const films = await get<Film[]>(`${BASE_URL}/films`);

  return films.filter((film) =>
    title ? film.title.toLowerCase().includes(title.toLowerCase()) : true
  );
};

export const getFilmById = async (filmId: string) => {
  const film = await get<Film>(`${BASE_URL}/films/${filmId}`);
  const comments = await getComments(filmId);

  const characters = await Promise.all(
    film.people
      .filter((url) => url !== `${BASE_URL}/people/`)
      .map((url) => get<FilmCharacter>(url))
  );

  const data: FilmData = { ...film, characters, comments };

  return data;
};

export const getFilmCharacter = async (
  characterId: string
): Promise<FilmCharacter> => {
  const character = await get<FilmCharacter>(
    `${BASE_URL}/people/${characterId}`
  );

  return character;
};
