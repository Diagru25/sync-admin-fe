export type UserType = {
  UserId: number;
  Username: string;
  exp: number;
  iat: number;
};

export type ChangePassType = {
  newPassword: string;
};
