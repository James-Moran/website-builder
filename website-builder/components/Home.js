import Navbar from "./Navbar";
import { Toaster } from "react-hot-toast";

export default function Home() {
  const handleProtected = async () => {
    await fetch("http://localhost:8000/users/checklogin", {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => console.log(res.json))
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="flex flex-col items-center min-h-screen font-serif p-4 text-lg">
      <Toaster position="bottom-center" />
      <div className="max-w-4xl w-full">
        <Navbar title="Website Builder" />
        <main>
          <h2 className="text-2xl font-bold mb-4"></h2>
        </main>
        <button
          type="button"
          className="inline-flex justify-center px-4 py-2 my-4 text-sm font-medium text-white bg-black border border-transparent rounded-md hover:bg-gray-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500 disabled:bg-gray-600"
          onClick={handleProtected}
        >
          Check Login
        </button>
      </div>
    </div>
  );
}
