import React, { type ReactNode } from "react";

import s from "@/styles/components/section.module.scss";

const Section = ({
  children,
  className,
  type = "light",
}: {
  children: ReactNode;
  className?: string;
  type?: "dark" | "light";
}) => {
  return (
    <section
      className={`${s.wrapper} ${type === "dark" ? s.dark : ""} ${
        className ?? ""
      }`}
    >
      {children}
    </section>
  );
};

export default Section;
