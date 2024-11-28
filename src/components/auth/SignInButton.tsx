import React from "react";
import styles from "./styles/sign-in-button.module.css";
import { OxyLogo } from "../assets/oxy-logo";
import useCrossDomainStorage from "../../hooks/useCrossDomainStorage";

export const SignInButton = ({
  icon = <OxyLogo />,
  text = "Sign in with Oxy",
  callback = typeof window !== "undefined" ? window.location.href : "",
}: {
  icon?: React.ReactNode;
  text?: string;
  callback?: string;
}) => {
  const { set } = useCrossDomainStorage();

  const onClick = () => {
    if (typeof window !== "undefined") {
      const redirectUrl = `https://auth.oxy.so/?callback=${encodeURIComponent(
        callback
      )}`;
      set("clientKey", ""); // Clear the clientKey before redirecting
      window.location.href = redirectUrl;
    }
  };

  return (
    <button onClick={onClick} className={styles.container}>
      {icon && icon}
      {text}
    </button>
  );
};

export default SignInButton;
