export type RequestWithUserID = Request & {
  user: { userID: number };
};
