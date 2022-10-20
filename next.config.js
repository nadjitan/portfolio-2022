const projDir = require("./utils/projDir.js")

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    projDir: projDir.get("pages"),
  },
}

module.exports = nextConfig
