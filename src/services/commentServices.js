import http from "./";

export const addCommentApi = (commentBody) => {
  return http.post(`comments/addComment`, commentBody);
};

export const getUserCommentsApi = () => {
  return http.get("comments");
};
