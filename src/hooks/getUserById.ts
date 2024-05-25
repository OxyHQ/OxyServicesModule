import axios from "axios";
import { OXY_AUTH_URL } from "../config";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar: string;
}

const getUserById = async (id?: string[], fields?: (keyof User)[]) => {
  try {
    const response = await axios.get(OXY_AUTH_URL + "/api/users/${id}");
    const user = fields
      ? fields.reduce(
          (obj, key) => ({ ...obj, [key]: response.data[key] }),
          {} as User
        )
      : response.data;
    return user;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.message);
    } else {
      throw new Error("An unknown error occurred while loading the user data.");
    }
  }
};

export default getUserById;
