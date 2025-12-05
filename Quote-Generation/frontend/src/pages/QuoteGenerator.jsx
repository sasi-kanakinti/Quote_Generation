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
      setQuote(res.data);
    } catch (err) {
      console.error("Error fetching quote:", err);
    }
  }

  async function loadFavoritesFromBackend() {
    try {
      const token = localStorage.getItem("access_token");
      if (!token) return;

      const res = await axiosClient.get("/quotes/saved");
      setFavorites(res.data);
    } catch (err) {
      console.error("Failed to load favorites:", err);
    }
  }

  async function saveQuote(q) {
    try {
      await axiosClient.post("/quotes/save", {
        content: q.content,
        author: q.author,
      });

      loadFavoritesFromBackend();
    } catch (err) {
      console.error("Save failed:", err);
    }
  }

  async function removeQuote(q) {
    try {
      await axiosClient.delete(`/quotes/remove/${q.id}`);
      loadFavoritesFromBackend();
    } catch (err) {
      console.error("Delete failed:", err);
    }
  }
// eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    fetchQuote();
    loadFavoritesFromBackend();
  }, []);

  function toggleFavorite(q) {
    const exists = favorites.some((f) => f.content === q.content);
    if (exists) removeQuote(q);
    else saveQuote(q);
  }

  function copy(q) {
    navigator.clipboard.writeText(`“${q.content}” — ${q.author}`);
  }

  function tweet(q) {
    const t = `${q.content} — ${q.author}`;
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(t)}`,
      "_blank"
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-3">
      <div className="md:col-span-2">
        {quote && (
          <QuoteCard
            quote={quote}
            onCopy={copy}
            onTweet={tweet}
            onSave={toggleFavorite}
            saved={favorites.some((f) => f.content === quote.content)}
          />
        )}

        <button
          onClick={fetchQuote}
          className="mt-4 px-3 py-2 bg-slate-800 text-white rounded"
        >
          New Quote
        </button>
      </div>

      <FavoriteList
        favorites={favorites}
        onCopy={copy}
        onTweet={tweet}
        onRemove={removeQuote}
      />
    </div>
  );
}
