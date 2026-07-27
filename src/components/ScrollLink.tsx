import type { ReactNode, MouseEvent } from "react";
import { scrollToId } from "../utils/scroll";

type Props = {
  to: string;
  className?: string;
  style?: React.CSSProperties;
  children: ReactNode;
  ariaLabel?: string;
};

export default function ScrollLink({ to, className, style, children, ariaLabel }: Props) {
  const handle = (e: MouseEvent) => {
    e.preventDefault();
    scrollToId(to);
  };
  return (
    <button type="button" className={className} style={style} onClick={handle} aria-label={ariaLabel}>
      {children}
    </button>
  );
}
