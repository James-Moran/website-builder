import Link from "next/link";

import Navbar from "./Navbar";
import { Toaster } from "react-hot-toast";

export default function Home() {
  return (
    <div className="flex flex-col items-center min-h-screen font-serif p-4 text-lg bg-amber-300">
      <Toaster position="bottom-center" />
      <div className="max-w-4xl w-full flex flex-col flex-1">
        <Navbar title="OnePageShop" />
        <main className="flex flex-col flex-1 justify-center">
          <h2 className="text-3xl md:text-6xl font-bold mb-4 w-8/12 md:w-10/12">
            Create the perfect home for your store
          </h2>
          <Link href="/create">
            <button
              type="button"
              className="inline-flex justify-center px-4 py-2 my-4 text-xl font-medium text-white bg-black border border-transparent rounded-md max-w-fit"
              onClick={() => {}}
            >
              Get Started
            </button>
          </Link>
        </main>
        <div className="flex flex-col flex-1"></div>
      </div>
    </div>
  );
}
