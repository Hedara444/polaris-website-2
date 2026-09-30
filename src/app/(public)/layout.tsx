import type { ReactNode } from "react";

import { SiteFooter } from "@/components/public/SiteFooter/SiteFooter";
import { SiteHeader } from "../../components/public/SiteHeader/SiteHeader";

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
