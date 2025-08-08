export type UserType = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
};

export type UserProfileType = Omit<UserType, 'password'> & {
  user_id: number;
  user_profile_id: number;
};
