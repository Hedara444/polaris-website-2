import path from "node:path";

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // sql.js initializes its WASM runtime through Node's native module loader.
  serverExternalPackages: ["sql.js"],
  turbopack: {
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
