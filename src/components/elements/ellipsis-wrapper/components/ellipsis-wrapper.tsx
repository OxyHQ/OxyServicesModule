import React from "react";
import styles from "./styles/ellipses-wrapper.module.css";

export const EllipsisWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div
      aria-hidden={true}
      role="presentation"
      className="grid grid-flow-col [&>*]:truncate"
    >
      {children}
    </div>
  );
};
