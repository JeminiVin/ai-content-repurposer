export interface SeoPageData {
  title: string;
  subtitle: string;
  badge: string;
  defaultText: string;
}

export const seoPagesData: Record<string, SeoPageData> = {
  "linkedin-to-twitter": {
    badge: "LinkedIn to X/Twitter Repurposer",
    title: "Convert LinkedIn Posts into High-Engaging Twitter Threads",
    subtitle: "Paste your long-form LinkedIn professional post and instantly transform it into a viral X/Twitter thread without API limits.",
    defaultText: "In this post, I want to share how building a side project changed my software engineering career. First, focus on shipping fast. Second, talk about your failures openly on social media. Third, network with local founders in your city. Consistency compounds over 6 months.",
  },
  "blog-to-reels": {
    badge: "Blog to Reels & Shorts Script Generator",
    title: "Turn Long Blog Articles into Short-Form Video Scripts",
    subtitle: "Transform your written tutorials and guides into structured scene-by-scene audio and visual scripts for Instagram Reels and YouTube Shorts.",
    defaultText: "Search engine optimization in 2026 is all about solving search intent faster than anyone else. Core Web Vitals, programmatic landing pages, and zero-latency tools are dominating the search rankings. Here is how you can scale your organic traffic exponentially.",
  },
  "article-to-threads": {
    badge: "Long Article Summary & Thread Maker",
    title: "Summarize Long Articles into Bite-Sized Social Posts",
    subtitle: "Extract key takeaways and core insights from dense articles, newsletters, or documentation instantly.",
    defaultText: "Micro-SaaS founders often struggle with distribution. Writing code is only 30% of the battle; the remaining 70% is distribution, content repurposing, and organic SEO positioning. Let's break down the exact framework to scale your product.",
  },
};