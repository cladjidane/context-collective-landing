const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://context-collective.org";

interface WebSiteSchemaProps {
  name?: string;
  description?: string;
  url?: string;
}

export function WebSiteSchema({
  name = "Context Collective",
  description = "Communauté d'ingénierie IA générative à Brest. Apprendre en public, partager les savoirs, construire ensemble.",
  url = BASE_URL,
}: WebSiteSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name,
    url,
    description,
    inLanguage: "fr-FR",
    publisher: {
      "@type": "Organization",
      name: "Context Collective",
      url: BASE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/logo.svg`,
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface OrganizationSchemaProps {
  name?: string;
  description?: string;
  url?: string;
}

export function OrganizationSchema({
  name = "Context Collective",
  description = "Communauté d'ingénierie IA générative à Brest. Apprendre en public, partager les savoirs, construire ensemble.",
  url = BASE_URL,
}: OrganizationSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name,
    url,
    description,
    logo: `${BASE_URL}/logo.svg`,
    sameAs: [
      "https://discord.gg/context-collective",
      "https://youtube.com/@context-collective",
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Brest",
      addressCountry: "FR",
    },
    areaServed: {
      "@type": "Place",
      name: "Brest, Bretagne, France",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface BlogPostingSchemaProps {
  title: string;
  description: string;
  slug: string;
  publishedAt: string;
  modifiedAt?: string;
  author?: string;
  image?: string;
  tags?: string[];
}

export function BlogPostingSchema({
  title,
  description,
  slug,
  publishedAt,
  modifiedAt,
  author = "Context Collective",
  image,
  tags = [],
}: BlogPostingSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description,
    url: `${BASE_URL}/actualites/${slug}`,
    datePublished: publishedAt,
    dateModified: modifiedAt || publishedAt,
    author: {
      "@type": "Person",
      name: author,
    },
    publisher: {
      "@type": "Organization",
      name: "Context Collective",
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/logo.svg`,
      },
    },
    image: image || `${BASE_URL}/og-default.png`,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${BASE_URL}/actualites/${slug}`,
    },
    inLanguage: "fr-FR",
    keywords: tags.join(", "),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbSchemaProps {
  items: BreadcrumbItem[];
}

export function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface EventSchemaProps {
  name: string;
  description: string;
  startDate: string;
  endDate?: string;
  location?: string;
  url: string;
  image?: string;
  isOnline?: boolean;
}

export function EventSchema({
  name,
  description,
  startDate,
  endDate,
  location,
  url,
  image,
  isOnline = false,
}: EventSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Event",
    name,
    description,
    startDate,
    endDate: endDate || startDate,
    url,
    image: image || `${BASE_URL}/og-default.png`,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: isOnline
      ? "https://schema.org/OnlineEventAttendanceMode"
      : "https://schema.org/OfflineEventAttendanceMode",
    location: isOnline
      ? {
          "@type": "VirtualLocation",
          url,
        }
      : {
          "@type": "Place",
          name: location || "Brest",
          address: {
            "@type": "PostalAddress",
            addressLocality: location || "Brest",
            addressCountry: "FR",
          },
        },
    organizer: {
      "@type": "Organization",
      name: "Context Collective",
      url: BASE_URL,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
