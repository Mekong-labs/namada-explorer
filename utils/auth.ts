import cookie from "js-cookie";

export const isServer = () => typeof window === "undefined";

const getCookieFromBrowser = (key: string) => {
  return cookie.get(key);
};

const getCookieFromServer = (key: string, req: any) => {
  if (!req?.headers?.cookie) {
    return undefined;
  }

  const rawCookie = req?.headers?.cookie
    .split(";")
    .find((c: string) => c.trim().startsWith(`${key}=`));

  if (!rawCookie) {
    return undefined;
  }

  return rawCookie.split("=")[1];
};

export const setCookie = (key: string, value: string) => {
  if (!isServer()) {
    cookie.set(key, value, {
      expires: 1,
      path: "/",
    });
  }
};

export const removeCookie = (key: string) => {
  if (!isServer()) {
    cookie.remove(key, {
      expires: 1,
    });
  }
};

export const getCookie = (key: string, req?: any) => {
  // return sessionStorage ? sessionStorage.getItem('nc-token-id') : '';
  // Waiting for confirmation for this.
  return !isServer()
    ? getCookieFromBrowser(key)
    : getCookieFromServer(key, req);
};
