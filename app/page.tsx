"use client";

import { useState } from "react";
import { repurposeContent, RepurposeOutput } from "@/lib/repurposer";
import { useHistory } from "@/hooks/useHistory";
import { downloadAsTxt, downloadAsMarkdown, downloadAsJson } from "@/lib/exportUtils";
import { useAuth, SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import {
  Sparkles,
  MessageSquare,
  Video,
  ListCheck,
  Copy,
  Check,
  Zap,
  ShieldCheck,
  Flame,
  ArrowRight,
  RefreshCw,
  FileText,
  Sliders,
  Layers,
  History,
  Trash2,
  Download,
  Users,
  Clock,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

const PRESETS = [
  {
    label: "🚀 SaaS Launch Story",
    content:
      "We built a SaaS application in 30 days without spending a dollar on marketing. First, we identified a niche pain point in content repurposing. Next, we launched programmatic landing pages that brought organic SEO traffic. By leveraging zero-API limit custom logic, we maintained 100% uptime with zero server cost. Within two weeks, over 1,000 creators were using our tool daily.",
  },
  {
    label: "📈 SEO Growth Hacks",
    content:
      "Search Engine Optimization in 2026 isn't about keyword stuffing; it's about solving search intent faster than anyone else. First, optimize your Core Web Vitals to hit 95+ PageSpeed scores. Second, build programmatic templates for high-volume niche queries. Third, offer free micro-tools on your landing page to keep bounce rates ultra-low.",
  },
];

const TEMPLATES = [
  { id: "viral", name: "🔥 Viral & Engaging", desc: "Optimized for maximum CTR & retweets" },
  { id: "professional", name: "💼 Professional B2B", desc: "Clean, authoritative & analytical" },
  { id: "story", name: "📖 Storyteller Mode", desc: "Narrative arc with personal flair" },
];

const AUDIENCES = [
  { id: "general", name: "🌐 General Audience", desc: "Broad appeal for all readers" },
  { id: "founders", name: "🚀 Founders & Builders", desc: "Focused on startups & leverage" },
  { id: "devs", name: "💻 Engineers & Devs", desc: "Technical focus & code/systems" },
  { id: "marketers", name: "📈 Growth & Marketers", desc: "CTR, SEO & conversion focus" },
];

export default function Home() {
  const { isSignedIn } = useAuth();
  const [inputText, setInputText] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState("viral");
  const [selectedAudience, setSelectedAudience] = useState("general");
  const [result, setResult] = useState<RepurposeOutput | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const { history, addHistoryItem, clearHistory } = useHistory();

  const handleGenerate = () => {
    if (!inputText.trim()) return;
    setIsProcessing(true);

    setTimeout(() => {
      const output = repurposeContent(inputText, selectedTemplate, selectedAudience);
      setResult(output);
      addHistoryItem(inputText, selectedTemplate, output);
      setIsProcessing(false);
    }, 250);
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(id);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const wordCount = inputText.trim() ? inputText.trim().split(/\s+/).length : 0;
  const charCount = inputText.length;
  const estimatedReadTime = Math.max(5, Math.ceil((wordCount / 200) * 60)); // in seconds

  // Twitter limit check (all tweets under 280 characters)
  const allTweetsValid = result
    ? result.twitterThread.every((tweet) => tweet.length <= 280)
    : true;

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50/50 via-white to-purple-50/40 text-slate-900 selection:bg-indigo-600 selection:text-white relative overflow-hidden">
      {/* Soft Ambient Light Blobs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-indigo-400/10 to-purple-400/10 blur-[120px] pointer-events-none rounded-full" />

      {/* Navigation Header */}
      <header className="border-b border-slate-200/80 bg-white/80 backdrop-blur-xl sticky top-0 z-50 shadow-xs">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-600 rounded-2xl shadow-lg shadow-indigo-600/25">
              <Sparkles className="w-5 h-5 text-white animate-pulse" />
            </div>
            <div>
              <span className="font-black text-2xl tracking-tight bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                RepurposeAI
              </span>
              <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                AI Content Engine
              </span>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-2 text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-4 py-2 rounded-full shadow-2xs backdrop-blur-md">
              <Zap className="w-3.5 h-3.5 text-emerald-600 fill-emerald-500" />
              <span>100% Free • Zero API Limits</span>
            </div>

            {/* Clerk Auth Actions */}
            {!isSignedIn ? (
              <SignInButton mode="modal">
                <button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:opacity-90 text-white px-5 py-2.5 rounded-2xl text-xs font-bold shadow-md shadow-indigo-600/20 transition cursor-pointer">
                  Sign In
                </button>
              </SignInButton>
            ) : (
              <UserButton />
            )}
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-16 space-y-16 relative z-10">
        {/* Hero Section */}
        <section className="text-center space-y-6 max-w-4xl mx-auto">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full border border-indigo-200 bg-indigo-50/80 text-indigo-700 text-xs font-bold shadow-2xs backdrop-blur-md">
            <Flame className="w-4 h-4 text-amber-500 animate-bounce" />
            <span>Trusted by 1,200+ Creators & Founders Worldwide</span>
          </div>
          <h1 className="text-4xl sm:text-7xl font-black tracking-tight text-slate-900 leading-[1.08]">
            Turn Long Text into <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">Viral Short-Form</span> Content
          </h1>
          <p className="text-slate-600 text-lg sm:text-xl leading-relaxed font-normal max-w-2xl mx-auto">
            Select your tone template and target audience to transform articles, notes, or essays into high-converting social threads instantly.
          </p>
        </section>

        {/* Input Workspace Card */}
        <section className="bg-white/90 border border-slate-200/90 rounded-[2.5rem] p-6 sm:p-10 shadow-2xl shadow-indigo-600/10 backdrop-blur-2xl space-y-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-br from-indigo-100/40 to-purple-100/40 rounded-full blur-3xl pointer-events-none" />

          {/* Template Picker */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-slate-500">
              <Sliders className="w-4 h-4 text-indigo-600" />
              <span>1. Choose Output Tone Template</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              {TEMPLATES.map((tmpl) => (
                <button
                  key={tmpl.id}
                  onClick={() => setSelectedTemplate(tmpl.id)}
                  className={`p-4 rounded-2xl border text-left transition-all duration-300 flex flex-col justify-between cursor-pointer ${
                    selectedTemplate === tmpl.id
                      ? "border-indigo-600 bg-gradient-to-br from-indigo-50/90 to-purple-50/50 shadow-md shadow-indigo-600/10 ring-2 ring-indigo-600/20 scale-[1.02]"
                      : "border-slate-200 bg-slate-50/50 hover:bg-slate-100/80 text-slate-700 hover:border-slate-300"
                  }`}
                >
                  <span className={`font-extrabold text-sm ${selectedTemplate === tmpl.id ? "text-indigo-950" : "text-slate-900"}`}>
                    {tmpl.name}
                  </span>
                  <span className="text-xs text-slate-500 mt-1.5 font-medium leading-relaxed">
                    {tmpl.desc}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Audience Persona Picker */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-slate-500">
              <Users className="w-4 h-4 text-indigo-600" />
              <span>2. Choose Target Audience Persona</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {AUDIENCES.map((aud) => (
                <button
                  key={aud.id}
                  onClick={() => setSelectedAudience(aud.id)}
                  className={`p-3.5 rounded-2xl border text-left transition-all duration-300 flex flex-col justify-between cursor-pointer ${
                    selectedAudience === aud.id
                      ? "border-purple-600 bg-gradient-to-br from-purple-50/90 to-indigo-50/50 shadow-md shadow-purple-600/10 ring-2 ring-purple-600/20 scale-[1.02]"
                      : "border-slate-200 bg-slate-50/50 hover:bg-slate-100/80 text-slate-700 hover:border-slate-300"
                  }`}
                >
                  <span className={`font-extrabold text-xs ${selectedAudience === aud.id ? "text-purple-950" : "text-slate-900"}`}>
                    {aud.name}
                  </span>
                  <span className="text-[11px] text-slate-500 mt-1 font-medium">
                    {aud.desc}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Text Area Header & Presets */}
          <div className="space-y-3 pt-2">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-slate-500">
                <FileText className="w-4 h-4 text-indigo-600" />
                <span>3. Paste Source Content</span>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400 font-semibold">Try sample:</span>
                {PRESETS.map((preset, idx) => (
                  <button
                    key={idx}
                    onClick={() => setInputText(preset.content)}
                    className="text-xs bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 text-slate-700 px-3.5 py-1.5 rounded-xl transition border border-slate-200 font-semibold shadow-2xs cursor-pointer"
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="relative">
              <textarea
                rows={7}
                className="w-full p-5 bg-slate-50/80 border border-slate-200 rounded-2xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-600 text-base resize-y transition shadow-inner"
                placeholder="Paste your blog article, newsletter, or rough notes here..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
              />
              <div className="absolute bottom-4 right-4 flex items-center space-x-3 text-xs text-slate-500 font-semibold bg-white/90 px-3.5 py-1.5 rounded-xl border border-slate-200 shadow-2xs backdrop-blur-sm">
                <span>{wordCount} words</span>
                <span>•</span>
                <span>{charCount} chars</span>
                <span>•</span>
                <span className="flex items-center space-x-1 text-indigo-600">
                  <Clock className="w-3.5 h-3.5" />
                  <span>~{estimatedReadTime}s read</span>
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={handleGenerate}
            disabled={!inputText.trim() || isProcessing}
            className="w-full bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 text-white font-extrabold py-4.5 px-8 rounded-2xl hover:opacity-95 transition-all shadow-xl shadow-indigo-600/25 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer text-base flex items-center justify-center space-x-3 group"
          >
            {isProcessing ? (
              <>
                <RefreshCw className="w-5 h-5 animate-spin" />
                <span>Executing Engine & Analytics...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                <span>Generate Repurposed Content</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </section>

        {/* Output Grid Section */}
        {result && (
          <section className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-wrap items-center justify-between border-b border-slate-200 pb-4 gap-3">
              <div className="space-y-1">
                <h2 className="text-xl font-black text-slate-900 flex items-center space-x-2.5">
                  <Layers className="w-5 h-5 text-indigo-600" />
                  <span>Generated Outputs ({selectedTemplate.toUpperCase()} • {selectedAudience.toUpperCase()})</span>
                </h2>
                <div className="flex items-center space-x-2 text-xs font-semibold text-slate-500">
                  <span className={`flex items-center space-x-1 px-2.5 py-0.5 rounded-full ${allTweetsValid ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-amber-50 text-amber-700 border border-amber-200'}`}>
                    {allTweetsValid ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> : <AlertCircle className="w-3.5 h-3.5 text-amber-600" />}
                    <span>{allTweetsValid ? 'Twitter Limit Check: All tweets under 280 chars ✅' : 'Some tweets exceed 280 characters'}</span>
                  </span>
                </div>
              </div>
              
              {/* Multi-Format Export Options */}
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => downloadAsTxt(result, `${selectedTemplate}-${selectedAudience}`)}
                  className="text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 px-3.5 py-2 rounded-xl transition flex items-center space-x-1.5 shadow-2xs cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5 text-indigo-600" />
                  <span>.TXT</span>
                </button>
                <button
                  onClick={() => downloadAsMarkdown(result, `${selectedTemplate}-${selectedAudience}`)}
                  className="text-xs font-bold text-purple-700 bg-purple-50 hover:bg-purple-100 border border-purple-200 px-3.5 py-2 rounded-xl transition flex items-center space-x-1.5 shadow-2xs cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5 text-purple-600" />
                  <span>.MD</span>
                </button>
                <button
                  onClick={() => downloadAsJson(result, `${selectedTemplate}-${selectedAudience}`)}
                  className="text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 px-3.5 py-2 rounded-xl transition flex items-center space-x-1.5 shadow-2xs cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5 text-slate-600" />
                  <span>.JSON</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* X / Twitter Thread */}
              <div className="bg-white/90 border border-slate-200/90 rounded-3xl p-7 shadow-xl shadow-indigo-500/5 space-y-5 flex flex-col justify-between backdrop-blur-2xl">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2.5 text-slate-900 font-extrabold">
                      <MessageSquare className="w-5 h-5 text-sky-500" />
                      <span>X / Twitter Thread</span>
                    </div>
                    <span className="text-xs bg-sky-50 text-sky-600 border border-sky-200 font-bold px-3 py-1 rounded-xl">
                      {result.twitterThread.length} Tweets
                    </span>
                  </div>

                  <div className="space-y-3.5 max-h-[460px] overflow-y-auto pr-1">
                    {result.twitterThread.map((tweet, idx) => (
                      <div
                        key={idx}
                        className="p-4.5 bg-slate-50/90 border border-slate-200/80 rounded-2xl text-sm text-slate-700 relative group space-y-3 shadow-2xs"
                      >
                        <p className="whitespace-pre-wrap leading-relaxed font-normal">
                          {tweet}
                        </p>
                        <div className="flex items-center justify-between pt-1">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${tweet.length <= 280 ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                            {tweet.length}/280 chars
                          </span>
                          <button
                            onClick={() => handleCopy(tweet, `tweet-${idx}`)}
                            className="text-xs font-semibold flex items-center space-x-1.5 text-slate-600 hover:text-indigo-600 bg-white px-3 py-1.5 rounded-xl border border-slate-200 transition shadow-2xs cursor-pointer"
                          >
                            {copiedIndex === `tweet-${idx}` ? (
                              <>
                                <Check className="w-3.5 h-3.5 text-emerald-600" />
                                <span className="text-emerald-600 font-bold">Copied</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3.5 h-3.5" />
                                <span>Copy Tweet</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() =>
                    handleCopy(result.twitterThread.join("\n\n"), "all-tweets")
                  }
                  className="w-full text-xs font-bold py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-2xl border border-slate-200 transition flex items-center justify-center space-x-2 cursor-pointer shadow-2xs"
                >
                  {copiedIndex === "all-tweets" ? (
                    <span className="text-emerald-600 font-black">Entire Thread Copied!</span>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>Copy Full Thread</span>
                    </>
                  )}
                </button>
              </div>

              {/* Reels / Short Video Script */}
              <div className="bg-white/90 border border-slate-200/90 rounded-3xl p-7 shadow-xl shadow-indigo-500/5 space-y-5 flex flex-col justify-between backdrop-blur-2xl">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2.5 text-slate-900 font-extrabold">
                      <Video className="w-5 h-5 text-rose-500" />
                      <span>Reels / Shorts Script</span>
                    </div>
                    <span className="text-xs bg-rose-50 text-rose-600 border border-rose-200 font-bold px-3 py-1 rounded-xl">
                      {result.reelsScript.length} Scenes
                    </span>
                  </div>

                  <div className="space-y-3.5 max-h-[460px] overflow-y-auto pr-1">
                    {result.reelsScript.map((step) => (
                      <div
                        key={step.scene}
                        className="p-4.5 bg-slate-50/90 border border-slate-200/80 rounded-2xl text-sm space-y-2.5 shadow-2xs"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-black text-indigo-600 uppercase tracking-wider">
                            Scene {step.scene}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600">
                          <strong className="text-slate-800 font-bold">Visual:</strong>{" "}
                          {step.visual}
                        </p>
                        <p className="text-sm text-slate-900 bg-white p-4 rounded-xl border border-slate-200 shadow-2xs font-medium">
                          <strong className="text-indigo-600 font-bold">Audio/Voiceover:</strong>{" "}
                          "{step.audio}"
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() =>
                    handleCopy(
                      result.reelsScript
                        .map(
                          (s) =>
                            `Scene ${s.scene}:\nVisual: ${s.visual}\nAudio: "${s.audio}"`
                        )
                        .join("\n\n"),
                      "all-script"
                    )
                  }
                  className="w-full text-xs font-bold py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-2xl border border-slate-200 transition flex items-center justify-center space-x-2 cursor-pointer shadow-2xs"
                >
                  {copiedIndex === "all-script" ? (
                    <span className="text-emerald-600 font-black">Script Copied!</span>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>Copy Full Script</span>
                    </>
                  )}
                </button>
              </div>

              {/* Key Takeaways */}
              <div className="lg:col-span-2 bg-white/90 border border-slate-200/90 rounded-3xl p-7 shadow-xl shadow-indigo-500/5 space-y-5 backdrop-blur-2xl">
                <div className="flex items-center space-x-2.5 text-slate-900 font-extrabold">
                  <ListCheck className="w-5 h-5 text-emerald-600" />
                  <span>Key Bullet Takeaways</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {result.keyTakeaways.map((point, i) => (
                    <div
                      key={i}
                      className="p-4.5 bg-slate-50/90 border border-slate-200/80 rounded-2xl text-sm text-slate-700 flex items-start space-x-3 shadow-2xs"
                    >
                      <span className="text-indigo-600 font-black text-lg leading-none">•</span>
                      <span className="font-semibold">{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* LocalStorage History Section */}
        {history.length > 0 && (
          <section className="bg-white/90 border border-slate-200/90 rounded-3xl p-7 sm:p-9 space-y-5 backdrop-blur-2xl shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <div className="flex items-center space-x-2.5 text-slate-900 font-extrabold">
                <History className="w-5 h-5 text-indigo-600" />
                <span>Recent Generations (Saved locally)</span>
              </div>
              <button
                onClick={clearHistory}
                className="text-xs text-rose-600 hover:text-rose-700 font-semibold flex items-center space-x-1.5 bg-rose-50 px-3.5 py-2 rounded-xl border border-rose-200 transition cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
                <span>Clear History</span>
              </button>
            </div>

            <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
              {history.map((item) => (
                <div
                  key={item.id}
                  onClick={() => {
                    setInputText(item.sourceText);
                    setResult(item.result);
                    setSelectedTemplate(item.template);
                    window.scrollTo({ top: 400, behavior: "smooth" });
                  }}
                  className="p-4 bg-slate-50 hover:bg-indigo-50/50 border border-slate-200 rounded-2xl flex items-center justify-between cursor-pointer transition shadow-2xs group"
                >
                  <div className="space-y-1">
                    <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
                      [{item.template}] • {item.timestamp}
                    </span>
                    <p className="text-sm font-medium text-slate-800 line-clamp-1 group-hover:text-indigo-900">
                      {item.sourceText}
                    </p>
                  </div>
                  <span className="text-xs text-slate-400 group-hover:text-indigo-600 font-bold">
                    Load →
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Programmatic SEO Landing Pages Showcase */}
        <section className="bg-white/70 border border-slate-200/90 rounded-3xl p-9 space-y-6 backdrop-blur-2xl shadow-lg">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-black text-slate-900">Explore Popular Repurposing Tools</h2>
            <p className="text-slate-600 text-sm">Optimized converters built for creators, marketers, and founders.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <Link href="/repurpose/linkedin-to-twitter" className="p-6 bg-white border border-slate-200/80 rounded-2xl hover:border-indigo-600 transition shadow-2xs space-y-2 block group">
              <h3 className="font-extrabold text-slate-900 text-sm group-hover:text-indigo-600 transition-colors">LinkedIn to X Thread →</h3>
              <p className="text-xs text-slate-500 leading-relaxed">Transform professional LinkedIn updates into viral short threads.</p>
            </Link>
            <Link href="/repurpose/blog-to-reels" className="p-6 bg-white border border-slate-200/80 rounded-2xl hover:border-indigo-600 transition shadow-2xs space-y-2 block group">
              <h3 className="font-extrabold text-slate-900 text-sm group-hover:text-indigo-600 transition-colors">Blog to Reels Script →</h3>
              <p className="text-xs text-slate-500 leading-relaxed">Convert long blog posts and guides into short video scripts.</p>
            </Link>
            <Link href="/repurpose/article-to-threads" className="p-6 bg-white border border-slate-200/80 rounded-2xl hover:border-indigo-600 transition shadow-2xs space-y-2 block group">
              <h3 className="font-extrabold text-slate-900 text-sm group-hover:text-indigo-600 transition-colors">Article Summarizer →</h3>
              <p className="text-xs text-slate-500 leading-relaxed">Extract core bullet takeaways and summaries from dense text.</p>
            </Link>
          </div>
        </section>

        {/* Feature Highlights */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
          <div className="p-7 bg-white/80 border border-slate-200/90 rounded-3xl shadow-xl shadow-indigo-500/5 space-y-3 backdrop-blur-md">
            <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center border border-amber-200/80 shadow-inner">
              <Zap className="w-6 h-6 text-amber-500" />
            </div>
            <h3 className="font-extrabold text-slate-900 text-base">Instant Template Engine</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Switch between viral, professional, and story templates instantly with zero latency.
            </p>
          </div>
          <div className="p-7 bg-white/80 border border-slate-200/90 rounded-3xl shadow-xl shadow-indigo-500/5 space-y-3 backdrop-blur-md">
            <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center border border-emerald-200/80 shadow-inner">
              <ShieldCheck className="w-6 h-6 text-emerald-600" />
            </div>
            <h3 className="font-extrabold text-slate-900 text-base">100% Private & Safe</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              All parsing happens inside your browser. No external servers or API providers touch your data.
            </p>
          </div>
          <div className="p-7 bg-white/80 border border-slate-200/90 rounded-3xl shadow-xl shadow-indigo-500/5 space-y-3 backdrop-blur-md">
            <div className="w-12 h-12 bg-purple-50 rounded-2xl flex items-center justify-center border border-purple-200/80 shadow-inner">
              <Sparkles className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="font-extrabold text-slate-900 text-base">Unlimited Usage</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Never worry about token limits or monthly credits. Generate unlimited threads for free.
            </p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200/80 mt-24 py-10 bg-white/80 backdrop-blur-2xl text-center text-xs text-slate-500 font-semibold space-y-2">
        <p>© 2026 RepurposeAI • Built with Next.js App Router & Tailwind CSS</p>
        <p className="text-slate-400">High-Performance Zero-API Limit Content Repurposing Engine</p>
      </footer>
    </div>
  );
}