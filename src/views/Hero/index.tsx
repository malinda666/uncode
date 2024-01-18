"use client";

import Image from "next/image";
import Section from "@/components/partials/Section";

import image from "../../../public/assets/images/hero.jpg";
import s from "./hero.module.scss";
import Title from "@/components/partials/Title";
import { useRef } from "react";

export default function HeroView() {
  const titleRef = useRef<HTMLDivElement>(null);

  return (
    <Section className={s.wrapper} type="dark">
      <h1 className={s.title}>
        <Title text="uncode" ref={titleRef} />
      </h1>
      <div className={s.subtitle}>
        <p>
          Empowering brands to reach the maximum potential in the digital space.
        </p>
      </div>
      <div className={s.scroller}>
        <span>scroll</span>
      </div>
      <div className={s.image}>
        <Image src={image} alt="Hero Image" fill />
      </div>
    </Section>
  );
}
