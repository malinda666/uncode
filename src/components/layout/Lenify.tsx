"use client";

import Tempus from "@studio-freight/tempus";
import Lenis from "@studio-freight/lenis";
import {
  type ReactNode,
  createContext,
  useContext,
  useLayoutEffect,
  useRef,
} from "react";
import Router from "next/router";

export const LenisContext = createContext<Lenis | null>(null);

export const useLenis = () => useContext(LenisContext);

export default function Lenify({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useLayoutEffect(() => {
    const lenis = new Lenis();
    lenisRef.current = lenis;

    const resize = setInterval(() => {
      lenis.resize();
    }, 150);

    function onFrame(time: number) {
      lenis.raf(time);
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    const unsubscribe = Tempus.add(onFrame);

    Router.events.on("routeChangeStart", () => {
      lenis.scrollTo(0, { immediate: true });
    });

    return () => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      unsubscribe();

      clearInterval(resize);
      lenisRef.current = null;
      lenis.destroy();
    };
  }, []);

  return (
    <LenisContext.Provider value={lenisRef.current}>
      {children}
    </LenisContext.Provider>
  );
}
