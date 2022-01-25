import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Router from "next/router";
import { useUser } from "./UserContext";
import toast from "react-hot-toast";
import { logout } from "../api-lib/endpoints";

const SettingsModal = ({
  isOpen,
  setIsOpen,
  state,
  setState,
  setLoginOpen,
}) => {
  const [user, setUser] = useUser();

  const handleURLChange = (e) => {
    setState({ ...state, url: e.target.value });
  };

  const setColor = (color) => {
    setState({ ...state, color: color });
  };

  const handleLogout = async () => {
    await logout(setUser)
      .then((res) => {
        if (res.success) {
          setUser({ loggedIn: false });
          Router.push("/");
        }
      })
      .catch((err) => console.log("Problem logging out"));
  };

  const handleLogin = async () => {
    setIsOpen(false);
    setLoginOpen(true);
  };

  const handleLoadSave = async () => {};

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={() => setIsOpen(false)}
      >
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-60" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl border-black border-2">
              <div className="mt-2">
                <h3 className="text-md font-medium leading-6 text-gray-900 pb-1 pt-1">
                  URL
                </h3>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
                  id="url"
                  type="text"
                  value={state.url}
                  onChange={handleURLChange}
                />
              </div>

              <h3 className="text-md font-medium leading-6 text-gray-900 pb-1 pt-1 mt-2">
                Background Colour
              </h3>
              <div className="flex flex-row">
                <div
                  className="w-8 h-8 cursor-pointer bg-white border-2 border-black rounded"
                  onClick={() => setColor("bg-white")}
                />
                <div
                  className="w-8 h-8 ml-1 cursor-pointer bg-red-300 border-2 border-black rounded"
                  onClick={() => setColor("bg-red-300")}
                />
                <div
                  className="w-8 h-8 ml-1 cursor-pointer bg-orange-300 border-2 border-black rounded"
                  onClick={() => setColor("bg-orange-300")}
                />
                <div
                  className="w-8 h-8 ml-1 cursor-pointer bg-lime-300 border-2 border-black rounded"
                  onClick={() => setColor("bg-lime-300")}
                />
                <div
                  className="w-8 h-8 ml-1 cursor-pointer bg-blue-300 border-2 border-black rounded"
                  onClick={() => setColor("bg-blue-300")}
                />
              </div>
              <div className="border-slate-300 border-b-2 rounded mt-4" />
              <div className="flex flex-row justify-between">
                <button
                  type="button"
                  className="inline-flex justify-center px-4 py-2 my-4 text-sm font-medium text-white bg-black border border-transparent rounded-md hover:bg-gray-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500 disabled:bg-gray-600 max-w-fit"
                  onClick={() => setIsOpen(false)}
                >
                  Close
                </button>
                {user.loggedIn ? (
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 my-4 text-sm font-medium text-white bg-black border border-transparent rounded-md hover:bg-gray-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500 disabled:bg-gray-600 max-w-fit"
                    onClick={handleLogout}
                  >
                    Log Out
                  </button>
                ) : (
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 my-4 text-sm font-medium text-white bg-black border border-transparent rounded-md hover:bg-gray-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500 disabled:bg-gray-600 max-w-fit"
                    onClick={handleLogin}
                  >
                    Log In
                  </button>
                )}
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default SettingsModal;
