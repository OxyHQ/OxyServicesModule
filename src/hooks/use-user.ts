import { getUser } from "./get-user";

export interface IUser {
  id: string;
  username: string;
  name: string;
  email: string;
  role: string;
  avatar: string;
  color: string;
}

export const useUser = async ({
  id,
  initialData: IUser,
}: {
  id: string | undefined;
  initialData?: IUser;
}) => {
  if (!id) {
    // Return a default value or null when id is not provided
    return null;
  }
  return getUser(id);
};
