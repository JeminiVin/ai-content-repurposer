"use client";

import { useState, use } from "react";
import { notFound } from "next/navigation";
import { seoPagesData } from "@/data/seoPages";
import { repurposeContent, RepurposeOutput } from "@/lib/repurposer";
import {
  Sparkles,
  MessageSquare,
  Video,
  ListCheck,
  Copy,
  Check,
  Zap,
  ArrowRight,
  RefreshCw,
  FileText,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function SeoRepurposePage({ params }: PageProps) {
  const resolvedParams = use(params);
  const pageData = seoPagesData[resolvedParams.slug];

  if (!pageData) {
    notFound();
  }

  const [inputText, setInputText] = useState(pageData.defaultText);
  const [result, setResult] = useState<RepurposeOutput | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleGenerate = () => {
    if (!inputText.trim()) return;
    setIsProcessing(true);
    setTimeout(() => {
      const output = repurposeContent(inputText, "viral");
      setResult(output);
      setIsProcessing(false);
    }, 250);
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(id);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/40 to-purple-50/60 text-slate-900 selection:bg-indigo-600 selection:text-white">
      {/* Header */}
      <header className="border-b border-slate-200/80 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-18 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2 text-slate-700 hover:text-indigo-600 transition font-semibold text-sm">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
          <div className="flex items-center space-x-2 text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-full">
            <Zap className="w-3.5 h-3.5 text-emerald-600" />
            <span>SEO Optimized Route</span>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-12 space-y-10">
        {/* Hero Section */}
        <div className="text-center space-y-4">
          <span className="inline-block px-3.5 py-1 rounded-full border border-indigo-200 bg-indigo-50 text-indigo-700 text-xs font-bold">
            {pageData.badge}
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            {pageData.title}
          </h1>
          <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto">
            {pageData.subtitle}
          </p>
        </div>

        {/* Workspace */}
        <div className="bg-white/90 border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xl space-y-4 backdrop-blur-md">
          <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-slate-500">
            <FileText className="w-3.5 h-3.5 text-indigo-600" />
            <span>Source Content Input</span>
          </div>

          <textarea
            rows={6}
            className="w-full p-4.5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm sm:text-base"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />

          <button
            onClick={handleGenerate}
            disabled={isProcessing}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold py-4 rounded-2xl hover:opacity-95 transition flex items-center justify-center space-x-2 shadow-lg shadow-indigo-600/25 cursor-pointer"
          >
            {isProcessing ? (
              <>
                <RefreshCw className="w-5 h-5 animate-spin" />
                <span>Running Engine...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                <span>Generate Optimized Content</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>

        {/* Results */}
        {result && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Twitter Thread */}
              <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xl space-y-4">
                <div className="flex items-center justify-between font-bold text-slate-800">
                  <div className="flex items-center space-x-2">
                    <MessageSquare className="w-5 h-5 text-sky-500" />
                    <span>Generated Thread</span>
                  </div>
                  <span className="text-xs bg-sky-50 text-sky-600 px-2.5 py-1 rounded-lg">
                    {result.twitterThread.length} Tweets
                  </span>
                </div>
                <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
                  {result.twitterThread.map((tweet, idx) => (
                    <div key={idx} className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 space-y-2">
                      <p>{tweet}</p>
                      <div className="flex justify-end">
                        <button
                          onClick={() => handleCopy(tweet, `t-${idx}`)}
                          className="text-xs font-semibold flex items-center space-x-1 text-slate-600 hover:text-indigo-600 bg-white px-2.5 py-1 rounded border border-slate-200"
                        >
                          {copiedIndex === `t-${idx}` ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                          <span>{copiedIndex === `t-${idx}` ? "Copied" : "Copy"}</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Reels Script */}
              <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xl space-y-4">
                <div className="flex items-center justify-between font-bold text-slate-800">
                  <div className="flex items-center space-x-2">
                    <Video className="w-5 h-5 text-rose-500" />
                    <span>Video Script</span>
                  </div>
                  <span className="text-xs bg-rose-50 text-rose-600 px-2.5 py-1 rounded-lg">
                    {result.reelsScript.length} Scenes
                  </span>
                </div>
                <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
                  {result.reelsScript.map((step) => (
                    <div key={step.scene} className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm space-y-1">
                      <span className="text-xs font-bold text-indigo-600">Scene {step.scene}</span>
                      <p className="text-xs text-slate-600"><strong>Visual:</strong> {step.visual}</p>
                      <p className="text-xs text-slate-800 bg-white p-2 rounded border"><strong>Audio:</strong> "{step.audio}"</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}