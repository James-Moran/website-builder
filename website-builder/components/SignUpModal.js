import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import isEmail from "validator/lib/isEmail";
import { useUser } from "./UserContext";

const SignUpModal = ({ isOpen, setIsOpen }) => {
  const [user, setUser] = useUser();

  const [emailLogin, setEmailLogin] = useState("");
  const [passwordLogin, setPasswordLogin] = useState("");

  const [emailRegister, setEmailRegister] = useState("");
  const [passwordRegister, setPasswordRegister] = useState("");
  const [confirmRegister, setConfirmRegister] = useState("");

  const handleLogin = async () => {
    const response = await fetch("http://localhost:8000/users/login", {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: emailLogin,
        password: passwordLogin,
      }),
    });
    const res = await response.json();
    if (res.success === true) {
      setUser({ loggedIn: true });
    }
    setIsOpen(false);
  };

  const handleRegister = async () => {
    const response = await fetch("http://localhost:8000/users/register", {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: emailRegister,
        password: passwordRegister,
      }),
    });
    const res = await response.json();
    if (res.success === true) {
      setUser({ loggedIn: true });
    }
    setIsOpen(false);
  };

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
                  Email Address
                </h3>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
                  id="emailLogin"
                  type="text"
                  onChange={(e) => setEmailLogin(e.target.value)}
                />
                <h3 className="text-md font-medium leading-6 text-gray-900 pb-1 pt-1">
                  Password
                </h3>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
                  id="passwordLogin"
                  type="password"
                  onChange={(e) => setPasswordLogin(e.target.value)}
                />
                <button
                  type="button"
                  className="inline-flex justify-center px-4 py-2 my-4 text-sm font-medium text-white bg-black border border-transparent rounded-md hover:bg-gray-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500 disabled:bg-gray-600"
                  disabled={passwordLogin.length < 5 || !isEmail(emailLogin)}
                  onClick={handleLogin}
                >
                  Log In
                </button>

                <div className="border-slate-300 border-b-2 rounded mb-2" />

                <h3 className="text-md font-medium leading-6 text-gray-900 pb-1 pt-1">
                  Email Address
                </h3>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
                  id="emailRegister"
                  type="text"
                  onChange={(e) => setEmailRegister(e.target.value)}
                />
                <h3 className="text-md font-medium leading-6 text-gray-900 pb-1 pt-1">
                  Password
                </h3>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
                  id="passwordRegister"
                  type="password"
                  onChange={(e) => setPasswordRegister(e.target.value)}
                />
                <h3 className="text-md font-medium leading-6 text-gray-900 pb-1 pt-1">
                  Confirm Password
                </h3>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
                  id="confirmpassword"
                  type="password"
                  onChange={(e) => setConfirmRegister(e.target.value)}
                />
              </div>

              <div className="">
                <button
                  type="button"
                  className="inline-flex justify-center px-4 py-2 my-4 text-sm font-medium text-white bg-black border border-transparent rounded-md hover:bg-gray-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500 disabled:bg-gray-600"
                  disabled={
                    !isEmail(emailRegister) ||
                    passwordRegister.length < 5 ||
                    passwordRegister !== confirmRegister
                  }
                  onClick={handleRegister}
                >
                  Register
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default SignUpModal;
