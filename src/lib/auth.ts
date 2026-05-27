const AUTH_KEY = "tatamestats.authenticated";

export function isAuthenticated() {
  if (typeof window === "undefined") {
    return false;
  }

  return window.localStorage.getItem(AUTH_KEY) === "true";
}

export function setAuthenticated(value: boolean) {
  window.localStorage.setItem(AUTH_KEY, value ? "true" : "false");
}

export function logout() {
  setAuthenticated(false);
}
