import { get, post } from ".";

export type CommentEntry = {
  name: string;
  message: string;
  filmId: string;
};

export type Comment = CommentEntry & {
  id: string;
};

const BASE_URL = "http://localhost:3001/comments";

export async function getComments(filmId: string) {
  const comments = await get<Comment[]>(`${BASE_URL}?filmId=${filmId}`);

  return comments;
}

export async function addComment(comment: CommentEntry) {
  const data = await post<Comment, CommentEntry>(BASE_URL, comment);

  return data;
}
