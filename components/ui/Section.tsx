import { clsx } from "clsx";
import type { HTMLAttributes } from "react";

interface SectionProps extends HTMLAttributes<HTMLElement> {
  id?: string;
}

export default function Section({ id, className, children, ...props }: SectionProps) {
  return (
    <section
      id={id}
      className={clsx("px-6 py-16 md:px-8 md:py-24 lg:py-24", className)}
      {...props}
    >
      <div className="mx-auto max-w-[1200px]">{children}</div>
    </section>
  );
}
