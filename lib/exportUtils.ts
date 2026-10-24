import { RepurposeOutput } from "./repurposer";

export function downloadAsTxt(result: RepurposeOutput, templateName: string) {
  const content = `=== REPURPOSEAI REPORT (${templateName.toUpperCase()}) ===\n\n` +
    `--- X / TWITTER THREAD ---\n\n` +
    result.twitterThread.join("\n\n") +
    `\n\n\n--- REELS / SHORTS SCRIPT ---\n\n` +
    result.reelsScript.map(s => `Scene ${s.scene}:\nVisual: ${s.visual}\nAudio: "${s.audio}"`).join("\n\n") +
    `\n\n\n--- KEY TAKEAWAYS ---\n\n` +
    result.keyTakeaways.map(k => `• ${k}`).join("\n");

  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `repurposed-${templateName}-${Date.now()}.txt`;
  link.click();
  URL.revokeObjectURL(url);
}

export function downloadAsMarkdown(result: RepurposeOutput, templateName: string) {
  const content = `# RepurposeAI Report (${templateName.toUpperCase()})\n\n` +
    `## 🧵 X / Twitter Thread\n\n` +
    result.twitterThread.map(t => `> ${t}\n`).join("\n") +
    `\n## 🎬 Reels / Shorts Script\n\n` +
    result.reelsScript.map(s => `### Scene ${s.scene}\n- **Visual:** ${s.visual}\n- **Audio:** "${s.audio}"`).join("\n\n") +
    `\n\n## 💡 Key Takeaways\n\n` +
    result.keyTakeaways.map(k => `- ${k}`).join("\n");

  const blob = new Blob([content], { type: "text/markdown;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `repurposed-${templateName}-${Date.now()}.md`;
  link.click();
  URL.revokeObjectURL(url);
}

export function downloadAsJson(result: RepurposeOutput, templateName: string) {
  const data = {
    template: templateName,
    timestamp: new Date().toISOString(),
    ...result,
  };
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `repurposed-${templateName}-${Date.now()}.json`;
  link.click();
  URL.revokeObjectURL(url);
}