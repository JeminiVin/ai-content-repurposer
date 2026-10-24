export interface SeoPageData {
  title: string;
  subtitle: string;
  badge: string;
  defaultText: string;
}

export const seoPagesData: Record<string, SeoPageData> = {
  "linkedin-to-twitter": {
    badge: "AI LinkedIn to X/Twitter Thread Repurposer",
    title: "Convert LinkedIn Posts into Viral X/Twitter Threads Instantly",
    subtitle: "Free AI-powered tool to transform long-form LinkedIn professional updates into engaging, high-CTR Twitter threads with zero API limits.",
    defaultText: "In this post, I want to share how building a side project changed my software engineering career. First, focus on shipping fast. Second, talk about your failures openly on social media. Third, network with local founders in your city. Consistency compounds over 6 months.",
  },
  "blog-to-reels": {
    badge: "Blog to Reels & YouTube Shorts Script Generator",
    title: "Turn Long Blog Articles into High-Converting Video Scripts",
    subtitle: "Instantly transform written tutorials, guides, and long-form blogs into structured scene-by-scene audio and visual scripts for Instagram Reels and YouTube Shorts.",
    defaultText: "Search engine optimization in 2026 is all about solving search intent faster than anyone else. Core Web Vitals, programmatic landing pages, and zero-latency tools are dominating the search rankings. Here is how you can scale your organic traffic exponentially.",
  },
  "article-to-threads": {
    badge: "Long Article Summary & Social Thread Maker",
    title: "Summarize Long Articles & Newsletters into Bite-Sized Social Posts",
    subtitle: "Extract key takeaways, core insights, and action items from dense research articles, newsletters, or technical documentation in seconds.",
    defaultText: "Micro-SaaS founders often struggle with distribution. Writing code is only 30% of the battle; the remaining 70% is distribution, content repurposing, and organic SEO positioning. Let's break down the exact framework to scale your product.",
  },
};