import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://goon.ai", lastModified: new Date() },
    { url: "https://goon.ai/pricing", lastModified: new Date() },
    { url: "https://goon.ai/login", lastModified: new Date() },
    { url: "https://goon.ai/register", lastModified: new Date() },
  ];
}
