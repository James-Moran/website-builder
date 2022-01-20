import { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import { useUser } from "../components/UserContext";
import Router from "next/router";

const props = {
  title: "James's Store",
  description: "A simple bakery",
  currency: "GBP",
  items: [
    { title: "Apple Pie", price: "£9.20" },
    { title: "Victoria Sponge", price: "£7.80" },
  ],
};

export default function Create({ loggedIn }: { loggedIn: boolean }) {
  const [user, setUser] = useUser();
  const [state, setState] = useState(props);
  console.log(state);

  useEffect(() => {
    if (loggedIn) {
      setUser({ loggedIn: true });
    } else {
      Router.push("/");
    }
  }, []);

  return (
    <div className="flex flex-col items-center min-h-screen font-serif p-4 text-lg justify-center items-center">
      <div className="max-w-4xl w-full flex flex-col">
        <input
          type="text"
          className="text-4xl font-bold text-center"
          value={state.title}
          onChange={(e) => setState({ ...state, title: e.target.value })}
          maxLength={20}
        />
        <input
          type="text"
          className="text-center my-1"
          value={state.description}
          onChange={(e) => setState({ ...state, description: e.target.value })}
          maxLength={50}
        />
      </div>
      {state.items.map((product, idx) => {
        return (
          <div key={idx} className="flex flex-col">
            <img src={"https://unsplash.it/200/200"} />
            <input
              className="my-1"
              value={product.title}
              onChange={(e) => {
                setState({
                  ...state,
                  items: state.items.map((item, id) => {
                    if (id !== idx) {
                      return item;
                    } else {
                      return { ...item, title: e.target.value };
                    }
                  }),
                });
              }}
            />

            <input
              className="my-1"
              value={product.price}
              onChange={(e) => {
                setState({
                  ...state,
                  items: state.items.map((item, id) => {
                    if (id !== idx) {
                      return item;
                    } else {
                      return { ...item, price: e.target.value };
                    }
                  }),
                });
              }}
            />
          </div>
        );
      })}
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
