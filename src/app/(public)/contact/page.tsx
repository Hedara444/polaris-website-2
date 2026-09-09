import { buildMetadata } from "@/lib/seo";
import { ContactClient } from "./ContactClient";
import "./contact.css";

export const metadata = buildMetadata({
  title: "POLARISS | お問い合わせ",
  description: "POLARISSに関するお問い合わせ（購入前のご相談、取り付け、ご利用方法など）を受け付けています。",
  path: "/contact",
});

export default function ContactPage() {
  return <ContactClient />;
}
