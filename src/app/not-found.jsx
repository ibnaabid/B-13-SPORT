// app/not-found.jsx
"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

const NotFound = () => {
  const [count, setCount] = useState(10);

  useEffect(() => {
    const t = setInterval(() => {
      setCount((c) => {
        if (c <= 1) {
          clearInterval(t);
          window.location.href = "/";
        }
        return c - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center overflow-hidden relative">

      {/* Background glow */}
      <div className="absolute w-[500px] h-[500px] bg-green-500/10 rounded-full blur-[120px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

      {/* Grid lines */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(34,197,94,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(34,197,94,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />

      <div className="relative z-10 text-center space-y-8 px-4">

        {/* 404 */}
        <div className="relative">
          <h1 className="text-[180px] font-black leading-none text-transparent bg-clip-text bg-gradient-to-b from-green-400 to-green-900 select-none">
            404
          </h1>
          {/* Glitch line */}
          <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-green-500/30" />
        </div>

        {/* Terminal style message */}
        <div className="bg-black border border-green-500/30 rounded-2xl p-6 max-w-md mx-auto text-left font-mono text-sm space-y-2">
          <p className="text-green-500">
            <span className="text-gray-500">$ </span>
            GET /page
          </p>
          <p className="text-red-400">
            ERROR: 404 — Page not found
          </p>
          <p className="text-gray-500">
            The requested route does not exist.
          </p>
          <p className="text-green-400 animate-pulse">
            Redirecting to home in{" "}
            <span className="text-white font-bold">{count}s</span>...
          </p>
        </div>

        {/* Buttons */}
        <div className="flex gap-4 justify-center">
          <Link
            href="/"
            className="px-8 py-3 bg-green-500 hover:bg-green-400 text-black font-black rounded-full transition-all duration-200 hover:scale-105"
          >
            Go Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="px-8 py-3 border border-green-500/50 hover:border-green-400 text-green-400 font-bold rounded-full transition-all duration-200 hover:scale-105"
          >
            Go Back
          </button>
        </div>

      </div>
    </div>
  );
};

export default NotFound;