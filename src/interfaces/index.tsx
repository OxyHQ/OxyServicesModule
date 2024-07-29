interface SessionModel {
  user: {
    id: string;
    username: string;
    name: string;
    lastname: string;
    email: string;
    verified: boolean;
    avatar: string;
    created_at: string;
  };
}

export interface IUser {
  id: string;
  username: string;
  name: string;
  email: string;
  role: string;
  avatar: string;
  color: string;
}
