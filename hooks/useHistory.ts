import { useState, useEffect } from "react";
import { RepurposeOutput } from "@/lib/repurposer";

export interface HistoryItem {
  id: string;
  timestamp: string;
  sourceText: string;
  template: string;
  result: RepurposeOutput;
}

export function useHistory() {
  const [history, setHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("repurpose_history");
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to load history", e);
      }
    }
  }, []);

  const addHistoryItem = (sourceText: string, template: string, result: RepurposeOutput) => {
    const newItem: HistoryItem = {
      id: Date.now().toString(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      sourceText: sourceText.slice(0, 80) + "...",
      template,
      result,
    };

    const updated = [newItem, ...history.slice(0, 9)]; // Keep last 10 items
    setHistory(updated);
    localStorage.setItem("repurpose_history", JSON.stringify(updated));
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem("repurpose_history");
  };

  return { history, addHistoryItem, clearHistory };
}