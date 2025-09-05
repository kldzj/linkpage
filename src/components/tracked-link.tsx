"use client";

import Link from "next/link";
import { trackLinkClick } from "@/components/analytics";

export function TrackedLink({
  children,
  url,
  title,
}: {
  children: React.ReactNode;
  url: string;
  title: string;
}) {
  return (
    <Link
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackLinkClick(title, url)}
    >
      {children}
    </Link>
  );
}
