import { useEffect } from "react";
import Navbar from "../components/navbar";
import { useUser } from "../components/UserContext";
import Router from "next/router";

export default function Create({ loggedIn }: { loggedIn: boolean }) {
  const [user, setUser] = useUser();
  useEffect(() => {
    if (loggedIn) {
      setUser({ loggedIn: true });
    } else {
      Router.push("/");
    }
  }, []);

  return (
    <div className="flex flex-col items-center min-h-screen font-serif p-4 text-lg">
      <div className="max-w-4xl w-full">
        <Navbar title="Create Website" />
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
    const res = await fetch("http://localhost:8000/users/checklogin", {
      method: "GET",
      credentials: "include",
      ...config,
    }).then(async (res) => await res.json());
    return { props: { loggedIn: true } };
  } catch (err) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  }
};
