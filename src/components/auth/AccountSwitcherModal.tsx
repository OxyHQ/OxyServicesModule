"use client";
import * as React from "react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import useOxySession from "../../hooks/useOxySession";
import { forwardRef } from "react";
import Image from "next/image";
import { HiOutlinePlus } from "react-icons/hi";
import { PiSignOutBold } from "react-icons/pi";
import { AiOutlineClose } from "react-icons/ai";
import { Avatar } from "../../features/profile";

import getUserById from "../../hooks/getUserById";

import styles from "./styles/session-owner-modal.module.css";

interface User {
  id: string;
  username: string;
  name: string;
  email: string;
  role: string;
  avatar: string;
}

export const AccountSwitcherModal = forwardRef<
  HTMLButtonElement,
  { onClose: () => void }
>(({ onClose }, ref) => {
  const { session } = useOxySession();
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const fetchedUser = await getUserById(session?.user?.id);
        setUser(fetchedUser);
      } catch (error) {
        setError(error.message);
      }
    };

    if (session) {
      fetchUser();
    }
  }, [session]);

  if (!session) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: "100%" }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: "100%" }}
      transition={{
        ease: "easeInOut",
        duration: 0.2,
      }}
      className={styles.container}
      role="group"
      onClick={handleBackdropClick}
    >
      <button
        className="absolute right-3 top-3 rounded-full bg-indigo-50 p-1 hover:bg-zinc-200"
        onClick={onClose}
      >
        <AiOutlineClose className="h-5 w-5 rounded-full stroke-2 text-zinc-700" />
      </button>
      <p>{session?.user?.email}</p>
      <div className="h-20 w-20 rounded-full border">
        <Avatar
          userImage={session?.user?.avatar as string}
          className="h-full w-full rounded-full object-center"
          draggable={false}
          alt="avatar"
        />
      </div>
      <h2 className="md:text-2xl text-xl font-normal">
        Hi, {session?.user?.name}!
      </h2>
      <button className="rounded-full border border-black px-7 py-2 text-blue-500 hover:bg-[#d3dfee]">
        Manage your Oxy Account
      </button>
      <div className="flex space-x-1">
        <button className="md:w-44 flex w-36 items-center space-x-2 rounded-l-full bg-white py-3 pl-3  hover:bg-zinc-200">
          <HiOutlinePlus className="h-7 w-7 rounded-full bg-indigo-50 p-1 text-blue-500" />
          <span>Add account</span>
        </button>
        <button className="md:w-44 flex w-36 items-center space-x-2 rounded-r-full bg-white py-3 pl-3  hover:bg-zinc-200">
          <PiSignOutBold className="h-6 w-6" />
          <span>Sign out</span>
        </button>
      </div>
      <div className="flex h-10 items-center space-x-2 text-xs">
        <span>Privacy policy</span>
        <span className="-mt-[3px]"> . </span> <span>Terms of service</span>
      </div>
    </motion.div>
  );
});

AccountSwitcherModal.displayName = "AccountSwitcherModal";
