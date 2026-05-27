export function getCurrentPath() {
  if (typeof window === "undefined") {
    return "/";
  }

  return window.location.pathname;
}

export function navigateTo(path: string) {
  window.history.pushState({}, "", path);
  window.dispatchEvent(new PopStateEvent("popstate"));
}
