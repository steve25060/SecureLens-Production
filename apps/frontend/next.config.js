/** @type {import('next').NextConfig} */

const isGitHubPages = process.env.GITHUB_PAGES === 'true';
const repoName = 'SecureLens-Production';

const normalConfig = {
  async rewrites() {
    let backendUrl =
      process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:4000';

    if (
      !backendUrl.startsWith('http://') &&
      !backendUrl.startsWith('https://') &&
      !backendUrl.startsWith('/')
    ) {
      backendUrl = `https://${backendUrl}`;
    }

    backendUrl = backendUrl.replace(/\/+$/, '');

    return [
      {
        source: '/api/:path*',
        destination: `${backendUrl}/api/:path*`,
      },
    ];
  },
};

const nextConfig = {
  ...(isGitHubPages
    ? {
        output: 'export',
        basePath: `/${repoName}`,
        assetPrefix: `/${repoName}/`,
        trailingSlash: true,
      }
    : normalConfig),

  images: {
    remotePatterns: [
      { protocol: 'http', hostname: 'localhost' },
      { protocol: 'https', hostname: 'localhost' },
      { protocol: 'http', hostname: '*.railway.internal' },
      { protocol: 'https', hostname: '*.railway.app' },
      { protocol: 'https', hostname: '*.onrender.com' },
      { protocol: 'https', hostname: 'avatars.githubusercontent.com' },
      { protocol: 'https', hostname: 'lh3.googleusercontent.com' },
    ],
    unoptimized: true,
  },

  staticPageGenerationTimeout: 1000,
  compress: true,
};

module.exports = nextConfig;
