export interface RepurposeOutput {
  twitterThread: string[];
  reelsScript: { scene: number; visual: string; audio: string }[];
  keyTakeaways: string[];
}

export function repurposeContent(
  inputText: string,
  tone: string = "viral",
  audience: string = "general"
): RepurposeOutput {
  const paragraphs = inputText
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter((p) => p.length > 0);

  const allSentences = inputText
    .replace(/([.?!])\s*(?=[A-Z])/g, "$1|")
    .split("|")
    .map((s) => s.trim())
    .filter((s) => s.length > 5);

  const mainHook = allSentences[0] || "Key insights from this topic:";

  // Audience-based prefixes or angles
  let audiencePrefix = "";
  if (audience === "founders") {
    audiencePrefix = "🚀 [For Founders & Builders]: ";
  } else if (audience === "devs") {
    audiencePrefix = "💻 [For Engineers & Devs]: ";
  } else if (audience === "marketers") {
    audiencePrefix = "📈 [For Marketers & Growth Leads]: ";
  }

  // Tone-based customizations
  let hookPrefix = "🧵 1/";
  let callToAction = "Found this helpful? Like & Retweet to share with your network!";

  if (tone === "professional") {
    hookPrefix = "📌 Insight 1:";
    callToAction = "What are your thoughts on this? Let's discuss in the comments below.";
  } else if (tone === "story") {
    hookPrefix = "🔥 Part 1:";
    callToAction = "Save this thread and follow for more growth case studies!";
  }

  // 1. Twitter Thread Generation
  const twitterThread: string[] = [];
  twitterThread.push(`${hookPrefix} ${audiencePrefix}${mainHook}\n\nHere is what you need to know 👇`);

  let currentTweet = "";
  let tweetCount = 2;

  allSentences.slice(1).forEach((sentence) => {
    if ((currentTweet + " " + sentence).length < 240) {
      currentTweet += (currentTweet ? " " : "") + sentence;
    } else {
      if (currentTweet) {
        twitterThread.push(`📌 ${tweetCount}/ ${currentTweet}`);
        tweetCount++;
      }
      currentTweet = sentence;
    }
  });

  if (currentTweet) {
    twitterThread.push(`📌 ${tweetCount}/ ${currentTweet}`);
  }

  twitterThread.push(`💡 ${tweetCount + 1}/ Summary:\n${callToAction}`);

  // 2. Reels Script Generation
  const reelsScript = [
    {
      scene: 1,
      visual: "Bold text overlay + fast zoom-in effect",
      audio: `Hook: ${audiencePrefix}${mainHook.slice(0, 70)}...`,
    },
    {
      scene: 2,
      visual: "B-roll clips or dynamic screen recording highlights",
      audio: `Core Point: ${allSentences[1] || "Here is the exact framework to follow."}`,
    },
    {
      scene: 3,
      visual: "Close-up creator view with gesture highlights",
      audio: `Pro Strategy: ${allSentences[2] || "Consistency and execution are your main leverage."}`,
    },
    {
      scene: 4,
      visual: "End screen CTA graphic with logo",
      audio: "Hit follow for more actionable frameworks daily!",
    },
  ];

  // 3. Key Takeaways
  const keyTakeaways = allSentences
    .filter((s) => s.length > 20)
    .slice(0, 6)
    .map((sentence) => sentence.replace(/^[^a-zA-Z0-9]+/, ""));

  return {
    twitterThread,
    reelsScript,
    keyTakeaways,
  };
}