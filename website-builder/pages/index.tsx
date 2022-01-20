import Head from "next/head";
import { useState } from "react";
import Navbar from "../components/navbar";
import { useUser } from "../components/UserContext";

export default function Index({ loggedIn }: { loggedIn: boolean }) {
  const [user, setUser] = useUser();

  const handleProtected = async () => {
    const response = await fetch("http://localhost:8000/users/checklogin", {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    console.log(await response.json());
  };

  return (
    <div className="flex flex-col items-center min-h-screen font-serif p-4 text-lg">
      <div className="max-w-4xl w-full">
        <Navbar title="Website Builder" />
        <main>
          <h2 className="text-2xl font-bold mb-4"></h2>
        </main>
        <form>
          <div className="mb-4">
            <label className="mb-1" htmlFor="shopname">
              Shop Name
            </label>
            <input
              id="shopname"
              type="text"
              name="shopname"
              className="py-2 px-3 border border-gray-300 focus:border-red-300 focus:outline-none focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block"
            />
          </div>

          <div className="mb-4">
            <label className="mb-1" htmlFor="shoplink">
              Shop Link
            </label>
            <input
              id="shoplink"
              type="text"
              name="shoplink"
              className="py-2 px-3 border border-gray-300 focus:border-red-300 focus:outline-none focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block"
            />
          </div>

          <div className="mb-4">
            <label className="mb-1" htmlFor="shoplink">
              Shop Link
            </label>
            <input
              id="shoplink"
              type="text"
              name="shoplink"
              className="py-2 px-3 border border-gray-300 focus:border-red-300 focus:outline-none focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block"
            />
          </div>
        </form>

        <button
          type="button"
          className="inline-flex justify-center px-4 py-2 my-4 text-sm font-medium text-white bg-black border border-transparent rounded-md hover:bg-gray-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500 disabled:bg-gray-600"
          onClick={handleProtected}
        >
          Register
        </button>
      </div>
    </div>
  );
}

export const getServerSideProps = async (ctx: {
  req: { headers: { cookie: any } };
}) => {
  const cookie = ctx.req.headers.cookie;
  const config = {
    headers: {
      cookie: cookie ?? null,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };
  try {
    // your isAuthenticated check
    const res = await fetch("http://localhost:8000/users/checklogin", {
      method: "GET",
      credentials: "include",
      ...config,
    }).then(async (res) => await res.json());
    console.log(res);
    return {
      redirect: {
        permanent: false,
        destination: "/create",
      },
    };
  } catch (err) {
    return { props: { loggedIn: false } };
  }
};
