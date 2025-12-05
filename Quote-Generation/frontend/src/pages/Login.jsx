// @ts-nocheck
import React, { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";
import QuoteCard from "../components/QuoteCard";
import FavoriteList from "../components/FavoriteList";

export default function QuoteGenerator() {
  const [quote, setQuote] = useState(null);
  const [favorites, setFavorites] = useState([]);

  async function fetchQuote() {
    try {
      const res = await axiosClient.get("/quotes/random");
      const data = res.data;

      setQuote({
        id: data.id,
        content: data.content,
        author: data.author,
        tags: data.tags,
      });
    } catch (err) {
      console.error("Error fetching quote:", err);
    }
  }

  async function loadFavoritesFromBackend() {
    try {
      const token = localStorage.getItem("access_token");
      if (!token) return;

      const res = await axiosClient.get("/quotes/saved");

      setFavorites(res.data || []);
    } catch (err) {
      console.error("Failed loading favorites:", err);
    }
  }
// eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    fetchQuote();
    loadFavoritesFromBackend();
  }, []);

  async function saveToBackend(q) {
    try {
      await axiosClient.post("/quotes/save", {
        quote: q.content,
        author: q.author,
      });

      loadFavoritesFromBackend();
    } catch (err) {
      console.error("Save failed:", err);
    }
  }

  return (
    <div className="grid gap-6 md:grid-cols-3">
      <div className="md:col-span-2">
        {quote && (
          <QuoteCard
            quote={quote}
            onCopy={() => navigator.clipboard.writeText(`“${quote.content}” — ${quote.author}`)}
            onTweet={() =>
              window.open(
                `https://twitter.com/intent/tweet?text=${encodeURIComponent(
                  `${quote.content} — ${quote.author}`
                )}`
              )
            }
            onSave={() => saveToBackend(quote)}
            saved={favorites.some((f) => f.quote === quote.content)}
          />
        )}

        <button
          onClick={fetchQuote}
          className="mt-4 px-3 py-2 bg-slate-800 text-white rounded"
        >
          New Quote
        </button>
      </div>

      <FavoriteList favorites={favorites} />
    </div>
  );
}
