import axios from "axios";
import { OXY_AUTH_URL } from "../config";

interface User {
  id: string;
  username: string;
  name: string;
  email: string;
  role: string;
  avatar: string;
}

const getUserById = async (id?: string | string[], fields?: (keyof User)[]) => {
  try {
    const response = await axios.get(OXY_AUTH_URL + `/api/users/${id}`);
    if (response.status !== 200) {
      throw new Error(`Unexpected response status: ${response.status}`);
    }
    const user = fields
      ? fields.reduce(
          (obj, key) => ({ ...obj, [key]: response.data[key] }),
          {} as User
        )
      : (response.data as User);
    return user;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        throw new Error(
          `Network error: ${error.message}, Status code: ${error.response.status}`
        );
      } else if (error.request) {
        throw new Error("Network error: No response received from server.");
      } else {
        throw new Error(`Network error: ${error.message}`);
      }
    } else {
      throw new Error("An unknown error occurred while loading the user data.");
    }
  }
};

export default getUserById;
