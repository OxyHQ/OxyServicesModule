"use client";
import * as React from "react";
import { AnimatePresence } from "framer-motion";
import useOxySession from "../../hooks/useOxySession";
import { useRef, useState } from "react";

import { useUser } from "../../hooks/use-user";

import { DotIcon } from "../../assets/dot-icon";
import { Button } from "../../components/elements/button";
import { EllipsisWrapper } from "../../components/elements/ellipsis-wrapper";
import { Modal } from "../../components/elements/modal";
import { Avatar, UserName, UserUsername } from "../../features/profile";

import { AccountSwitcherModal } from "./AccountSwitcherModal";

export const SessionOwnerButton = () => {
  const { session, error } = useOxySession();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const openModal = React.useCallback(() => {
    setIsModalOpen(true);
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <Button
        aria-label="Account menu"
        onClick={openModal}
        ref={buttonRef}
        aria-haspopup="menu"
        aria-expanded={isModalOpen}
        className="p-[0.75em] hover:bg-neutral-500 focus-visible:bg-neutral-500 focus-visible:outline-secondary-100 active:bg-neutral-600 xxl:flex xxl:w-full xxl:gap-3"
      >
        <Avatar userImage={session?.user?.avatar as string} />
        <div className="hidden flex-1 flex-col xxl:flex">
          <UserName
            name={session?.user?.name}
            isVerified={session?.user?.verified}
          />

          <EllipsisWrapper>
            <UserUsername username={session?.user?.username} />
          </EllipsisWrapper>
        </div>
        <div className="hidden fill-secondary-100 xxl:inline [&>svg]:size-h2">
          <DotIcon />
        </div>
      </Button>

      <AnimatePresence>
        {isModalOpen && (
          <Modal
            onClose={() => setIsModalOpen(false)}
            background="none"
            minViewportWidth={500}
          >
            <AccountSwitcherModal
              ref={buttonRef}
              onClose={() => setIsModalOpen(false)}
            />
          </Modal>
        )}
      </AnimatePresence>
    </>
  );
};
