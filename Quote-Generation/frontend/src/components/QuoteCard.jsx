// @ts-nocheck
import React from "react";

export default function QuoteCard({ quote, saved, onCopy, onTweet, onSave }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow mb-4">
      <p className="text-xl font-semibold mb-2">“{quote.content}”</p>
      <p className="text-gray-700 mb-4">— {quote.author}</p>

      <div className="flex gap-2">
        <button
          onClick={() => onCopy(quote)}
          className="px-3 py-2 bg-gray-200 rounded"
        >
          Copy
        </button>

        <button
          onClick={() => onTweet(quote)}
          className="px-3 py-2 bg-blue-300 rounded"
        >
          Tweet
        </button>

        <button
          onClick={() => onSave(quote)}
          className="px-3 py-2 bg-yellow-300 rounded"
        >
          {saved ? "Unsave" : "Save"}
        </button>
      </div>
    </div>
  );
}
