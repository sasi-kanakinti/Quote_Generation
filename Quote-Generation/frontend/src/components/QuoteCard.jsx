// @ts-nocheck
import React from "react";

export default function QuoteCard({ quote, onCopy, onTweet, onSave, saved }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <blockquote className="text-2xl text-slate-800">
        “{quote.content}”
      </blockquote>

      <div className="mt-4 flex justify-between">
        <div className="text-sm text-slate-600">— {quote.author}</div>

        <div className="flex gap-2">
          <button onClick={() => onCopy(quote)} className="px-3 py-1 border rounded text-sm">Copy</button>
          <button onClick={() => onTweet(quote)} className="px-3 py-1 border rounded text-sm">Tweet</button>

          <button
            onClick={() => onSave(quote)}
            className={`px-3 py-1 rounded text-sm ${
              saved ? "bg-yellow-400 text-black" : "border"
            }`}
          >
            {saved ? "Unsave" : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
