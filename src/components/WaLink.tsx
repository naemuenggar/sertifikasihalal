import type { CSSProperties, ReactNode } from "react";
import { WA_LINK, waLinkWith } from "../utils/contact";

type Props = {
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
  /** Dipanggil sebelum WhatsApp dibuka — misal untuk menutup menu atau modal. */
  onClick?: () => void;
  /** Pesan awal yang sudah terisi di chat. Kosongkan untuk chat polos. */
  message?: string;
};

/** Semua ajakan konsultasi memakai ini, supaya tujuan, target, dan rel-nya
 *  didefinisikan di satu tempat saja. */
export default function WaLink({ className, style, children, onClick, message }: Props) {
  return (
    <a
      href={message ? waLinkWith(message) : WA_LINK}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      style={style}
      onClick={onClick}
    >
      {children}
    </a>
  );
}
