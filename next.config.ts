import { withNextVideo } from "next-video/process";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    GITHUB_TOKEN: process.env.GITHUB_TOKEN,
  },
  images: {
    qualities: [60, 75, 95],
  },
};

export default withNextVideo(nextConfig);
