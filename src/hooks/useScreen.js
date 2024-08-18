import { useEffect, useState } from "react";

export const useScreen = () => {
  const [screen, setScreen] = useState(
    window.innerWidth || document.documentElement.clientWidth
  );

  useEffect(() => {
    const resize = () => {
      setScreen(window.innerWidth || document.documentElement.clientWidth);
    };

    window.addEventListener("resize", resize);

    return () => window.removeEventListener("resize", resize);
  }, []);

  return { screen };
};
