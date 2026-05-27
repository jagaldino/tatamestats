import { useEffect, useState } from "react";
import { getCurrentPath } from "../lib/navigation";

export function usePathname() {
  const [pathname, setPathname] = useState(getCurrentPath);

  useEffect(() => {
    const handlePopState = () => setPathname(getCurrentPath());

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  return pathname;
}
