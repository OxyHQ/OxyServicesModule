import { useEffect } from "react";

const useCrossDomainStorage = () => {
  const set = (key: string, value: string) => {
    localStorage.setItem(key, value);
    window.postMessage({ key, value }, "*");
  };

  const get = (key: string) => {
    return localStorage.getItem(key);
  };

  const handlePostMessage = (event: MessageEvent) => {
    if (event.origin !== window.location.origin) {
      const { key, value } = event.data;
      localStorage.setItem(key, value);
    }
  };

  useEffect(() => {
    window.addEventListener("message", handlePostMessage);
    return () => {
      window.removeEventListener("message", handlePostMessage);
    };
  }, []);

  return { set, get };
};

export default useCrossDomainStorage;
