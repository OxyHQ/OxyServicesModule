import { useState, useEffect } from "react";
import axios from "axios";
import { create } from "zustand";
import localforage from "localforage";

import { OXY_AUTH_URL } from "../config";
import { UserRole } from "../types";
import useCrossDomainStorage from "./useCrossDomainStorage";

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
    role: UserRole;
    isOAuth: boolean;
    isTwoFactorEnabled: boolean;
  };
}

type SessionState = {
  session: SessionModel | null;
  status: string;
  error: any;
  fetchSessionData: () => void;
};

export const useSessionStore = create<SessionState>((set) => {
  let isFirstFetch = true;

  return {
    session: null,
    status: "loading",
    error: null,
    fetchSessionData: async () => {
      try {
        if (isFirstFetch) {
          set({ status: "loading" });
          isFirstFetch = false;
        }

        // Get the session ID from the URL parameters if it exists
        const urlParams = new URLSearchParams(window.location.search);
        let clientKey = urlParams.get("clientKey");

        // If the session ID was not found in the URL parameters, get it from local storage
        if (!clientKey) {
          const { get } = useCrossDomainStorage();
          clientKey = get("clientKey");
        } else {
          // If the session ID was found in the URL parameters, set it in local storage
          const { set } = useCrossDomainStorage();
          set("clientKey", clientKey);
        }

        const response = await axios.get(
          OXY_AUTH_URL + "/api/session/" + clientKey
        );
        if (response.status !== 200) {
          throw new Error(`Unexpected response status: ${response.status}`);
        }
        set({ session: response.data, status: "success" });
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.response) {
            set({
              error: `Network error: ${error.message}, Status code: ${error.response.status}`,
              status: "error",
            });
          } else if (error.request) {
            set({
              error: "Network error: No response received from server.",
              status: "error",
            });
          } else {
            set({
              error: `Network error: ${error.message}`,
              status: "error",
            });
          }
        } else {
          set({
            error: "An unknown error occurred while loading the session data.",
            status: "error",
          });
        }
      }
    },
  };
});

function useOxySession() {
  const { session, status, error, fetchSessionData } = useSessionStore();

  useEffect(() => {
    fetchSessionData();
  }, []);

  return { session, status, error };
}

export default useOxySession;
