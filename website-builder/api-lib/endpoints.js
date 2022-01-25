export const localUrl = "http://localhost:8000";
export const externalUrl =
  process.env.ENV === "prod"
    ? "https://onepagesite.co"
    : "http://localhost:3000";
export const databaseUrl =
  process.env.ENV === "prod"
    ? "https://onepagesite.co"
    : "http://localhost:8000";

export const getMyShop = async (cookie, local) => {
  const config = {
    headers: {
      cookie: cookie ?? null,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };

  return await fetch((local ? localUrl : databaseUrl) + "/shops/myshop", {
    method: "GET",
    credentials: "include",
    ...config,
  })
    .then(async (res) => await res.json())
    .then((res) => {
      return { success: true, shop: res.shop };
    })
    .catch((err) => {
      return { success: false, shop: null };
    });
};

export const postMyShop = async (state) => {
  await fetch(databaseUrl + "/shops/myshop", {
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

export const getShop = async (cookie, wildcard) => {
  return await fetch(databaseUrl + "/shops/name/" + wildcard, {
    method: "GET",
    headers: {
      cookie: cookie,
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

export const checkLogin = async (cookie, local) => {
  const config = {
    headers: {
      cookie: cookie,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };
  return await fetch((local ? localUrl : databaseUrl) + "/users/checklogin", {
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
  return await fetch(databaseUrl + "/users/logout", {
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
  return await fetch(databaseUrl + "/users/login", {
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
  return await fetch(databaseUrl + "/users/register", {
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