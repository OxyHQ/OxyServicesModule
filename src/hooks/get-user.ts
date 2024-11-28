import axios from "axios";
import { OXY_AUTH_URL } from "../config";

export const getUser = async (id: string | undefined) => {
  if (!id) {
    throw new Error("User ID is required");
  }
  try {
    const response = await axios.get(OXY_AUTH_URL + `/api/users/${id}`);
    return response.data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        // Server responded with a status code outside of 2xx
        throw new Error(
          `Server responded with status ${error.response.status}: ${error.response.data}`
        );
      } else if (error.request) {
        // Request was made but no response received
        throw new Error("No response received from server");
      } else {
        // Error setting up the request
        throw new Error(`Axios error: ${error.message}`);
      }
    } else {
      // Non-Axios error
      throw error;
    }
  }
};
