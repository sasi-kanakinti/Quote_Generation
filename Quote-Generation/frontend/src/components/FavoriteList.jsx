// @ts-nocheck
import React from "react";

export default function FavoriteList({ favorites, onCopy, onTweet, onRemove }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow h-full flex flex-col">
      <h2 className="text-lg font-semibold mb-4">Favorites</h2>

      <div className="flex-1 overflow-auto">
        {favorites.length === 0 ? (
          <p className="text-sm text-slate-500">No favorites yet.</p>
        ) : (
          <ul className="space-y-3">
            {favorites.map((q) => (
              <li key={q.id} className="p-3 border rounded">
                <div className="text-sm">“{q.content}”</div>
                <div className="text-xs text-slate-600 flex justify-between mt-1">
                  <span>— {q.author}</span>
                  <div className="flex gap-2">
                    <button onClick={() => onCopy(q)} className="px-2 py-1 border rounded text-xs">
                      Copy
                    </button>
                    <button onClick={() => onTweet(q)} className="px-2 py-1 border rounded text-xs">
                      Tweet
                    </button>
                    <button onClick={() => onRemove(q)} className="px-2 py-1 border rounded text-xs">
                      Remove
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
