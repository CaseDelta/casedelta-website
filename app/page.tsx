import HomeClient from "./HomeClient";
import { BreadcrumbSchema } from "@/components/JsonLd";

export default function HomePage() {
  return (
    <>
      <BreadcrumbSchema
        items={[{ name: "Home", url: "https://casedelta.com" }]}
      />
      <HomeClient />
    </>
  );
}
