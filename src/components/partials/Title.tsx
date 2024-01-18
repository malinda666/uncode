"use client";

import React, {
  type MutableRefObject,
  forwardRef,
  useEffect,
  useRef,
  useCallback,
} from "react";

import s from "@/styles/components/title.module.scss";
import gsap from "gsap";

type Props = { text: string; splits?: number };

const Title = forwardRef<HTMLDivElement, Props>(({ text, splits = 8 }, ref) => {
  const el = ref as MutableRefObject<HTMLDivElement>;

  const setCssValues = useCallback(() => {
    if (!el.current) return;

    const { width } = el.current.getBoundingClientRect();
    el.current.style.setProperty("--width", width + "px");
    el.current.style.setProperty("--splits", splits.toString());
    const offset = width / splits;
    gsap.set(el.current.querySelectorAll("#box > span"), {
      left: (i) => offset * -i,
    });
  }, [el, splits]);

  useEffect(() => {
    if (!el.current) return;

    setCssValues();

    // effect inspired by codrops https://tympanus.net/Development/SlicedTextEffect/

    const initialValues = { x: 50 };

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: {
          ease: "expo",
          duration: 2,
        },
      });

      tl.fromTo(
        "#box > span",
        {
          xPercent: (pos) => initialValues.x * pos,
          opacity: 0,
        },
        {
          xPercent: 0,
          opacity: 1,
        },
        0
      ).fromTo(
        "#box",
        {
          xPercent: (pos) => 2 * (pos + 1) * 10,
        },
        {
          xPercent: 0,
        },
        "<"
      );
    }, el);

    window.addEventListener("resize", setCssValues);

    return () => {
      ctx.revert();
      window.removeEventListener("resize", setCssValues);
    };
  }, [el, setCssValues, splits]);

  return (
    <div className={s.wrapper} ref={ref}>
      {new Array(splits).fill(null).map((_, i) => (
        <span className={s.text_box} id="box" key={i}>
          <span className={s.text_box__inner}>{text}</span>
        </span>
      ))}
    </div>
  );
});

Title.displayName = "SplitTitle";

export default Title;
