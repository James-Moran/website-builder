import { useEffect } from "react";
import { checkLogin, externalUrl, getShop } from "../api-lib/endpoints";
import Home from "../components/Home";
import Shop from "../components/Shop";
import { useUser } from "../components/UserContext";

export default function Index({
  success,
  user,
  shop,
}: {
  success: boolean;
  user?: any;
  shop?: any;
}) {
  const [_, setUser] = useUser();
  useEffect(() => {
    if (user) {
      setUser({ loggedIn: true });
    }
  }, []);

  if (shop) {
    return <Shop shop={shop} />;
  } else {
    return <Home />;
  }
}

export const getServerSideProps = async (ctx: any) => {
  const wildcard = ctx.req.headers.host.split(".")[0];
  const whitelist = ["onepageshop", "localhost:3000"];
  const cookie = ctx.req ? ctx.req.headers.cookie : null;
  if (whitelist.indexOf(wildcard) === -1) {
    const res = await getShop(cookie, wildcard);
    if (res.success) {
      return { props: { ...res } };
    } else {
      return {
        redirect: {
          permanent: false,
          destination: externalUrl,
        },
      };
    }
  } else {
    const res = await checkLogin(cookie, true);
    return { props: { ...res } };
  }
};
