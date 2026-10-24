import { use } from "react";
import Link from "next/link";
import { Sparkles, ArrowLeft } from "lucide-react";
import { Metadata } from "next";

const seoPagesData: Record<string, { title: string; desc: string; content: string }> = {
  "linkedin-to-twitter": {
    title: "LinkedIn to X (Twitter) Thread Converter",
    desc: "Transform professional LinkedIn updates into viral short threads instantly.",
    content: "Professional networking content often has dense insights. This tool breaks down long professional posts into snappy, highly engaging X threads optimized for maximum impressions.",
  },
  "blog-to-reels": {
    title: "Blog to Reels & Shorts Script Generator",
    desc: "Convert long blog posts and guides into short-form video scripts.",
    content: "Short-form video is the highest leverage format today. Convert your comprehensive guides, articles, and newsletters into high-retention video scripts with visual and audio cues.",
  },
  "article-to-threads": {
    title: "Article Summarizer & Bullet Extractor",
    desc: "Extract core bullet takeaways and summaries from dense text.",
    content: "Don't let long-form articles go to waste. Extract concise takeaways, actionable points, and key summaries instantly without reading through paragraphs.",
  },
};

// 1. Define static params so Vercel can prerender the dynamic SEO pages
export async function generateStaticParams() {
  return [
    { slug: "linkedin-to-twitter" },
    { slug: "blog-to-reels" },
    { slug: "article-to-threads" },
  ];
}

// 2. Add Dynamic Metadata for SEO Ranking
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const pageData = seoPagesData[resolvedParams.slug] || {
    title: "Content Repurposing Tool",
    desc: "Repurpose your content effortlessly with AI.",
  };

  return {
    title: `${pageData.title} | RepurposeAI`,
    description: pageData.desc,
  };
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function SeoRepurposePage({ params }: PageProps) {
  // 3. Properly resolve params using React.use() for Next.js App Router
  const resolvedParams = use(params);
  const pageData = seoPagesData[resolvedParams.slug] || {
    title: "Content Repurposing Tool",
    desc: "Repurpose your content effortlessly.",
    content: "Transform your text into engaging multi-format social assets.",
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50/50 via-white to-purple-50/40 text-slate-900 p-6 sm:p-12">
      <div className="max-w-3xl mx-auto space-y-8">
        <Link
          href="/"
          className="inline-flex items-center space-x-2 text-xs font-bold text-indigo-600 bg-indigo-50 px-4 py-2 rounded-xl border border-indigo-200 hover:bg-indigo-100 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>

        <div className="space-y-4 bg-white/90 border border-slate-200/90 p-8 rounded-[2rem] shadow-xl backdrop-blur-xl">
          <div className="p-3 bg-indigo-600 text-white w-fit rounded-2xl shadow-md">
            <Sparkles className="w-6 h-6" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900">
            {pageData.title}
          </h1>
          <p className="text-slate-600 text-base font-medium leading-relaxed">
            {pageData.desc}
          </p>
          <div className="border-t border-slate-200 pt-6 text-slate-700 leading-relaxed space-y-4">
            <p>{pageData.content}</p>
          </div>
        </div>
      </div>
    </div>
  );
}