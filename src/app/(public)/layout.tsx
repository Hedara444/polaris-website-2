import type { ReactNode } from "react";

import { SiteFooter } from "@/components/public/SiteFooter";
import { SiteHeader } from "../../components/public/SiteHeader";

export default function PublicLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <>
      <SiteHeader />
      <main>{children}</main>
      <SiteFooter />
    </>
  );
}
