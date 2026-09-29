import type {
  Organization,
  WebApplication,
  BreadcrumbList,
  BlogPosting,
  FAQPage,
  WithContext,
} from "schema-dts";

const BASE_URL = "https://casedelta.com";

/* ─── Helpers ─── */

function JsonLdScript({ data }: { data: WithContext<Organization | WebApplication | BreadcrumbList | BlogPosting | FAQPage> }) {
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
      "CaseDelta makes Delta, the AI paralegal for plaintiff law firms: personal injury, medical malpractice, mass torts, employment and commercial litigation. Delta works inside the systems a firm already uses, including Filevine, Lead Docket, Outlook and Microsoft 365, Dropbox, Google Drive and Clio, and sees the whole case across all of them. Staff ask it anything in chat, and partners teach it tasks to run on their own. Nothing is migrated: records stay in the firm's own systems, Delta reads only what each task needs, and client data is never used to train AI or sold.",
    sameAs: [
      "https://www.youtube.com/@casedelta-us",
      "https://www.linkedin.com/company/casedelta",
    ],
    knowsAbout: ["AI paralegal", "Personal injury law", "Medical malpractice", "Mass torts", "Employment law", "Commercial litigation", "Filevine", "Lead Docket", "Demand letters", "Medical chronologies"],
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
      "Delta is the AI paralegal that sees your entire case, in every system your firm uses. It works inside Filevine, Lead Docket, Outlook, Microsoft 365, Dropbox, Google Drive, Clio and more, drafts demands in your firm's own templates, builds chronologies that cite the source page, and runs tasks on a schedule. Your team reviews and approves. Records stay in your systems and are never used to train AI.",
    browserRequirements: "Requires JavaScript and HTML5 support",
    offers: {
      "@type": "AggregateOffer",
      description:
        "Flat whole-firm pricing by account count, not priced per seat: $599 a month for up to 5 accounts, $1,099 for up to 10, $2,099 for up to 20, $4,099 for up to 40. Month to month.",
      priceCurrency: "USD",
      lowPrice: "599",
      highPrice: "4099",
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
  image?: string;
}

export function BlogPostSchema({
  title,
  description,
  slug,
  publishedAt,
  updatedAt,
  image,
}: BlogPostSchemaProps) {
  const data: WithContext<BlogPosting> = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description,
    datePublished: publishedAt,
    ...(updatedAt && { dateModified: updatedAt }),
    author: { "@type": "Organization", name: "CaseDelta", url: BASE_URL },
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

