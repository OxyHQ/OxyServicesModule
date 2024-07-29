import React from "react";
import styles from "./styles/user-username.module.css";

export const UserUsername = ({
  username,
}: {
  username: string | undefined;
}) => {
  return <span className={styles.container}>@{username}</span>;
};
