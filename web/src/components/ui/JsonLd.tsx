import { APP_CONFIG } from "@/lib/constants";

type JsonLdType = "WebSite" | "Organization" | "Person";

interface JsonLdProps {
  type: JsonLdType;
  data?: Record<string, unknown>;
}

/**
 * Reusable JSON-LD structured data component for SEO.
 * Renders a <script type="application/ld+json"> tag.
 */
export function JsonLd({ type, data = {} }: JsonLdProps) {
  const baseSchema = getBaseSchema(type);
  const schema = { ...baseSchema, ...data };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

function getBaseSchema(type: JsonLdType): Record<string, unknown> {
  switch (type) {
    case "WebSite":
      return {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: APP_CONFIG.name,
        description: APP_CONFIG.description,
        url: APP_CONFIG.url,
        potentialAction: {
          "@type": "SearchAction",
          target: `${APP_CONFIG.url}/find-creators?search={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      };

    case "Organization":
      return {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: APP_CONFIG.name,
        url: APP_CONFIG.url,
        description: APP_CONFIG.description,
        logo: `${APP_CONFIG.url}/logo.svg`,
        sameAs: [
          "https://instagram.com/creatorne",
          "https://youtube.com/@creatorne",
          "https://twitter.com/creatorne",
          "https://linkedin.com/company/creatorne",
        ],
        areaServed: {
          "@type": "Place",
          name: "Northeast India",
        },
      };

    case "Person":
      return {
        "@context": "https://schema.org",
        "@type": "Person",
        // Base only — data prop should override with actual person data
      };

    default:
      return {
        "@context": "https://schema.org",
      };
  }
}
