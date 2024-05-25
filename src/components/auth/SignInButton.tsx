import React from "react";
import styles from "./sign-in-button.module.css";
import { OxyLogo } from "../assets/oxy-logo";

export const SignInButton = ({
  icon = <OxyLogo />,
  text = "Sign in with Oxy",
  callback = window.location.href,
}: {
  icon?: React.ReactNode;
  text?: string;
  callback?: string;
}) => {
  const onClick = () => {
    const redirectUrl = `https://auth.oxy.so/?callback=${encodeURIComponent(
      callback
    )}`;
    window.location.href = redirectUrl;
  };

  return (
    <button onClick={onClick} className={styles.container}>
      {icon && icon}
      {text}
    </button>
  );
};

export default SignInButton;
