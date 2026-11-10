/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Mail clients sometimes fold a sentence's full stop or comma into the link.
  async redirects() {
    return [
      { source: "/cv.", destination: "/cv", permanent: true },
      { source: "/cv,", destination: "/cv", permanent: true },
    ];
  },
};

export default nextConfig;
