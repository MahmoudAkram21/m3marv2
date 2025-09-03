import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
// import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "50mb",
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.youtube.com",
        pathname: "/vi/**",
      },
      {
        protocol: "https",
        hostname: "m3mar.koki-shop.com",
        pathname: "/**", // allow images from your API
      },
      {
        protocol: "https",
        hostname: "backend.meamargroup.com",
        pathname: "/**", // allow images from your API
      },
      {
        protocol: "https",
        hostname: "meamar.backteam.site",
        pathname: "/**", // allow images from your API
      },
    ],
  },
};

const withNextIntl = createNextIntlPlugin();

// const withNextIntl = createNextIntlPlugin();
// export default withNextIntl(nextConfig);
export default withNextIntl(nextConfig);
