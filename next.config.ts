import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["image.tmdb.org", "books.google.com"],
  },
  serverExternalPackages: ["better-sqlite3"],
};

export default nextConfig;
