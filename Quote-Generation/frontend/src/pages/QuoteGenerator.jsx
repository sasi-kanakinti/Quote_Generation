// @ts-nocheck
import React, { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";
import QuoteCard from "../components/QuoteCard";
import FavoriteList from "../components/FavoriteList";

export default function QuoteGenerator() {
  const [quote, setQuote] = useState(null);
  const [favorites, setFavorites] = useState([]);

  // Fetch random quote
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

  // Fetch saved favorites from backend
  async function loadFavoritesFromBackend() {
    try {
      const token = localStorage.getItem("access_token");
      if (!token) return;

      const res = await axiosClient.get("/quotes/saved", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setFavorites(res.data || []);

    } catch (err) {
      console.error("Failed loading favorites:", err);
    }
  }

  // Initial load: quote + favorites
  useEffect(() => {
    async function init() {
      await fetchQuote();
      await loadFavoritesFromBackend();
    }
    init();
  }, []);

  // Copy text
  function copy(q) {
    navigator.clipboard.writeText(`“${q.content}” — ${q.author}`);
  }

  // Tweet quote
  function tweet(q) {
    const t = `${q.content} — ${q.author}`;
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(t)}`,
      "_blank"
    );
  }

  // Save favorite to backend
  async function saveToBackend(q) {
    try {
      await axiosClient.post(
        "/quotes/save",
        {
          content: q.content,
          author: q.author,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );

      // Refresh list
      await loadFavoritesFromBackend();

    } catch (err) {
      console.error("Save failed:", err);
    }
  }

  // Remove favorite from backend
  async function removeFromBackend(q) {
    try {
      await axiosClient.delete(`/quotes/remove/${q.id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` },
      });

      await loadFavoritesFromBackend();

    } catch (err) {
      console.error("Delete failed:", err);
    }
  }

  // Toggle favorite
  function toggleFavorite(q) {
    const exists = favorites.some((f) => f.content === q.content);

    if (exists) {
      removeFromBackend(q);
    } else {
      saveToBackend(q);
    }
  }

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {/* Left side */}
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

      {/* Favorites List */}
      <FavoriteList
        favorites={favorites}
        onCopy={copy}
        onTweet={tweet}
        onRemove={(q) => removeFromBackend(q)}
      />
    </div>
  );
}
