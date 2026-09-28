import { buildMetadata } from "@/lib/seo";
import { ContactClient } from "./ContactClient";
import "./contact.css";

export const metadata = buildMetadata({
  title: "お問い合わせ｜POLARISS",
  description:
    "POLARISSに関するお問い合わせ、導入のご相談、法人利用のご相談はこちらからご連絡ください。",
  path: "/contact",
});

export default function ContactPage() {
  return <ContactClient />;
}
