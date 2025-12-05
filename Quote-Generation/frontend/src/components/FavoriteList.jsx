// @ts-nocheck
import React from "react";

export default function FavoriteList({ favorites, onCopy, onTweet, onRemove }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <h3 className="text-lg font-semibold mb-3">Favorites</h3>

      {favorites.length === 0 && (
        <p className="text-gray-500">No favorites yet.</p>
      )}

      <div className="space-y-3">
        {favorites.map((fav) => (
          <div
            key={fav.id}
            className="p-3 border rounded flex justify-between items-start"
          >
            <div>
              <p className="font-medium">“{fav.content}”</p>
              <p className="text-sm text-gray-600">— {fav.author}</p>
            </div>

            <div className="flex flex-col gap-1">
              <button
                onClick={() => onCopy(fav)}
                className="px-2 py-1 text-xs bg-gray-200 rounded"
              >
                Copy
              </button>

              <button
                onClick={() => onTweet(fav)}
                className="px-2 py-1 text-xs bg-blue-200 rounded"
              >
                Tweet
              </button>

              <button
                onClick={() => onRemove(fav)}
                className="px-2 py-1 text-xs bg-red-300 rounded"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}