export const localUrl = "http://localhost:8000";
export const externalUrl = "https://onepagesite.co";

export const getMyShop = async (cookie, local) => {
  const config = {
    headers: {
      cookie: cookie ?? null,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };

  return (res = await fetch(
    (local ? localUrl : externalUrl) + "/shops/myshop",
    {
      method: "GET",
      credentials: "include",
      ...config,
    }
  )
    .then(async (res) => await res.json())
    .then((res) => {
      return { success: true, shop: res.shop };
    })
    .catch((err) => {
      return { success: false, shop: null };
    }));
};

export const postMyShop = async (state) => {
  await fetch(externalUrl + "/api/shops/myshop", {
    method: "POST",
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(state),
  })
    .then((res) => res.json())
    .catch((err) => {
      console.log("Error saving shop");
    });
};

export const getShop = async (wildcard) => {
  return await fetch(externalUrl + "/shops/name/" + wildcard, {
    method: "GET",
    headers: {
      cookie: ctx.req.headers.cookie ?? null,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.success) {
        return { success: true, shop: res.shop };
      } else {
        return { success: false, shop: null };
      }
    })
    .catch((err) => {
      return { success: false, shop: null };
    });
};

export const checkLogin = (cookie, local) => {
  const config = {
    headers: {
      cookie: cookie,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };
  return await fetch((local ? localUrl : externalUrl) + "/users/checklogin", {
    method: "GET",
    credentials: "include",
    ...config,
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.success) {
        return { success: true, user: res.user };
      } else {
        return { success: true, user: null };
      }
    })
    .catch((err) => {
      return { success: false, user: null };
    });
};

export const logout = async () => {
  return await fetch(externalUrl + "/users/logout", {
    method: "GET",
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((res) => {
      return { success: res.success };
    })
    .catch((err) => {
      return { success: false };
    });
};

export const login = async (email, password) => {
  return await fetch(externalUrl + "/users/login", {
    method: "POST",
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: email,
      password: password,
    }),
  })
    .then((res) => res.json())
    .catch((err) => {
      return { success: false };
    });
};

export const register = async (email, password) => {
  return await fetch(externalUrl + "/users/register", {
    method: "POST",
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: email,
      password: password,
    }),
  }).then((res) => res.json());
};
