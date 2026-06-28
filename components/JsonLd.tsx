import type {
  Organization,
  WebApplication,
  BreadcrumbList,
  BlogPosting,
  FAQPage,
  Person,
  WithContext,
} from "schema-dts";

const BASE_URL = "https://casedelta.com";

/* ─── Helpers ─── */

function JsonLdScript({ data }: { data: WithContext<Organization | WebApplication | BreadcrumbList | BlogPosting | FAQPage | Person> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/* ─── Organization (homepage) ─── */

export function OrganizationSchema() {
  const data: WithContext<Organization> = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "CaseDelta",
    url: BASE_URL,
    logo: `${BASE_URL}/assets/branding/casedelta-logo-full.png`,
    description:
      "CaseDelta is an AI paralegal that works inside the tools small law firms already use, including Clio, MyCase, Filevine, Google, and Microsoft, and does the routine case work: requesting records, drafting, updating files, and tracking deadlines. Your team reviews and approves. Firms run more cases without hiring. Each firm's data is isolated and is never sold or used to train AI models.",
    founder: {
      "@type": "Person",
      name: "Camren Hall",
      jobTitle: "Founder & CEO",
    },
    sameAs: [
      "https://www.youtube.com/@casedelta-us",
      "https://www.linkedin.com/company/casedelta",
    ],
  };
  return <JsonLdScript data={data} />;
}

/* ─── WebApplication (homepage / product pages) ─── */

export function WebAppSchema() {
  const data: WithContext<WebApplication> = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "CaseDelta",
    url: BASE_URL,
    applicationCategory: "BusinessApplication",
    description:
      "CaseDelta is an AI paralegal that works inside the tools your firm already uses and does the routine case work: requesting records, drafting letters, updating files across your case manager, CRM, and billing, and tracking deadlines. You delegate in plain English and your team reviews and approves. Each firm's data is isolated and is never used to train AI models.",
    browserRequirements: "Requires JavaScript and HTML5 support",
    offers: {
      "@type": "Offer",
      description:
        "Flat whole-firm pricing, anchored to a fraction of the cost of a hire, not priced per seat. Founding-firm pricing available.",
    },
    operatingSystem: "Web-based",
  };
  return <JsonLdScript data={data} />;
}

/* ─── BreadcrumbList (all pages) ─── */

interface BreadcrumbItem {
  name: string;
  url: string;
}

export function BreadcrumbSchema({ items }: { items: BreadcrumbItem[] }) {
  const data: WithContext<BreadcrumbList> = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem" as const,
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
  return <JsonLdScript data={data} />;
}

/* ─── BlogPosting (blog posts) ─── */

interface BlogPostSchemaProps {
  title: string;
  description: string;
  slug: string;
  publishedAt: string;
  updatedAt?: string;
  authorName: string;
  authorSlug?: string;
  image?: string;
}

export function BlogPostSchema({
  title,
  description,
  slug,
  publishedAt,
  updatedAt,
  authorName,
  authorSlug,
  image,
}: BlogPostSchemaProps) {
  const data: WithContext<BlogPosting> = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description,
    datePublished: publishedAt,
    ...(updatedAt && { dateModified: updatedAt }),
    author: {
      "@type": "Person",
      name: authorName,
      ...(authorSlug && { url: `${BASE_URL}/about` }),
    },
    publisher: {
      "@type": "Organization",
      name: "CaseDelta",
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/assets/branding/casedelta-logo-full.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${BASE_URL}/blog/${slug}`,
    },
    ...(image && {
      image: {
        "@type": "ImageObject",
        url: image.startsWith("http") ? image : `${BASE_URL}${image}`,
      },
    }),
  };
  return <JsonLdScript data={data} />;
}

/* ─── FAQPage (any page with FAQs) ─── */

interface FAQItem {
  question: string;
  answer: string;
}

export function FAQSchema({ faqs }: { faqs: FAQItem[] }) {
  const data: WithContext<FAQPage> = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question" as const,
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer" as const,
        text: faq.answer,
      },
    })),
  };
  return <JsonLdScript data={data} />;
}

/* ─── Person (about page) ─── */

export function PersonSchema({
  name,
  jobTitle,
  description,
  image,
  sameAs,
}: {
  name: string;
  jobTitle: string;
  description: string;
  image?: string;
  sameAs?: string[];
}) {
  const data: WithContext<Person> = {
    "@context": "https://schema.org",
    "@type": "Person",
    name,
    jobTitle,
    description,
    worksFor: {
      "@type": "Organization",
      name: "CaseDelta",
      url: BASE_URL,
    },
    ...(image && { image }),
    ...(sameAs && { sameAs }),
  };
  return <JsonLdScript data={data} />;
}
