"use client";

import { signOut, useSession } from "next-auth/react";

const Header = () => {
  const session = useSession();
  const user = session.data;

  const handleSignout = async () => {
    await signOut();
  };
  return (
    <header className="flex h-16 flex-col justify-center bg-stone-100">
      {user && <button onClick={handleSignout}>Signout</button>}
    </header>
  );
};

export default Header;
