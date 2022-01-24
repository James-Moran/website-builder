import Home from "../components/Home";
import Shop from "../components/Shop";

export default function Index({
  success,
  shop,
}: {
  success: boolean;
  shop?: any;
}) {
  return <Home />;
}

export const getServerSideProps = async (ctx: any) => {
  const wildcard = ctx.req.headers.host.split(".")[0];
  const whitelist = ["onepageshop"];
  if (whitelist.indexOf(wildcard) === -1) {
    const res = await fetch("http://localhost:8000/shops/name/" + wildcard, {
      method: "GET",
      headers: {
        cookie: ctx.req.headers.cookie ?? null,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .catch((err) => {
        return { props: { success: false } };
      });

    if (res !== null && res.success === true) {
      return { props: { success: true, shop: res.shop } };
    } else {
      return {
        redirect: {
          permanent: false,
          destination: "https://onepageshop.co",
        },
      };
    }
  }

  try {
    const cookie = ctx.req ? ctx.req.headers.cookie : null;
    const config = {
      headers: {
        cookie: cookie,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    const res = await fetch("http://localhost:8000/users/checklogin", {
      method: "GET",
      credentials: "include",
      ...config,
    })
      .then((res) => res.json())
      .catch((err) => {
        return { props: { success: false } };
      });

    console.log("res");
    console.log(res);

    if (!res.success) {
      return { props: { success: false } };
    } else {
      return {
        redirect: {
          permanent: false,
          destination: "/create",
        },
      };
    }
  } catch (err) {
    return { props: { success: false } };
  }
};
