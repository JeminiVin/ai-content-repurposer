import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://ai-content-repurposer-mr5a.vercel.app';

  // Define your programmatic SEO pages and main routes
  const routes = [
    '',
    '/repurpose/linkedin-to-twitter',
    '/repurpose/blog-to-reels',
    '/repurpose/article-to-threads',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  return routes;
}