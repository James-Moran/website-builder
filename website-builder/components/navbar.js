import { Dialog } from "@headlessui/react";
import { useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";

import SignUpModal from "./SignUpModal";
import { useUser } from "./UserContext";

export default function Navbar({ title }) {
  const [user, setUser] = useUser();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    const logout = async () =>
      fetch("http://localhost:8000/users/logout", {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.success === true) {
            setUser({ loggedIn: false });
          }
        });
    toast.promise(
      logout(),
      {
        loading: "Logging Out",
        error: "Problem Logging Out",
        success: "Logged Out",
      },
      {
        success: {
          icon: "👋",
        },
      }
    );
  };

  return (
    <header className="flex items-center justify-between pb-4 border-black border-b-4 mb-4 mt-2">
      <h1 className="text-xl md:text-4xl font-bold">{title}</h1>
      <nav>
        <ul className="flex flex-row justify-end">
          {user.loggedIn ? (
            <Link href="/create">
              <li className="inline font-bold p-2 cursor-pointer underline-offset-8 decoration-4 hover:underline">
                My Store
              </li>
            </Link>
          ) : (
            <Link href="/create">
              <li className="inline font-bold p-2 cursor-pointer underline-offset-8 decoration-4 hover:underline">
                Create
              </li>
            </Link>
          )}
          {user.loggedIn ? (
            <li
              className="inline font-bold p-2 cursor-pointer underline-offset-8 decoration-4 hover:underline"
              onClick={handleLogout}
            >
              Sign Out
            </li>
          ) : (
            <li
              className="inline font-bold p-2 cursor-pointer underline-offset-8 decoration-4 hover:underline"
              onClick={() => setIsOpen(true)}
            >
              Sign In
            </li>
          )}
        </ul>
      </nav>
      <SignUpModal isOpen={isOpen} setIsOpen={setIsOpen} callback={null} />
    </header>
  );
}
